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
          message: 'Congratulation, you are logged!',
          token: jwt.sign({id: user.id}, secret.key, {expiresIn: constants.TIME_TOKEN})
        }) ||
      user && user.isActivated &&
        res.status(400).json({message: 'Inputted password is not valid'}) ||
          user && !user.isActivated &&
            res.status(400).json({message: 'Your account isn\'t activated'}) ||
              !user && res.status(400).json({message: 'Before login you must sign up!'});
    }).catch(error => res.status(401).send(error));
  },
  activation(req, res) {
    let token = req.params.token;
    let decoder = jwt.verify(token, secret.key, (err, decoded) => {
      return decoded || res.status(498).json({message: 'link is not valid'});
    });
    console.log(decoder);
    User.findById(decoder.id)
      .then(user => {
        !user && res.status(404).json({message: 'userNotFound'}) ||
          user.isActivated && res.status(418).json({message: 'linkAlreadyActivated'}) ||
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
