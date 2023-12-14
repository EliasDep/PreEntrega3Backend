import express from 'express'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import handlebars from 'express-handlebars'
import path from 'path'
import MongoStore from 'connect-mongo'
import passport from 'passport'

import config from './config.js'
import { __dirname } from './utils.js'
import { URI } from './db/mongodb.js'
import productsRouter from './routes/products/productsRouter.js'
import cartsRouter from './routes/carts/cartsRouter.js'
import sessionsRouter from './routes/sessions/sessionsRouter.js'
import { init as initPassportConfig } from './config/passportConfig.js'


const app = express()


app.use (expressSession ({

    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create ({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 120,
    })
}))


app.engine ('handlebars', handlebars.engine())
app.set ('views', path.join (__dirname, 'views'))
app.set ('view engine', 'handlebars')

app.use (express.json ())
app.use (express.urlencoded ({ extended: true }))
app.use (bodyParser.urlencoded({ extended: true }))
app.use (express.static (path.join (__dirname, '../public')))


initPassportConfig()

app.use (passport.initialize())
app.use (passport.session())


app.use ('/api', productsRouter, cartsRouter, sessionsRouter)


app.use ((error, req, res, next) => {

    const message = `Ah ocurrido un error desconocido: ${error.message}`

    console.log (message)
    res.status(500).json ({ status: 'error', message})
})

export default app
