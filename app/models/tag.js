const {
    DataTypes,
    Model
} = require("sequelize");
const sequelize = require("../db");

class Tag extends Model {};

Tag.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Le tag doit avoir un titre"
            }
        }
    }
}, {
    sequelize,
    tableName: "tag"
});

module.exports = Tag;