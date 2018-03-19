const { Offers, Proposals, User } = require('./../models');
const { send } = require('./../helper/mailer');
const constants = require('./../helper/constants');

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
          html: `<b>Greeting from SoldApp! I have an offer to your proposal
            ${req.body.title}. I want to suggest you ${req.body.offer}. Thanks</b>`
        };
        send(mailOptions);
        Offers.create({
          title: req.body.offer,
          ProposalsId: proposal.dataValues.id,
          UserId: req.decoded.id
        })
          .then(offer => {
            res.status(200).json({message: constants.messages.send_offer});
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
        Proposals.findOne({
          include: [User],
          where: {
            id: offer.dataValues.ProposalsId
          }
        })
          .then(proposal => {
            User.findOne({
              where: {
                id: proposal.dataValues.UserId
              }
            })
              .then(user => {
                let mailOptions = {
                  from: '"soldapp" <soldapp@ukr.net>',
                  to: offer.dataValues.User.email,
                  subject: 'user contact details, who are interested in your suggestion from soldApp',
                  text: req.body.contact,
                  html: `<b>Greeting from SoldApp, you've received this mail, because recently, you've suggested to me
                    ${req.body.title}. I am excited about that and invite you to contact with me through this email
                      ${user.dataValues.email}. Also, want to add some additional information ${req.body.contact}.
                        Thank's</b>`
                };
                send(mailOptions);
                res.status(200).json({message: constants.messages.send_contact});
              });
          });
      })
        .catch(error => res.status(400).send(error));
  }
};
