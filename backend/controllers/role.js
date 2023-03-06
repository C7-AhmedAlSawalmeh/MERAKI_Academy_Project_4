const roleModel = require("../models/roleSchema")

const createRole = (req,res)=>{
    const {role,permissions} = req.body;
    const newRole = new roleModel({
        role,
        permissions
    })
    newRole
    .save()
    .then((result)=>{
        res.status(201).json({
            success:true,
            message:"Role created",
            role:result
        });
        
    }).catch((err)=>{
          res.status(500).json({
            success:false,
            message:"Server Error",
            err:err.message
          })  
    })
}



module.exports ={
    createRole
}