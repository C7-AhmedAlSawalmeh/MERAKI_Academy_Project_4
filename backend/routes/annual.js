const express = require("express")

const {calculateAnnual,updateAnnual} = require("../controllers/annual")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const annualRouter = express.Router();

annualRouter.post("/",authentication,authorization("DoEveryThing") ,calculateAnnual)
annualRouter.put("/update/:id",authentication,authorization("DoEveryThing") ,updateAnnual)

module.exports = annualRouter