const employeeModel = require("../models/employeeSchema")

const getAllEmployees = (req,res)=>{

}
const createNewEmployee = (req,res)=>{
    const {name,phoneNumber,email,password,date,role,employeeId} = req.body

    const newEmployee = new employeeModel({
        name,
        phoneNumber,
        email,
        password,
        date,
        role,
        employeeId
    })
    newEmployee
    .save()
    .then((result)=>{
        res.status(201).json({
            sucsses:true,
            message:"Employee registered",
            info:result
        })
    }).catch((err)=>{
        res.status(500).json({
            sucsses:false,
            message:"Server Error",
            err:err.message
        })
    })

}



module.exports ={
    getAllEmployees,
    createNewEmployee
}