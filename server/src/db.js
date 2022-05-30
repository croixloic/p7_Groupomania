const  Sequelize  = require('sequelize')

const sequelize = new Sequelize ('groupomania','root', '', {

    host: 'localhost',
    dialect: 'mysql',
    port: '3308',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  async function initDb() {
   await sequelize.authenticate()
   .then(() => {
       console.log("la connexion est un succes.")
      })
      .catch((error) => {
        console.error(`Impossible de ce connecté car ${error}`)
      });
   await sequelize.sync();
    }
    
    //association de table 
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.users = require('./models/userModel')(sequelize, Sequelize);
    db.posts = require('./models/posts')(sequelize, Sequelize);


    // post et user

    db.users.hasMany(db.posts, {foreignkey: "userId", as: "user"});
    db.posts.belongsTo(db.users, {foreignkey: "userId", as: "user"});

 module.exports = db;