const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define("newUser", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    dateBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verificationCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
 }, {
        timestamps: false,
});
module.exports = User;