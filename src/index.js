const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser");
const databaseCon = require("./includes/database.connection");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

PORT = process.env.PORT || 3000
BASE_URL = process.env.BASE_URL

const userRt = require('./routers/user.router');
const postCtr = require('./routers/post.router');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));

app.get(BASE_URL, async (req, res) => {
    res.send("WELCOME PET SOCIAL MEDIA")
})

app.use(BASE_URL, userRt)
app.use(BASE_URL, postCtr)

app.listen(PORT, () => {
    databaseCon()
    console.log(`SERVER IS RUNNING WITH PORT: ${PORT}`);
});