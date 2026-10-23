/* Bells and whistles. Each block checks for its own element and bails out
   quietly, so this one file serves every page. Reduced motion turns off
   everything that moves on its own; the page stays complete without JS. */
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wide = window.matchMedia('(min-width: 64rem)');

  /* ---------- Scroll loop: read-progress line, hero push, range pin ---------- */
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.home-hero');
  const range = document.querySelector('.range');
  const track = range?.querySelector('.range-track');
  let rangeMax = 0;

  function sizeRange() {
    if (!range || reduce || !wide.matches) {
      root.classList.remove('js-range');
      range?.style.removeProperty('--range-h');
      return;
    }
    root.classList.add('js-range');
    const headerH = header ? header.offsetHeight : 0;
    root.style.setProperty('--header-h', `${headerH}px`);
    rangeMax = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    range.style.setProperty('--range-h', `${window.innerHeight - headerH + rangeMax}px`);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.style.setProperty('--read', max > 0 ? (y / max).toFixed(4) : 0);
      if (hero && !reduce) {
        const p = Math.min(1, Math.max(0, y / hero.offsetHeight));
        hero.style.setProperty('--push', (1 + p * 0.14).toFixed(4));
        hero.style.setProperty('--lift', (p * 120).toFixed(1));
        hero.style.setProperty('--fade', (1 - p * 1.3).toFixed(3));
      }
      if (range && root.classList.contains('js-range')) {
        const start = range.offsetTop - (header ? header.offsetHeight : 0);
        const p = Math.min(1, Math.max(0, (y - start) / rangeMax));
        range.style.setProperty('--range-x', (p * rangeMax).toFixed(1));
      }
    });
  }
  sizeRange();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { sizeRange(); onScroll(); });
  wide.addEventListener('change', () => { sizeRange(); onScroll(); });
  onScroll();

  /* ---------- Plate tilt and sheen ---------- */
  if (finePointer && !reduce) {
    document.addEventListener('pointermove', e => {
      const plate = e.target.closest?.('.plate');
      if (!plate) return;
      const r = plate.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      plate.style.setProperty('--ry', `${((x - 0.5) * 7).toFixed(2)}deg`);
      plate.style.setProperty('--rx', `${((0.5 - y) * 5).toFixed(2)}deg`);
      plate.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      plate.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      plate.style.setProperty('--sx', `${(100 - x * 100).toFixed(1)}%`);
    }, { passive: true });
    document.addEventListener('pointerout', e => {
      const plate = e.target.closest?.('.plate');
      if (plate && !plate.contains(e.relatedTarget)) {
        ['--rx', '--ry'].forEach(k => plate.style.setProperty(k, '0deg'));
      }
    });
  }

  /* ---------- Capacity ruler (figures from sources E-04 to E-16) ---------- */
  const svg = document.querySelector('.ruler-svg');
  if (svg) {
    const NS = 'http://www.w3.org/2000/svg';
    const X = kg => 130 + (kg / 1000) * 830;
    const fams = [
      ['ATISmirus', [['80', 115], ['100', 180], ['200', 260], ['300', 440], ['500', 600], ['800', 1000]]],
      ['ATISacer', [['55', 55], ['80', 95], ['150', 150]]],
      ['ATISferax', [['', 80]]],
      ['ATISlinear', [['', 800]]],
    ];
    const el = (tag, attrs, text) => {
      const n = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
      if (text != null) n.textContent = text;
      svg.appendChild(n);
      return n;
    };
    const axisY = 272;
    for (let kg = 0; kg <= 1000; kg += 100) {
      el('line', { class: 'tick', x1: X(kg), x2: X(kg), y1: 28, y2: axisY });
      el('text', { class: 'tick-label', x: X(kg), y: axisY + 20, 'text-anchor': 'middle' }, kg === 1000 ? '1,000 kg' : `${kg}`);
    }
    el('line', { class: 'axis', x1: X(0), x2: X(1000), y1: axisY, y2: axisY });
    fams.forEach(([name, models], i) => {
      const y = 58 + i * 60;
      el('text', { class: 'fam-label', x: 12, y: y + 5 }, name);
      const hi = Math.max(...models.map(m => m[1]));
      const x1 = X(0), x2 = X(hi);
      const span = el('line', { class: 'span', x1, x2, y1: y, y2: y });
      span.style.setProperty('--len', `${x2 - x1}`);
      models.forEach(([model, kg], j) => {
        const dot = el('circle', { class: 'dot', cx: X(kg), cy: y, r: 5 });
        const up = name === 'ATISacer' ? j % 2 === 0 : true;
        const label = model ? `${model}: ${kg.toLocaleString('en-GB')} kg` : `${kg.toLocaleString('en-GB')} kg`;
        const t = el('text', { class: 'dot-label', x: X(kg), y: up ? y - 12 : y + 22, 'text-anchor': kg >= 950 ? 'end' : 'middle' }, label);
        const d = `${(0.35 + (kg / 1000) * 0.8).toFixed(2)}s`;
        dot.style.setProperty('--d', d); t.style.setProperty('--d', d);
      });
    });
    const fig = svg.closest('.ruler');
    if (!reduce && 'IntersectionObserver' in window) {
      root.classList.add('js');
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { fig.classList.add('is-drawn'); io.disconnect(); }
      }), { threshold: 0.35 });
      io.observe(fig);
    } else {
      fig.classList.add('is-drawn');
    }
  }

  /* ---------- Load picker (tabs, keyboard per WAI-ARIA) ---------- */
  const tablist = document.querySelector('.load-tabs');
  if (tablist) {
    root.classList.add('js-loads');
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const select = (i, focus) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
        if (on) {
          panels[j].classList.remove('is-entering');
          void panels[j].offsetWidth;
          panels[j].classList.add('is-entering');
          panels[j].querySelector('.plate')?.classList.add('is-drawn');
        }
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      select(i);
      if (!wide.matches) panels[i].scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }));
    tablist.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      select((n + tabs.length) % tabs.length, true);
    });
    select(0);
    panels[0].classList.remove('is-entering');
  }

  /* ---------- Hero shader: grain, slow light sweep, vignette ---------- */
  const canvas = document.querySelector('.hero-fx');
  if (canvas && !reduce) {
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){vec2 uv=gl_FragCoord.xy/r;
        float g=h(uv*r+fract(t*7.))*.06;
        float s=smoothstep(.0,.35,1.-abs(uv.x+uv.y*.35-mod(t*.06,1.8)+.4)*2.2)*.10;
        float c=smoothstep(.55,0.,distance(uv,m))*.10;
        vec3 col=vec3(.25,.42,1.)*(s+c)+vec3(g);
        gl_FragColor=vec4(col,(s+c+g));}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r'), uT = gl.getUniformLocation(prog, 't'), uM = gl.getUniformLocation(prog, 'm');
    let mouse = [0.7, 0.5], target = [0.7, 0.5], visible = true, raf = 0, ready = false;
    const size = () => {
      const k = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5; // half-res is plenty for grain and light
      canvas.width = Math.max(1, canvas.clientWidth * k);
      canvas.height = Math.max(1, canvas.clientHeight * k);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    size();
    window.addEventListener('resize', size);
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      target = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
    }, { passive: true });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (ready && visible && !raf) loop(performance.now()); }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (ready && !document.hidden && visible && !raf) loop(performance.now()); });
    const start = performance.now();
    function loop(now) {
      if (!visible || document.hidden) { raf = 0; return; }
      mouse = [mouse[0] + (target[0] - mouse[0]) * 0.05, mouse[1] + (target[1] - mouse[1]) * 0.05];
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    }
    // start after first paint so the shader never delays the hero
    const go = () => setTimeout(() => { ready = true; if (!raf) loop(performance.now()); }, 400);
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  }
})();
