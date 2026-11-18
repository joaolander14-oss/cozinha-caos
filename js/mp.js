/* Cozinha Caos — multiplayer online (PeerJS, anfitrião autoritativo, até 4 chefs)
   O ANFITRIÃO roda o jogo todo. Os CONVIDADOS mandam o teclado (~30×/s) e recebem o estado (~15×/s). */
(function (CC) {
  'use strict';
  const VER = 1, PREFIX = 'cozcaos-';
  const MP = CC.MP = { role: null, code: null, players: [], myIdx: 0, status: '', ver: VER, listeners: {} };
  let peer = null, hostConns = [], toHost = null, stateTimer = 0, cache = [];
  const ICE = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478' }, { urls: 'stun:stun.cloudflare.com:3478' }] };
  const emit = function (n, a, b) { const f = MP.listeners[n]; if (f) f(a, b); };
  MP.on = function (n, f) { MP.listeners[n] = f; };
  const setStatus = function (s) { MP.status = s; emit('status', s); };
  const code5 = function () { const a = 'ABCDEFGHJKMNPQRSTUVWXYZ'; let s = ''; for (let i = 0; i < 5; i++) s += a[Math.floor(Math.random() * a.length)]; return s; };

  function loadPeer() {
    return new Promise(function (res, rej) {
      if (window.Peer) return res();
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error('Sem internet: não foi possível carregar a biblioteca de rede.')); };
      document.head.appendChild(s);
    });
  }
  MP.leave = function () {
    clearInterval(stateTimer); stateTimer = 0;
    try { hostConns.forEach(function (c) { c.close(); }); } catch (e) { }
    try { if (toHost) toHost.close(); } catch (e) { }
    try { if (peer) peer.destroy(); } catch (e) { }
    peer = null; hostConns = []; toHost = null; MP.role = null; MP.code = null; MP.players = []; cache = []; MP.myIdx = 0;
    emit('lobby', MP.players);
  };
  const sendTo = function (c, m) { try { if (c && c.open) c.send(m); } catch (e) { } };
  MP.send = function (m) { if (MP.role === 'guest') sendTo(toHost, m); };
  const lobbyMsg = function () { return { t: 'lobby', players: MP.players.map(function (p) { return { name: p.name, skin: p.skin, host: !!p.host }; }) }; };
  function broadcast(m) { hostConns.forEach(function (c) { sendTo(c, m); }); }
  function lobbyChanged() { broadcast(lobbyMsg()); emit('lobby', MP.players); }

  /* ---------------- anfitrião ---------------- */
  MP.host = function (name, skin) {
    MP.leave(); setStatus('Criando a sala…');
    return loadPeer().then(function () {
      return new Promise(function (res, rej) {
        let tries = 0;
        const make = function () {
          MP.code = code5();
          peer = new Peer(PREFIX + MP.code, { debug: 0, config: ICE });
          peer.on('open', function () { res(MP.code); });
          peer.on('error', function (e) {
            if (e.type === 'unavailable-id' && tries++ < 5) { try { peer.destroy(); } catch (x) { } make(); }
            else rej(new Error('Não foi possível criar a sala (' + e.type + ').'));
          });
        };
        make();
        setTimeout(function () { if (!MP.role) rej(new Error('Tempo esgotado ao conectar ao servidor de salas.')); }, 12000);
      });
    }).then(function (code) {
      MP.role = 'host'; MP.myIdx = 0;
      MP.players = [{ name: name, skin: skin, host: true, conn: null }];
      peer.on('connection', function (c) {
        c.on('data', function (d) { hostRecv(c, d); });
        c.on('close', function () { hostDrop(c); }); c.on('error', function () { hostDrop(c); });
      });
      peer.on('disconnected', function () { try { peer.reconnect(); } catch (e) { } });
      setStatus('Sala criada! Compartilhe o código com seus amigos.');
      lobbyChanged();
      return code;
    });
  };
  function hostRecv(c, d) {
    if (!d || typeof d !== 'object') return;
    if (d.t === 'hello') {
      if (d.ver !== VER) { sendTo(c, { t: 'rej', why: 'Versão diferente do jogo. Atualize a página (Ctrl+F5).' }); setTimeout(function () { try { c.close(); } catch (e) { } }, 300); return; }
      if (CC.Engine.get() && MP.playing) { sendTo(c, { t: 'rej', why: 'A partida já começou. Aguarde o fim.' }); return; }
      if (MP.players.length >= 4) { sendTo(c, { t: 'rej', why: 'Sala cheia (máximo 4 chefs).' }); return; }
      const idx = MP.players.length;
      MP.players.push({ name: String(d.name || 'Chef').slice(0, 14), skin: d.skin || {}, host: false, conn: c });
      hostConns.push(c); c._idx = idx;
      sendTo(c, { t: 'welcome', idx: idx, ver: VER });
      lobbyChanged();
      return;
    }
    const i = MP.players.findIndex(function (p) { return p.conn === c; });
    if (i < 0) return;
    if (d.t === 'in') CC.Engine.setRemote(i, d.mx, d.my, d.act, d.pr);
    else if (d.t === 'chat') broadcast({ t: 'chat', from: MP.players[i].name, txt: String(d.txt || '').slice(0, 80) });
  }
  function hostDrop(c) {
    const i = MP.players.findIndex(function (p) { return p.conn === c; });
    hostConns = hostConns.filter(function (x) { return x !== c; });
    if (i < 0) return;
    if (MP.playing && CC.Engine.get()) {
      const g = CC.Engine.get(); const p = g.players[i];
      if (p) { p.mx = 0; p.my = 0; p.act = false; p.name = p.name + ' (saiu)'; }
      MP.players[i].conn = null; MP.players[i].gone = true;
    } else {
      MP.players.splice(i, 1);
      // reindexa
      MP.players.forEach(function (p, k) { if (p.conn) { p.conn._idx = k; sendTo(p.conn, { t: 'welcome', idx: k, ver: VER }); } });
      lobbyChanged();
    }
  }
  /* chamado pelo UI depois que o motor do anfitrião iniciou */
  MP.hostGameStarted = function (lv) {
    MP.playing = true; cache = [];
    const init = CC.Engine.serialize();
    broadcast({ t: 'start', lv: lv, init: init, names: MP.players.map(function (p) { return p.name; }), skins: MP.players.map(function (p) { return p.skin; }) });
    clearInterval(stateTimer);
    stateTimer = setInterval(function () {
      const s = CC.Engine.serialize(); if (!s) return;
      // diferença de tiles
      const gd = []; let k = 0;
      s.grid.forEach(function (row, y) { row.forEach(function (t, x) { const j = JSON.stringify(t); if (cache[k] !== j) { cache[k] = j; gd.push([x, y, t]); } k++; }); });
      delete s.grid; s.gd = gd;
      broadcast({ t: 'st', s: s });
    }, 66);
  };
  MP.hostGameEnded = function () { MP.playing = false; clearInterval(stateTimer); stateTimer = 0; broadcast({ t: 'lobby', players: lobbyMsg().players, back: true }); };

  /* ---------------- convidado ---------------- */
  MP.join = function (code, name, skin) {
    MP.leave(); code = String(code || '').trim().toUpperCase();
    if (!/^[A-Z]{5}$/.test(code)) return Promise.reject(new Error('Código inválido (5 letras).'));
    setStatus('Conectando…');
    return loadPeer().then(function () {
      return new Promise(function (res, rej) {
        peer = new Peer({ debug: 0, config: ICE });
        let done = false;
        const fail = function (m) { if (!done) { done = true; rej(new Error(m)); } };
        const tm = setTimeout(function () { fail('Não encontrei a sala (ou a conexão direta foi bloqueada pela rede).'); }, 14000);
        peer.on('error', function (e) { clearTimeout(tm); fail(e.type === 'peer-unavailable' ? 'Sala não encontrada. Confira o código.' : 'Erro de rede: ' + e.type); });
        peer.on('open', function () {
          const c = peer.connect(PREFIX + code, { serialization: 'json', reliable: true });
          toHost = c;
          c.on('open', function () { sendTo(c, { t: 'hello', name: name, skin: skin, ver: VER }); });
          c.on('data', function (d) {
            if (!d || typeof d !== 'object') return;
            if (d.t === 'welcome') { clearTimeout(tm); done = true; MP.role = 'guest'; MP.code = code; MP.myIdx = d.idx; setStatus('Conectado à sala ' + code); res(code); }
            else if (d.t === 'rej') { clearTimeout(tm); fail(d.why); }
            else guestRecv(d);
          });
          c.on('close', function () { if (MP.role) { emit('closed'); } });
          c.on('error', function () { });
        });
      });
    });
  };
  function guestRecv(d) {
    if (d.t === 'lobby') { MP.players = d.players.map(function (p) { return { name: p.name, skin: p.skin, host: p.host }; }); if (d.back) { MP.playing = false; emit('back'); } emit('lobby', MP.players); }
    else if (d.t === 'welcome') { MP.myIdx = d.idx; }
    else if (d.t === 'start') { MP.playing = true; emit('start', d); }
    else if (d.t === 'st') {
      const g = CC.Engine.get(); if (!g || !g.client) return;
      const s = d.s;
      if (s.gd) { s.gd.forEach(function (e) { if (g.grid[e[1]]) g.grid[e[1]][e[0]] = e[2]; }); }
      CC.Engine.applyState(Object.assign({}, s, { grid: g.grid }));
    } else if (d.t === 'chat') emit('chat', d);
  }
  MP.chat = function (txt) { if (MP.role === 'guest') sendTo(toHost, { t: 'chat', txt: txt }); else if (MP.role === 'host') { broadcast({ t: 'chat', from: MP.players[0].name, txt: txt }); emit('chat', { from: MP.players[0].name, txt: txt }); } };
  MP.updateProfile = function (name, skin) { if (MP.role === 'host') { MP.players[0].name = name; MP.players[0].skin = skin; lobbyChanged(); } };
})(window.CC);
