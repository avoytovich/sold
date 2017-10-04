const { User } = require('./../models');

module.exports = {
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      user && res.status(200).json({message: 'Congratulation, you are logged!'}) ||
      !user && res.status(400).json({message: 'Before login you must sign up!'});
    }).catch(error => res.status(401).send(error));
  }
};
