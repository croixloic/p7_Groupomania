module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('user', {
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING, // change les data en Sequelize
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagesUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "http://localhost:5000/images/image_defaut.jpg",
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  }
});
return User;
}