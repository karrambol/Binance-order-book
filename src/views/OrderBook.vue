<template>
  <div class="order-book">
    <Table v-bind:array="bids" title="Bids" v-bind:show-total="width > 768" />
    <Table v-bind:array="asks" title="Asks" v-bind:show-total="width > 768" />
  </div>
</template>

<script>
import { binance, bus } from '@/core'
import Table from '@/components/Table'

export default {
  name: 'Home',
  components: { Table },
  data () {
    return {
      lastUpdateId: 0,
      isBuffering: true,
      changeBuffer: [],
      asks: [],
      bids: [],
      socket: undefined,
      width: 0
    }
  },
  beforeCreate () {
    this.socket = binance.subscribe(bus.$data.symbol, data => {
      if (data.u) {
        if (this.isBuffering) {
          this.changeBuffer.push(data)
        } else {
          bus.$emit('event-applied', data)
          data.a.forEach(el => this.applayChange(this.asks, el))
          data.b.forEach(el => this.applayChange(this.bids, el))
        }
      }
    })

    binance.fetch('BTCUSDT').then(response => {
      this.lastUpdateId = response.lastUpdateId
      this.asks = response.asks
      this.bids = response.bids
      this.changeBuffer = this.changeBuffer.filter(
        el => el.u > this.lastUpdateId
      )

      this.isBuffering = false
    })
  },
  created () {
    window.addEventListener('resize', this.updateWidth)
    this.updateWidth()
  },
  beforeDestroy () {
    binance.unsubscribe()
  },
  methods: {
    applayChange (field, newData) {
      const index = field.findIndex(el => el[0] === newData[0])
      if (parseFloat(newData[1]) < 1e-9 && index > -1) {
        field.splice(index, 1)
      }
      if (parseFloat(newData[1]) >= 1e-9 && index > -1) {
        field[index][1] = newData[1]
      }
      if (parseFloat(newData[1]) >= 1e-9 && index === -1) {
        field.push(newData)
        field.sort((a, b) => b[0] - a[0])
      }
    },
    updateWidth () {
      this.width = window.innerWidth
    }
  }
}
</script>
<style scoped>
.order-book {
  max-height: 100vh;
  display: flex;
  justify-content: space-evenly;
}
</style>
