/**
 * CROSSLET - app.js
 * Logic for index.html menu - FIXED & POLISHED
 * 100% offline, no dependencies
 */

(function () {
  'use strict';

  const DOM = {
    helpBtn: null,
    howBtn: null,
    statsBtn: null,
    helpModal: null,
    toggleSoundsBtn: null
  };

  const State = {
    isModalOpen: false,
    activeModalId: null,
    touchStartY: 0,
    lastFocusedEl: null
  };

  // Almacenamiento delegado a js/storage.js (CrossletStorage), compartido
  // con game.js, para no mantener dos sistemas distintos que hagan lo mismo.

  const ModalManager = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      State.isModalOpen = true;
      State.activeModalId = modalId;
      State.lastFocusedEl = document.activeElement;

      modal.classList.remove('hidden', 'fade-out');
      modal.classList.add('fade-in');
      document.body.style.overflow = 'hidden';

      const focusable = modal.querySelector('button, [data-close]');
      if (focusable) setTimeout(() => focusable.focus(), 50);
    },
    close(modalId) {
      const targetId = modalId || State.activeModalId;
      if (!targetId) return;
      const modal = document.getElementById(targetId);
      if (!modal) return;

      modal.classList.remove('fade-in');
      modal.classList.add('fade-out');

      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('fade-out');
        State.isModalOpen = false;
        State.activeModalId = null;
        document.body.style.overflow = '';
        if (State.lastFocusedEl && typeof State.lastFocusedEl.focus === 'function') {
          State.lastFocusedEl.focus();
        }
        State.lastFocusedEl = null;
      }, 180);
    },
    closeAll() {
      if (State.activeModalId) this.close(State.activeModalId);
    },
    bindEvents() {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.close(modal.id);
        });

        modal.addEventListener('touchstart', (e) => {
          State.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        modal.addEventListener('touchend', (e) => {
          const diff = e.changedTouches[0].clientY - State.touchStartY;
          if (diff > 80) this.close(modal.id);
        }, { passive: true });
      });

      document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
          this.close(btn.getAttribute('data-close'));
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && State.isModalOpen) this.closeAll();
      });
    }
  };

  const MenuAnimations = {
    init() {
      // FIX: el selector anterior ('.mini-example.tile') buscaba un único
      // elemento con ambas clases a la vez, pero en el HTML '.mini-example'
      // es el contenedor y '.tile' son sus hijos. Nunca coincidía con nada.
      const tiles = document.querySelectorAll('.mini-example .tile');
      if (!tiles.length) return;

      let index = 0;
      this._timer = setInterval(() => {
        tiles.forEach(t => t.classList.remove('pop'));
        const tile = tiles[index % tiles.length];
        if (!tile) return;
        tile.classList.add('pop');
        index++;
      }, 900);

      // Respeta la preferencia de menos movimiento: sin parpadeo continuo.
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        clearInterval(this._timer);
      }
    }
  };

  const App = {
    cacheDom() {
      DOM.helpBtn = document.getElementById('helpBtn');
      DOM.howBtn = document.getElementById('howBtn');
      DOM.statsBtn = document.getElementById('statsBtn');
      DOM.helpModal = document.getElementById('helpModal');
      DOM.toggleSoundsBtn = document.getElementById('toggleSoundsMenuBtn');
    },
    bind() {
      DOM.helpBtn?.addEventListener('click', () => ModalManager.open('helpModal'));
      DOM.howBtn?.addEventListener('click', () => ModalManager.open('helpModal'));

      // Si existe statsBtn en menú, abre stats directo en game.html
      DOM.statsBtn?.addEventListener('click', () => {
        window.location.href = 'game.html';
      });

      DOM.toggleSoundsBtn?.addEventListener('click', () => {
        if (!window.AudioManager) return;
        const enabled = window.AudioManager.toggleSounds();
        DOM.toggleSoundsBtn.textContent = enabled ? 'Activado' : 'Desactivado';
        DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(enabled));
      });
      this.syncSoundButton();

      ModalManager.bindEvents();
    },
    syncSoundButton() {
      if (!DOM.toggleSoundsBtn || !window.AudioManager) return;
      const enabled = window.AudioManager.soundsEnabled;
      DOM.toggleSoundsBtn.textContent = enabled ? 'Activado' : 'Desactivado';
      DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(enabled));
    },
    preloadGameAssets() {
      const warm = () => {
        if (window.CrossletStorage) window.CrossletStorage.ensureStats();
        // prefetch solo si no existe ya
        if (!document.querySelector('link[href="game.html"]')) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = 'game.html';
          document.head.appendChild(link);
        }
      };

      if ('requestIdleCallback' in window) requestIdleCallback(warm);
      else setTimeout(warm, 400);
    },
    init() {
      this.cacheDom();
      this.bind();
      this.preloadGameAssets();
      MenuAnimations.init();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();