/*
 * Capa de base de datos de App CEPK.
 *
 * - En el teléfono / navegador: base de datos IndexedDB ("appcepk") guardada en el
 *   almacenamiento del dispositivo. Se pide almacenamiento persistente para que el
 *   sistema no la borre.
 * - En la versión de Windows (.exe): los datos se envían al programa local, que los
 *   guarda en un archivo de base de datos dentro de la carpeta que eligió el usuario.
 *
 * Interfaz común:
 *   DB.init()                 -> Promise<{config, materias}>
 *   DB.saveConfig(config)     -> Promise
 *   DB.saveMateria(materia)   -> Promise
 *   DB.deleteMateria(id)      -> Promise
 *   DB.replaceAll(state)      -> Promise   (importar respaldo / borrar todo)
 *   DB.info()                 -> Promise<{kind, ...}>
 */
(function () {
  'use strict';

  const DB_NAME = 'appcepk';
  const DB_VERSION = 1;

  function req2p(r) {
    return new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  }
  function tx2p(tx) {
    return new Promise((res, rej) => { tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error); });
  }

  /* ---------- IndexedDB (teléfono / navegador) ---------- */
  const IDB = {
    kind: 'indexeddb',
    _db: null,
    open() {
      if (this._db) return Promise.resolve(this._db);
      return new Promise((resolve, reject) => {
        const r = indexedDB.open(DB_NAME, DB_VERSION);
        r.onupgradeneeded = () => {
          const db = r.result;
          if (!db.objectStoreNames.contains('config')) db.createObjectStore('config');
          if (!db.objectStoreNames.contains('materias')) {
            const s = db.createObjectStore('materias', { keyPath: 'id' });
            s.createIndex('nome', 'nome', { unique: false });
          }
        };
        r.onsuccess = () => { this._db = r.result; resolve(this._db); };
        r.onerror = () => reject(r.error);
        r.onblocked = () => reject(new Error('IndexedDB bloqueada'));
      });
    },
    async init() {
      const db = await this.open();
      const tx = db.transaction(['config', 'materias'], 'readonly');
      const config = await req2p(tx.objectStore('config').get('main'));
      const materias = await req2p(tx.objectStore('materias').getAll());
      // Pide almacenamiento persistente (evita que el sistema borre los datos)
      try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
      return { config: config || null, materias: materias || [] };
    },
    async saveConfig(config) {
      const db = await this.open();
      const tx = db.transaction('config', 'readwrite');
      tx.objectStore('config').put(config, 'main');
      return tx2p(tx);
    },
    async saveMateria(m) {
      const db = await this.open();
      const tx = db.transaction('materias', 'readwrite');
      tx.objectStore('materias').put(m);
      return tx2p(tx);
    },
    async deleteMateria(id) {
      const db = await this.open();
      const tx = db.transaction('materias', 'readwrite');
      tx.objectStore('materias').delete(id);
      return tx2p(tx);
    },
    async replaceAll(state) {
      const db = await this.open();
      const tx = db.transaction(['config', 'materias'], 'readwrite');
      const ms = tx.objectStore('materias');
      ms.clear();
      (state.materias || []).forEach(m => ms.put(m));
      if (state.config) tx.objectStore('config').put(state.config, 'main');
      return tx2p(tx);
    },
    async info() {
      let persisted = false, usage = null, quota = null;
      try { if (navigator.storage && navigator.storage.persisted) persisted = await navigator.storage.persisted(); } catch (e) {}
      try { if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); usage = e.usage; quota = e.quota; } } catch (e) {}
      return { kind: 'indexeddb', persisted, usage, quota };
    }
  };

  /* ---------- Escritorio (Windows .exe) ---------- */
  const Desktop = {
    kind: 'desktop',
    _state: { version: 1, config: null, materias: [] },
    _queue: Promise.resolve(),
    async init() {
      const r = await fetch('/api/data', { cache: 'no-store' });
      if (!r.ok) throw new Error('No se pudo leer la base de datos');
      const data = await r.json();
      this._state = { version: 1, config: data.config || null, materias: Array.isArray(data.materias) ? data.materias : [] };
      // Latido: mantiene vivo el programa mientras la ventana esté abierta
      const beat = () => fetch('/api/ping', { method: 'POST' }).catch(() => {});
      beat(); setInterval(beat, 5000);
      return { config: this._state.config, materias: this._state.materias.slice() };
    },
    _flush() {
      const body = JSON.stringify(this._state);
      // Escrituras en cola, una tras otra
      this._queue = this._queue.then(() => fetch('/api/data', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body
      }).then(r => { if (!r.ok) throw new Error('Error al guardar'); }));
      return this._queue;
    },
    saveConfig(config) { this._state.config = config; return this._flush(); },
    saveMateria(m) {
      const i = this._state.materias.findIndex(x => x.id === m.id);
      if (i >= 0) this._state.materias[i] = m; else this._state.materias.push(m);
      return this._flush();
    },
    deleteMateria(id) { this._state.materias = this._state.materias.filter(x => x.id !== id); return this._flush(); },
    replaceAll(state) {
      this._state = { version: 1, config: state.config || this._state.config, materias: (state.materias || []).slice() };
      return this._flush();
    },
    async info() {
      const r = await fetch('/api/info', { cache: 'no-store' });
      const j = await r.json();
      return Object.assign({ kind: 'desktop' }, j);
    },
    async chooseFolder() {
      const r = await fetch('/api/choose-folder', { method: 'POST' });
      return r.json();
    },
    openFolder() { return fetch('/api/open-folder', { method: 'POST' }); }
  };

  async function detect() {
    if (location.protocol === 'http:' && (location.hostname === '127.0.0.1' || location.hostname === 'localhost')) {
      try {
        const r = await fetch('/api/info', { cache: 'no-store' });
        if (r.ok) { const j = await r.json(); if (j && j.desktop) return Desktop; }
      } catch (e) {}
    }
    return IDB;
  }

  window.DB = {
    backend: null,
    async init() { this.backend = await detect(); return this.backend.init(); },
    get kind() { return this.backend ? this.backend.kind : null; },
    saveConfig(c) { return this.backend.saveConfig(c); },
    saveMateria(m) { return this.backend.saveMateria(m); },
    deleteMateria(id) { return this.backend.deleteMateria(id); },
    replaceAll(s) { return this.backend.replaceAll(s); },
    info() { return this.backend.info(); },
    chooseFolder() { return this.backend.chooseFolder ? this.backend.chooseFolder() : Promise.resolve(null); },
    openFolder() { return this.backend.openFolder ? this.backend.openFolder() : Promise.resolve(); }
  };
})();
