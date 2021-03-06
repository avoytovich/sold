const { userController, loginController, proposalsController,
  profileController, uploadController, offersController } = require('./../controllers');

const multer = require('multer');
const cloudinary = require('cloudinary');

module.exports =
  (app) => {
    app.get('/test', (req, res) => res.status(200).send({
      message: 'Welcome'
    }));

    app.post('/user', userController.create);
    app.get('/user', profileController.retrieve);
    app.post('/login', loginController.login);
    app.get('/activation/:token', loginController.activation);

    app.put('/profile', profileController.update);

    app.post('/proposals', proposalsController.create);
    app.get('/proposals/list', proposalsController.list);
    app.get('/proposals/retrieve', proposalsController.retrieve);
    app.delete('/proposals/list/:proposal', proposalsController.destroy);

    app.post('/offers/list/email', offersController.create);
    app.post('/offers/list/retrieve', offersController.retrieve);
    app.post('/offers/reply/contact', offersController.rifle);

    cloudinary.config({
      cloud_name: 'dtfm1ad4t',
      api_key: '567419891871528',
      api_secret: 'hAVIKb3Cc77l0dm98yRuZARoLbw',
    });
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    app.post('/upload', upload.single('fileToUpload'), uploadController.fileUploadMiddleware);
  };
