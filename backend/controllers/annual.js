const annualModel = require("../models/annualVacationSchema")
const employeeModel = require("../models/employeeSchema")

const calculateAnnual = (req, res) => {
    const { employee_id } = req.body
employeeModel
  .findOne({ _id: employee_id })
  .then((result) => {
    
    const resultDate = new Date(result.date) 
    const currentDate = new Date()
    const diffDays = Math.round((currentDate-resultDate)/(1000*60*60*24))
    const calculateAnnualFinal = (diffDays*1.14)/30
    const newAnnual =new annualModel({
        employee_id,
        annual_days:calculateAnnualFinal
    }) 
    newAnnual
    .save()
    annualModel
      .findOneAndUpdate(
        { employeeId: employee_id },
        { $set: { annual_days:  calculateAnnualFinal } },
        { new: true }
      )
      
      .then(() => {
        
        employeeModel
          .findOneAndUpdate(
            { _id: employee_id },
            { $push: { annual_vacations: newAnnual._id } },
            { new: true }
          )
          .then(() => {
            res.status(201).json({
              success: true,
              message: "Calculated",
              annual: result,
            })
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: "Server Error",
              err: err.message,
            })
          })
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err.message,
        })
      })
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    })
  })

}





module.exports = {
    calculateAnnual
}