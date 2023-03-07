const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //read about it
    date: { type: Date, required: true },
    //read
    employeeId: { type: Number },
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    sick_vacations: { type: mongoose.Schema.Types.ObjectId, ref: 'SickVacation' },
    annual_vacations: { type: mongoose.Schema.Types.ObjectId, ref: 'AnnualVacation' },
    hr_actions: { type: mongoose.Schema.Types.ObjectId, ref: 'HrAction' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    salary: { type: mongoose.Schema.Types.ObjectId , ref:"Salary" }
})

employeeSchema.pre('save', async function (next) {
    if (!this.employeeId) {
        const lastEmployee = await this.constructor.findOne({}, {}, { sort: { 'employeeId': -1 } });
        this.employeeId = lastEmployee ? lastEmployee.employeeId + 1 : 1;
    }
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


module.exports = mongoose.model("Employee", employeeSchema)