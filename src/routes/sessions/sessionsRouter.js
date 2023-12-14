import { Router } from 'express'
import passport from 'passport'
import { registerUser } from '../../controllers/sessions/sessionsController'
import { loginUser } from '../../controllers/sessions/sessionsController'
import { recoverPassword } from '../../controllers/sessions/sessionsController'


const router = Router()


router.post ('/sessions/register', passport.authenticate ('register', { failureRedirect: '/register' }), registerUser)


router.post ('/sessions/login', passport.authenticate ('login', { failureRedirect: '/login' }), loginUser)


router.get ('/sessions/github', passport.authenticate ('github', { scope: ['user:email'] }))


router.get ('/sessions/github/callback', passport.authenticate ('github', { failureRedirect: '/login' }), (req, res) => {

  req.session.user = req.user
  res.redirect ('/profile')
})


router.post ('/sessions/recovery-password', recoverPassword)


router.get ('/sessions/logout', (req, res) => {

  req.session.destroy ((error) => {

    res.redirect ('/login')
  })
})

export default router
