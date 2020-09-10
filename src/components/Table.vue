<template>
  <table class="table">
    <caption>
      {{
        title
      }}
    </caption>
    <thead
      class="table__head"
      v-bind:style="{ paddingRight: scrollWidth + 'px' }"
    >
      <tr>
        <th>Amount</th>
        <th>Price</th>
        <th v-if="showTotal">Total</th>
      </tr>
    </thead>
    <tbody
      class="table__body"
      v-on:mouseenter="startScroll()"
      v-on:mouseleave="stopScroll()"
      v-on:touchstart="startScroll()"
      v-bind:style="tbodyStyle"
    >
      <tr v-for="([price, amount], number) in array" :key="number">
        <td>{{ parseFloat(amount).toFixed(6) }}</td>
        <td>{{ price.slice(0, 9) }}</td>
        <td v-if="showTotal">{{ (amount * price).toFixed(6) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    array: Array,
    title: String,
    showTotal: Boolean
  },
  data () {
    return {
      scrollWidth: 17,
      isScroll: false
    }
  },
  created () {
    window.addEventListener('resize', this.updateScrollWidth)
    this.updateScrollWidth()
  },
  computed: {
    tbodyStyle () {
      return {
        overflowY: this.isScroll ? 'scroll' : 'hidden',
        marginRight: this.isScroll ? '0px' : this.scrollWidth + 'px'
      }
    }
  },
  methods: {
    updateScrollWidth () {
      const div = document.createElement('div')
      div.style.overflowY = 'scroll'
      div.style.width = '50px'
      div.style.height = '50px'
      document.body.append(div)
      const scrollWidth = div.offsetWidth - div.clientWidth
      div.remove()
      this.scrollWidth = isNaN(scrollWidth) ? 17 : scrollWidth
    },
    startScroll () {
      this.isScroll = true
    },
    stopScroll () {
      this.isScroll = false
    }
  }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  max-height: 90%;
}
.table__head tr {
  display: table-cell;
}
th {
  background-color: #118073;
  text-align: center;
}
.table__body tr:nth-child(odd) {
  background-color: #ccc;
}
tr:nth-child(even) {
  background-color: #118073;
}
td {
  text-align: left;
}
td,
th {
  border: 2px solid black;
  padding: 0 3px;
  color: #333;
}
th:nth-child(1),
td:nth-child(1) {
  width: 95px;
  margin: 0;
}
th:nth-child(2),
td:nth-child(2) {
  width: 76px;
  margin: 0;
}
th:nth-child(3),
td:nth-child(3) {
  width: 125px;
  margin: 0;
}
td:nth-child(3) {
  text-align: right;
}
.table__body {
  width: 100%;
  display: block;
  max-height: calc(100vh - 140px);
  overflow-y: hidden;
}
@media screen and (max-device-width: 386px) {
  table {
    font-size: 4vw;
  }
  th,
  td {
    padding: 0 1vw;
  }
}
</style>
