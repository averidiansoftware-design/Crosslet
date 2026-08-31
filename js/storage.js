/**
 * CROSSLET - js/storage.js
 * Capa de almacenamiento robusta y compartida entre index.html y game.html.
 * Valida tipos, recupera datos corruptos y evita romper el juego si
 * localStorage no está disponible.
 */
(function () {
  'use strict';

  const STATS_KEY = 'crosslet_stats_v2_es';
  const GAME_KEY = 'crosslet_game_v3_es';
  const SETTINGS_KEY = 'crosslet_audio_settings';

  function todayString() {
    return new Date().toISOString().split('T')[0];
  }

  function safeGetRaw(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('[CROSSLET Storage] getItem falló para', key, e);
      return null;
    }
  }

  function safeSetRaw(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('[CROSSLET Storage] setItem falló para', key, e);
      return false;
    }
  }

  function isFiniteNumber(n) {
    return typeof n === 'number' && Number.isFinite(n);
  }

  function defaultStats() {
    return {
      played: 0,
      wins: 0,
      streak: 0,
      maxStreak: 0,
      lastPlayed: null,
      guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 }
    };
  }

  // Valida y sanea un objeto de estadísticas leído de localStorage.
  // Cualquier campo con tipo o valor imposible se sustituye por un
  // valor seguro en lugar de romper el juego.
  function sanitizeStats(data) {
    const safe = defaultStats();
    if (!data || typeof data !== 'object') return safe;

    if (isFiniteNumber(data.played) && data.played >= 0) safe.played = Math.floor(data.played);
    if (isFiniteNumber(data.wins) && data.wins >= 0) safe.wins = Math.floor(data.wins);
    if (isFiniteNumber(data.streak) && data.streak >= 0) safe.streak = Math.floor(data.streak);
    if (isFiniteNumber(data.maxStreak) && data.maxStreak >= 0) safe.maxStreak = Math.floor(data.maxStreak);
    if (typeof data.lastPlayed === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.lastPlayed)) {
      safe.lastPlayed = data.lastPlayed;
    }

    // wins nunca puede superar played
    if (safe.wins > safe.played) safe.wins = safe.played;
    // streak nunca puede superar maxStreak salvo que lo actualicemos ahora
    if (safe.streak > safe.maxStreak) safe.maxStreak = safe.streak;

    if (data.guesses && typeof data.guesses === 'object') {
      ['1', '2', '3', '4', '5', '6', 'fail'].forEach((k) => {
        const v = data.guesses[k];
        if (isFiniteNumber(v) && v >= 0) safe.guesses[k] = Math.floor(v);
      });
    }

    return safe;
  }

  function defaultSettings() {
    return { soundsEnabled: true, musicEnabled: true };
  }

  function sanitizeSettings(data) {
    const safe = defaultSettings();
    if (!data || typeof data !== 'object') return safe;
    if (typeof data.soundsEnabled === 'boolean') safe.soundsEnabled = data.soundsEnabled;
    if (typeof data.musicEnabled === 'boolean') safe.musicEnabled = data.musicEnabled;
    return safe;
  }

  const StorageManager = {
    KEYS: { STATS: STATS_KEY, GAME: GAME_KEY, SETTINGS: SETTINGS_KEY },

    isAvailable() {
      try {
        const testKey = '__crosslet_test__';
        localStorage.setItem(testKey, '1');
        const ok = localStorage.getItem(testKey) === '1';
        localStorage.removeItem(testKey);
        return ok;
      } catch (e) {
        return false;
      }
    },

    getStats() {
      const raw = safeGetRaw(STATS_KEY);
      if (!raw) return defaultStats();
      try {
        return sanitizeStats(JSON.parse(raw));
      } catch (e) {
        console.warn('[CROSSLET Storage] Estadísticas corruptas, se reinician', e);
        return defaultStats();
      }
    },

    setStats(stats) {
      const safe = sanitizeStats(stats);
      return safeSetRaw(STATS_KEY, JSON.stringify(safe));
    },

    ensureStats() {
      const raw = safeGetRaw(STATS_KEY);
      if (raw) return this.getStats();
      const fresh = defaultStats();
      this.setStats(fresh);
      return fresh;
    },

    // Registra el resultado de la partida diaria. Idempotente: si ya se
    // contabilizó hoy, no vuelve a sumar (evita doble conteo al recargar
    // o al re-disparar el evento de fin de partida).
    updateStats(won, attemptRow) {
      const stats = this.getStats();
      const today = todayString();
      if (stats.lastPlayed === today) return stats;

      stats.played++;
      stats.lastPlayed = today;

      if (won) {
        stats.wins++;
        stats.streak++;
        if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
        const key = String(attemptRow + 1);
        if (stats.guesses[key] !== undefined) stats.guesses[key]++;
      } else {
        stats.streak = 0;
        stats.guesses.fail++;
      }

      this.setStats(stats);
      return stats;
    },

    getGame() {
      const raw = safeGetRaw(GAME_KEY);
      if (!raw) return null;
      try {
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object') return null;
        if (data.date !== todayString()) return null;
        if (typeof data.answer !== 'string' || !data.answer) return null;
        if (!Array.isArray(data.board) || !Array.isArray(data.evaluations)) return null;
        return data;
      } catch (e) {
        console.warn('[CROSSLET Storage] Partida guardada corrupta, se descarta', e);
        return null;
      }
    },

    setGame(payload) {
      return safeSetRaw(GAME_KEY, JSON.stringify(payload));
    },

    clearGame() {
      try {
        localStorage.removeItem(GAME_KEY);
        return true;
      } catch (e) {
        return false;
      }
    },

    getSettings() {
      const raw = safeGetRaw(SETTINGS_KEY);
      if (!raw) return defaultSettings();
      try {
        return sanitizeSettings(JSON.parse(raw));
      } catch (e) {
        return defaultSettings();
      }
    },

    setSettings(settings) {
      const safe = sanitizeSettings(settings);
      return safeSetRaw(SETTINGS_KEY, JSON.stringify(safe));
    },

    todayString
  };

  window.CrossletStorage = StorageManager;
})();
