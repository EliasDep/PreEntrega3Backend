export const authorizeAdmin = (req, res, next) => {

    const userRole = req.session.user ? req.session.user.role : null
  
    if (userRole !== 'admin') {

      return res.status(403).send ('Acceso denegado. No eres un administrador.')
    }
  
    next()
}

  
export const authorizeUser = (req, res, next) => {

    const userRole = req.session.user ? req.session.user.role : null
  
    if (userRole !== 'usuario') {

      return res.status(403).send ('Acceso denegado. Debes iniciar sesión como usuario.');
    }
  
    next()
}