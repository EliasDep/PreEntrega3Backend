import UserModel from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'


export const registerUser = async (req, res) => {

  try {

    const { body } = req
    const newUser = await UserModel.create (body)

    console.log ('newUser', newUser)
    res.redirect ('/login')

  } catch (error) {

    res.status(500).send ('Error al registrar el usuario')
  }
}


export const loginUser = async (req, res) => {

  try {

    const { body: { email, password } } = req
    const user = await UserModel.findOne ({ email })

    if (!user) {

        return res.status(401).send ('Correo o contraseña invalidos 😨.')
    }

    const isPassValid = user.password === password

    if (!isPassValid) {

        return res.status(401).send ('Correo o contraseña invalidos 😨.')
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {

        req.session.user = { ...user, role: 'admin' }

    } else {

        req.session.user = { ...user, role: 'usuario' }
    }

    
    const { first_name, last_name } = user

    req.session.user = { first_name, last_name, email }
    res.redirect('/profile')

  } catch (error) {

    res.status(500).send ('Error al iniciar sesión')
  }
}


export const recoverPassword = async (req, res) => {

  try {
    
    const { email, newPassword } = req.body
    const user = await UserModel.findOne ({ email })

    if (!user) {

        return res.status(401).send ('Correo o contraseña invalidos')
    }

    await UserModel.updateOne ({ email }, { $set: { password: createHash (newPassword) } })
    res.redirect('/login')

  } catch (error) {

    res.status(500).send ('Error al recuperar la contraseña')
  }
}
