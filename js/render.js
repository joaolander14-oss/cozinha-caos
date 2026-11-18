/* Cozinha Caos — desenho no canvas */
(function (CC) {
  'use strict';
  const ITEMS = CC.ITEMS, TS = CC.TS || 64;
  const R = CC.Render = {};
  const FONT = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';

  function rr(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  /* 'A+B' → A grande, B como selo */
  function emoji(c, s, x, y, size) {
    if (!s) return;
    const i = s.indexOf('+');
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000';
    if (i < 0) { c.font = size + 'px ' + FONT; c.fillText(s, x, y); return; }
    c.font = size + 'px ' + FONT; c.fillText(s.slice(0, i), x, y);
    c.font = Math.round(size * 0.52) + 'px ' + FONT; c.fillText(s.slice(i + 1), x + size * 0.34, y + size * 0.32);
  }
  R.emoji = emoji;

  function drawItem(c, id, x, y, size) {
    const it = ITEMS[id];
    if (!it) return;
    emoji(c, it.e, x, y, size);
  }
  function drawPlate(c, pl, x, y, size, dirty) {
    c.save();
    c.fillStyle = dirty ? '#b9a98e' : '#fdfdfd'; c.strokeStyle = dirty ? '#7d6e57' : '#c9ced6'; c.lineWidth = 2;
    c.beginPath(); c.arc(x, y, size * 0.5, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.arc(x, y, size * 0.36, 0, 7); c.strokeStyle = dirty ? '#9a8a70' : '#e3e7ee'; c.stroke();
    if (dirty) { c.fillStyle = 'rgba(90,60,30,.55)'; c.beginPath(); c.arc(x - 5, y - 3, 4, 0, 7); c.arc(x + 6, y + 4, 3, 0, 7); c.fill(); }
    if (pl && pl.items) {
      const parts = pl.items.filter(function (i) { return !ITEMS[i].season; }), seas = pl.items.filter(function (i) { return ITEMS[i].season; });
      const n = parts.length;
      if (n === 1) drawItem(c, parts[0], x, y - 1, size * 0.62);
      else if (n > 1) {
        const rad = size * 0.2, s = size * (n > 4 ? 0.3 : 0.36);
        parts.forEach(function (p, k) { const a = -Math.PI / 2 + k * Math.PI * 2 / n; drawItem(c, p, x + Math.cos(a) * rad * (n > 2 ? 1.2 : 1), y + Math.sin(a) * rad * (n > 2 ? 1.2 : 1), s); });
      }
      seas.forEach(function (s, k) { c.fillStyle = ITEMS[s].color; c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.beginPath(); c.arc(x - size * 0.4 + k * 8, y + size * 0.36, 4.5, 0, 7); c.fill(); c.stroke(); });
    }
    c.restore();
  }
  function drawHeld(c, h, x, y, size) {
    if (!h) return;
    if (typeof h === 'string') { c.fillStyle = '#000'; drawItem(c, h, x, y, size); }
    else if (h.plate) drawPlate(c, h, x, y, size, false);
    else if (h.dirty) drawPlate(c, null, x, y, size, true);
    else if (h.shaker) drawShaker(c, h.shaker, x, y, size);
  }
  function drawShaker(c, id, x, y, size) {
    const s = CC.SEAS[id];
    c.save();
    c.fillStyle = s.color; c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 2;
    rr(c, x - size * 0.22, y - size * 0.3, size * 0.44, size * 0.6, 6); c.fill(); c.stroke();
    c.fillStyle = '#ddd'; rr(c, x - size * 0.14, y - size * 0.42, size * 0.28, size * 0.14, 3); c.fill(); c.stroke();
    c.fillStyle = '#000'; emoji(c, s.e, x, y + 2, size * 0.38);
    c.restore();
  }
  function bar(c, x, y, w, f, col, bg) {
    c.fillStyle = bg || 'rgba(0,0,0,.55)'; rr(c, x, y, w, 8, 4); c.fill();
    c.fillStyle = col; if (f > 0) { rr(c, x + 1, y + 1, Math.max(4, (w - 2) * Math.min(1, f)), 6, 3); c.fill(); }
  }

  /* ---------- tiles ---------- */
  function counterBase(c, x, y, top) {
    c.fillStyle = '#6e5238'; c.fillRect(x, y, TS, TS);
    c.fillStyle = top || '#a98560'; rr(c, x + 2, y + 2, TS - 4, TS - 8, 6); c.fill();
    c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(x + 4, y + 4, TS - 8, 4);
  }
  function drawTile(c, t, gx, gy, time) {
    const x = gx * TS, y = gy * TS, cx = x + TS / 2, cy = y + TS / 2;
    switch (t.k) {
      case 'counter': counterBase(c, x, y); if (t.thing) { drawHeld(c, t.thing, cx, cy - 2, 40); } break;
      case 'board': {
        counterBase(c, x, y, '#c9a56b');
        c.fillStyle = '#e7c98b'; rr(c, x + 8, y + 8, TS - 16, TS - 20, 5); c.fill(); c.strokeStyle = '#a07c3f'; c.lineWidth = 2; c.stroke();
        if (!t.thing) { c.globalAlpha = 0.5; emoji(c, '🔪', cx, cy - 2, 26); c.globalAlpha = 1; }
        else { drawHeld(c, t.thing, cx, cy - 3, 38); }
        if (t.prog > 0 && typeof t.thing === 'string') bar(c, x + 8, y + TS - 14, TS - 16, t.prog, '#4cd964');
        break;
      }
      case 'grater': {
        counterBase(c, x, y, '#b0bec5');
        c.fillStyle = '#cfd8dc'; rr(c, x + 10, y + 8, TS - 20, TS - 22, 5); c.fill(); c.strokeStyle = '#78909c'; c.lineWidth = 2; c.stroke();
        c.fillStyle = '#78909c'; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { c.beginPath(); c.arc(x + 20 + j * 12, y + 17 + i * 9, 2, 0, 7); c.fill(); }
        if (!t.thing) { c.globalAlpha = 0.55; emoji(c, '🧀', cx + 14, cy + 12, 16); c.globalAlpha = 1; } else drawHeld(c, t.thing, cx, cy - 1, 36);
        if (t.prog > 0 && typeof t.thing === 'string') bar(c, x + 8, y + TS - 14, TS - 16, t.prog, '#4cd964');
        break;
      }
      case 'crate': {
        const s = CC.SEAS[t.id];
        c.fillStyle = '#5a4128'; c.fillRect(x, y, TS, TS);
        if (s) {
          c.fillStyle = '#7a5a3a'; rr(c, x + 3, y + 3, TS - 6, TS - 6, 8); c.fill();
          drawShaker(c, t.id, cx, cy, 48);
        } else {
          c.fillStyle = '#b08850'; rr(c, x + 3, y + 3, TS - 6, TS - 6, 8); c.fill();
          c.strokeStyle = '#7d5f2f'; c.lineWidth = 2; c.stroke();
          c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x + 6, y + TS - 18, TS - 12, 3);
          emoji(c, CC.ING[t.id].e, cx, cy - 2, 34);
        }
        c.font = 'bold 9px sans-serif'; c.fillStyle = 'rgba(255,255,255,.9)'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
        const nm = (s ? s.n : CC.ING[t.id].n).replace('Queijo ralado', 'Q. ralado').replace('Calda de chocolate', 'Calda').replace('Molho picante', 'M. picante');
        c.fillText(nm, cx, y + TS - 5);
        break;
      }
      case 'trash':
        counterBase(c, x, y, '#6c7a89'); c.fillStyle = '#4a5560'; rr(c, x + 14, y + 12, TS - 28, TS - 22, 5); c.fill(); emoji(c, '🗑️', cx, cy, 34); break;
      case 'sink': {
        counterBase(c, x, y, '#9db4c0'); c.fillStyle = '#6f8f9f'; rr(c, x + 6, y + 8, TS - 12, TS - 20, 7); c.fill();
        emoji(c, '🚰', cx, cy - 4, 26);
        if (t.dirty > 0) { drawPlate(c, null, cx - 12, cy + 8, 22, true); c.font = 'bold 12px sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('x' + t.dirty, cx - 12, cy + 24); }
        if (t.clean > 0) { drawPlate(c, { items: [] }, cx + 14, cy + 8, 22, false); c.font = 'bold 12px sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('x' + t.clean, cx + 14, cy + 24); }
        if (t.prog > 0) bar(c, x + 8, y + 3, TS - 16, t.prog, '#5ac8fa');
        break;
      }
      case 'rack':
        counterBase(c, x, y, '#cfd8dc');
        for (let i = 0; i < Math.min(t.n, 6); i++) drawPlate(c, { items: [] }, cx, cy + 12 - i * 4, 36, false);
        c.font = 'bold 12px sans-serif'; c.fillStyle = '#263238'; c.textAlign = 'center'; c.fillText('x' + t.n, cx + 20, y + 14); break;
      case 'ret':
        counterBase(c, x, y, '#a1887f');
        for (let i = 0; i < Math.min(t.dirty, 5); i++) drawPlate(c, null, cx, cy + 10 - i * 4, 34, true);
        if (!t.dirty) { c.globalAlpha = 0.4; emoji(c, '🍽️', cx, cy, 28); c.globalAlpha = 1; }
        c.font = 'bold 12px sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; if (t.dirty) c.fillText('x' + t.dirty, cx + 20, y + 14); break;
      case 'serve': {
        const f = t.flash > 0 ? t.flash : 0;
        c.fillStyle = f > 0 ? '#58d68d' : '#2ecc71'; c.fillRect(x, y, TS, TS);
        c.fillStyle = '#1e8449'; rr(c, x + 4, y + 4, TS - 8, TS - 8, 6); c.fill();
        c.fillStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i < 4; i++) c.fillRect(x + 8 + i * 13, y + 8, 6, TS - 16);
        emoji(c, '🛎️', cx, cy, 34); break;
      }
      case 'app': drawApp(c, t, x, y, cx, cy, time); break;
    }
  }

  function appContents(c, t, cx, cy, size) {
    if (t.out) {
      const burning = t.st === 'burnt' || (t.st === 'done' && t.burn > 8);
      const pul = burning ? 1 + Math.sin(performance.now() / 90) * 0.1 : 1;
      c.fillStyle = '#000'; drawItem(c, t.out, cx, cy, size * pul);
      if (burning) { emoji(c, '❗', cx + 18, cy - 20, 16); }
    } else if (t.items.length) {
      const n = t.items.length;
      t.items.forEach(function (it, i) { drawItem(c, it, cx + (i - (n - 1) / 2) * 15, cy + (i % 2 ? 4 : -3), n > 2 ? 18 : 22); });
    }
  }
  function drawApp(c, t, x, y, cx, cy, time) {
    const k = t.kind, cooking = t.st === 'cook';
    c.fillStyle = '#3a3d45'; c.fillRect(x, y, TS, TS);
    c.fillStyle = '#4b4f59'; rr(c, x + 2, y + 2, TS - 4, TS - 6, 6); c.fill();
    switch (k) {
      case 'pot': case 'pan': {
        for (let i = 0; i < 2; i++) { c.strokeStyle = cooking ? '#ff7043' : '#222'; c.lineWidth = 3; c.beginPath(); c.arc(cx, cy, 24 - i * 8, 0, 7); c.stroke(); }
        c.fillStyle = k === 'pot' ? '#9aa0aa' : '#2d2f36'; c.strokeStyle = '#1b1c20'; c.lineWidth = 2;
        c.beginPath(); c.arc(cx, cy - 2, k === 'pot' ? 22 : 20, 0, 7); c.fill(); c.stroke();
        c.fillStyle = k === 'pot' ? '#6b717b' : '#17181c'; c.beginPath(); c.arc(cx, cy - 2, k === 'pot' ? 17 : 16, 0, 7); c.fill();
        if (k === 'pan') { c.fillStyle = '#2d2f36'; rr(c, x + TS - 12, cy - 6, 14, 6, 3); c.fill(); } else { c.fillStyle = '#6b717b'; rr(c, x + 2, cy - 6, 8, 6, 3); c.fill(); rr(c, x + TS - 10, cy - 6, 8, 6, 3); c.fill(); }
        appContents(c, t, cx, cy - 2, 26); break;
      }
      case 'grill': {
        c.fillStyle = cooking ? '#5a2a1a' : '#23252b'; rr(c, x + 6, y + 6, TS - 12, TS - 16, 5); c.fill();
        c.strokeStyle = cooking ? '#ff7043' : '#555'; c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(x + 10 + i * 9, y + 8); c.lineTo(x + 10 + i * 9, y + TS - 12); c.stroke(); }
        appContents(c, t, cx, cy - 2, 28); break;
      }
      case 'fryer': {
        c.fillStyle = '#b0bec5'; rr(c, x + 6, y + 6, TS - 12, TS - 16, 6); c.fill();
        c.fillStyle = cooking ? '#f5b041' : '#d4ac0d'; rr(c, x + 10, y + 10, TS - 20, TS - 24, 4); c.fill();
        if (cooking) { c.fillStyle = 'rgba(255,255,255,.6)'; for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(x + 16 + ((i * 17 + time * 40) % 30), y + 14 + ((i * 9 + time * 30) % 24), 2, 0, 7); c.fill(); } }
        appContents(c, t, cx, cy - 2, 26); break;
      }
      case 'oven': {
        c.fillStyle = '#6b7079'; rr(c, x + 4, y + 4, TS - 8, TS - 12, 5); c.fill();
        c.fillStyle = cooking ? '#e67e22' : '#20232a'; rr(c, x + 10, y + 16, TS - 20, TS - 32, 4); c.fill();
        if (cooking) { c.fillStyle = 'rgba(255,200,80,' + (0.3 + 0.2 * Math.sin(time * 6)) + ')'; rr(c, x + 10, y + 16, TS - 20, TS - 32, 4); c.fill(); }
        c.fillStyle = '#aab'; c.fillRect(x + 12, y + 8, TS - 24, 3);
        appContents(c, t, cx, cy + 1, 22); break;
      }
      case 'blender': {
        c.fillStyle = '#263238'; rr(c, x + 14, y + TS - 22, TS - 28, 14, 4); c.fill();
        c.fillStyle = 'rgba(180,220,240,.75)'; c.strokeStyle = '#8fb2c4'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(x + 17, y + 8); c.lineTo(x + TS - 17, y + 8); c.lineTo(x + TS - 21, y + TS - 22); c.lineTo(x + 21, y + TS - 22); c.closePath(); c.fill(); c.stroke();
        c.save(); if (cooking) c.translate(Math.sin(time * 60) * 1.4, 0); appContents(c, t, cx, cy - 2, 24); c.restore(); break;
      }
      default: {
        const A = CC.APPS[k];
        c.fillStyle = A.col || '#555'; rr(c, x + 5, y + 5, TS - 10, TS - 14, 8); c.fill();
        c.fillStyle = 'rgba(255,255,255,.14)'; rr(c, x + 8, y + 8, TS - 16, 10, 5); c.fill();
        if (cooking) { c.fillStyle = 'rgba(255,200,90,' + (0.18 + 0.12 * Math.sin(time * 7)) + ')'; rr(c, x + 5, y + 5, TS - 10, TS - 14, 8); c.fill(); }
        if (!t.out && !t.items.length) { c.globalAlpha = 0.5; emoji(c, A.e, cx, cy, 30); c.globalAlpha = 1; }
        appContents(c, t, cx, cy, 26); break;
      }
      case 'mixer': {
        c.fillStyle = '#d6dbe0'; c.beginPath(); c.arc(cx, cy + 3, 21, 0, Math.PI); c.fill(); c.strokeStyle = '#8a929b'; c.lineWidth = 2; c.stroke();
        c.fillStyle = '#e8ecef'; c.fillRect(cx - 21, cy + 1, 42, 4);
        if (cooking) { c.strokeStyle = '#555'; c.lineWidth = 2; c.beginPath(); c.moveTo(cx - 6, cy - 22); c.lineTo(cx - 6 + Math.sin(time * 20) * 5, cy + 4); c.moveTo(cx + 6, cy - 22); c.lineTo(cx + 6 - Math.sin(time * 20) * 5, cy + 4); c.stroke(); }
        appContents(c, t, cx, cy - 4, 24); break;
      }
    }
    // ícone do equipamento (pequeno) e barras
    c.globalAlpha = 0.85; emoji(c, CC.APPS[k].e, x + 11, y + 11, 13); c.globalAlpha = 1;
    if (cooking) bar(c, x + 6, y - 1, TS - 12, t.prog / t.rec.t, '#4cd964');
    else if (t.st === 'idle' && t.wait > 0) bar(c, x + 6, y - 1, TS - 12, t.wait, '#f1c40f');
    else if (t.st === 'done') { const f = 1 - Math.min(1, t.burn / 14); bar(c, x + 6, y - 1, TS - 12, f, t.burn > 8 ? '#e74c3c' : '#f1c40f'); }
  }

  /* ---------- cozinheiro ---------- */
  function drawChef(c, p, time) {
    const x = p.x * TS, y = p.y * TS;
    const bob = Math.abs(Math.sin(p.walk)) * 2.5;
    c.save();
    // sombra
    c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(x, y + 17, 17, 7, 0, 0, 7); c.fill();
    if (p.dash > 0) { c.globalAlpha = 0.3; c.fillStyle = p.color; c.beginPath(); c.arc(x - p.dx * 16, y - p.dy * 16, 16, 0, 7); c.fill(); c.globalAlpha = 1; }
    // corpo
    c.translate(0, -bob);
    c.fillStyle = p.color; c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 2;
    c.beginPath(); c.arc(x, y + 3, 17, 0, 7); c.fill(); c.stroke();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y + 6, 11, 0, Math.PI); c.fill(); // avental
    // cabeça
    c.fillStyle = '#ffd7b0'; c.beginPath(); c.arc(x, y - 7, 11, 0, 7); c.fill(); c.stroke();
    // olhos na direção
    c.fillStyle = '#222'; c.beginPath(); c.arc(x - 4 + p.dx * 2.5, y - 7 + p.dy * 2.5, 1.9, 0, 7); c.arc(x + 4 + p.dx * 2.5, y - 7 + p.dy * 2.5, 1.9, 0, 7); c.fill();
    // chapéu
    if (p.hat && p.hat !== 'toque') { emoji(c, p.hat, x, y - 20, 26); }
    else {
      c.fillStyle = '#fff'; c.strokeStyle = '#bfc5cc'; c.lineWidth = 1.5;
      rr(c, x - 10, y - 25, 20, 12, 4); c.fill(); c.stroke();
      c.beginPath(); c.arc(x - 6, y - 27, 6, 0, 7); c.arc(x + 1, y - 29, 7, 0, 7); c.arc(x + 7, y - 26, 5, 0, 7); c.fill();
    }
    // mãos / item
    const hx = x + p.dx * 24, hy = y + 4 + p.dy * 22;
    c.fillStyle = '#ffd7b0'; c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 1.5;
    c.beginPath(); c.arc(x + p.dx * 17 - p.dy * 9, y + 6 + p.dy * 14 + p.dx * 0, 4.5, 0, 7); c.arc(x + p.dx * 17 + p.dy * 9, y + 6 + p.dy * 14, 4.5, 0, 7); c.fill(); c.stroke();
    if (p.hold) drawHeld(c, p.hold, hx, hy - 6, 34);
    if (p.chopping) { c.save(); c.translate(hx, hy - 12); c.rotate(Math.sin(time * 30) * 0.5); emoji(c, '🔪', 0, 0, 22); c.restore(); }
    c.restore();
    // etiqueta
    c.font = 'bold 11px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.strokeStyle = 'rgba(0,0,0,.7)'; c.lineWidth = 3;
    c.strokeText(p.name, x, y + 29); c.fillText(p.name, x, y + 29);
    if (p.msgT > 0) {
      c.font = 'bold 12px sans-serif'; const w = c.measureText(p.msg).width + 14;
      c.fillStyle = 'rgba(0,0,0,.78)'; rr(c, x - w / 2, y - 58, w, 20, 8); c.fill(); c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.fillText(p.msg, x, y - 48);
    }
  }

  R.draw = function (cvs, G, time) {
    const W = G.W * TS, H = G.H * TS;
    if (cvs.width !== W) { cvs.width = W; cvs.height = H; }
    const c = cvs.getContext('2d');
    c.save();
    if (G.shake > 0) c.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
    c.fillStyle = '#2b2118'; c.fillRect(0, 0, W, H);
    // piso
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) {
      if (G.grid[y][x]) continue;
      c.fillStyle = (x + y) % 2 ? '#e9dcc0' : '#dfd0b0'; c.fillRect(x * TS, y * TS, TS, TS);
    }
    for (let y = 0; y < G.H; y++) for (let x = 0; x < G.W; x++) { const t = G.grid[y][x]; if (t) drawTile(c, t, x, y, time); }
    // alvos
    G.players.forEach(function (p) {
      const tg = CC.Engine.target(p);
      if (tg) { c.strokeStyle = p.color; c.lineWidth = 3.5; c.globalAlpha = 0.9; rr(c, tg.x * TS + 2, tg.y * TS + 2, TS - 4, TS - 4, 8); c.stroke(); c.globalAlpha = 1; }
    });
    // jogadores (ordenados por y)
    G.players.slice().sort(function (a, b) { return a.y - b.y; }).forEach(function (p) { drawChef(c, p, time); });
    // fumaça
    G.parts.forEach(function (q) { c.fillStyle = q.c + Math.max(0, q.t * 0.35) + ')'; c.beginPath(); c.arc(q.x * TS, q.y * TS, q.r * TS * (1.6 - q.t * 0.5), 0, 7); c.fill(); });
    // textos flutuantes
    c.textAlign = 'center'; c.textBaseline = 'middle';
    G.floats.forEach(function (f) { c.globalAlpha = Math.min(1, f.t); c.font = 'bold 20px sans-serif'; c.strokeStyle = 'rgba(0,0,0,.75)'; c.lineWidth = 4; c.strokeText(f.txt, f.x * TS, f.y * TS); c.fillStyle = f.col; c.fillText(f.txt, f.x * TS, f.y * TS); c.globalAlpha = 1; });
    // contagem inicial
    if (G.countdown > 0) {
      c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, 0, W, H);
      c.font = 'bold 120px sans-serif'; c.fillStyle = '#ffd84a'; c.strokeStyle = '#000'; c.lineWidth = 8; c.textAlign = 'center'; c.textBaseline = 'middle';
      const n = Math.ceil(G.countdown); c.strokeText(String(n), W / 2, H / 2); c.fillText(String(n), W / 2, H / 2);
    }
    c.restore();
  };
})(window.CC);
