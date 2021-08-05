const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        as: 'refreshTokens',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      encryptedPassword: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
      timestamp: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );
  return User;
};
