const express = require("express")

const {createSchedule,updateScheduleById} = require("../controllers/schedule")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const scheduleRouter = express.Router();

scheduleRouter.post("/:id",authentication,authorization("DoEveryThing") ,createSchedule)
scheduleRouter.delete("/update/:id",authentication,authorization("DoEveryThing") ,updateScheduleById)


module.exports = scheduleRouter