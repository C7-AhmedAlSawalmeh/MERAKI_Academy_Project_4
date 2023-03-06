const express = require("express")

const {calculateAnnual} = require("../controllers/annual")


const annualRouter = express.Router();

annualRouter.post("/",calculateAnnual)

module.exports = annualRouter