const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./src/db')
const mysql = require('mysql2')
const path = require("path");
const helmet = require("helmet");
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const cors = require('cors');
const port = process.env.PORT

const userRoutes = require('./src/routes/user');
const UserModel= require('./src/models/userModel');

const postRoutes = require('./src/routes/postsRoute');
const PostModel = require('./src/models/posts');
const likeModel = require('./src/models/likeModel');

const commentRoutes = require('./src/routes/commentRoute');
const commentModel = require('./src/models/commentModel');




app
.use(morgan('dev'))
.use(helmet())
.use(bodyParser.json())
.use("/images", express.static(path.join(__dirname, "images")));
app.use (cors());


app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment",commentRoutes);


app.listen(port, () =>
console.log(`Notre application node est demarré sur : http://localhost:${port}`));


(async () => {
   await db.sequelize.sync();
  
})();

