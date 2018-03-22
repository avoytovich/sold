const { User, Profile } = require('./../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const constants = require('./../helper/constants');

module.exports = {
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      user && passwordHash.verify(req.body.password, user.password) && user.isActivated &&
        res.status(200).json({
          message: constants.messages.congratulation,
          token: jwt.sign({id: user.id}, secret.key, {expiresIn: constants.TIME_TOKEN})
        }) ||
      user && user.isActivated &&
        res.status(400).json({message: constants.messages.password_is_not_valid}) ||
          user && !user.isActivated &&
            res.status(400).json({message: constants.messages.account_is_not_activated}) ||
              !user && res.status(400).json({message: constants.messages.you_must_sign_up});
    }).catch(error => res.status(401).send(error));
  },
  activation(req, res) {
    let token = req.params.token;
    let decoder = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded || res.status(498).json({message: constants.messages.link_is_not_valid});
    });
    console.log(decoder);
    User.findById(decoder.id)
      .then(user => {
        !user && res.status(404).json({message: constants.messages.userNotFound}) ||
          user.isActivated && res.status(418).json({message: constants.messages.linkAlreadyActivated}) ||
            user.update({
              isActivated: true
            }) &&
              Profile.create({
                UserId: decoder.id,
                name: decoder.name
              }) &&
                res.redirect('http://localhost:8080/');
      })
        .catch(error => res.status(400).send(error));
  }
};
