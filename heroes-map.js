/* HEROES OF REDFOX — интерактивная карта кампании */
(() => {
  'use strict';
  // Скрипт подключается из поля «Название игры», но работает только в игровом Safari.
  const PATH = window.location && window.location.pathname ? window.location.pathname : '';
  if (!/^\/play\/safari\/?$/i.test(PATH)) return;

  const SCRIPT = document.currentScript;
  const ROOT_ID = 'heroes-of-redfox';
  const MAP_IMAGE = 'https://kemerovo.redfoxkrsk.ru/static/up/images/mappp.png84';
  const MAP_WIDTH = 1280, MAP_HEIGHT = 850;
  const LOCATIONS = [
    {id:'hero',name:'Герой',subtitle:'Личный лагерь',x:640,y:420,w:100,h:60,url:'/play/safari/9049',icon:'♟'},
    {id:'castle',name:'Замок',subtitle:'Центр владений',x:530,y:222,w:195,h:148,url:'/play/safari/9050',icon:'♜'},
    {id:'dungeon',name:'Подземелье',subtitle:'Тёмные глубины',x:1100,y:340,w:140,h:130,url:'/play/safari/9051',icon:'♆'},
    {id:'shipyard',name:'Верфь',subtitle:'Путь по воде',x:950,y:550,w:220,h:150,url:'/play/safari/9052',icon:'⚓'},
    {id:'gold-mine',name:'Золотая шахта',subtitle:'Источник богатства',x:140,y:100,w:190,h:115,url:'/play/safari/9053',icon:'✧'},
    {id:'crypt',name:'Склеп',subtitle:'Забытые тайны',x:1020,y:180,w:120,h:90,url:'/play/safari/9054',icon:'☠'},
    {id:'sawmill',name:'Лесопилка',subtitle:'Добыча древесины',x:700,y:70,w:180,h:90,url:'/play/safari/9055',icon:'⚒'},
    {id:'enemy',name:'Противник',subtitle:'Вражеская территория',x:60,y:730,w:90,h:90,url:'/play/safari/9056',icon:'⚔'},
    {id:'scouting',name:'Разведка',subtitle:'Исследовать окрестности',x:16,y:545,w:44,h:125,url:'/play/safari/9057',icon:'⌖'}
  ];
  function mount() {
    if (document.getElementById(ROOT_ID)) return;
    // Не вставляем карту рядом с тегом подключения в поле названия игры.
    // Сам тег <script> остаётся невидимым; интерфейс монтируется в тело страницы Safari.
    const host = document.body;
    if (!host) return;
    const root = document.createElement('section');
    root.id = ROOT_ID;
    root.className = 'hrof-shell';
    root.innerHTML =
      '<div class="hrof-heading"><div class="hrof-kicker">ХРОНИКИ ПОГРАНИЧЬЯ</div>' +
      '<h2 class="hrof-title">ЗЕМЛИ REDFOX</h2><div class="hrof-subtitle">Выберите место, чтобы продолжить путь</div></div>' +
      '<div class="hrof-frame"><div class="hrof-frame-top"><span></span><b>КАРТА КАМПАНИИ</b><span></span></div>' +
      '<div class="hrof-map" role="group" aria-label="Интерактивная карта кампании">' +
      '<img class="hrof-map-image" src="' + MAP_IMAGE + '" alt="Карта земель RedFox" draggable="false">' +
      '<div class="hrof-hotspots"></div><div class="hrof-map-compass" aria-hidden="true"><span>N</span><i>✥</i></div></div>' +
      '<div class="hrof-frame-bottom"><span>✧</span><span>ЗЕМЛИ, ОЖИДАЮЩИЕ ГЕРОЕВ</span><span>✧</span></div></div>' +
      '<div class="hrof-statusbar"><div class="hrof-status-item"><span class="hrof-status-icon">♜</span><span><small>КАМПАНИЯ</small><b>Путь героя</b></span></div>' +
      '<div class="hrof-status-divider"></div><div class="hrof-status-item"><span class="hrof-status-icon">⚔</span><span><small>ДОСТУПНО</small><b>9 земель</b></span></div>' +
      '<div class="hrof-status-divider"></div><div class="hrof-status-hint">Наведите курсор на область карты</div></div><div class="hrof-tooltip" role="status"></div>';
    host.insertBefore(root, host.firstChild);
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = SCRIPT && SCRIPT.src ? SCRIPT.src.replace(/heroes-map\.js(?:\?.*)?$/, 'heroes-map.css') : 'https://cdn.jsdelivr.net/gh/RedLine142/heroes-of-redfox@main/heroes-map.css';
    document.head.appendChild(style);
    const layer = root.querySelector('.hrof-hotspots');
    const tooltip = root.querySelector('.hrof-tooltip');
    const hint = root.querySelector('.hrof-status-hint');
    LOCATIONS.forEach(function(place) {
      const a = document.createElement('a');
      a.className = 'hrof-hotspot';
      a.href = place.url;
      a.setAttribute('aria-label', place.name + ' — ' + place.subtitle);
      a.style.left = (place.x / MAP_WIDTH * 100) + '%';
      a.style.top = (place.y / MAP_HEIGHT * 100) + '%';
      a.style.width = (place.w / MAP_WIDTH * 100) + '%';
      a.style.height = (place.h / MAP_HEIGHT * 100) + '%';
      a.innerHTML = '<span class="hrof-hotspot-mark">' + place.icon + '</span><span class="hrof-hotspot-label">' + place.name + '</span>';
      function show() {
        tooltip.innerHTML = '<b>' + place.name + '</b><span>' + place.subtitle + '</span>';
        tooltip.classList.add('is-visible');
        hint.textContent = place.subtitle;
      }
      function hide() {
        tooltip.classList.remove('is-visible');
        hint.textContent = 'Наведите курсор на область карты';
      }
      a.addEventListener('mouseenter', show);
      a.addEventListener('mouseleave', hide);
      a.addEventListener('focus', show);
      a.addEventListener('blur', hide);
      layer.appendChild(a);
    });
    root.querySelector('.hrof-map-image').addEventListener('error', function() {
      root.querySelector('.hrof-map').classList.add('hrof-image-error');
    });
    root.querySelector('.hrof-map').addEventListener('touchstart', function() {
      tooltip.classList.remove('is-visible');
    }, {passive:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();