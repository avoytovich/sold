'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offers = sequelize.define('Offers', {
    title: DataTypes.STRING,
    ProposalsId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  });

  Offers.associate = models => {
    Offers.belongsTo(models.Proposals, {
      foreignKey: 'ProposalsId'
    });
    Offers.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Offers;
};
