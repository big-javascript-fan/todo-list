const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }
  RefreshToken.init(
    {
      userId: DataTypes.UUID,
      token: DataTypes.STRING(1000),
      expiresAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      timestamp: true,
      indexes: [
        {
          unique: true,
          fields: ['token'],
        },
      ],
    }
  );
  return RefreshToken;
};
