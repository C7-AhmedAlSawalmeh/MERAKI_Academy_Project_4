const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  work_days: { day: String, start_time: Date, end_time: Date, hours:Number ,isWork:String},
  
});

module.exports = mongoose.model("Schedule", scheduleSchema);