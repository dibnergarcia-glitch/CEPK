/* App CEPK — Calculadora de notas */
(function () {
  'use strict';

  /* ================= Idiomas ================= */
  const I18N = {
    es: {
      subtitle: '{ano}{sep}{nome}',
      install: 'Instalar app',
      search: 'Buscar materia…',
      sortName: 'Nombre', sortRisk: 'Más en riesgo', sortAvg: 'Promedio',
      addSubject: 'Materia',
      empty: 'Todavía no hay materias.<br>Toca <b>+ Materia</b> para agregar la primera.',
      noResults: 'Ninguna materia coincide con la búsqueda.',
      sumAvg: 'Promedio general', sumOk: 'Aprobadas / aseguradas', sumRisk: 'En riesgo', sumSubjects: 'Materias',
      newSubject: 'Nueva materia', editSubject: 'Editar materia',
      name: 'Nombre de la materia', color: 'Color', grades: 'Notas', notes: 'Observaciones',
      delete: 'Eliminar', cancel: 'Cancelar', save: 'Guardar', confirm: 'Confirmar',
      settings: 'Ajustes', student: 'Nombre del alumno', year: 'Año escolar',
      periods: 'Cantidad de periodos', periodName: 'Tipo de periodo',
      pass: 'Promedio para aprobar', max: 'Nota máxima', decimals: 'Decimales', lang: 'Idioma',
      weights: 'Peso de cada periodo', weightsHint: 'Deja todos en 1 si todos los periodos valen lo mismo.',
      storage: 'Base de datos', export: 'Exportar respaldo', import: 'Importar respaldo', wipe: 'Borrar todos los datos',
      changeFolder: 'Cambiar carpeta', openFolder: 'Abrir carpeta',
      p_bimestre: 'Bimestre', p_trimestre: 'Trimestre', p_semestre: 'Semestre', p_periodo: 'Periodo', p_unidade: 'Unidad',
      pShort_bimestre: 'B', pShort_trimestre: 'T', pShort_semestre: 'S', pShort_periodo: 'P', pShort_unidade: 'U',
      st_empty: 'Sin notas todavía. Necesitas un promedio de {need} para aprobar.',
      st_need: 'Necesitas <b>{need}</b> en cada {period} restante ({n}).',
      st_need1: 'Necesitas <b>{need}</b> en el {period} que falta.',
      st_secured: '¡Aprobación asegurada! Ya alcanzaste los puntos necesarios.',
      st_impossible: 'No alcanza ni con {max} en lo que falta. Habla con tu profesor sobre recuperación.',
      st_passed: 'Aprobado con promedio final {avg}.',
      st_failed: 'Reprobado: promedio final {avg} (mínimo {pass}).',
      tag_secured: 'Asegurada', tag_passed: 'Aprobado', tag_failed: 'Reprobado', tag_impossible: 'Crítico',
      tag_high: 'Riesgo alto', tag_mid: 'Atención', tag_low: 'Bien', tag_empty: 'Sin notas',
      avg: 'Promedio', points: 'Puntos',
      confirmDelete: '¿Eliminar la materia «{nome}» y todas sus notas?',
      confirmWipe: '¿Borrar TODAS las materias y notas? Esta acción no se puede deshacer (exporta un respaldo antes).',
      confirmImport: '¿Reemplazar los datos actuales por los del respaldo ({n} materias)?',
      confirmPeriods: 'Al reducir los periodos se borrarán las notas de los periodos eliminados. ¿Continuar?',
      saved: 'Guardado', deleted: 'Materia eliminada', imported: 'Respaldo importado', exported: 'Respaldo descargado',
      wiped: 'Datos borrados', invalidFile: 'El archivo no es un respaldo válido de App CEPK.',
      invalidGrade: 'Nota inválida: usa un número entre 0 y {max}.', nameRequired: 'Escribe el nombre de la materia.',
      invalidSettings: 'Revisa los valores: el promedio para aprobar debe ser mayor que 0 y menor o igual a la nota máxima.',
      saveError: 'No se pudo guardar. Inténtalo de nuevo.',
      db_idb: 'Tus datos se guardan en una <b>base de datos local (IndexedDB)</b> dentro del almacenamiento de este dispositivo. Funcionan sin internet y no se envían a ningún servidor.',
      db_persist_yes: 'Almacenamiento persistente: <b>activado</b> (el sistema no borrará los datos automáticamente).',
      db_persist_no: 'Almacenamiento persistente: no concedido todavía. Instala la app en la pantalla de inicio para protegerlo mejor, y exporta respaldos de vez en cuando.',
      db_usage: 'Espacio usado: {u}',
      db_desktop: 'Tus datos se guardan en el disco de esta computadora, en:',
      db_file: 'Archivo de base de datos:',
      db_backups: 'Se guardan copias automáticas en la subcarpeta <b>respaldos</b>.',
      folderChanged: 'Carpeta cambiada', folderSame: 'No se cambió la carpeta',
      noteIdb: 'Datos guardados en este dispositivo · funciona sin internet',
      noteDesktop: 'Datos guardados en: {dir}',
      iosHint: 'Para instalar: toca Compartir y luego «Agregar a pantalla de inicio».',
      preview: 'Vista previa'
    },
    pt: {
      subtitle: '{ano}{sep}{nome}',
      install: 'Instalar app',
      search: 'Buscar matéria…',
      sortName: 'Nome', sortRisk: 'Maior risco', sortAvg: 'Média',
      addSubject: 'Matéria',
      empty: 'Ainda não há matérias.<br>Toque em <b>+ Matéria</b> para adicionar a primeira.',
      noResults: 'Nenhuma matéria corresponde à busca.',
      sumAvg: 'Média geral', sumOk: 'Aprovadas / garantidas', sumRisk: 'Em risco', sumSubjects: 'Matérias',
      newSubject: 'Nova matéria', editSubject: 'Editar matéria',
      name: 'Nome da matéria', color: 'Cor', grades: 'Notas', notes: 'Observações',
      delete: 'Excluir', cancel: 'Cancelar', save: 'Salvar', confirm: 'Confirmar',
      settings: 'Configurações', student: 'Nome do aluno', year: 'Ano letivo',
      periods: 'Quantidade de períodos', periodName: 'Tipo de período',
      pass: 'Média para passar', max: 'Nota máxima', decimals: 'Casas decimais', lang: 'Idioma',
      weights: 'Peso de cada período', weightsHint: 'Deixe todos em 1 se todos os períodos valem o mesmo.',
      storage: 'Banco de dados', export: 'Exportar backup', import: 'Importar backup', wipe: 'Apagar todos os dados',
      changeFolder: 'Trocar pasta', openFolder: 'Abrir pasta',
      p_bimestre: 'Bimestre', p_trimestre: 'Trimestre', p_semestre: 'Semestre', p_periodo: 'Período', p_unidade: 'Unidade',
      pShort_bimestre: 'B', pShort_trimestre: 'T', pShort_semestre: 'S', pShort_periodo: 'P', pShort_unidade: 'U',
      st_empty: 'Sem notas ainda. Você precisa de média {need} para passar.',
      st_need: 'Você precisa de <b>{need}</b> em cada {period} restante ({n}).',
      st_need1: 'Você precisa de <b>{need}</b> no {period} que falta.',
      st_secured: 'Aprovação garantida! Você já atingiu os pontos necessários.',
      st_impossible: 'Não dá nem com {max} no que falta. Converse com o professor sobre recuperação.',
      st_passed: 'Aprovado com média final {avg}.',
      st_failed: 'Reprovado: média final {avg} (mínimo {pass}).',
      tag_secured: 'Garantida', tag_passed: 'Aprovado', tag_failed: 'Reprovado', tag_impossible: 'Crítico',
      tag_high: 'Risco alto', tag_mid: 'Atenção', tag_low: 'Tranquilo', tag_empty: 'Sem notas',
      avg: 'Média', points: 'Pontos',
      confirmDelete: 'Excluir a matéria «{nome}» e todas as suas notas?',
      confirmWipe: 'Apagar TODAS as matérias e notas? Não dá para desfazer (exporte um backup antes).',
      confirmImport: 'Substituir os dados atuais pelos do backup ({n} matérias)?',
      confirmPeriods: 'Ao reduzir os períodos, as notas dos períodos removidos serão apagadas. Continuar?',
      saved: 'Salvo', deleted: 'Matéria excluída', imported: 'Backup importado', exported: 'Backup baixado',
      wiped: 'Dados apagados', invalidFile: 'O arquivo não é um backup válido do App CEPK.',
      invalidGrade: 'Nota inválida: use um número entre 0 e {max}.', nameRequired: 'Escreva o nome da matéria.',
      invalidSettings: 'Revise os valores: a média para passar deve ser maior que 0 e no máximo a nota máxima.',
      saveError: 'Não foi possível salvar. Tente de novo.',
      db_idb: 'Seus dados ficam em um <b>banco de dados local (IndexedDB)</b> no armazenamento deste aparelho. Funciona sem internet e nada é enviado a servidores.',
      db_persist_yes: 'Armazenamento persistente: <b>ativado</b> (o sistema não apagará os dados automaticamente).',
      db_persist_no: 'Armazenamento persistente: ainda não concedido. Instale o app na tela inicial para protegê-lo melhor e exporte backups de vez em quando.',
      db_usage: 'Espaço usado: {u}',
      db_desktop: 'Seus dados ficam no disco deste computador, em:',
      db_file: 'Arquivo do banco de dados:',
      db_backups: 'Cópias automáticas ficam na subpasta <b>respaldos</b>.',
      folderChanged: 'Pasta alterada', folderSame: 'A pasta não foi alterada',
      noteIdb: 'Dados salvos neste aparelho · funciona sem internet',
      noteDesktop: 'Dados salvos em: {dir}',
      iosHint: 'Para instalar: toque em Compartilhar e depois em «Adicionar à Tela de Início».',
      preview: 'Prévia'
    }
  };

  const COLORS = ['#38bdf8', '#a78bfa', '#f472b6', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#f87171', '#94a3b8', '#818cf8'];
  const PERIOD_TYPES = ['bimestre', 'trimestre', 'semestre', 'unidade', 'periodo'];

  const DEFAULT_CONFIG = () => ({
    nome: '', ano: String(new Date().getFullYear()),
    periodos: 4, tipoPeriodo: 'bimestre', media: 6, max: 10, pesos: [1, 1, 1, 1], casas: 1,
    idioma: (navigator.language || 'es').toLowerCase().startsWith('pt') ? 'pt' : 'es'
  });

  /* ================= Estado ================= */
  let config = DEFAULT_CONFIG();
  let materias = [];
  let editing = null;      // materia en edición
  let deferredPrompt = null;

  const $ = (id) => document.getElementById(id);
  const t = (k, vars) => {
    let s = (I18N[config.idioma] || I18N.es)[k];
    if (s == null) s = I18N.es[k] || k;
    if (vars) for (const v in vars) s = s.split('{' + v + '}').join(vars[v]);
    return s;
  };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

  function fmt(n, casas) {
    if (n == null || isNaN(n)) return '–';
    const c = casas == null ? config.casas : casas;
    return new Intl.NumberFormat(config.idioma === 'pt' ? 'pt-BR' : 'es', { minimumFractionDigits: 0, maximumFractionDigits: c }).format(n);
  }
  function parseNum(v) {
    if (v == null) return null;
    const s = String(v).trim().replace(',', '.');
    if (s === '') return null;
    const n = Number(s);
    return isFinite(n) ? n : NaN;
  }
  function ceilTo(n, c) { const f = Math.pow(10, c); return Math.ceil(n * f - 1e-9) / f; }
  function roundTo(n, c) { const f = Math.pow(10, c); return Math.round(n * f) / f; }
  const periodLabel = () => t('p_' + config.tipoPeriodo);
  const periodShort = () => t('pShort_' + config.tipoPeriodo);

  /* ================= Cálculo ================= */
  function pesos() {
    const p = [];
    for (let i = 0; i < config.periodos; i++) {
      const w = Number(config.pesos[i]);
      p.push(isFinite(w) && w > 0 ? w : 1);
    }
    return p;
  }

  function calc(m) {
    const w = pesos();
    const W = w.reduce((a, b) => a + b, 0);
    let S = 0, Wk = 0, n = 0;
    for (let i = 0; i < config.periodos; i++) {
      const g = m.notas[i];
      if (g != null && g !== '' && !isNaN(g)) { S += w[i] * g; Wk += w[i]; n++; }
    }
    const Wr = W - Wk;
    const remaining = config.periodos - n;
    const r = {
      avg: Wk > 0 ? S / Wk : null,           // promedio de lo que ya tiene nota
      pointsPct: Math.min(1, S / (config.media * W)), // avance hacia la meta
      need: null, status: 'empty', risk: 0, remaining, final: null
    };
    if (n === 0) {
      r.need = config.media; r.status = 'empty'; r.risk = 1;
      return r;
    }
    if (Wr <= 1e-9) {
      r.final = S / W;
      r.status = r.final + 1e-9 >= config.media ? 'passed' : 'failed';
      r.risk = r.status === 'passed' ? 0 : 5;
      return r;
    }
    const need = (config.media * W - S) / Wr;
    r.need = need;
    if (need <= 1e-9) { r.status = 'secured'; r.risk = 0; }
    else if (need > config.max + 1e-9) { r.status = 'impossible'; r.risk = 4; }
    else if (need > config.max * 0.8) { r.status = 'high'; r.risk = 3; }
    else if (need > config.media) { r.status = 'mid'; r.risk = 2; }
    else { r.status = 'low'; r.risk = 1; }
    return r;
  }

  function statusText(r) {
    const c = config.casas;
    switch (r.status) {
      case 'empty': return t('st_empty', { need: fmt(config.media) });
      case 'passed': return t('st_passed', { avg: fmt(roundTo(r.final, c)) });
      case 'failed': return t('st_failed', { avg: fmt(roundTo(r.final, c)), pass: fmt(config.media) });
      case 'secured': return t('st_secured');
      case 'impossible': return t('st_impossible', { max: fmt(config.max) });
      default:
        if (r.remaining === 1) return t('st_need1', { need: fmt(ceilTo(r.need, c)), period: periodLabel().toLowerCase() });
        return t('st_need', { need: fmt(ceilTo(r.need, c)), period: periodLabel().toLowerCase(), n: r.remaining });
    }
  }
  const TAG = { empty: 'tag_empty', passed: 'tag_passed', failed: 'tag_failed', secured: 'tag_secured', impossible: 'tag_impossible', high: 'tag_high', mid: 'tag_mid', low: 'tag_low' };
  const TONE = { empty: 'muted', passed: 'good', failed: 'bad', secured: 'good', impossible: 'bad', high: 'warn', mid: 'info', low: 'good' };

  /* ================= Render ================= */
  function applyTexts() {
    document.documentElement.lang = config.idioma === 'pt' ? 'pt-BR' : 'es';
    $('search').placeholder = t('search');
    $('sort').innerHTML = ['risk', 'name', 'avg'].map(v => `<option value="${v}">${t('sort' + v[0].toUpperCase() + v.slice(1))}</option>`).join('');
    $('sort').value = localStorageGet('sort') || 'risk';
    $('fabLabel').textContent = t('addSubject');
    $('btnInstall').textContent = t('install');
    $('btnSettings').setAttribute('aria-label', t('settings'));
    // materia
    $('lblName').textContent = t('name'); $('lblColor').textContent = t('color');
    $('lblGrades').textContent = t('grades'); $('lblNotes').textContent = t('notes');
    $('btnDelete').textContent = t('delete'); $('btnCancelSubj').textContent = t('cancel'); $('btnSaveSubj').textContent = t('save');
    // ajustes
    $('setTitle').textContent = t('settings');
    $('lblStudent').textContent = t('student'); $('lblYear').textContent = t('year');
    $('lblPeriods').textContent = t('periods'); $('lblPeriodName').textContent = t('periodName');
    $('lblPass').textContent = t('pass'); $('lblMax').textContent = t('max');
    $('lblDecimals').textContent = t('decimals'); $('lblLang').textContent = t('lang');
    $('lblWeights').textContent = t('weights'); $('hintWeights').textContent = t('weightsHint');
    $('lblStorage').textContent = t('storage');
    $('btnExport').textContent = t('export'); $('btnImport').textContent = t('import'); $('btnWipe').textContent = t('wipe');
    $('btnChangeFolder').textContent = t('changeFolder'); $('btnOpenFolder').textContent = t('openFolder');
    $('btnCancelSet').textContent = t('cancel'); $('btnSaveSet').textContent = t('save');
    $('confirmNo').textContent = t('cancel'); $('confirmYes').textContent = t('confirm');
    $('setPeriods').innerHTML = [1, 2, 3, 4, 5, 6].map(n => `<option value="${n}">${n}</option>`).join('');
  }

  function render() {
    const sep = config.ano && config.nome ? ' · ' : '';
    $('subtitle').textContent = t('subtitle', { ano: config.ano || '', nome: config.nome || '', sep });

    const results = materias.map(m => ({ m, r: calc(m) }));

    // Resumen
    const avgs = results.map(x => x.r.final != null ? x.r.final : x.r.avg).filter(v => v != null);
    const general = avgs.length ? avgs.reduce((a, b) => a + b, 0) / avgs.length : null;
    const ok = results.filter(x => x.r.status === 'secured' || x.r.status === 'passed').length;
    const risk = results.filter(x => ['high', 'impossible', 'failed'].includes(x.r.status)).length;
    const genTone = general == null ? '' : (general >= config.media ? 'good' : 'bad');
    $('summary').innerHTML = `
      <div class="stat ${genTone}"><small>${t('sumAvg')}</small><strong>${general == null ? '–' : fmt(roundTo(general, config.casas))}</strong><em>/ ${fmt(config.max)}</em></div>
      <div class="stat good"><small>${t('sumOk')}</small><strong>${ok}</strong></div>
      <div class="stat ${risk ? 'bad' : ''}"><small>${t('sumRisk')}</small><strong>${risk}</strong></div>
      <div class="stat"><small>${t('sumSubjects')}</small><strong>${materias.length}</strong></div>`;

    // Lista
    const q = $('search').value.trim().toLowerCase();
    let list = results.filter(x => !q || x.m.nome.toLowerCase().includes(q));
    const sort = $('sort').value;
    const coll = new Intl.Collator(config.idioma, { sensitivity: 'base' });
    list.sort((a, b) => {
      if (sort === 'name') return coll.compare(a.m.nome, b.m.nome);
      if (sort === 'avg') {
        const av = a.r.final ?? a.r.avg ?? -1, bv = b.r.final ?? b.r.avg ?? -1;
        return bv - av;
      }
      return (b.r.risk - a.r.risk) || ((b.r.need ?? 0) - (a.r.need ?? 0)) || coll.compare(a.m.nome, b.m.nome);
    });

    const ps = periodShort();
    $('list').innerHTML = list.map(({ m, r }) => {
      const chips = [];
      for (let i = 0; i < config.periodos; i++) {
        const g = m.notas[i];
        const has = g != null && !isNaN(g);
        const cls = has ? (g >= config.media ? 'ok' : 'low') : 'none';
        chips.push(`<span class="g ${cls}"><i>${ps}${i + 1}</i>${has ? fmt(g, 2) : '—'}</span>`);
      }
      const shown = r.final != null ? r.final : r.avg;
      const pct = Math.max(0, Math.min(100, (r.pointsPct || 0) * 100));
      return `
        <article class="card" data-id="${esc(m.id)}" tabindex="0" style="--c:${esc(m.cor)}">
          <div class="card-top">
            <h3>${esc(m.nome)}</h3>
            <span class="tag ${TONE[r.status]}">${t(TAG[r.status])}</span>
          </div>
          <div class="chips">${chips.join('')}</div>
          <p class="status">${statusText(r)}</p>
          <div class="bar" title="${t('points')}"><span style="width:${pct}%"></span></div>
          <div class="meta"><span>${t('avg')}: <b>${shown == null ? '–' : fmt(roundTo(shown, config.casas))}</b></span>${m.obs ? `<span class="obs">${esc(m.obs)}</span>` : ''}</div>
        </article>`;
    }).join('');

    const empty = $('empty');
    if (!materias.length) { empty.innerHTML = t('empty'); empty.classList.remove('hidden'); }
    else if (!list.length) { empty.innerHTML = t('noResults'); empty.classList.remove('hidden'); }
    else empty.classList.add('hidden');
  }

  /* ================= Materia: editor ================= */
  function openSubject(m) {
    editing = m ? JSON.parse(JSON.stringify(m)) : { id: uid(), nome: '', cor: COLORS[materias.length % COLORS.length], notas: [], obs: '', criadoEm: Date.now() };
    $('subjTitle').textContent = m ? t('editSubject') : t('newSubject');
    $('subjName').value = editing.nome;
    $('subjObs').value = editing.obs || '';
    $('btnDelete').style.display = m ? '' : 'none';
    $('colorRow').innerHTML = COLORS.map(c => `<button type="button" class="sw${c === editing.cor ? ' on' : ''}" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join('');
    const ps = periodLabel();
    let html = '';
    for (let i = 0; i < config.periodos; i++) {
      const g = editing.notas[i];
      html += `<label class="gi"><small>${esc(ps)} ${i + 1}</small><input inputmode="decimal" data-i="${i}" value="${g == null ? '' : String(g).replace('.', ',')}" placeholder="—" autocomplete="off"></label>`;
    }
    $('gradeInputs').innerHTML = html;
    updatePreview();
    showDialog($('dlgSubject'));
    if (!m) $('subjName').focus();
  }

  function readGrades(strict) {
    const notas = [];
    let bad = false;
    $('gradeInputs').querySelectorAll('input').forEach(inp => {
      const v = parseNum(inp.value);
      const invalid = v != null && (isNaN(v) || v < 0 || v > config.max);
      inp.classList.toggle('err', invalid);
      if (invalid) bad = true;
      notas[Number(inp.dataset.i)] = (v == null || invalid) ? null : v;
    });
    if (strict && bad) return null;
    return notas;
  }

  function updatePreview() {
    const notas = readGrades(false);
    const r = calc({ notas });
    $('subjPreview').innerHTML = `<small>${t('preview')}</small><p>${statusText(r)}</p>`;
    $('subjPreview').className = 'preview ' + TONE[r.status];
  }

  async function saveSubject(e) {
    e.preventDefault();
    const nome = $('subjName').value.trim();
    if (!nome) { toast(t('nameRequired')); $('subjName').focus(); return; }
    const notas = readGrades(true);
    if (!notas) { toast(t('invalidGrade', { max: fmt(config.max) })); return; }
    editing.nome = nome;
    editing.obs = $('subjObs').value.trim();
    editing.notas = notas;
    editing.atualizadoEm = Date.now();
    try {
      await DB.saveMateria(editing);
      const i = materias.findIndex(x => x.id === editing.id);
      if (i >= 0) materias[i] = editing; else materias.push(editing);
      closeDialog($('dlgSubject'));
      render(); toast(t('saved'));
    } catch (err) { console.error(err); toast(t('saveError')); }
  }

  async function deleteSubject() {
    if (!editing) return;
    const ok = await confirmBox(t('confirmDelete', { nome: esc(editing.nome) }));
    if (!ok) return;
    try {
      await DB.deleteMateria(editing.id);
      materias = materias.filter(x => x.id !== editing.id);
      closeDialog($('dlgSubject'));
      render(); toast(t('deleted'));
    } catch (err) { console.error(err); toast(t('saveError')); }
  }

  /* ================= Ajustes ================= */
  function renderWeights(n, current) {
    let html = '';
    for (let i = 0; i < n; i++) {
      html += `<label class="gi"><small>${periodShort()}${i + 1}</small><input inputmode="decimal" data-i="${i}" value="${current[i] != null ? current[i] : 1}"></label>`;
    }
    $('weightInputs').innerHTML = html;
  }

  async function openSettings() {
    $('setStudent').value = config.nome || '';
    $('setYear').value = config.ano || '';
    $('setPeriods').value = String(config.periodos);
    $('setPeriodName').innerHTML = PERIOD_TYPES.map(p => `<option value="${p}">${t('p_' + p)}</option>`).join('');
    $('setPeriodName').value = config.tipoPeriodo;
    $('setPass').value = fmt(config.media, 2);
    $('setMax').value = fmt(config.max, 2);
    $('setDecimals').value = String(config.casas);
    $('setLang').value = config.idioma;
    renderWeights(config.periodos, config.pesos);
    await renderStorageInfo();
    showDialog($('dlgSettings'));
  }

  async function renderStorageInfo() {
    const info = await DB.info().catch(() => ({ kind: DB.kind }));
    const box = $('storageInfo');
    if (info.kind === 'desktop') {
      $('desktopBtns').hidden = false;
      box.innerHTML = `<p>${t('db_desktop')}</p><code>${esc(info.dataDir)}</code><p>${t('db_file')}</p><code>${esc(info.dbFile)}</code><p class="hint">${t('db_backups')}</p>`;
    } else {
      $('desktopBtns').hidden = true;
      let html = `<p>${t('db_idb')}</p><p>${info.persisted ? t('db_persist_yes') : t('db_persist_no')}</p>`;
      if (info.usage != null) html += `<p class="hint">${t('db_usage', { u: humanBytes(info.usage) })}</p>`;
      box.innerHTML = html;
    }
  }

  function humanBytes(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  }

  async function saveSettings(e) {
    e.preventDefault();
    const periodos = Number($('setPeriods').value);
    const media = parseNum($('setPass').value);
    const max = parseNum($('setMax').value);
    if (!(media > 0) || !(max > 0) || media > max) { toast(t('invalidSettings')); return; }
    const pesosArr = [];
    $('weightInputs').querySelectorAll('input').forEach(inp => {
      const v = parseNum(inp.value); pesosArr[Number(inp.dataset.i)] = (v > 0 ? v : 1);
    });
    // Si se reducen periodos y hay notas en los eliminados, confirmar
    if (periodos < config.periodos) {
      const lose = materias.some(m => m.notas.slice(periodos).some(g => g != null));
      if (lose && !(await confirmBox(t('confirmPeriods')))) return;
    }
    const nuevo = {
      nome: $('setStudent').value.trim(), ano: $('setYear').value.trim(),
      periodos, tipoPeriodo: $('setPeriodName').value, media, max,
      pesos: pesosArr.slice(0, periodos), casas: Number($('setDecimals').value), idioma: $('setLang').value
    };
    try {
      // Ajustar notas existentes al nuevo número de periodos y nota máxima
      const changed = [];
      materias.forEach(m => {
        const before = JSON.stringify(m.notas);
        m.notas = m.notas.slice(0, periodos).map(g => (g != null && g > max) ? max : g);
        if (JSON.stringify(m.notas) !== before) changed.push(m);
      });
      for (const m of changed) await DB.saveMateria(m);
      await DB.saveConfig(nuevo);
      const langChanged = nuevo.idioma !== config.idioma;
      config = nuevo;
      if (langChanged) applyTexts();
      closeDialog($('dlgSettings'));
      render(); updateNote(); toast(t('saved'));
    } catch (err) { console.error(err); toast(t('saveError')); }
  }

  function exportBackup() {
    const data = { app: 'App CEPK', version: 1, exportadoEm: new Date().toISOString(), config, materias };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    const d = new Date();
    const stamp = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    a.href = URL.createObjectURL(blob);
    a.download = `appcepk-respaldo-${stamp}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(t('exported'));
  }

  async function importBackup(file) {
    try {
      const data = JSON.parse(await file.text());
      if (!data || !Array.isArray(data.materias)) throw new Error('bad');
      const ms = data.materias.filter(m => m && typeof m.nome === 'string').map(m => ({
        id: m.id || uid(), nome: m.nome, cor: m.cor || COLORS[0], obs: m.obs || '',
        notas: Array.isArray(m.notas) ? m.notas.map(g => (g == null || isNaN(Number(g))) ? null : Number(g)) : [],
        criadoEm: m.criadoEm || Date.now(), atualizadoEm: Date.now()
      }));
      if (!(await confirmBox(t('confirmImport', { n: ms.length })))) return;
      const cfg = Object.assign(DEFAULT_CONFIG(), config, data.config || {});
      await DB.replaceAll({ config: cfg, materias: ms });
      config = cfg; materias = ms;
      applyTexts(); closeDialog($('dlgSettings')); render(); updateNote();
      toast(t('imported'));
    } catch (err) { console.error(err); toast(t('invalidFile')); }
  }

  async function wipeAll() {
    if (!(await confirmBox(t('confirmWipe')))) return;
    try {
      await DB.replaceAll({ config, materias: [] });
      materias = [];
      closeDialog($('dlgSettings')); render(); toast(t('wiped'));
    } catch (err) { console.error(err); toast(t('saveError')); }
  }

  /* ================= Utilidades UI ================= */
  function showDialog(d) { if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', ''); }
  function closeDialog(d) { if (typeof d.close === 'function') d.close(); else d.removeAttribute('open'); }

  function confirmBox(msg) {
    return new Promise(resolve => {
      const d = $('dlgConfirm');
      $('confirmMsg').innerHTML = msg;
      d.returnValue = '';
      const onClose = () => { d.removeEventListener('close', onClose); resolve(d.returnValue === 'ok'); };
      d.addEventListener('close', onClose);
      showDialog(d);
    });
  }

  let toastTimer;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function localStorageGet(k) { try { return localStorage.getItem('appcepk.' + k); } catch (e) { return null; } }
  function localStorageSet(k, v) { try { localStorage.setItem('appcepk.' + k, v); } catch (e) {} }

  async function updateNote() {
    if (DB.kind === 'desktop') {
      const info = await DB.info().catch(() => ({}));
      $('storageNote').textContent = t('noteDesktop', { dir: info.dataDir || '' });
    } else {
      $('storageNote').textContent = t('noteIdb');
    }
  }

  /* ================= Eventos ================= */
  function bind() {
    $('fab').addEventListener('click', () => openSubject(null));
    $('btnSettings').addEventListener('click', openSettings);
    $('list').addEventListener('click', e => {
      const card = e.target.closest('.card'); if (!card) return;
      const m = materias.find(x => x.id === card.dataset.id); if (m) openSubject(m);
    });
    $('list').addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const card = e.target.closest('.card'); if (!card) return;
      const m = materias.find(x => x.id === card.dataset.id); if (m) openSubject(m);
    });
    $('search').addEventListener('input', render);
    $('sort').addEventListener('change', () => { localStorageSet('sort', $('sort').value); render(); });

    $('formSubject').addEventListener('submit', saveSubject);
    $('gradeInputs').addEventListener('input', updatePreview);
    $('colorRow').addEventListener('click', e => {
      const b = e.target.closest('.sw'); if (!b) return;
      editing.cor = b.dataset.c;
      $('colorRow').querySelectorAll('.sw').forEach(x => x.classList.toggle('on', x === b));
    });
    $('btnDelete').addEventListener('click', deleteSubject);

    $('formSettings').addEventListener('submit', saveSettings);
    $('setPeriods').addEventListener('change', () => {
      const cur = []; $('weightInputs').querySelectorAll('input').forEach(i => cur[Number(i.dataset.i)] = i.value);
      renderWeights(Number($('setPeriods').value), cur);
    });
    $('btnExport').addEventListener('click', exportBackup);
    $('btnImport').addEventListener('click', () => $('fileImport').click());
    $('fileImport').addEventListener('change', e => { const f = e.target.files[0]; if (f) importBackup(f); e.target.value = ''; });
    $('btnWipe').addEventListener('click', wipeAll);
    $('btnChangeFolder').addEventListener('click', async () => {
      const r = await DB.chooseFolder().catch(() => null);
      if (r && r.changed) { toast(t('folderChanged')); setTimeout(() => location.reload(), 700); }
      else toast(t('folderSame'));
    });
    $('btnOpenFolder').addEventListener('click', () => DB.openFolder());

    document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeDialog(b.closest('dialog'))));
    // Cerrar tocando fuera de la hoja
    document.querySelectorAll('dialog.sheet').forEach(d => d.addEventListener('click', e => { if (e.target === d) closeDialog(d); }));

    // Instalación (PWA)
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault(); deferredPrompt = e;
      if (DB.kind !== 'desktop') $('btnInstall').classList.remove('hidden');
    });
    $('btnInstall').addEventListener('click', async () => {
      if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice.catch(() => {}); deferredPrompt = null; $('btnInstall').classList.add('hidden'); }
      else toast(t('iosHint'));
    });
    window.addEventListener('appinstalled', () => $('btnInstall').classList.add('hidden'));
  }

  function maybeShowIosHint() {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.navigator.standalone || matchMedia('(display-mode: standalone)').matches;
    if (ios && !standalone && DB.kind !== 'desktop') $('btnInstall').classList.remove('hidden');
  }

  /* ================= Inicio ================= */
  async function start() {
    try {
      const data = await DB.init();
      config = Object.assign(DEFAULT_CONFIG(), data.config || {});
      if (!Array.isArray(config.pesos)) config.pesos = [];
      materias = (data.materias || []).map(m => Object.assign({ notas: [], obs: '', cor: COLORS[0] }, m));
      if (!data.config) await DB.saveConfig(config);
    } catch (err) {
      console.error(err);
      toast('Error: ' + (err && err.message ? err.message : err));
    }
    applyTexts();
    bind();
    render();
    updateNote();
    maybeShowIosHint();

    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW', err));
    }
  }

  // Exponer el cálculo para pruebas
  window.__appcepk = { calc: (m, cfg) => { const old = config; if (cfg) config = Object.assign(DEFAULT_CONFIG(), cfg); const r = calc(m); config = old; return r; } };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
