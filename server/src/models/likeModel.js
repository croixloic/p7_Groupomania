module.exports = (sequelize, Sequelize) => {

    const Like = sequelize.define("like", {
        likes: {
           type: Sequelize.INTEGER,
        }
    })

    return Like;
};