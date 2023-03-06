const mongoose = require("mongoose")

const hrSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    hrAction: { type: Number },

})


module.exports = mongoose.model("HR", hrSchema)