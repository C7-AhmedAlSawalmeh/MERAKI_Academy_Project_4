const express = require("express")

const {confirmAttendence} = require("../controllers/attendence")


const attendenceRouter = express.Router();

attendenceRouter.post("/",confirmAttendence)

module.exports = attendenceRouter