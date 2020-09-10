const binance = {
  fetch: async function (symbol = 'BTCUSDT', limit = 500) {
    return await fetch(
      ` https://www.binance.com/api/v1/depth?symbol=${symbol.toUpperCase()}&limit=${limit}`
    ).then(response => response.json())
  },
  subscribe: async function (symbol = 'BTCUSDT', callback) {
    this.symbol = symbol
    this.socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
    )
    this.socket.onopen = data => {
      this.socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${symbol.toLowerCase()}@depth`],
          id: 1
        })
      )
    }
    this.socket.onmessage = function (event) {
      callback(JSON.parse(event.data))
    }
    return this.socket
  },
  unsubscribe () {
    this.socket.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [`${this.symbol.toLowerCase()}@depth`],
        id: 1
      })
    )
  }
}
export default binance
