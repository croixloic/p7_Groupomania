module.exports = (sequelize, Sequelize) => {

    const Like = sequelize.define("like", {
        likes: {
           type: Sequelize.INTEGER,
        },
        dislikes: {
            type: Sequelize.INTEGER,
        },
    })

    return Like;
};