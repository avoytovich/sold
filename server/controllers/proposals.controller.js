const { Proposals } = require('./../models');
const constants = require('./../helper/constants');

module.exports = {
  create(req, res) {
    Proposals.findOne({
      where: {
        title: req.body.title,
        UserId: req.decoded.id
      }
    })
      .then(proposal => {
        proposal && res.status(400).json({message: constants.messages.proposal_created_already}) ||
          Proposals.create({
            title: req.body.title,
            UserId: req.decoded.id
          }) && res.status(200).json({message: constants.messages.proposal_added});
      })
        .catch(error => res.status(404).send(error));
  },

  list(req, res) {
    let getProposals = [];
    Proposals.findAll()
      .then(proposals => {
        proposals.forEach(proposal => {
          getProposals.push(proposal.dataValues.title);
        });
        getProposals.reverse();
      })
        .then(() => {
        res.status(200).send(getProposals);
      })
        .catch(error => res.status(404).send(error));
  },

  retrieve(req, res) {
    let getMyProposals = [];
    Proposals.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(proposals => {
        proposals.forEach(proposal => {
          getMyProposals.push(proposal.dataValues.title);
        });
        getMyProposals.reverse();
      })
        .then(() => {
        res.status(200).send(getMyProposals);
      })
        .catch(error => res.status(404).send(error));
  },

  destroy(req, res) {
    Proposals.findOne({
      where: {
        title: req.params.proposal,
        UserId: req.decoded.id
      }
    })
      .then(proposal => {
        !proposal && res.status(400)
          .json({message: constants.messages.not_permission_to_delete}) ||
            proposal.destroy()
              .then(proposal => res.status(200)
                .json({message: constants.messages.deleted_proposal}));
      })
        .catch(error => res.status(400).send(error));
  }
};
