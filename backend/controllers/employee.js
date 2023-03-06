const employeeModel = require("../models/employeeSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const getAllEmployees = (req, res) => {

    employeeModel
        .find()
        .populate("annual_vacations role schedule")
        .exec()
        .then((employees) => {
            if (employees.length) {
                res.status(200).json({
                    sucsses: true,
                    message: "All employees",
                    employees: employees
                })
            } else {
                res.status(200).json({
                    sucsses: false,
                    message: "No employees"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                sucsses: false,
                message: "Server Error",
                err: err.message
            })
        })
}
const createNewEmployee = (req, res) => {
    const { name, phoneNumber, email, password, date, role, employeeId } = req.body

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
        .then((result) => {
            res.status(201).json({
                sucsses: true,
                message: "Employee registered",
                info: result
            })
        }).catch((err) => {
            res.status(500).json({
                sucsses: false,
                message: "Server Error",
                err: err.message
            })
        })

}
const getEmployeesByRole = (req, res) => {
    const id = req.params.id
    employeeModel

        .find({ role: id })
        .populate("role")
        .exec()
        .then((employees) => {
            if (!employees.length) {
                return res.status(404).json({
                    sucsses: false,
                    message: "There is no employee for this role"
                })
            }
            res.status(200).json({
                sucsses: true,
                message: "Found",
                employees: employees
            })
        }).catch((err) => {
            res.status(500).json({
                sucsses: false,
                message: "Server Error",
                err: err.message
            })
        })
}
const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    employeeModel
    .findOne({email})
    .populate("role")
    .then(async(result)=>{
        if(!result){
            return res.status(403).json({
                sucsses:false,
                message:"Check your email or password"
            })
        }try{
            
            const correct = await bcrypt.compare(password,result.password)
            if(!correct){
                return res.status(403).json({
                    sucsses:false,
                    message:"Check your email or password"
                })
            }
            const payload={
                employeeid : result.employeeId,
                employeeName : result.Name,
                role:result.role,
                phoneNumber : result.phoneNumber
            }
            const options = {
                expiresIn:"120m"
            }
            const token = jwt.sign(payload,process.env.SECRET,options)
            res.status(200).json({
                sucsses:true,
                message:"Welcome",
                token:token
            })

        }catch(err){
            
            throw new Error(err.message);
        }
        
    }).catch((err)=>{
        
        res.status(500).json({
            sucsses:false,
            message:"Server Error",
            err:err.message
        })
    })
 }





module.exports = {
    getAllEmployees,
    createNewEmployee,
    getEmployeesByRole,
    login
}