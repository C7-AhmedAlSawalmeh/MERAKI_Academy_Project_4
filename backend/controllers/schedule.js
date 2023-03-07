const scheduleModel = require("../models/scheduleSchema")
const employeeModel = require("../models/employeeSchema")

const createSchedule = (req, res) => {
    const id = req.params.id
    const { employee_id, work_days } = req.body

    const newSchedule = new scheduleModel({

        employee_id, work_days
    })
    newSchedule
        .save()
        .then((result) => {
            employeeModel
                .findByIdAndUpdate(
                    { _id: id },
                    { $push: { schedule: result._id } },
                    { new: true }
                )
                .then(() => {
                    res.status(201).json({
                        sucsses: true,
                        message: "Schedule created",
                        schedule: result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: `Server Error`,
                        err: err.message,
                    });
                })

        }).catch((err) => {
            res.status(500).json({
                sucsses: false,
                message: "Server Error",
                err: err.message
            })

        })
}

const updateScheduleById = (req, res) => {
    const id = req.params.id
    const update = req.body
    scheduleModel
        .findByIdAndUpdate({ _id: id }, update, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(403).json({
                    success: false,
                    message: "Wrong call"
                })
            }
            res.sataus(202).json({
                success: true,
                message: "Schedule updated",
                schedule: result
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server Error",
                err: err.message
            })
        })
}



module.exports = {
    createSchedule,
    updateScheduleById
}