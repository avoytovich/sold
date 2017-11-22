const { userController, loginController, proposalsController } = require('./../controllers');

module.exports =
  (app) => {
    app.get('/test', (req, res) => res.status(200).send({
      message: 'Welcome'
    }));

    app.post('/user', userController.create);
    
    app.post('/login', loginController.login);
    app.get('/activation/:token', loginController.activation);

    app.post('/proposals', proposalsController.create);
    app.get('/proposals/list', proposalsController.list);
    app.post('/proposals/list/email', proposalsController.retrieve);
    app.delete('/proposals/list/:proposal', proposalsController.destroy);
  };
