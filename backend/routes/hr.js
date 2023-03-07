const express = require("express")

const {createHRaction,deleteHRbyId} = require("../controllers/hr")


const hrRouter = express.Router();

hrRouter.post("/",createHRaction)
hrRouter.delete("/delete/:id",deleteHRbyId)

module.exports = hrRouter