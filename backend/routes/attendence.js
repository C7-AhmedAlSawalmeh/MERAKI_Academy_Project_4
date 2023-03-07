const express = require("express")

const {confirmStartAttendence,confirmEndAttendence} = require("../controllers/attendence")


const attendenceRouter = express.Router();

attendenceRouter.post("/",confirmStartAttendence)
attendenceRouter.put("/:id",confirmEndAttendence)

module.exports = attendenceRouter