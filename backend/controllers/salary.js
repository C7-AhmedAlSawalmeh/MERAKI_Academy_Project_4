const salaryModel = require("../models/salarySchema")
const employeeModel = require("../models/employeeSchema")

const calculateSalary = (req, res) => {
    const { hourly_salary, employee_id } = req.body
    
    const newSalary = new salaryModel({
        hourly_salary,
        employee_id
    })

    newSalary
        .save()
        .then((result) => {
            employeeModel
                .findByIdAndUpdate(
                    {_id:employee_id}
                    , {$set:{salary:result._id}}
                    , {new:true}
                )
                .then((result)=>{
                    res.status(201).json({
                        sucsses:true,
                        message:"Calculated",
                        salary:result
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        sucsses:false,
                        message:"Server Error",
                        err:err.message
                    })
                })
        }).catch((err)=>{
            res.status(500).json({
                sucsses:false,
                message:"Server Error",
                err:err.message
            })
        })

}


module.exports = {
    calculateSalary
}