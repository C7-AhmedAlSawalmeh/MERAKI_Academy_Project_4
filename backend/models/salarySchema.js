const mongoose = require("mongoose")

const salarySchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    hourly_salary: { type: Number },
    
})


module.exports = mongoose.model("Salary", salarySchema)