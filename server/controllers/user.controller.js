const { User } = require('./../models');

module.exports = {
  create(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }})
        .then(user => {
          user && res.status(200).send({message: 'Email already in use'}) ||
            User.create(Object.assign({}, req.body))
              .then(user => res.status(200).send(user));
        })
          .catch(error => res.status(404).send(error));
  }
};
