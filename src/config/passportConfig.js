import passport from 'passport'
import fetch from 'node-fetch'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { createHash, isValidPassword } from '../utils.js'
import UserModel from '../models/user.model.js'
import config from '../config.js'

const opts = {

  usernameField: 'email',
  passReqToCallback: true,
}

const githubOpts = {

  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
}


export const init = () => {

  passport.use ('register', new LocalStrategy (opts, async (req, email, password, done) => {

    try {

      const user = await UserModel.findOne ({ email })

      if (user) {

        return done (new Error ('Usuario ya registrado'))
      }

      const newUser = await UserModel.create ({
        ...req.body,
        password: createHash (password),
      })
      
      done (null, newUser)
    } catch (error) {

      done (new Error (`Ocurrio un error durante la autenticacion ${error.message}.`))
    }
  }))


  passport.use ('login', new LocalStrategy (opts, async (req, email, password, done) => {

    try {

      const user = await UserModel.findOne ({ email })

      if (!user) {

        return done (new Error ('Correo o contraseña invalidos'))
      }

      const isPassValid = isValidPassword (password, user)

      if (!isPassValid) {

        return done (new Error ('Correo o contraseña invalidos'))
      }

      done (null, user)
    } catch (error) {

      done (new Error (`Ocurrio un error durante la autenticacion ${error.message}`))
    }
  }))


  passport.use ('github', new GithubStrategy (githubOpts, async (accessToken, refreshToken, profile, done) => {

    console.log ('profile', profile)

    let email = profile._json.email

    if (!email) { 

      let data = await fetch('https://api.github.com/user/public_emails', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })

      data = await data.json()

      console.log('data', data)

      const target = data.find((item) => item.primary && item.verified && item.visibility === 'public')
      email = target.email
    }

    let user = await UserModel.findOne ({ email })

    if (user) {

      return done (null, user)
    }

    user = {
      first_name: profile._json.name,
      last_name: '',
      email,
      age: 18,
      password: '',
      provider: 'Github',
    }

    const newUser = await UserModel.create (user)
    
    done (null, newUser)
  }))


  passport.serializeUser ((user, done) => {

    done (null, user._id)
  })


  passport.deserializeUser (async (uid, done) => {

    const user = await UserModel.findById (uid)
    done (null, user)
  })
}
