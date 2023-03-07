const express = require("express")

const {calculateSalary} = require("../controllers/salary")


const salaryRouter = express.Router();

salaryRouter.post("/",calculateSalary)



module.exports = salaryRouter