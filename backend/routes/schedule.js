const express = require("express")

const {createSchedule} = require("../controllers/schedule")


const scheduleRouter = express.Router();

scheduleRouter.post("/:id",createSchedule)


module.exports = scheduleRouter