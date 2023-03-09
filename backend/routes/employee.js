const express = require("express")

const {getAllEmployees,createNewEmployee,getEmployeesByRole,deleteEmployeeById,updateEmployeeById,getEmployeesById,login} = require("../controllers/employee");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const emplyoeeRouter = express.Router();


emplyoeeRouter.get("/" ,authentication,authorization("DoEveryThing"),getAllEmployees)
emplyoeeRouter.get("/:id",authentication,authorization("DoEveryThing") ,getEmployeesByRole)
emplyoeeRouter.get("/id/:id",authentication,getEmployeesById)
emplyoeeRouter.post("/register" ,authentication,authorization("DoEveryThing"),createNewEmployee)

emplyoeeRouter.post("/login",login)

emplyoeeRouter.delete("/delete/:id",authentication,authorization("DoEveryThing") ,deleteEmployeeById)
emplyoeeRouter.put("/update/:id",authentication,authorization("DoEveryThing") ,updateEmployeeById)



module.exports = emplyoeeRouter