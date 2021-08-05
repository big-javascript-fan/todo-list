const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    static associate(models) {
      Todos.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }
  Todos.init(
    {
      userId: DataTypes.UUID,
      connectedEmailId: DataTypes.UUID,
      name: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Todos',
      paranoid: true,
      timestamp: true,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'connectedEmailId'],
        },
        {
          unique: false,
          fields: ['email', 'name', 'title', 'createdAt', 'updatedAt'],
        },
      ],
    }
  );
  return Todos;
};
