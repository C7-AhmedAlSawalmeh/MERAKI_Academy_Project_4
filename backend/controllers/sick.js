const sickModel = require("../models/sickVacationSchema")
const employeeModel = require("../models/employeeSchema")

const calculateSick = (req, res) => {
    const { employee_id } = req.body
    employeeModel
        .findOne({ _id: employee_id })
        .then((result) => {

            const resultDate = new Date(result.date)
            const currentDate = new Date()
            const diffDays = Math.round((currentDate - resultDate) / (1000 * 60 * 60 * 24))
            const calculateSickFinal = (diffDays * 1.14) / 30
            const newSick = new sickModel({
                employee_id,
                sick_days: calculateSickFinal
            })
            newSick
                .save()
                sickModel
                .findOneAndUpdate(
                    { employeeId: employee_id },
                    { $set: { sick_days: calculateSickFinal } },
                    { new: true }
                )

                .then(() => {

                    employeeModel
                        .findOneAndUpdate(
                            { _id: employee_id },
                            { $set: { sick_vacations: newSick._id } },
                            { new: true }
                        )
                        .then(() => {
                            res.status(201).json({
                                success: true,
                                message: "Calculated",
                                sick: result,
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                success: false,
                                message: "Server Error",
                                err: err.message,
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: "Server Error",
                        err: err.message,
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server Error",
                err: err.message,
            })
        })

}
const updateSick = (req,res)=>{
    const id = req.params.id
    const update = req.body
    sickModel
    .findByIdAndDelete({id},update,{new:true})
    .then((result)=>{
        employeeModel
        .findByIdAndUpdate({_id:result.employee_id},{sick_vacations:result._id},{new:true})
        .then((result)=>{
            res.status(202).json({
                success:true,
                message:"The schedule updated",
                schdule:result.sick_vacations
            })
        }).catch((err)=>{
            res.status(500).json({
                success:false,
                message:"Server Error",
                err:err.message
            })
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Server Error",
            err:err.message
        })
    })
}


module.exports = {
    calculateSick,
    updateSick
}