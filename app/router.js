const express = require("express");
const router = express.Router();

//nos controllers
const genericController = require("./controllers/genericController")
const associationController = require("./controllers/associationController");


//route /

router.route("/api/:model")
    .get(genericController.getAlls)
    .post(genericController.create);

router.route("/api/:model/:id")
    .get(genericController.getOne)
    .delete(genericController.deleteOne)
    .patch(genericController.patchOne);

router.route("/api/card/:id/tag")
    .post(associationController.add);
    

router.route("/api/card/:cardId/tag/:tagId")
    .delete(associationController.delete);

//suivi 404
router.use((req, res) => {
    res.status(404).json({
        "error": "not found"
    });
})

module.exports = router;