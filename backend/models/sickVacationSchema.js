const mongoose = require("mongoose");

const sickVacationSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    sick_days: {type:Number}
});

module.exports = mongoose.model("SickVacation", sickVacationSchema);