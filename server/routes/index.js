const { userController, loginController } = require('./../controllers');

module.exports =
  (app) => {
    app.get('/test', (req, res) => res.status(200).send({
      message: 'Welcome'
    }));

    app.post('/user', userController.create);
    app.post('/login', loginController.login);
    app.get('/activation/:token', loginController.activation);
  };
