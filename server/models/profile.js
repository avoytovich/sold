'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    contact: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Profile.belongsTo(models.User, {foreignKey: 'user_id'});
      }
    }
  });
  return Profile;
};
