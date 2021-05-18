const { DataTypes, Model } = require("sequelize");
const sequelize = require ("../db");

class Card extends Model { };

Card.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: {
                msg:"Vous devez saisir un titre"
            }
        }
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue:1,
        validate: {
            isInt: {
                msg:"l'order doit etre un entier"
            }
        }
    },
    color: DataTypes.TEXT,
    list_id: { 
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:true,
            notEmpty: {
                msg: "la carte doit appartenir à une liste"
            }
        }
    }

},{ 
    sequelize,
    tableName: "card"
});

module.exports = Card;