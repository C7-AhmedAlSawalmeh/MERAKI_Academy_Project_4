const express = require("express")

const {createHRaction,deleteHRbyId} = require("../controllers/hr")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const hrRouter = express.Router();

hrRouter.post("/",authentication,authorization("DoEveryThing") ,createHRaction)
hrRouter.delete("/delete/:id",authentication,authorization("DoEveryThing") ,deleteHRbyId)

module.exports = hrRouter