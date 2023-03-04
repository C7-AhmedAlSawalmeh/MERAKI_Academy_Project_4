const mongoose = require("mongoose");

const annualVacationSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  annual_days: {type:Number}
});

module.exports = mongoose.model("AnnualVacation", annualVacationSchema);