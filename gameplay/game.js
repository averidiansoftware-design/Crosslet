/**
 * CROSSLET - gameplay/game.js
 * Full Wordle Engine - Offline - FIXED & POLISHED
 */

(function () {
  'use strict';

  const WORDS = [
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
    "ALERO","DETEN","QUEMA","BROCA","SUEÑO","LLAGA","SIRVE","FRENE","TURNO","NACEN",
    "NEGRO","BERZA","UNICO","ARNES","BRAMA","JEFES","TENGO","GOLEO","GUSTE","BONZO",
    "ROBOT","PORTE","ANOTE","ZURDO","SIETE","BOINA","DUROS","BOMBA","HIELA","ACUSO",
    "DOSEL","SERIA","VILLA","BRIZA","DARDO","CANTA","BAMBA","CANTO","USADA","SIGLA",
    "DICHO","DESUS","NIEGO","BASAR","CULPO","IDEAR","CIFRA","LECHA","AVENA","GUIAR",
    "AGRIO","BARDO","BROTE","BATEO","RODAR","FALTA","CORRA","COLMO","ABREN","ADOBE",
    "AVION","VACIA","TALLE","FECHO","BIELA","LOGIA","DUELA","GAMBA","INSTO","TRABO",
    "BISTE","BISTA","GRABE","CLAVO","SUBIR","ANIME","CAPTE","BREVA","NUBES","TARDA",
    "CABIO","BRASA","FURIA","TALLO","OLIVO","BARBO","AFAMA","TRAMO","TECHO","FLEMA",
    "FIRMO","HUEVO","ZANJO","TOTAL","DEBEN","FRENO","GOLEA","GALON","IDEAS","DONDE",
    "EDITO","HECHO","VARON","AFAME","COSTO","DICHA","DUDAR","MENOS","VENIA","SABED",
    "TARDE","COLMA","CASAR","CONTO","SUCIA","REUNI","BRUTA","BELLE","VIAJE","ADIOS",
    "CERRO","CRIBA","CONTA","CAPAZ","DENTE","GOLEE","ABRAS","DUELO","ARETE","AMAGA",
    "JUEGO","DESEO","ANIMA","ACATO","ACETO","RESTO","PUEDA","NIVEL","PEINO","LISTA",
    "ACEDA","SUENE","ATACA","DOTAR","CEIBO","SERIO","SILLA","LINDE","DORSO","ACATE",
    "FREIR","MITAD","ROBAN","ASEAR","DEJES","DATOS","IGUAL","CARRO","DURAR","ACERE",
    "SOLAR","AFINA","AZOTE","BUDIN","TREPO","CAIDA","DONAR","OPACO","CHICO","CERDO",
    "ACUDA","TRUCO","LLEGA","SECAR","OCASO","FLACO","DESEE","ALISE","ACEDO","CINCO",
    "SABIA","LABRE","IRIAS","PELAR","IMITA","SALTA","APAGA","BORRA","DIRAN","RABIA",
    "CONTE","LEERA","BEATA","PARED","DALIA","AFINO","ABRAN","CAPTO","HOJAS","GUISE",
    "ACOGE","TOMAR","TABLA","PENAL","ACUDO","AIREA","BRAGA","IDEAL","ETAPA","SITIO",
    "BISEL","PONER","CLASE","LLEVA","GANAS","COLOR","POBRE","EDITE","LLENE","BRAZO",
    "PLACA","RODEA","ARTES","CELOS","ENVIA","PINTA","LETRA","BROZO","BIOMA","FLOTE",
    "DEDOS","BANDA","BRUJO","JUGAR","OPERA","DEVEN","CUERO","ABRIR","BASCA","BANCA",
    "VIOLA","OCUPA","JALEA","VIENE","MONTE","HALLE","BRISA","LOGRE","ACATA","LOGRA",
    "BOLSA","GESTA","CANEA","PISTA","BUFAR","ARGOT","MACHO","BOCIO","BAGRE","BANAR",
    "LUCHA","ADORA","ANDAR","CABES","BASTE","COLAS","LABRA","PIZZA","VALLE","DEBIA",
    "ACABE","UNION","ELEVO","MORIA","SUMAR","BUFON","BORDE","BAMBU","ACUNO","AMASA",
    "FRESA","HUIDA","CALMA","COLME","SELLO","DUENO","NIEVE","ADORO","CABRE","VIAJO",
    "TACHE","CASCO","LADRO","CAMPO","BILAO","VACIE","DICTE","BOCAL","ARPON","LLAVE",
    "AMAGO","FANAL","MUEVE","INFLO","SIRVA","TODOS","MUERE","ACUSE","HONRA","CEDRO",
    "FALSO","NARRO","MEDIR","BICHE","PRIMA","RANGO","IMITE","ATRIL","AFAMO","SUPLE",
    "BURGO","USARA","VOLAR","BELLO","EBANO","BACON","INFLA","DIGAN","LUGAR","CALCE",
    "GENTE","FORMA","PELEA","CINTA","DADOS","MUERO","GUAPO","POSES","CAERA","LLANA",
    "ROBAD","HUELE","GERBO","FLOTO","BEBES","ANCLA","PODER","AFINE","BESAR","CACAO",
    "OIRSE","METER","METIO","SOCIO","BURDO","LAPIZ","DEBIO","MANGO","DECIR","PARTE",
    "TAREA","HIELO","BIRRA","PAPEL","PEGUE","CEBRA","SALIO","FECHA","BOTIN","AVISO",
    "CANJE","DUDEN","POSEE","LAVAR","PEAJE","BUCLE","TACHO","LLENO","FLAMA","MANDE",
    "LADRA","DOSIS","GRITE","CULPE","BATEL","NACER","DELGA","BOIRA","LENTO","VERAS",
    "LARGO","BICHA","ACUNE","ACABA","AMABA","BAQUE","OIDOS","EDITA","CREAR","DIQUE",
    "HIERE","DIRAS","BAILO","SUBEN","CALCO","BAJAR","OBRAR","SUBIO","CORRE","BARIO",
    "MONTO","CARTA","PECAR","NIÑAS","ACEDE","DIRIA","LINDO","CABRO","JURAR","ACASO",
    "ADOBO","FILME","ALABE","PACTO","EVITO","MANDO","OMITO","RESTA","TRATE","VOTOS",
    "BIRLO","SABER","PILAR","LLANO","NOTAN","IRENE","AGOTA","BUENA","DEBIL","NOVIO",
    "HAGAN","NARRE","CUIDE","BUSCA","LLEVO","COMER","ACUDE","CANOA","BORRO","BERRO",
    "ADOSA","NACIO","JOVEN","BULTO","DEBAS","CUIDA","BOYAS","TRABA","HABLO","JURAS",
    "YACER","BROTA","AHORA","MULTA","BRUNO","BARIA","BORDO","QUESO","ZUMBA","INSTA",
    "FALLE","PONGO","PENSO","SALTE","LIBRE","MAYOR","IRIAN","CAUSA","REINE","NINFA",
    "COSTA","ADOBA","CETRO","COBRE","AIREO","NOTAR","PLANO","VALOR","LUCES","DUETO",
    "FELIZ","ALUDO","YEGUA","GENIO","BORDA","EVADE","VIVIR","FUGAZ","CHOCA","GRITA",
    "TALLA","FRUTA","RELOJ","OBRAN","SACAR","ORDEN","CULPA","SALEN","DEUDA","RONDA",
    "BOTAR","BRUMA","APAGO","MORIR","BALSA","CIRCO","MUSEO","POLVO","ANCHO","ADORE",
    "DIGAS","CABER","ROMPO","RAZON","EVITA","ANGEL","PEGAR","AMIGA","BISES","ATAJO",
    "ENTRO","FILMO","LABRO","LANZA","GRUPO","HIGOS","INDIA","CANAS","BUCEA","CLARO",
    "CALLA","BUSCO","CANAL","ASILO","FERIA","MANDA","APOYO","NIEGA","SUEÑE","DOLOR",
    "ACERO","BROMA","CRECE","ABANE","CABLE","GALGO","ATOLE","NADIE","HOGAR","PEDIR",
    "BEBED","COGES","DINAR","FIRMA","COGIO","LEYES","ESTAR","MAGIA","RESTE","NUEVA",
    "BOMBO","CALLE","IMPAR","GANES","FINCA","ALISA","DABAN","FIRME","DONES","MURAL",
    "MOLDE","CERCA","GUISA","LACIO","IRISA","ENVIO","CACHE","SECAS","DENSE","BUCAL",
    "MUROS","NORMA","EVADO","CURSO","MEDIA","MEDIO","BONOS","OBRAS","JUNIO","BASTO",
    "PADRE","JUNTO","FRENA","BRAVA","DEMAS","TENGA","VIVEN","LUNES","TRATO","AVISA",
    "CADOS","AGUJA","SALVO","SEQUE","ESTOS","UBICO","VALES","GIRAR","ADOSE","CARGA",
    "OBVIO","DARIA","NUEVO","CENAR","CESTA","BASEN","FLOTA","JULIO","CUBRO","REUNE",
    "LINEA","BANCO","VARIA","IMPIO","BALDA","CLORO","BRAVO","ABRIL","BURRO","DONAS",
    "BRUJA","AMASO","VUELO","TIGRE","FALLO","DANZA","BEBIA","DARME","FANGO","DECIA",
    "ABRID","HALLO","VERDE","MOTOR","COFRE","LOGRO","HONRE","NOBLE","ABEJA","AFORO"
  ];
  const VALID_EXTRA = new Set();

  const CONFIG = {
    maxRows: 6,
    cols: 5,
    storageKey: 'crosslet_game_v3_es',
    statsKey: 'crosslet_stats_v2_es'
  };

  const DOM = {
    board: null, rows: [], tiles: [], keys: null, message: null,
    helpBtn: null, statsBtn: null, audioBtn: null, statPlayed: null, statWin: null,
    statStreak: null, statMax: null, gameResult: null, correctWord: null,
    shareBtn: null, newGameBtn: null, toggleSoundsBtn: null, toggleMusicBtn: null
  };

  const State = {
    answer: '', currentRow: 0, currentCol: 0, gameOver: false, board: [], evaluations: [],
    // Bloquea el input mientras se anima/evalúa una fila, para impedir
    // doble envío, escritura durante la animación o estados inconsistentes.
    isProcessing: false
  };

  const Utils = {
    todayString() {
      return new Date().toISOString().split('T')[0];
    },
    hashDate(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
      return hash;
    },
    pickDailyWord() {
      const today = this.todayString();
      const hash = this.hashDate(today);
      return WORDS[hash % WORDS.length];
    },
    normalizeWord(word) {
      return String(word || '').toUpperCase()
       .replace(/[ÁÀÄÂ]/g, 'A').replace(/[ÉÈËÊ]/g, 'E')
       .replace(/[ÍÌÏÎ]/g, 'I').replace(/[ÓÒÖÔ]/g, 'O')
       .replace(/[ÚÙÜÛ]/g, 'U').replace(/[^A-ZÑ]/g, '');
    },
    isValidWord(word) {
      const n = this.normalizeWord(word);
      if (n.length!== CONFIG.cols) return false;
      return WORDS.includes(n) || VALID_EXTRA.has(n);
    },
    // Logica de duplicados intacta - senior level
    evaluateGuess(guess, answer) {
      const result = Array(5).fill('absent');
      const answerCount = {};
      for (let i = 0; i < 5; i++) answerCount[answer[i]] = (answerCount[answer[i]] || 0) + 1;

      for (let i = 0; i < 5; i++) {
        if (guess[i] === answer[i]) {
          result[i] = 'correct';
          answerCount[guess[i]]--;
        }
      }
      for (let i = 0; i < 5; i++) {
        if (result[i] === 'correct') continue;
        if (answerCount[guess[i]] > 0) {
          result[i] = 'present';
          answerCount[guess[i]]--;
        }
      }
      return result;
    },
    showMessage(text, duration = 2000) {
      if (!DOM.message) return;
      DOM.message.textContent = text;
      DOM.message.classList.add('show');
      clearTimeout(this._msgTimer);
      this._msgTimer = setTimeout(() => DOM.message.classList.remove('show'), duration);
    },
    // Llama a un método de AudioManager si existe, sin romper nada si no.
    playSound(method) {
      try {
        if (window.AudioManager && typeof window.AudioManager[method] === 'function') {
          window.AudioManager[method]();
        }
      } catch (e) { /* silencioso a propósito */ }
    },
    // Vibración háptica opcional: nunca debe lanzar error (Safari/iOS no
    // soporta navigator.vibrate) y respeta si el usuario desactivó sonidos.
    vibrate(pattern) {
      try {
        if (!window.AudioManager || !window.AudioManager.soundsEnabled) return;
        if (navigator.vibrate) navigator.vibrate(pattern);
      } catch (e) { /* silencioso a propósito */ }
    }
  };

  // El almacenamiento real vive en js/storage.js (CrossletStorage), que ya
  // valida tipos y recupera datos corruptos. Este objeto es un adaptador
  // fino para no reescribir el resto del archivo y mantener CONFIG.storageKey
  // como única fuente de compatibilidad con partidas guardadas previas.
  const Storage = {
    save() {
      const payload = {
        answer: State.answer, currentRow: State.currentRow, currentCol: State.currentCol,
        gameOver: State.gameOver, board: State.board, evaluations: State.evaluations,
        date: Utils.todayString()
      };
      if (window.CrossletStorage) window.CrossletStorage.setGame(payload);
    },
    load() {
      if (window.CrossletStorage) return window.CrossletStorage.getGame();
      return null;
    },
    getStats() {
      if (window.CrossletStorage) return window.CrossletStorage.getStats();
      return { played: 0, wins: 0, streak: 0, maxStreak: 0, lastPlayed: null, guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 } };
    },
    updateStats(won, row) {
      if (window.CrossletStorage) return window.CrossletStorage.updateStats(won, row);
      return this.getStats();
    }
  };

  const Board = {
    render() {
      DOM.rows = document.querySelectorAll('.board-row');
      const saved = Storage.load();

      if (saved) {
        State.answer = saved.answer;
        State.currentRow = saved.currentRow;
        State.currentCol = saved.currentCol;
        State.gameOver = saved.gameOver;
        State.board = saved.board;
        State.evaluations = saved.evaluations;

        for (let r = 0; r < CONFIG.maxRows; r++) {
          const rowWord = State.board[r] || '';
          const evals = State.evaluations[r] || [];
          const rowEl = DOM.rows[r];
          if (!rowEl) continue;
          for (let c = 0; c < CONFIG.cols; c++) {
            const tile = rowEl.children[c];
            if (!tile) continue;
            tile.className = 'board-tile'; // FIX: limpia clases viejas
            const letter = rowWord[c] || '';
            tile.textContent = letter;
            if (letter) tile.classList.add('filled');
            if (evals[c]) tile.classList.add(evals[c]);
          }
        }
        this.updateKeyboardColors();
        if (State.gameOver) setTimeout(() => this.showEndModal(), 300);
      } else {
        State.answer = Utils.pickDailyWord();
        State.board = Array(CONFIG.maxRows).fill('');
        State.evaluations = Array(CONFIG.maxRows).fill(null);
        State.currentRow = 0; State.currentCol = 0; State.gameOver = false;
        Storage.save();
      }
    },
    addLetter(letter) {
      // FIX: era this.normalizeWord y no existe
      letter = Utils.normalizeWord(letter);
      if (!letter || letter.length!== 1) return;
      if (State.gameOver) return;
      if (State.isProcessing) return; // bloquea escritura durante evaluación
      if (State.currentCol >= CONFIG.cols || State.currentRow >= CONFIG.maxRows) return;
      // evita escribir en fila ya evaluada
      if (State.evaluations[State.currentRow]) return;

      const tile = DOM.rows[State.currentRow]?.children[State.currentCol];
      if (!tile) return;
      tile.textContent = letter;
      tile.classList.add('filled', 'pop');
      setTimeout(() => tile.classList.remove('pop'), 120);

      State.board[State.currentRow] = (State.board[State.currentRow] || '') + letter;
      State.currentCol++;
      Storage.save();
      this.updateSubmitState();
      Utils.playSound('playType');
    },
    removeLetter() {
      if (State.gameOver) return;
      if (State.isProcessing) return; // bloquea borrado durante evaluación
      if (State.currentCol <= 0) return;
      if (State.evaluations[State.currentRow]) return;

      State.currentCol--;
      const tile = DOM.rows[State.currentRow]?.children[State.currentCol];
      if (!tile) return;
      tile.textContent = '';
      tile.classList.remove('filled');
      State.board[State.currentRow] = State.board[State.currentRow].slice(0, -1);
      Storage.save();
      this.updateSubmitState();
      Utils.playSound('playDelete');
    },
    // Refleja visualmente si la fila actual tiene las 5 letras necesarias
    // para enviar (punto 39/40 del pulido: ENVIAR desactivado si faltan letras).
    updateSubmitState() {
      const enterKey = document.querySelector('.key[data-key="ENTER"]');
      if (!enterKey) return;
      const ready = State.currentCol >= CONFIG.cols && !State.gameOver;
      enterKey.classList.toggle('ready', ready);
    },
    submit() {
      if (State.gameOver) return;
      if (State.isProcessing) return; // evita doble envío / doble evaluación
      if (State.currentCol < CONFIG.cols) {
        Utils.showMessage('Faltan letras');
        this.shakeRow(State.currentRow);
        Utils.playSound('playError');
        Utils.vibrate(40);
        return;
      }
      const guess = Utils.normalizeWord(State.board[State.currentRow]);
      if (!Utils.isValidWord(guess)) {
        Utils.showMessage('Esa palabra no está en la lista');
        this.shakeRow(State.currentRow);
        Utils.playSound('playError');
        Utils.vibrate(40);
        return;
      }

      Utils.playSound('playSubmit');
      State.isProcessing = true;

      const evals = Utils.evaluateGuess(guess, State.answer);
      State.evaluations[State.currentRow] = evals;

      this.animateFlip(State.currentRow, evals, () => {
        this.updateKeyboardColors();
        State.isProcessing = false;
        if (guess === State.answer) {
          State.gameOver = true; this.winRow(State.currentRow); Storage.save();
          const stats = Storage.updateStats(true, State.currentRow);
          Utils.playSound('playWin');
          Utils.vibrate([30, 40, 30, 40, 60]);
          this.showEndModal(true, stats);
        } else if (State.currentRow >= CONFIG.maxRows - 1) {
          State.gameOver = true; Storage.save();
          const stats = Storage.updateStats(false, State.currentRow);
          Utils.playSound('playLose');
          Utils.vibrate(80);
          this.showEndModal(false, stats);
        } else {
          State.currentRow++; State.currentCol = 0; Storage.save();
          this.updateSubmitState();
        }
      });
    },
    animateFlip(row, evals, cb) {
      const rowEl = DOM.rows[row];
      if (!rowEl) return;
      const soundByEval = { correct: 'playCorrect', present: 'playPresent', absent: 'playAbsent' };
      for (let c = 0; c < CONFIG.cols; c++) {
        const tile = rowEl.children[c];
        setTimeout(() => {
          tile.classList.add('flip');
          setTimeout(() => {
            tile.classList.add(evals[c]);
            tile.classList.remove('flip');
            // Un sonido corto por letra, en el momento en que se revela
            // el color, no todos a la vez al enviar.
            Utils.playSound(soundByEval[evals[c]] || 'playAbsent');
          }, 250);
        }, c * 90);
      }
      setTimeout(cb, 900);
    },
    shakeRow(row) {
      const rowEl = DOM.rows[row];
      if (!rowEl) return;
      rowEl.classList.add('shake');
      setTimeout(() => rowEl.classList.remove('shake'), 500);
    },
    winRow(row) { DOM.rows[row]?.classList.add('win'); },
    updateKeyboardColors() {
      const keyMap = {};
      for (let r = 0; r <= State.currentRow; r++) {
        const word = State.board[r]; const evals = State.evaluations[r];
        if (!word ||!evals) continue;
        for (let c = 0; c < word.length; c++) {
          const l = word[c]; const ev = evals[c]; const prev = keyMap[l];
          if (!prev) keyMap[l] = ev;
          else if (prev === 'absent' && ev!== 'absent') keyMap[l] = ev;
          else if (prev === 'present' && ev === 'correct') keyMap[l] = ev;
        }
      }
      document.querySelectorAll('.key').forEach(k => {
        const letter = k.getAttribute('data-key');
        if (!letter || letter.length!== 1) return;
        k.classList.remove('correct','present','absent');
        if (keyMap[letter]) k.classList.add(keyMap[letter]);
      });
    },
    showEndModal(won, stats) {
      if (typeof won === 'undefined') won = State.board.includes(State.answer);
      const modal = document.getElementById('statsModalGame');
      if (!modal) return;
      if (!stats) stats = Storage.getStats();
      if (DOM.statPlayed) DOM.statPlayed.textContent = stats.played;
      if (DOM.statWin) DOM.statWin.textContent = stats.played? Math.round((stats.wins / stats.played) * 100) : 0;
      if (DOM.statStreak) DOM.statStreak.textContent = stats.streak;
      if (DOM.statMax) DOM.statMax.textContent = stats.maxStreak;
      if (DOM.gameResult) DOM.gameResult.textContent = won? '¡Ganaste!' : 'Fin de la partida';
      if (DOM.correctWord) DOM.correctWord.textContent = won? '' : 'Respuesta: ' + State.answer;
      modal.classList.remove('hidden'); modal.classList.add('fade-in');
    }
  };

  const Keyboard = {
    bind() {
      document.querySelectorAll('.key').forEach(k => {
        k.addEventListener('click', () => this.handle(k.getAttribute('data-key')));
      });
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Enter') this.handle('ENTER');
        else if (e.key === 'Backspace' || e.key === 'Delete') this.handle('BACKSPACE');
        else {
          const key = Utils.normalizeWord(e.key);
          if (/^[A-ZÑ]$/.test(key)) this.handle(key);
        }
      });
    },
    handle(key) {
      if (key === 'ENTER') Board.submit();
      else if (key === 'BACKSPACE') Board.removeLetter();
      else if (key && key.length === 1) Board.addLetter(key);
    }
  };

  const Modals = {
    bind() {
      DOM.helpBtn?.addEventListener('click', () => this.open('helpModalGame'));
      DOM.statsBtn?.addEventListener('click', () => Board.showEndModal());
      DOM.audioBtn?.addEventListener('click', () => this.open('audioModalGame'));
      document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => this.close(btn.getAttribute('data-close')));
      });
      document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', (e) => { if (e.target === m) this.close(m.id); });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') document.querySelectorAll('.modal:not(.hidden)').forEach(m => this.close(m.id));
      });

      DOM.toggleSoundsBtn?.addEventListener('click', () => {
        if (!window.AudioManager) return;
        const enabled = window.AudioManager.toggleSounds();
        DOM.toggleSoundsBtn.textContent = enabled ? 'Activado' : 'Desactivado';
        DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(enabled));
      });
      DOM.toggleMusicBtn?.addEventListener('click', () => {
        if (!window.AudioManager) return;
        const enabled = window.AudioManager.toggleMusic();
        DOM.toggleMusicBtn.textContent = enabled ? 'Activada' : 'Desactivada';
        DOM.toggleMusicBtn.setAttribute('aria-pressed', String(enabled));
      });
      this.syncAudioIcon();
      this.syncAudioButtons();
    },
    syncAudioButtons() {
      if (window.AudioManager) {
        if (DOM.toggleSoundsBtn) {
          DOM.toggleSoundsBtn.textContent = window.AudioManager.soundsEnabled ? 'Activado' : 'Desactivado';
          DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(window.AudioManager.soundsEnabled));
        }
        if (DOM.toggleMusicBtn) {
          DOM.toggleMusicBtn.textContent = window.AudioManager.musicEnabled ? 'Activada' : 'Desactivada';
          DOM.toggleMusicBtn.setAttribute('aria-pressed', String(window.AudioManager.musicEnabled));
        }
      }
    },
    syncAudioIcon() {
      const on = document.getElementById('audioWaveOn');
      const off = document.getElementById('audioWaveOff');
      if (!on || !off || !window.AudioManager) return;
      const enabled = window.AudioManager.soundsEnabled;
      on.style.display = enabled ? '' : 'none';
      off.style.display = enabled ? 'none' : '';
      DOM.audioBtn?.setAttribute('aria-pressed', String(enabled));
    },
    open(id) { const el = document.getElementById(id); if (!el) return; el.classList.remove('hidden'); el.classList.add('fade-in'); },
    close(id) {
      const el = document.getElementById(id); if (!el) return;
      el.classList.add('fade-out');
      setTimeout(() => { el.classList.add('hidden'); el.classList.remove('fade-in','fade-out'); }, 180);
    }
  };

  const Share = {
    bind() {
      DOM.shareBtn?.addEventListener('click', () => {
        const text = this.buildShareText();
        if (navigator.share) {
          navigator.share({ text, title: 'Crosslet' }).catch(() => this.copyOrShow(text));
        } else {
          this.copyOrShow(text);
        }
      });
      DOM.newGameBtn?.addEventListener('click', () => {
        if (confirm('¿Nueva partida? El reto diario se conserva.')) {
          if (window.CrossletStorage) window.CrossletStorage.clearGame();
          location.reload();
        }
      });
    },
    copyOrShow(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => Utils.showMessage('Resultado copiado'))
          .catch(() => Utils.showMessage(text, 4000));
      } else {
        Utils.showMessage(text, 4000);
      }
    },
    buildShareText() {
      const won = State.board.includes(State.answer);
      let out = `Crosslet ${Utils.todayString()} ${won? State.currentRow + 1 : 'X'}/6\n\n`;
      for (let r = 0; r <= State.currentRow; r++) {
        const evals = State.evaluations[r]; if (!evals) continue;
        out += evals.map(e => e === 'correct'? '🟩' : e === 'present'? '🟨' : '⬜').join('') + '\n';
      }
      return out;
    }
  };

  const App = {
    cache() {
      DOM.board = document.getElementById('board');
      DOM.message = document.getElementById('message');
      DOM.helpBtn = document.getElementById('helpBtnGame');
      DOM.statsBtn = document.getElementById('statsBtnGame');
      DOM.audioBtn = document.getElementById('audioBtnGame');
      DOM.statPlayed = document.getElementById('statPlayed');
      DOM.statWin = document.getElementById('statWin');
      DOM.statStreak = document.getElementById('statStreak');
      DOM.statMax = document.getElementById('statMax');
      DOM.gameResult = document.getElementById('gameResult');
      DOM.correctWord = document.getElementById('correctWord');
      DOM.shareBtn = document.getElementById('shareBtn');
      DOM.newGameBtn = document.getElementById('newGameBtn');
      DOM.toggleSoundsBtn = document.getElementById('toggleSoundsBtn');
      DOM.toggleMusicBtn = document.getElementById('toggleMusicBtn');
    },
    init() {
      this.cache();
      Board.render();
      Board.updateSubmitState();
      Keyboard.bind();
      Modals.bind();
      Share.bind();
      this.bindVisibility();
      // console.log('Crosslet ready -', State.answer); // <- quitado para no chivar
    },
    bindVisibility() {
      document.addEventListener('visibilitychange', () => {
        if (!window.AudioManager) return;
        if (document.hidden) {
          window.AudioManager.stopMusic();
        } else if (window.AudioManager.musicEnabled && window.AudioManager.unlocked) {
          window.AudioManager.startMusic();
        }
      });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => App.init());
  else App.init();
})();