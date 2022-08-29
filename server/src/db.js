const  Sequelize  = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize (process.env.DATABASE,process.env.USER, process.env.PASSWORD, {

    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
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
   await sequelize.sync()
   function setAdmin(req, res){
    db.users.findOne({where: { email: "admin@admin.fr" } || { lastName: "admin"}})
    .then((user) => {
      if (!user) {
        db.users.create ({
          lastName: "admin",
          firstName: "admin",
          email: "admin@admin.fr",
          password: "Testadmin123",
          admin: "1"
      })
      .then ((admin) => {
        console.log("Votre compte admin est bien créé");
      })
    }
    else {
      console.log({ message: "l'admin est déjà créé" });
    }
  })
}
setAdmin();
}
   initDb();
    
    //association de table 
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.users = require('./models/userModel')(sequelize, Sequelize);
    db.posts = require('./models/posts')(sequelize, Sequelize);
    db.comment = require('./models/commentModel')(sequelize,Sequelize);
  



    // post et user

    db.users.hasMany(db.posts, {foreignkey: "userId", as: "user"});
    db.posts.belongsTo(db.users, {foreignkey: "userId", as: "user"});

    // user et comment

     db.users.hasMany(db.comment,{ as: "comments", onDelete: "CASCADE" });
     db.comment.belongsTo(db.users,{ foreignKey: "userId", as: "user",});

    
    //post et comment

    db.posts.hasMany(db.comment, { as: "comments", onDelete: "CASCADE" });
    db.comment.belongsTo(db.posts,{foreignKey: "postId", as: "post",});




 module.exports = db;