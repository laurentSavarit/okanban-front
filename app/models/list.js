const { DataTypes, Model } = require("sequelize");
const sequelize = require ("../db");

class List extends Model { };

List.init({
    title: {
        type: DataTypes.TEXT,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: "Vous devez saisir un titre"
            }
        }
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull:true,
        defaultValue:1,
        validate:{
            isInt:{
                msg:"l'ordre doit être un entier"
            }
        }
    }
},{ 
    sequelize,
    tableName: "list"
});

module.exports = List;

