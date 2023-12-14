import dotenv from 'dotenv'


let pathEnvFile = null

if (process.env.ENV !== 'production') {

  pathEnvFile = './.env.dev'

}


dotenv.config ({ path: pathEnvFile })


export default {

  port: process.env.PORT,
  env: process.env.ENV,
  db: {
    mongodbUri: process.env.MONGODB_URI,
  },
  sessionSecret: process.env.SESSION_SECRET,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}
