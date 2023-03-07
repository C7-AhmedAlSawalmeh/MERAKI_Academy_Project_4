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

const updateSalaryById = (req,res)=>{
    const id = req.params.id
    const update = req.body
    salaryModel
    .findByIdAndUpdate({_id:id},update,{new:true})
    .then((result)=>{
        if(!result){
            return res.status(403).json({
                sucsses:false,
                message:"Wrong call"
            })
        }
        res.status(202).json({
            sucsses:true,
            message:"Salary updated",
            salary:result.hourly_salary
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
    calculateSalary,
    updateSalaryById
}