const Card = require("./card");
const List = require("./list");
const Tag = require("./tag");

/* associations */

Card.belongsTo(List,{
    as :'list',
    foreignKey: 'list_id'
});

Card.belongsToMany(Tag,{
    as: 'tags',
    through: 'card_has_tag',
    foreignKey: "card_id",
    otherKey: "tag_id",
    timestamps: false
});

Tag.belongsToMany(Card,{
    as: "cards",
    through: 'card_has_tag',
    foreignKey: "tag_id",
    otherKey: "card_id",
    timestamps: false
})

List.hasMany(Card, {
    foreignKey: 'list_id',
    as: 'cards'
});

module.exports = { Card, List, Tag };