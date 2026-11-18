/* Cozinha Caos — áudio procedural: efeitos + sons de cada forma de preparo (WebAudio, sem arquivos) */
(function (CC) {
  'use strict';
  const S = CC.Sound = {};
  let ctx = null, master = null, noiseBuf = null;
  const lastAt = {};
  CC.sound = true;

  function ac() {
    if (!CC.sound) return null;
    try {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 6;
        master = ctx.createGain(); master.gain.value = 0.9; master.connect(comp); comp.connect(ctx.destination);
        noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }
  /* tom simples */
  function tone(f, d, type, v, slide, delay) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t + d);
    g.gain.setValueAtTime(v || 0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + d + 0.02);
  }
  /* ruído filtrado: tipo do filtro, frequência, Q, duração, volume, deslize de frequência */
  function noise(ftype, f, q, d, v, slide, delay) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + (delay || 0), s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noiseBuf; s.loop = true; s.playbackRate.value = 0.8 + Math.random() * 0.4;
    fl.type = ftype; fl.frequency.setValueAtTime(f, t); fl.Q.value = q || 1;
    if (slide) fl.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v || 0.05, t + Math.min(0.02, d / 3)); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(fl); fl.connect(g); g.connect(master); s.start(t, Math.random() * 0.5); s.stop(t + d + 0.02);
  }
  S.tone = tone; S.noise = noise;

  /* ---------- efeitos pontuais ---------- */
  S.sfx = function (n) {
    const now = performance.now();
    if (lastAt[n] && now - lastAt[n] < 45) return; lastAt[n] = now;
    switch (n) {
      case 'pick': tone(520, 0.06, 'triangle', 0.05); noise('bandpass', 1800, 2, 0.04, 0.02); break;
      case 'put': tone(330, 0.07, 'triangle', 0.05); noise('lowpass', 700, 1, 0.05, 0.03); break;
      case 'chopdone': tone(900, 0.08, 'square', 0.035); tone(1300, 0.08, 'square', 0.03, 0, 0.06); break;
      case 'trash': noise('lowpass', 900, 1, 0.25, 0.06, 200); tone(200, 0.12, 'sawtooth', 0.03, 80); break;
      case 'start': tone(260, 0.12, 'sine', 0.04); noise('highpass', 3000, 1, 0.12, 0.03); break;
      case 'done': tone(660, 0.12, 'sine', 0.06); tone(880, 0.16, 'sine', 0.06, 0, 0.11); tone(1320, 0.2, 'sine', 0.04, 0, 0.24); break;
      case 'warn': tone(440, 0.1, 'square', 0.04); tone(440, 0.1, 'square', 0.04, 0, 0.16); break;
      case 'burn': noise('bandpass', 700, 0.6, 0.6, 0.08, 150); tone(150, 0.4, 'sawtooth', 0.05, 60); break;
      case 'ding': tone(784, 0.12, 'sine', 0.07); tone(1175, 0.3, 'sine', 0.07, 0, 0.1); noise('highpass', 7000, 1, 0.1, 0.02, 0, 0.1); break;
      case 'wrong': tone(160, 0.25, 'square', 0.05); tone(120, 0.25, 'square', 0.05, 0, 0.12); break;
      case 'order': tone(600, 0.06, 'sine', 0.04); tone(760, 0.08, 'sine', 0.035, 0, 0.07); break;
      case 'fail': tone(220, 0.3, 'sawtooth', 0.05, 110); break;
      case 'dash': noise('bandpass', 1200, 1.2, 0.18, 0.05, 3500); break;
      case 'win': [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.22, 'triangle', 0.07, 0, i * 0.12); }); break;
      case 'lose': [400, 330, 260].forEach(function (f, i) { tone(f, 0.25, 'triangle', 0.06, 0, i * 0.15); }); break;
      case 'truck': tone(110, 0.5, 'sawtooth', 0.045, 80); tone(220, 0.3, 'square', 0.03, 0, 0.35); tone(220, 0.3, 'square', 0.03, 0, 0.65); noise('lowpass', 500, 1, 0.9, 0.05); break;
      case 'box': tone(140, 0.08, 'sine', 0.07); noise('lowpass', 600, 1, 0.1, 0.05); break;
      case 'coin': tone(988, 0.06, 'square', 0.04); tone(1319, 0.18, 'square', 0.04, 0, 0.06); break;
      case 'buy': tone(523, 0.08, 'triangle', 0.06); tone(784, 0.1, 'triangle', 0.06, 0, 0.08); tone(1047, 0.22, 'triangle', 0.06, 0, 0.16); break;
      case 'nobuy': tone(180, 0.18, 'square', 0.05); break;
      case 'click': tone(700, 0.04, 'square', 0.03); break;
      // preparo
      case 'knife': noise('bandpass', 2600, 3, 0.05, 0.07); tone(1800, 0.03, 'square', 0.02); break;
      case 'scrape': noise('bandpass', 4200, 2, 0.14, 0.05, 2600); break;
      case 'thud': tone(110, 0.1, 'sine', 0.09, 70); noise('lowpass', 500, 1, 0.06, 0.05); break;
      case 'squeeze': noise('lowpass', 900, 1.5, 0.22, 0.05, 400); tone(320, 0.2, 'sawtooth', 0.015, 200); break;
      case 'peel': noise('highpass', 3500, 1, 0.1, 0.035, 1800); break;
      case 'water': noise('lowpass', 1600 + Math.random() * 600, 0.8, 0.2, 0.05); if (Math.random() < 0.5) tone(500 + Math.random() * 500, 0.06, 'sine', 0.02, 1200); break;
    }
  };

  /* ---------- sons contínuos dos equipamentos (amostrados no tempo) ---------- */
  const AMB = {
    pan: [0.2, function (v) { noise('highpass', 3500, 0.7, 0.16, 0.05 * v); if (Math.random() < 0.3) noise('bandpass', 5000, 3, 0.03, 0.05 * v); }],
    grill: [0.16, function (v) { noise('highpass', 2800, 0.7, 0.14, 0.06 * v); if (Math.random() < 0.35) noise('bandpass', 4500, 4, 0.04, 0.05 * v); }],
    fryer: [0.08, function (v) { noise('bandpass', 4000 + Math.random() * 2500, 2, 0.05, 0.05 * v); if (Math.random() < 0.25) noise('highpass', 6000, 1, 0.1, 0.03 * v); }],
    pot: [0.3, function (v) { tone(160 + Math.random() * 220, 0.07, 'sine', 0.03 * v, 420 + Math.random() * 200); if (Math.random() < 0.3) noise('lowpass', 1200, 1, 0.12, 0.02 * v); }],
    pressure: [0.9, function (v) { noise('highpass', 5000, 1, 0.45, 0.05 * v); tone(120, 0.2, 'sine', 0.02 * v); }],
    oven: [0.3, function (v) { tone(92, 0.34, 'sine', 0.018 * v); if (Math.random() < 0.15) tone(900, 0.03, 'square', 0.012 * v); }],
    blender: [0.2, function (v) { tone(180 + Math.random() * 40, 0.22, 'sawtooth', 0.028 * v, 520); noise('bandpass', 1400, 1, 0.2, 0.03 * v); }],
    mixer: [0.25, function (v) { tone(110, 0.26, 'sine', 0.035 * v, 140); if (Math.random() < 0.3) tone(70, 0.06, 'square', 0.03 * v); }],
    processor: [0.2, function (v) { tone(260 + Math.random() * 60, 0.2, 'sawtooth', 0.025 * v, 640); }],
    wok: [0.18, function (v) { noise('highpass', 3200, 0.8, 0.14, 0.055 * v); if (Math.random() < 0.15) tone(1500, 0.1, 'triangle', 0.02 * v); }],
    steamer: [0.5, function (v) { noise('bandpass', 6500, 0.8, 0.5, 0.04 * v); }],
    smoker: [0.35, function (v) { noise('lowpass', 1000, 1, 0.3, 0.03 * v); if (Math.random() < 0.4) noise('bandpass', 3000, 4, 0.03, 0.05 * v); }],
    toaster: [0.5, function (v) { tone(1100, 0.02, 'square', 0.02 * v); }],
    coffee: [0.32, function (v) { tone(800 + Math.random() * 300, 0.07, 'sine', 0.035 * v, 380); if (Math.random() < 0.3) noise('lowpass', 800, 1, 0.2, 0.025 * v); }],
    icecream: [0.3, function (v) { tone(130, 0.3, 'sine', 0.025 * v); noise('lowpass', 300, 1, 0.3, 0.03 * v); }],
    sushi: [0.45, function (v) { noise('lowpass', 1200, 1, 0.08, 0.04 * v); }],
    breader: [0.35, function (v) { noise('bandpass', 2500, 1, 0.08, 0.04 * v); }],
    roller: [0.4, function (v) { tone(95, 0.1, 'sine', 0.06 * v, 70); noise('lowpass', 500, 1, 0.08, 0.03 * v); }],
    torch: [0.3, function (v) { noise('bandpass', 1800, 0.7, 0.34, 0.07 * v, 900); }],
    ricecooker: [0.45, function (v) { tone(220 + Math.random() * 120, 0.06, 'sine', 0.02 * v, 500); if (Math.random() < 0.4) noise('bandpass', 5500, 1, 0.2, 0.02 * v); }],
    waffler: [0.25, function (v) { noise('highpass', 3200, 0.7, 0.12, 0.04 * v); }],
    popper: [0.1, function (v) { if (Math.random() < 0.7) { noise('bandpass', 2200, 5, 0.03, 0.08 * v); tone(500 + Math.random() * 400, 0.05, 'sine', 0.03 * v, 900); } }],
    press: [0.3, function (v) { noise('highpass', 3200, 0.7, 0.14, 0.035 * v); }],
    fountain: [0.3, function (v) { noise('lowpass', 1100, 0.7, 0.3, 0.03 * v); }],
    fermenter: [0.7, function (v) { tone(300 + Math.random() * 200, 0.06, 'sine', 0.02 * v, 700); }],
    bainmarie: [0.5, function (v) { noise('lowpass', 900, 1, 0.3, 0.02 * v); if (Math.random() < 0.4) tone(240 + Math.random() * 100, 0.05, 'sine', 0.02 * v, 500); }],
    dehydrator: [0.4, function (v) { tone(75, 0.4, 'sine', 0.018 * v); noise('lowpass', 400, 1, 0.4, 0.015 * v); }]
  };
  const ACT = {
    board: [0.21, 'knife'], grater: [0.18, 'scrape'], mortar: [0.28, 'thud'], juicer: [0.3, 'squeeze'], peeler: [0.15, 'peel'], wash: [0.17, 'water']
  };
  const vol = function (x, y, ls) {
    let best = 0;
    for (let i = 0; i < ls.length; i++) { const d = Math.hypot(ls[i].x - x, ls[i].y - y); best = Math.max(best, 1 / (1 + d * d * 0.07)); }
    return Math.max(0, Math.min(1, best));
  };
  /* G: estado; ls: ouvintes locais [{x,y}] */
  S.ambient = function (G, dt, ls) {
    if (!CC.sound || !ls || !ls.length || G.over || G.paused) return;
    // equipamentos
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      const t = G.grid[y][x];
      if (!t || t.k !== 'app' || t.st !== 'cook') continue;
      const a = AMB[t.kind]; if (!a) continue;
      t._snd = (t._snd || Math.random() * a[0]) - dt;
      if (t._snd <= 0) {
        t._snd = a[0] * (0.8 + Math.random() * 0.5);
        const v = vol(x + 0.5, y + 0.5, ls);
        if (v > 0.06) a[1](v);
      }
    }
    // ações dos chefs (cortar, ralar, lavar…)
    G.players.forEach(function (p) {
      if (!p.chopping) { p._asnd = 0; return; }
      const k = ACT[p.actKind] || ACT.board;
      p._asnd = (p._asnd || 0) - dt;
      if (p._asnd <= 0) { p._asnd = k[0]; const v = vol(p.x, p.y, ls); if (v > 0.1) S.sfx(k[1]); }
    });
  };
})(window.CC);
