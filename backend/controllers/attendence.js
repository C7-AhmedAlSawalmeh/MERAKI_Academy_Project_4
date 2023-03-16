const attendenceModel = require("../models/attendenceSchema")

const confirmStartAttendence = (req,res)=>{
const {employee_id,} = req.body
const currentDate = new Date()
const newAttendence  = new attendenceModel({
    employee_id,
    start_time:currentDate
})
newAttendence
.save()
.then((result)=>{
res.status(201).json({
    sucsses:true,
    message:"Attendence Confirmed",
    attendence:result.start_time
})
}).catch((err)=>{
    res.status(500).json({
        sucsses:true,
        message:"Server Error",
        err:err.message
    })
})
}

const confirmEndAttendence = (req,res)=>{
const id = req.params.id
const currentDate = new Date()
attendenceModel
.findByIdAndUpdate(
    {_id:id},
    {end_time:currentDate}
    ,{new:true}
    ).then((result)=>{
        res.status(200).json({
            sucsses:true,
            message:"Attendence confirmed",
            start_time:result.start_time,
            end_time:result.end_time
        })
    }).catch((err)=>{
        res.status(500).json({
            sucsses:false,
            message:"Server Error",
            err:err.message
        })
    })
}

const getAttendenceByEmplyoeeId = (req,res)=>{
    const id = req.params.id
    attendenceModel
    .find({employee_id:id})
    .then((result)=>{
        if(!result){
            res.status(403).json({
                sucsses:false,
                message:"Wrong Call"

            })
        }
        res.status(200).json({
            sucsses:true,
            message:"Founded",
            result:result
        })
    }).catch((err)=>{
        res.status(500).json({
            sucsses:true,
            message:"Server Error",
            err:err.message
        })
    })
}


module.exports ={
    confirmStartAttendence,
    confirmEndAttendence,
    getAttendenceByEmplyoeeId
}