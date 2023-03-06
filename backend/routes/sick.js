const express = require("express")

const {calculateSick} = require("../controllers/sick")


const sickRouter = express.Router();

sickRouter.post("/",calculateSick)

module.exports = sickRouter