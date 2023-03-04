const mongoose = require("mongoose")

const attendanceSchema  = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    start_time: { type: Date, default: Date.now },
    end_time: { type: Date, default: Date.now }
})


module.exports = mongoose.model("Attendance",attendanceSchema)