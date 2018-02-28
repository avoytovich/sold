const { Offers } = require('./../models');
const { Proposals } = require('./../models');
const { User } = require('./../models');
const { send } = require('./../helper/mailer');

module.exports = {
  create(req, res) {
    Proposals.findOne({
      include: [User],
      where: {
        title: req.body.title
      }
    })
      .then(proposal => {
        let mailOptions = {
          from: '"soldapp" <soldapp@ukr.net>',
          to: proposal.dataValues.User.email,
          subject: 'Offer from soldApp',
          text: req.body.offer,
          html: `<b>${req.body.offer}</b>`
        };
        send(mailOptions);
        Offers.create({
          title: req.body.offer,
          ProposalsId: proposal.dataValues.id,
          UserId: req.decoded.id
        })
          .then(offer => {
            res.status(200).json({message: 'You have successfully send offer!'});
          });
      })
        .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Proposals.findOne({
      where: {
        UserId: req.decoded.id,
        title: req.body.title
      }
    })
      .then(proposal => {
        Offers.findAll({
          where: {
            ProposalsId: proposal.dataValues.id
          }
        })
          .then(offers => {
            res.status(200).send(offers);
          });
      })
        .catch(error => res.status(400).send(error));
  },

  rifle(req, res) {
    Offers.findOne({
      include: [User],
      where: {
        title: req.body.title
      }
    })
      .then(offer => {
        let mailOptions = {
          from: '"soldapp" <soldapp@ukr.net>',
          to: offer.dataValues.User.email,
          subject: 'user contact details, who are interested in your suggestion from soldApp',
          text: req.body.contact,
          html: `<b>${req.body.contact}</b>`
        };
        send(mailOptions);
        res.status(200).json({message: 'You have successfully send contact!'});
      })
        .catch(error => res.status(400).send(error));
  }

};
