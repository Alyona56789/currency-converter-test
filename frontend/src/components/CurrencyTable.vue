<template>
  <div class="currency-table">
    <h2>Курсы валют ЦБ РФ</h2>

    <div v-if="loading" class="status">Загрузка...</div>
    <div v-else-if="hasError" class="status error">Ошибка загрузки курсов</div>

    <table v-else>
      <thead>
        <tr>
          <th>Код</th>
          <th>Название</th>
          <th>Номинал</th>
          <th>Курс (₽)</th>
          <th>Тренд</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in rates" :key="rate.code">
          <td>{{ rate.code }}</td>
          <td>{{ rate.name }}</td>
          <td>{{ rate.nominal }}</td>
          <td>{{ formatValue(rate.value) }}</td>
          <td :class="getTrendClass(rate)">
            {{ getTrendSymbol(rate) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CurrencyTable',

  computed: {
    ...mapGetters('currency', ['getRates', 'isLoading', 'hasError']),
    rates() { return this.getRates; },
    loading() { return this.isLoading; }
  },

  created() {
    this.$store.dispatch('currency/fetchRates');
  },

  methods: {
    formatValue(val) {
      return Number(val).toFixed(4);
    },
    getTrendSymbol(rate) {
      if (!rate.previous_value || rate.previous_value === 0) return '—';
      return rate.value > rate.previous_value ? '↑' :
             rate.value < rate.previous_value ? '↓' : '→';
    },
    getTrendClass(rate) {
      if (!rate.previous_value || rate.previous_value === 0) return '';
      return rate.value > rate.previous_value ? 'trend-up' :
             rate.value < rate.previous_value ? 'trend-down' : 'trend-flat';
    }
  }
};
</script>

<style scoped>
.currency-table { max-width: 800px; margin: 0 auto; padding: 20px; }
table { width: 100%; border-collapse: collapse; margin-top: 15px; }
th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; }
th { background: #f8f9fa; font-weight: 600; }
.status { text-align: center; padding: 30px; color: #666; }
.error { color: #dc3545; }
.trend-up { color: #28a745; font-weight: bold; }
.trend-down { color: #dc3545; font-weight: bold; }
.trend-flat { color: #6c757d; }
</style>