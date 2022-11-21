
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("gw_user", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID4,
            primaryKey: true
        },
        create_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated_date: {
            type: Sequelize.DATE,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        username:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be a valid email address",
                }
            }
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status_id:{
            allowNull: false,
            type: Sequelize.INTEGER,

        }

    });

    return User;
};