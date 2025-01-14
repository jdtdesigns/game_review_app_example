module.exports = {
  redirectIfNotLoggedIn(req, res, next) {
    if (!req.session.user_id) {
      return res.redirect('/login')
    }

    next()
  },

  redirectIfLoggedIn(req, res, next) {
    if (req.session.user_id) {
      return res.redirect('/dashboard')
    }

    next()
  },
}