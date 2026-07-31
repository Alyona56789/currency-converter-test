import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export default {
  namespaced: true,
  
  state: () => ({
    rates: [],
    loading: false,
    error: null,
    lastFetched: null 
  }),

  getters: {
    getRates: (state) => state.rates,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    isCacheValid: (state) => {
      if (!state.lastFetched) return false;
      const fiveMinutes = 5 * 60 * 1000;
      return (Date.now() - state.lastFetched) < fiveMinutes;
    }
  },

  mutations: {
    SET_RATES(state, rates) {
      state.rates = rates;
      state.lastFetched = Date.now();
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    async fetchRates({ commit, getters }) {
      if (getters.isCacheValid) {
        console.log('[Store] Используем кэшированные курсы');
        return;
      }

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.get(`${API_URL}/rates`);
        commit('SET_RATES', response.data);
      } catch (err) {
        commit('SET_ERROR', err.message);
        console.error('[Store] Ошибка получения курсов:', err.message);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  }
};