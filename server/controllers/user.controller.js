const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('./../models');
const secret = require('./../../config/jwt.secretkey.json');
const constants = require('./../helper/constants');
const { send } = require('./../helper/mailer');

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
              .then(user => {
                let token = jwt.sign({id: user.id, name: req.body.name},
                  secret.key, {expiresIn: constants.TIME_TOKEN});
                let mailOptions = {
                  from: '"soldapp" <soldapp@ukr.net>',
                  to: user.email,
                  subject: 'Registration for soldApp',
                  text: 'click on link to activate your account',
                  html: `<b>click on link below to activate your account</b>
                           <a href="http://localhost:8033/activation/${token}">link</a>`
                };
                send(mailOptions);
                res.status(200)
                .json({message: 'Congratulation, check your email for activation'});
              });
        })
          .catch(error => res.status(404).send(error));
  },

  retrieve(req, res) {
    Profile.findOne({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(profile => {
        res.status(200)
          .json({name: profile.dataValues.name});
      })
        .catch(error => res.status(400).send(error));
  }
};
