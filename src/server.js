import http from 'http'
import config from './config.js'

import app from './app.js'
import { init } from './db/mongodb.js'

await init()

const server = http.createServer (app)
const port = config.port


server.listen (port, () => {

    console.log (`Servidor corriendo en http://localhost:${port}`)
})
