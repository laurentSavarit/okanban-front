const {
    Tag,
    Card
} = require("../models");

const associationController = {

    add: async (req, res, next) => {

        try {
            const cardId = req.params.id;
            const tagId = req.body.tagId;

            const card = await Card.findByPk(cardId);

            if (!card) {
                return next();
            }

            const tag = await Tag.findByPk(tagId);

            await card.addTag(tag);

            const controlAssociation = await Card.findByPk(cardId, {
                include: {
                    all: true,
                    nested: true
                }
            });

            res.status(200).json(controlAssociation);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const cardId = req.params.cardId;
            const tagId = req.params.tagId;

            const card = await Card.findByPk(cardId);

            if (!card) {
                return next();
            }

            const tag = await Tag.findByPk(tagId);

            await card.removeTag(tag);

            const controlAssociation = await Card.findByPk(cardId, {
                include: {
                    all: true,
                    nested: true
                }
            });

            res.status(200).json(controlAssociation);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}

module.exports = associationController;