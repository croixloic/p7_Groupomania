

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        images: {
          type: Sequelize.TEXT,
        },

        likes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },

        userlikes: {
          type: Sequelize.TEXT,
        },
  
        date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        timestamps: false,
      }
    );
    return Post;
    };