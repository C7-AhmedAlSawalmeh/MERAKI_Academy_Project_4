const express = require("express")

const {getAllEmployees,createNewEmployee,getEmployeesByRole,deleteEmployeeById,updateEmployeeById,login} = require("../controllers/employee");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const emplyoeeRouter = express.Router();


emplyoeeRouter.get("/",getAllEmployees)
emplyoeeRouter.get("/:id",getEmployeesByRole)
emplyoeeRouter.post("/register",createNewEmployee)
emplyoeeRouter.post("/login",login)
emplyoeeRouter.delete("/delete/:id",deleteEmployeeById)
emplyoeeRouter.put("/update/:id",updateEmployeeById)


module.exports = emplyoeeRouter