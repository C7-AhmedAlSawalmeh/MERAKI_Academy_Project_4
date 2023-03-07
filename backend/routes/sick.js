const express = require("express")

const {calculateSick,updateSick} = require("../controllers/sick")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const sickRouter = express.Router();

sickRouter.post("/",authentication,authorization("DoEveryThing") ,calculateSick)
sickRouter.put("/update/:id",authentication,authorization("DoEveryThing") ,updateSick)

module.exports = sickRouter