import Vue from 'vue'

const bus = new Vue({
  data () {
    return {
      appliedChanges: [],
      symbol: 'BTCUSDT'
    }
  },
  created () {
    this.$on('event-applied', data => {
      this.appliedChanges.push(data)
    })
    this.$on('change-symbol', newSymbol => {
      this.symbol = newSymbol
    })
  }
})
export default bus
