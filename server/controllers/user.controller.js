const { User } = require('./../models');
const passwordHash = require('password-hash');

module.exports = {
  create(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }})
        .then(user => {
          user && passwordHash.verify(req.body.password, user.password) &&
          res.status(400).json({message: 'Email already in use'}) ||
            User.create({
              email: req.body.email,
              password: passwordHash.generate(req.body.password),
              isActivated: false
            })
              .then(user => res.status(200)
                .json({message: 'Congratulation, check your email for activation'}));
        })
          .catch(error => res.status(404).send(error));
  }
};
