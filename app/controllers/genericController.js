const models = require("../models");
const sanitizer = require("sanitizer");

const controlAndCapitalizeModel = (str) => {
    const model = str[0].toUpperCase() + str.slice(1);
    if (models.hasOwnProperty(model)) {
        return models[model];
    }
    return null;
}

const genericController = {

    //on recupere toutes les lignes
    getAlls: async (req, res, next) => {
        try {

            const model = controlAndCapitalizeModel(req.params.model);

            if (!model) {
                return next();
            }

            const data = await model.findAll({
                include: {
                    all: true,
                    nested: true
                }
            });
            if (!data) {
                return res.status(404).json({
                    "error": "not found"
                });
            }
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    },

    //on crée une ligne
    create: async (req, res, next) => {

        const postRequest = req.body;

        postRequest.title = sanitizer.escape(postRequest.title);
        if(postRequest.color){
           postRequest.color = sanitizer.escape(postRequest.color);
        };

        const model = controlAndCapitalizeModel(req.params.model);

        if (!model) {
            return next();
        }

        try {
            const newRaw = await model.create(postRequest);

            res.status(200).json(newRaw);

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //on recupere une ligne
    getOne: async (req, res, next) => {

        try {

            const id = req.params.id;
            const model = controlAndCapitalizeModel(req.params.model);

            if (!model) {
                return next();
            }

            if (isNaN(parseInt(id, 10))) {
                return res.status(400).json({
                    "error": "bad request"
                });
            }

            const data = await model.findByPk(id, {
                include: {
                    all: true,
                    nested: true
                }
            });
            if (!data) {
                return res.status(404).json({
                    "error": "not found"
                });
            }
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    },

    //on supprime une ligne
    deleteOne: async (req, res, next) => {

        const id = req.params.id;
        const model = controlAndCapitalizeModel(req.params.model);

        if (!model) {
            return next();
        }

        if (isNaN(parseInt(id, 10))) {
            return res.status(400).json({
                "error": "bad request"
            });
        }

        try {
            const raw = await model.findByPk(id);
            if (!raw) {
                return res.status(404).json({
                    "error": "not found"
                });
            }
            await raw.destroy();
            res.status(204).end();
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //on  met à jour une ligne
    patchOne: async (req, res, next) => {

        const id = req.params.id;
        const postRequest = req.body;
        const model = controlAndCapitalizeModel(req.params.model);

        if (!model) {
            return next();
        }

        if (isNaN(parseInt(id, 10)) || !postRequest) {
            return res.status(400).end();
        }

        try {
            const raw = await model.findByPk(id);
            if (!raw) {
                return res.status(404).end();
            }
            const controlUpdate = await raw.update(postRequest);
            res.status(200).json(controlUpdate);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}


module.exports = genericController;