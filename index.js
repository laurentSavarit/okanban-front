const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const router = require("./app/router");
const morgan = require("morgan");



app.set("view engine", "ejs");
app.set("views", __dirname+"/app/views");

//middlewares
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);


app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
})