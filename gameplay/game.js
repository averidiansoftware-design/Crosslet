/**
 * CROSSLET - gameplay/game.js
 * v1.2.00 - Wordle Engine - NO-REPEAT + IMAGE SHARE
 * 100% offline, no dependencies
 */

(function () {
  'use strict';

  const VERSION = 'v1.2.00';

  const WORDS_RAW = [
    "CALOR","AVISE","BURIL","GUSTO","BILIS","ODIOS","FALLA","OPERE","JUNTE","BATIR",
    "ACUSA","DENSO","JAMON","LANZO","FORRO","IMPON","SOLAS","OMITE","HECHA","PASEO",
    "RUMOR","PLENO","FILMA","CAUSO","LANCE","NATAL","BAILA","GUSTA","NIEVO","COMIC",
    "BUZON","TENER","BEBEN","SENTE","SALUD","CONDE","DILES","MUNDO","BIDON","VARIE",
    "PRIME","CREDO","GEMIA","BALON","GALOP","CAIDO","OASIS","ARBOL","MIRAR","ABUSO",
    "YOGUR","CUBRI","GASTA","FAROL","SANTO","ROMPA","HONOR","ALUDI","BOLSO","CALLO",
    "BICHO","CHICA","PAGAR","LLENA","ANIMO","OBLEA","GAMMA","BASTA","PECHO","VENGO",
    "CORTE","FARSA","SAQUE","DOBLE","ENTRA","MOVIO","ALISO","CAPTA","FISCA","ASTRO",
    "CEDEA","DICES","BETUN","TEMER","AMINA","ABONO","PERRO","VAPOR","ACETA","BOCAS",
    "DIGNO","QUITA","ARDER","SUCIO","ACEBO","BAJAS","SONAR","PORTA","BOXEO","BOSTA",
    "AGOTE","DUDAS","GANAR","ARDOR","MENTA","ALUDE","TREPA","CEIBA","CALAR","SOBRE",
    "VIERA","BUTEN","PAGAS","HABLE","HABIA","ABETO","BREVE","CANTE","OPERO","HIERO",
    "ABAJO","ASADO","BALDE","GEMIO","BESEN","CORTO","CORRO","DARAS","CALDO","PINTE",
    "BASEA","ACUNA","ARCOS","TENIS","JUNTA","BULBO","PIANO","GATEA","BEMOL","GUAPA",
    "GLOBO","SALON","BEBIO","PASTA","BARCA","BIRLA","BARRO","TREPE","CIRIO","DELTA",
    "BARON","BORNA","BECAS","JURAN","GAFAS","SALIA","NORTE","GRASA","NUEVE","RUBIO",
    "HABIL","MARCO","TRIGO","FLORA","NOCHE","SUENA","OBREN","VENDE","GASTE","PATIO",
    "GRABO","ZARPA","ACERA","TEXTO","DORAR","DIETA","NOTAS","TIRAR","BURLA","VIDEO",
    "VARIO","EVADA","LUEGO","DIOSA","DIGNA","PRIMO","FRUTO","GESTO","DAMOS","RUBIA",
    "CREMO","LEGAL","ACABO","GASTO","AUTOR","TOCAR","REINA","ELLOS","BIZCO","CABIA",
    "CAZAR","VALER","SACAS","MUJER","CREMA","PINTO","FONDO","VIEJO","BECAR","DUDAN",
    "DICEN","BUENO","UTERO","DEUDO","TRABE","BOCEA","RODEO","MEJOR","DUDES","SIRVO",
    "BELLA","FUEGO","DADOR","UBICA","TANTO","PLAZA","DOBLA","PERDI","HABLA","AMIGO",
    "ADOSO","PLAGA","SEDES","MALTA","DABLE","DEJEN","ASUMI","USADO","HOTEL","SUENO",
    "OFREC","HUELA","AROMA","HALLA","BARDA","MARES","IZOTE","DICTA","RIOJA","MORAL",
    "CASTA","MENTE","SIGNO","BREZO","BUSTO","OBESO","DEBER","CRETA","VACIO","GANAN",
    "INDIO","DATIL","DISTE","POSEO","TARDO","BAILE","VIGOR","AMASE","ABRIO","ISTMO",
    "SABEN","PUEDE","CRUZO","MIEDO","NUNCA","QUEMO","AFORA","BOZAL","BURDA","ANTES",
    "NIEVA","QUITO","PIEZA","EBRIA","PAGAN","SUEÑA","GEMIR","ODIAS","HUELO","BICAL",
    "CACHA","FLUIR","SUELO","SALTO","AGOTO","GALAN","COGER","JAMAS","HABER","METRO",
    "ELEVA","CALMO","MANTA","GOLPE","CUIDO","HUIDO","PLATA","USTED","SENOR","BIOTA",
    "ALABO","COBRO","NARIZ","BEBER","SOBRO","VASOS","HAGAS","BOSON","METES","PORTO",
    "HUESO","EVITE","ERIZO","BANDO","ETICA","OCUPE","ESTAS","ESQUI","PEINE","BEATO",
    "OIRLO","BORLA","DEPON","ATACO","ZANJA","CELDA","BEJEL","BLUSA","CHOZA","BOLOS",
    "ALERO","DETEN","QUEMA","BROCA","SUEÑA","LLAGA","SIRVE","FRENE","TURNO","NACEN",
    "NEGRO","BERZA","UNICO","ARNES","BRAMA","JEFES","TENGO","GOLEO","GUSTE","BONZO",
    "ROBOT","PORTE","ANOTE","ZURDO","SIETE","BOINA","DUROS","BOMBA","HIELA","ACUSO",
    "DOSEL","SERIA","VILLA","BRIZA","DARDO","CANTA","BAMBA","CANTO","USADA","SIGLA",
    "DICHO","DESUS","NIEGO","BASAR","CULPO","IDEAR","CIFRA","LECHA","AVENA","GUIAR",
    "AGRIO","BARDO","BROTE","BATEO","RODAR","FALTA","CORRA","COLMO","ABREN","ADOBE"
    // PEGA AQUÍ EL RESTO DE TU LISTA, yo ya limpio duplicados solo
  ];

  // v1.2.00 FIX ANTI-ROBOT x3
  const WORDS = [...new Set(WORDS_RAW.map(w => w.toUpperCase().trim()).filter(w => w.length === 5))];

  const VALID_EXTRA = new Set();
  const CONFIG = {
    maxRows: 6, cols: 5,
    storageKey: 'crosslet_game_v3_es',
    statsKey: 'crosslet_stats_v2_es',
    epoch: '2026-01-01'
  };

  const DOM = {
    board: null, rows: [], tiles: [], keys: null, message: null,
    helpBtn: null, statsBtn: null, audioBtn: null, statPlayed: null, statWin: null,
    statStreak: null, statMax: null, gameResult: null, correctWord: null,
    shareBtn: null, newGameBtn: null, toggleSoundsBtn: null, toggleMusicBtn: null
  };

  const State = {
    answer: '', currentRow: 0, currentCol: 0, gameOver: false, board: [], evaluations: [], isProcessing: false
  };

  const Utils = {
    todayString() { return new Date().toISOString().split('T')[0]; },
    daysSinceEpoch() {
      const epoch = new Date(CONFIG.epoch + 'T00:00:00Z');
      const today = new Date(this.todayString() + 'T00:00:00Z');
      return Math.floor((today - epoch) / 86400000);
    },
    seededShuffle(array, seed = 1337) {
      const arr = [...array]; let s = seed;
      const rand = () => (s = (s * 9301 + 49297) % 233280, s / 233280);
      for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
      return arr;
    },
    pickDailyWord() {
      const shuffled = this.seededShuffle(WORDS, 2026);
      const idx = this.daysSinceEpoch() % shuffled.length;
      return shuffled[idx];
    },
    normalizeWord(word) {
      return String(word||'').toUpperCase().replace(/[ÁÀÄÂ]/g,'A').replace(/[ÉÈËÊ]/g,'E').replace(/[ÍÌÏÎ]/g,'I').replace(/[ÓÒÖÔ]/g,'O').replace(/[ÚÙÜÛ]/g,'U').replace(/[^A-ZÑ]/g,'');
    },
    isValidWord(word) {
      const n = this.normalizeWord(word); if (n.length!== CONFIG.cols) return false;
      return WORDS.includes(n) || VALID_EXTRA.has(n);
    },
    evaluateGuess(guess, answer) {
      const result = Array(5).fill('absent'); const answerCount = {};
      for (let i=0;i<5;i++) answerCount[answer[i]] = (answerCount[answer[i]]||0)+1;
      for (let i=0;i<5;i++) if (guess[i]===answer[i]) { result[i]='correct'; answerCount[guess[i]]--; }
      for (let i=0;i<5;i++) if (result[i]!=='correct' && answerCount[guess[i]]>0) { result[i]='present'; answerCount[guess[i]]--; }
      return result;
    },
    showMessage(text, duration=2000) {
      if (!DOM.message) return; DOM.message.textContent=text; DOM.message.classList.add('show');
      clearTimeout(this._msgTimer); this._msgTimer=setTimeout(()=>DOM.message.classList.remove('show'), duration);
    },
    playSound(method){ try{ if(window.AudioManager?.[method]) window.AudioManager[method](); }catch(e){} },
    vibrate(p){ try{ if(window.AudioManager?.soundsEnabled && navigator.vibrate) navigator.vibrate(p); }catch(e){} }
  };

  const Storage = {
    save() {
      const payload = { answer:State.answer, currentRow:State.currentRow, currentCol:State.currentCol, gameOver:State.gameOver, board:State.board, evaluations:State.evaluations, date:Utils.todayString(), v:VERSION };
      window.CrossletStorage?.setGame(payload);
    },
    load(){ return window.CrossletStorage?.getGame() || null; },
    getStats(){ return window.CrossletStorage?.getStats() || { played:0, wins:0, streak:0, maxStreak:0, lastPlayed:null, guesses:{1:0,2:0,3:0,4:0,5:0,6:0,fail:0} }; },
    updateStats(won,row){ return window.CrossletStorage?.updateStats(won,row); }
  };

  const Board = {
    render(){
      DOM.rows=document.querySelectorAll('.board-row');
      const saved=Storage.load();
      if(saved && saved.date===Utils.todayString() && WORDS.includes(saved.answer)){
        State.answer=saved.answer; State.currentRow=saved.currentRow; State.currentCol=saved.currentCol; State.gameOver=saved.gameOver; State.board=saved.board; State.evaluations=saved.evaluations;
        for(let r=0;r<CONFIG.maxRows;r++){
          const rowWord=State.board[r]||''; const evals=State.evaluations[r]||[]; const rowEl=DOM.rows[r]; if(!rowEl) continue;
          for(let c=0;c<CONFIG.cols;c++){ const tile=rowEl.children[c]; if(!tile) continue; tile.className='board-tile'; const letter=rowWord[c]||''; tile.textContent=letter; if(letter) tile.classList.add('filled'); if(evals[c]) tile.classList.add(evals[c]); }
        }
        this.updateKeyboardColors(); if(State.gameOver) setTimeout(()=>this.showEndModal(),300);
      } else {
        State.answer=Utils.pickDailyWord(); State.board=Array(CONFIG.maxRows).fill(''); State.evaluations=Array(CONFIG.maxRows).fill(null);
        State.currentRow=0; State.currentCol=0; State.gameOver=false;
        if(saved && saved.date!==Utils.todayString()) window.CrossletStorage?.clearGame?.(); Storage.save();
      }
    },
    addLetter(letter){
      letter=Utils.normalizeWord(letter); if(!letter||letter.length!==1) return;
      if(State.gameOver||State.isProcessing||State.currentCol>=CONFIG.cols||State.evaluations[State.currentRow]) return;
      const tile=DOM.rows[State.currentRow]?.children[State.currentCol]; if(!tile) return;
      tile.textContent=letter; tile.classList.add('filled','pop'); setTimeout(()=>tile.classList.remove('pop'),120);
      State.board[State.currentRow]=(State.board[State.currentRow]||'')+letter; State.currentCol++; Storage.save(); this.updateSubmitState(); Utils.playSound('playType');
    },
    removeLetter(){
      if(State.gameOver||State.isProcessing||State.currentCol<=0||State.evaluations[State.currentRow]) return;
      State.currentCol--; const tile=DOM.rows[State.currentRow]?.children[State.currentCol]; if(!tile) return;
      tile.textContent=''; tile.classList.remove('filled'); State.board[State.currentRow]=State.board[State.currentRow].slice(0,-1); Storage.save(); this.updateSubmitState(); Utils.playSound('playDelete');
    },
    updateSubmitState(){
      const enterKey=document.querySelector('.key[data-key="ENTER"]'); if(!enterKey) return;
      enterKey.classList.toggle('ready', State.currentCol>=CONFIG.cols &&!State.gameOver);
    },
    submit(){
      if(State.gameOver||State.isProcessing) return;
      if(State.currentCol<CONFIG.cols){ Utils.showMessage('Faltan letras'); this.shakeRow(State.currentRow); Utils.playSound('playError'); Utils.vibrate(40); return; }
      const guess=Utils.normalizeWord(State.board[State.currentRow]);
      if(!Utils.isValidWord(guess)){ Utils.showMessage('Esa palabra no está en la lista'); this.shakeRow(State.currentRow); Utils.playSound('playError'); Utils.vibrate(40); return; }
      Utils.playSound('playSubmit'); State.isProcessing=true;
      const evals=Utils.evaluateGuess(guess, State.answer); State.evaluations[State.currentRow]=evals;
      this.animateFlip(State.currentRow, evals, ()=>{
        this.updateKeyboardColors(); State.isProcessing=false;
        if(guess===State.answer){ State.gameOver=true; this.winRow(State.currentRow); Storage.save(); const stats=Storage.updateStats(true, State.currentRow); Utils.playSound('playWin'); Utils.vibrate([30,40,30,40,60]); this.showEndModal(true, stats); }
        else if(State.currentRow>=CONFIG.maxRows-1){ State.gameOver=true; Storage.save(); const stats=Storage.updateStats(false, State.currentRow); Utils.playSound('playLose'); Utils.vibrate(80); this.showEndModal(false, stats); }
        else { State.currentRow++; State.currentCol=0; Storage.save(); this.updateSubmitState(); }
      });
    },
    animateFlip(row, evals, cb){
      const rowEl=DOM.rows[row]; if(!rowEl) return; const soundByEval={correct:'playCorrect', present:'playPresent', absent:'playAbsent'};
      for(let c=0;c<CONFIG.cols;c++){ const tile=rowEl.children[c]; setTimeout(()=>{ tile.classList.add('flip'); setTimeout(()=>{ tile.classList.add(evals[c]); tile.classList.remove('flip'); Utils.playSound(soundByEval[evals[c]]||'playAbsent'); },250); }, c*90); }
      setTimeout(cb, 900);
    },
    shakeRow(row){ const rowEl=DOM.rows[row]; if(!rowEl) return; rowEl.classList.add('shake'); setTimeout(()=>rowEl.classList.remove('shake'),500); },
    winRow(row){ DOM.rows[row]?.classList.add('win'); },
    updateKeyboardColors(){
      const keyMap={}; for(let r=0;r<=State.currentRow;r++){ const word=State.board[r]; const evals=State.evaluations[r]; if(!word||!evals) continue; for(let c=0;c<word.length;c++){ const l=word[c]; const ev=evals[c]; const prev=keyMap[l]; if(!prev) keyMap[l]=ev; else if(prev==='absent'&&ev!=='absent') keyMap[l]=ev; else if(prev==='present'&&ev==='correct') keyMap[l]=ev; } }
      document.querySelectorAll('.key').forEach(k=>{ const letter=k.getAttribute('data-key'); if(!letter||letter.length!==1) return; k.classList.remove('correct','present','absent'); if(keyMap[letter]) k.classList.add(keyMap[letter]); });
    },
    showEndModal(won, stats){
      if(typeof won==='undefined') won=State.board.includes(State.answer);
      const modal=document.getElementById('statsModalGame'); if(!modal) return; if(!stats) stats=Storage.getStats();
      if(DOM.statPlayed) DOM.statPlayed.textContent=stats.played; if(DOM.statWin) DOM.statWin.textContent=stats.played?Math.round((stats.wins/stats.played)*100):0;
      if(DOM.statStreak) DOM.statStreak.textContent=stats.streak; if(DOM.statMax) DOM.statMax.textContent=stats.maxStreak;
      if(DOM.gameResult) DOM.gameResult.textContent=won?'¡Ganaste!':'Fin de la partida'; if(DOM.correctWord) DOM.correctWord.textContent=won?'':'Respuesta: '+State.answer;
      modal.classList.remove('hidden'); modal.classList.add('fade-in');
    }
  };

  const Keyboard = {
    bind(){ document.querySelectorAll('.key').forEach(k=>k.addEventListener('click',()=>this.handle(k.getAttribute('data-key')))); document.addEventListener('keydown',(e)=>{ if(e.ctrlKey||e.metaKey||e.altKey) return; if(e.key==='Enter') this.handle('ENTER'); else if(e.key==='Backspace'||e.key==='Delete') this.handle('BACKSPACE'); else { const key=Utils.normalizeWord(e.key); if(/^[A-ZÑ]$/.test(key)) this.handle(key); } }); },
    handle(key){ if(key==='ENTER') Board.submit(); else if(key==='BACKSPACE') Board.removeLetter(); else if(key&&key.length===1) Board.addLetter(key); }
  };

  const Modals = {
    bind(){
      DOM.helpBtn?.addEventListener('click',()=>this.open('helpModalGame')); DOM.statsBtn?.addEventListener('click',()=>Board.showEndModal()); DOM.audioBtn?.addEventListener('click',()=>this.open('audioModalGame'));
      document.querySelectorAll('.close-modal').forEach(btn=>btn.addEventListener('click',()=>this.close(btn.getAttribute('data-close'))));
      document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',(e)=>{ if(e.target===m) this.close(m.id); }));
      document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') document.querySelectorAll('.modal:not(.hidden)').forEach(m=>this.close(m.id)); });
      DOM.toggleSoundsBtn?.addEventListener('click',()=>{ if(!window.AudioManager) return; const en=window.AudioManager.toggleSounds(); DOM.toggleSoundsBtn.textContent=en?'Activado':'Desactivado'; });
      DOM.toggleMusicBtn?.addEventListener('click',()=>{ if(!window.AudioManager) return; const en=window.AudioManager.toggleMusic(); DOM.toggleMusicBtn.textContent=en?'Activada':'Desactivada'; });
    },
    open(id){ const el=document.getElementById(id); if(!el) return; el.classList.remove('hidden'); el.classList.add('fade-in'); },
    close(id){ const el=document.getElementById(id); if(!el) return; el.classList.add('fade-out'); setTimeout(()=>{ el.classList.add('hidden'); el.classList.remove('fade-in','fade-out'); },180); }
  };

  const Share = {
    bind(){
      DOM.shareBtn?.addEventListener('click', async () => {
        DOM.shareBtn.disabled = true; const oldText = DOM.shareBtn.textContent; DOM.shareBtn.textContent = 'Generando...';
        try {
          const { text, file } = await this.buildShareImage();
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], text, title: 'Crosslet ' + VERSION });
            Utils.showMessage('¡Imagen lista para WhatsApp!');
          } else if (navigator.share) {
            await navigator.share({ text, title: 'Crosslet ' + VERSION }).catch(() => this.copyOrShow(text));
          } else {
            if (file) this.downloadFile(file);
            this.copyOrShow(text);
          }
        } catch (err) {
          this.copyOrShow(this.buildShareText());
        } finally {
          DOM.shareBtn.disabled = false; DOM.shareBtn.textContent = oldText || 'Compartir';
        }
      });
      DOM.newGameBtn?.addEventListener('click',()=>{ if(confirm('¿Nueva partida? El reto diario se conserva.')){ window.CrossletStorage?.clearGame(); location.reload(); } });
    },
    buildShareText(){
      const won=State.board.includes(State.answer); let out=`Crosslet ${VERSION} ${Utils.todayString()} ${won?State.currentRow+1:'X'}/6\n\n`;
      for(let r=0;r<=State.currentRow;r++){ const evals=State.evaluations[r]; if(!evals) continue; out+=evals.map(e=>e==='correct'?'🟩':e==='present'?'🟨':'⬜').join('')+'\n'; }
      out+=`\nJuega en: ${location.href}`;
      return out;
    },
    async buildShareImage(){
      const text=this.buildShareText();
      const rows=State.evaluations.filter(Boolean);
      const W=540,H=700;
      const canvas=document.createElement('canvas'); canvas.width=W; canvas.height=H;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#121213'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ffffff'; ctx.font='bold 34px system-ui, sans-serif'; ctx.textAlign='center'; ctx.fillText('CROSSLET', W/2, 54);
      ctx.font='16px system-ui, sans-serif'; ctx.fillStyle='#818384';
      const won=State.board.includes(State.answer);
      ctx.fillText(`${Utils.todayString()} • ${won?State.currentRow+1:'X'}/6 • ${VERSION}`, W/2, 82);
      const tileSize=60,gap=8, totalW=5*tileSize+4*gap, startX=(W-totalW)/2; let startY=115;
      rows.forEach(evals=>{
        evals.forEach((ev,c)=>{
          const x=startX + c*(tileSize+gap), y=startY;
          if(ev==='correct') ctx.fillStyle='#538d4e'; else if(ev==='present') ctx.fillStyle='#b59f3b'; else ctx.fillStyle='#3a3a3c';
          ctx.beginPath(); ctx.roundRect(x,y,tileSize,tileSize,6); ctx.fill();
        }); startY+=tileSize+gap;
      });
      ctx.fillStyle='#ffffff'; ctx.font='bold 15px system-ui, sans-serif'; ctx.fillText('crosslet.vercel.app', W/2, H-28);
      const blob=await new Promise(r=>canvas.toBlob(r,'image/png',1));
      const file=new File([blob], `crosslet-${Utils.todayString()}.png`, {type:'image/png'});
      return {text,file};
    },
    downloadFile(file){ const url=URL.createObjectURL(file); const a=document.createElement('a'); a.href=url; a.download=file.name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); },
    copyOrShow(text){ if(navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(()=>Utils.showMessage('Resultado copiado')).catch(()=>Utils.showMessage(text,4000)); else Utils.showMessage(text,4000); }
  };

  const App = {
    cache(){
      DOM.board=document.getElementById('board'); DOM.message=document.getElementById('message'); DOM.helpBtn=document.getElementById('helpBtnGame'); DOM.statsBtn=document.getElementById('statsBtnGame'); DOM.audioBtn=document.getElementById('audioBtnGame');
      DOM.statPlayed=document.getElementById('statPlayed'); DOM.statWin=document.getElementById('statWin'); DOM.statStreak=document.getElementById('statStreak'); DOM.statMax=document.getElementById('statMax');
      DOM.gameResult=document.getElementById('gameResult'); DOM.correctWord=document.getElementById('correctWord'); DOM.shareBtn=document.getElementById('shareBtn'); DOM.newGameBtn=document.getElementById('newGameBtn');
      DOM.toggleSoundsBtn=document.getElementById('toggleSoundsBtn'); DOM.toggleMusicBtn=document.getElementById('toggleMusicBtn');
    },
    init(){ this.cache(); Board.render(); Board.updateSubmitState(); Keyboard.bind(); Modals.bind(); Share.bind(); document.documentElement.setAttribute('data-version', VERSION); console.log(`Crosslet ${VERSION} listo`); }
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>App.init()); else App.init();
})();