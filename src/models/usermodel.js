
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            //getter for showing specific type of information
            get() {
                const rawValue = this.getDataValue("name");
                return rawValue ? rawValue.toUpperCase() : null;}
        },
        email: {
            type: Sequelize.STRING
        },
        phoneNo: {
            type: Sequelize.STRING
        }
    });

    return User;
};