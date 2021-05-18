const express = require("express");
const router = express.Router();

//nos controllers
const mainController = require("./controllers/mainController")



//route /

router.get("/",mainController.homePage);

//suivi 404
router.use((req, res) => {
    res.status(404).json({
        "error": "not found"
    });
})

module.exports = router;