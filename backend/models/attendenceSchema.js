const mongoose = require("mongoose")

const attendanceSchema  = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    start_time: { type: Date, },
    end_time: { type: Date, }
})


module.exports = mongoose.model("Attendance",attendanceSchema)