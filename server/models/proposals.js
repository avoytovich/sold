'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proposals = sequelize.define('Proposals', {
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  });

  Proposals.associate = models => {
    Proposals.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };

  return Proposals;
};
