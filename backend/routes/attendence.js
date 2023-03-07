const express = require("express")

const {confirmStartAttendence,confirmEndAttendence} = require("../controllers/attendence")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const attendenceRouter = express.Router();

attendenceRouter.post("/",authentication,authorization("DoEveryThing") ,confirmStartAttendence)
attendenceRouter.put("/:id",authentication,authorization("DoEveryThing") ,confirmEndAttendence)

module.exports = attendenceRouter