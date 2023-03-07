const express = require("express")

const {calculateSalary,updateSalaryById} = require("../controllers/salary")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const salaryRouter = express.Router();

salaryRouter.post("/",authentication,authorization("DoEveryThing") ,calculateSalary)
salaryRouter.put("/update",authentication,authorization("DoEveryThing") ,updateSalaryById)



module.exports = salaryRouter