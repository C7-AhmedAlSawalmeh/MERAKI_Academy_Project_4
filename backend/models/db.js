const mongoose = require("mongoose")

mongoose.set ("strictQuery",false);
mongoose
.connect("mongodb://127.0.0.1:27017/FourthProject")
.then(()=>{
    console.log("DB is ready")
})
.catch((err)=>{
    console.log(err)
});