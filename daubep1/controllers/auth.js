const bcrypt = require('bcryptjs');

const Cooker = require('../models/cooker');


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Cooker.findOne({ email: email })
    .then(cooker => {
      if (!cooker) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, cooker.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.cooker = cooker;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/products');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};



exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
