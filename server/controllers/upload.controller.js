const cloudinary = require('cloudinary');
const { Profile } = require('./../models');
const constants = require('./../helper/constants');

module.exports = {
  fileUploadMiddleware(req, res) {
    cloudinary.uploader.upload_stream((result) => {
      Profile.findOne({
        where: {
          UserId: req.decoded.id
        }
      })
        .then(profile => {
          profile || res.status(404).json({message: 'profileError'});
          profile.update({
            avatar: result.url
          })
            .then(profile => {
              res.status(200).send(profile.avatar);
            })
              .catch(error => res.status(400).send(error));
        })
          .catch(error => res.status(400).send(error));
    }).end(req.file.buffer);
  }
};
