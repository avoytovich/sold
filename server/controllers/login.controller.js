const { User } = require('./../models');
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
      user && passwordHash.verify(req.body.password, user.password) &&
        res.status(200).json({
          message: 'Congratulation, you are logged!',
          token: jwt.sign({id: user.id}, secret.key, {expiresIn: constants.TIME_TOKEN})
        }) ||
      user && res.status(400).json({message: 'Inputted password is not valid'}) ||
      !user && res.status(400).json({message: 'Before login you must sign up!'});
    }).catch(error => res.status(401).send(error));
  }
};
