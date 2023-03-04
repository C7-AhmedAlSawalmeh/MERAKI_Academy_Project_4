const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    date:{type:String,required:true},
    id:{type:Number},
    schedule:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
    sick_vacations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SickVacation' }],
    annual_vacations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AnnualVacation' }],
    hr_actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HrAction' }],
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    salary: {type:Number}
})


module.exports = mongoose.model("Employee",employeeSchema)