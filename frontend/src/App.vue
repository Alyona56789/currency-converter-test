<template>
  <div id="app">
    <CurrencyTable />
  </div>
</template>

<script>
import CurrencyTable from './components/CurrencyTable.vue';

export default {
  name: 'App',
  components: { CurrencyTable }
};
</script>

<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; }
#app { min-height: 100vh; background: #fafafa; }
</style>
