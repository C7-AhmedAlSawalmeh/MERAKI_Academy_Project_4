const express = require("express")

const {calculateSick,updateSick} = require("../controllers/sick")


const sickRouter = express.Router();

sickRouter.post("/",calculateSick)
sickRouter.put("/update/:id",updateSick)

module.exports = sickRouter