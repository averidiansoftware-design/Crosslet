/**
 * CROSSLET - offline.js
 * Capa de robustez local - FIXED & POLISHED
 * Confirma que el juego no depende de red
 */
(function () {
  'use strict';

  const Offline = {
    version: '3.0-es',

    // Antes devolvía true siempre, ahora sí sirve
    isLocalProtocol() {
      return location.protocol === 'file:';
    },

    isHttp() {
      return location.protocol === 'http:' || location.protocol === 'https:';
    },

    markState() {
      const online = navigator.onLine;
      document.documentElement.dataset.conexion = online ? 'disponible' : 'sin-red';
      document.documentElement.dataset.offlineReady = 'true';
    },

    storageAvailable() {
      try {
        const key = '__crosslet_test__';
        localStorage.setItem(key, '1');
        const ok = localStorage.getItem(key) === '1';
        localStorage.removeItem(key);
        return ok;
      } catch (_) {
        return false;
      }
    },

    check() {
      const hasStorage = this.storageAvailable();
      if (!hasStorage) {
        console.warn('[CROSSLET Offline] localStorage no disponible');
        document.documentElement.dataset.storage = 'no-disponible';
      } else {
        document.documentElement.dataset.storage = 'ok';
      }
      this.markState();
      return hasStorage;
    }
  };

  // boot inmediato
  Offline.check();

  window.addEventListener('online', () => Offline.markState());
  window.addEventListener('offline', () => Offline.markState());

  // exposición global intacta
  window.CrossletOffline = Offline;
})();