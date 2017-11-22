'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN
  });

  User.associate = models => {
    User.hasMany(models.Proposals, {
      foreignKey: 'UserId'
    });
  };

  return User;
};
