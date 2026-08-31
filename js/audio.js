/**
 * CROSSLET - js/audio.js
 * Sistema de audio 100% local y offline.
 *
 * No existen archivos de música/efectos empaquetados en el proyecto,
 * así que los sonidos se generan con Web Audio API (osciladores simples,
 * sin muestras externas, sin CDN, sin red). Si el navegador bloquea el
 * audio o la API no está disponible, el juego debe seguir funcionando
 * con normalidad: todo está protegido con try/catch y comprobaciones.
 */
(function () {
  'use strict';

  const AudioManager = {
    initialized: false,
    unlocked: false,
    ctx: null,
    musicNodes: null,
    soundsEnabled: true,
    musicEnabled: true,

    init() {
      if (this.initialized) return;
      this.initialized = true;

      const settings = window.CrossletStorage ? window.CrossletStorage.getSettings() : null;
      if (settings) {
        this.soundsEnabled = settings.soundsEnabled;
        this.musicEnabled = settings.musicEnabled;
      }

      // El AudioContext se crea perezosamente en unlock(), tras la
      // primera interacción del usuario, porque los navegadores
      // bloquean el audio automático.
      const unlockOnce = () => {
        this.unlock();
        document.removeEventListener('pointerdown', unlockOnce);
        document.removeEventListener('keydown', unlockOnce);
      };
      document.addEventListener('pointerdown', unlockOnce, { passive: true });
      document.addEventListener('keydown', unlockOnce);
    },

    unlock() {
      if (this.unlocked) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        this.unlocked = true;
        if (this.musicEnabled) this.startMusic();
      } catch (e) {
        // Si el audio no está disponible, el juego sigue funcionando
        // en silencio: nunca debe lanzar un error visible al usuario.
        this.unlocked = false;
        this.ctx = null;
      }
    },

    // Genera un tono simple. Toda la síntesis está envuelta en
    // try/catch: un fallo aquí nunca debe interrumpir el juego.
    _tone(freq, duration, opts) {
      if (!this.ctx) return;
      opts = opts || {};
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = opts.type || 'sine';
        osc.frequency.setValueAtTime(freq, now);
        if (opts.slideTo) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(opts.slideTo, 1), now + duration);
        }
        const peak = opts.volume != null ? opts.volume : 0.12;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
      } catch (e) {
        /* silencioso a propósito */
      }
    },

    _sequence(notes) {
      if (!this.ctx) return;
      let t = 0;
      notes.forEach((n) => {
        setTimeout(() => this._tone(n.freq, n.dur, n.opts), t);
        t += n.gap != null ? n.gap : n.dur * 1000;
      });
    },

    playIfEnabled(fn) {
      if (!this.soundsEnabled) return;
      if (!this.unlocked) this.unlock();
      if (!this.ctx) return;
      try { fn(); } catch (e) { /* silencioso */ }
    },

    playType() {
      this.playIfEnabled(() => this._tone(520, 0.045, { type: 'sine', volume: 0.06 }));
    },
    playDelete() {
      this.playIfEnabled(() => this._tone(260, 0.05, { type: 'sine', volume: 0.05 }));
    },
    playSubmit() {
      this.playIfEnabled(() => this._tone(400, 0.09, { type: 'triangle', volume: 0.08, slideTo: 480 }));
    },
    playError() {
      this.playIfEnabled(() => this._sequence([
        { freq: 220, dur: 0.09, opts: { type: 'square', volume: 0.07 } },
        { freq: 170, dur: 0.12, opts: { type: 'square', volume: 0.07 }, gap: 90 }
      ]));
    },
    playCorrect() {
      this.playIfEnabled(() => this._tone(660, 0.09, { type: 'sine', volume: 0.08, slideTo: 720 }));
    },
    playPresent() {
      this.playIfEnabled(() => this._tone(500, 0.08, { type: 'sine', volume: 0.07 }));
    },
    playAbsent() {
      this.playIfEnabled(() => this._tone(220, 0.07, { type: 'sine', volume: 0.04 }));
    },
    playWin() {
      this.playIfEnabled(() => this._sequence([
        { freq: 523, dur: 0.11, opts: { type: 'triangle', volume: 0.09 } },
        { freq: 659, dur: 0.11, opts: { type: 'triangle', volume: 0.09 }, gap: 100 },
        { freq: 784, dur: 0.18, opts: { type: 'triangle', volume: 0.1 }, gap: 100 }
      ]));
    },
    playLose() {
      this.playIfEnabled(() => this._sequence([
        { freq: 300, dur: 0.14, opts: { type: 'sine', volume: 0.07 } },
        { freq: 240, dur: 0.22, opts: { type: 'sine', volume: 0.06 }, gap: 130 }
      ]));
    },

    startMusic() {
      // No hay archivo de música empaquetado en el proyecto; se deja el
      // enganche listo (musicEnabled/toggleMusic) sin reproducir nada
      // para no inventar una pista que no existe. Si en el futuro se
      // añade un audio/música real (ej. assets/music/8-bit.mp3), este
      // método es el punto de enganche.
    },
    stopMusic() {
      if (this.musicNodes) {
        try { this.musicNodes.forEach((n) => n.stop && n.stop()); } catch (e) { /* silencioso */ }
        this.musicNodes = null;
      }
    },

    toggleSounds() {
      this.soundsEnabled = !this.soundsEnabled;
      this._saveSettings();
      return this.soundsEnabled;
    },
    toggleMusic() {
      this.musicEnabled = !this.musicEnabled;
      if (!this.musicEnabled) this.stopMusic();
      else if (this.unlocked) this.startMusic();
      this._saveSettings();
      return this.musicEnabled;
    },
    _saveSettings() {
      if (window.CrossletStorage) {
        window.CrossletStorage.setSettings({
          soundsEnabled: this.soundsEnabled,
          musicEnabled: this.musicEnabled
        });
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AudioManager.init());
  } else {
    AudioManager.init();
  }

  window.AudioManager = AudioManager;
})();
