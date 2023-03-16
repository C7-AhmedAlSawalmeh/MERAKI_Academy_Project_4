const express = require("express")

const {confirmStartAttendence,confirmEndAttendence,getAttendenceByEmplyoeeId} = require("../controllers/attendence")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const attendenceRouter = express.Router();

attendenceRouter.post("/",authentication,authorization("DoEveryThing") ,confirmStartAttendence)
attendenceRouter.put("/:id" ,confirmEndAttendence)
attendenceRouter.get("/get/:id",authentication,authorization("DoEveryThing"),getAttendenceByEmplyoeeId)

module.exports = attendenceRouter