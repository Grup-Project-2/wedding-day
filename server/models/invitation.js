'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invitation.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Title is required!`
        },
        notEmpty: {
          msg: `Title field can't be empty!`
        }
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `time is required!`
        },
        notEmpty: {
          args: true,
          msg: `time field can't be empty!`
        },
        isDate: {
          args: true,
          msg: `Please use date format MM/DD/YYYY!`
        },
        isAfter: {
          args: new Date().toDateString(),
          msg: `time can be filled with date after today.`
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `location is required!`
        },
        notEmpty: {
          args: true,
          msg: `location field can't be empty!`
        }
      }
    },
    qrCode: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};