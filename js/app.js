/**
 * CROSSLET - app.js
 * v1.2.00 - Menu Logic - FIXED & POLISHED
 * 100% offline, no dependencies
 */

(function () {
  'use strict';

  const VERSION = 'v1.2.00';
  console.log(`%c CROSSLET ${VERSION} `, 'background:#000;color:#0f0;font-weight:bold;');

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

  const ModalManager = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      if (State.isModalOpen) return; // v1.2.00: evita doble apertura

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
        if (State.lastFocusedEl?.focus) State.lastFocusedEl.focus();
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
    _timer: null,
    init() {
      const tiles = document.querySelectorAll('.mini-example.tile');
      if (!tiles.length) return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

      let index = 0;
      this._timer = setInterval(() => {
        tiles.forEach(t => t.classList.remove('pop'));
        const tile = tiles[index % tiles.length];
        tile?.classList.add('pop');
        index++;
      }, 900);
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
      DOM.statsBtn?.addEventListener('click', () => {
        window.location.href = 'game.html';
      });
      DOM.toggleSoundsBtn?.addEventListener('click', () => {
        if (!window.AudioManager) return;
        const enabled = window.AudioManager.toggleSounds();
        DOM.toggleSoundsBtn.textContent = enabled? 'Activado' : 'Desactivado';
        DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(enabled));
      });
      this.syncSoundButton();
      ModalManager.bindEvents();
    },
    syncSoundButton() {
      if (!DOM.toggleSoundsBtn ||!window.AudioManager) return;
      const enabled = window.AudioManager.soundsEnabled;
      DOM.toggleSoundsBtn.textContent = enabled? 'Activado' : 'Desactivado';
      DOM.toggleSoundsBtn.setAttribute('aria-pressed', String(enabled));
    },
    preloadGameAssets() {
      const warm = () => {
        window.CrossletStorage?.ensureStats?.();
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
      // v1.2.00 tag
      document.documentElement.setAttribute('data-version', VERSION);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();