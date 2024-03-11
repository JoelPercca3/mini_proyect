import http from 'node:http'
import { PORT } from './config.js'
import { importApi, index } from './library.js'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    switch (url) {
      case '/': {
        index(req, res)
        break
      }

      case '/import': {
        importApi(req, res)
        break
      }

      default: {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
        break
      }
    }
  }
})

server.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`))
