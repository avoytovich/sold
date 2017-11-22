'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    contact: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  });

  Profile.associate = models => {
    Profile.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Profile;
};
