const express = require("express")

const {calculateAnnual,updateAnnual} = require("../controllers/annual")


const annualRouter = express.Router();

annualRouter.post("/",calculateAnnual)
annualRouter.put("/update/:id",updateAnnual)

module.exports = annualRouter