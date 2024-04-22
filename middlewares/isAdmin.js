function isAdmin (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ error: 'Acceso prohibido para usuarios no administradores' })
  }
};

module.exports = isAdmin
