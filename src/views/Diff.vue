<template>
  <div class="diff">
    <label>Symbol</label>
    <select
      name="symbol"
      id="symbol"
      v-model="symbol"
      v-on:change="changeSymbol($event)"
    >
      <option>BTCUSDT</option>
      <option>BNBBTC</option>
      <option>ETHBTC</option>
    </select>
    <h2>Applied</h2>
    <ul>
      <li v-for="(data, number) in applied" :key="number">
        {{ data.e }}. Time: {{ data.E }} Symbol: {{ data.s }} StartID:
        {{ data.u }} EndID: {{ data.U }}
      </li>
    </ul>
  </div>
</template>
<script>
import { bus } from '@/core'

export default {
  name: 'Diff',
  data () {
    return {
      symbol: 'BTCUSDT',
      applied: []
    }
  },
  created () {
    bus.$on('event-applied', event => {
      this.applied = bus.$data.appliedChanges
    })
  },
  methods: {
    changeSymbol (event) {
      bus.$emit('change-symbol', event.target.value)
    }
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>
