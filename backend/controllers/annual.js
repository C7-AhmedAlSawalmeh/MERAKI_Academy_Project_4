const annualModel = require("../models/annualVacationSchema")
const employeeModel = require("../models/employeeSchema")

const calculateAnnual = (req, res) => {
    const { employee_id } = req.body
    employeeModel
        .findOne({ _id: employee_id })
        .then((result) => {

            const resultDate = new Date(result.date)
            const currentDate = new Date()
            const diffDays = Math.round((currentDate - resultDate) / (1000 * 60 * 60 * 24))
            const calculateAnnualFinal = Math.round((diffDays * 1.14) / 30)
            const newAnnual = new annualModel({
                employee_id,
                annual_days: calculateAnnualFinal
            })
            newAnnual
                .save()
            annualModel
                .findOneAndUpdate(
                    { employeeId: employee_id },
                    { $set: { annual_days: calculateAnnualFinal } },
                    { new: true }
                )

                .then(() => {

                    employeeModel
                        .findOneAndUpdate(
                            { _id: employee_id },
                            { $set: { annual_vacations: newAnnual._id } },
                            { new: true }
                        )
                        .then(() => {
                            res.status(201).json({
                                success: true,
                                message: "Calculated",
                                annual: result,
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
const updateAnnual = (req,res)=>{
    const id = req.params.id
    const update = req.body
    annualModel
    .findByIdAndUpdate({_id:id},update,{new:true})
    .then((result)=>{
        if(!result){
            return res.status(403).json({
                success:false,
                message:"Wrong call"
            })
        }
        res.sataus(202).json({
            success:true,
            message:"Annual updated",
            annual_vacations:result.annual_vacations
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
    calculateAnnual,
    updateAnnual,
}