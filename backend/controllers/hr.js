const hrModel = require("../models/hrActionsSchema")
const employeeModel = require("../models/employeeSchema")

const createHRaction = (req, res) => {
    const { hrAction, reason, employee_id } = req.body
    const newHR = new hrModel({
        hrAction,
        employee_id,
        reason
    })
    newHR
        .save()
        .then((result) => {
            employeeModel
                .findByIdAndUpdate({ _id: employee_id }, { $push: { hr_actions: result._id } })
                .then(() => {
                    res.status(201).json({
                        sucsses: true,
                        message: "HR Action submitted",
                        Action: result.reason
                    })
                }).catch((err) => {
                    res.status(500).json({
                        sucsses: false,
                        message: "Server Error",
                        err: err.message
                    })

                })
        }).catch((err) => {
            res.status(500).json({
                sucsses: false,
                message: "Server Error",
                err: err.message
            }
            )
        }

        )
}
const deleteHRbyId = (req,res)=>{
    const id = req.params.id
    hrModel
    .findByIdAndDelete({_id:id})
    .then((result)=>{
        employeeModel
        .findByIdAndUpdate({_id:result.employee_id},)
    })
}


module.exports = {
    createHRaction,
    deleteHRbyId
}