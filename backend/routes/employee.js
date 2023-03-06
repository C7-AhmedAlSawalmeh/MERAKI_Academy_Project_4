const express = require("express")

const {getAllEmployees,createNewEmployee} = require("../controllers/employee");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const emplyoeeRouter = express.Router();


emplyoeeRouter.get("/",getAllEmployees)
emplyoeeRouter.post("/register",createNewEmployee)


module.exports = emplyoeeRouter