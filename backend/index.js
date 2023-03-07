const express = require("express");
const cors = require("cors");
const db = require("./models/db")
require("dotenv").config();

const app = express();
const PORT1 = process.env.PORT 

const emplyoeeRouter = require("./routes/employee")
const roleRouter = require("./routes/role")
const scheduleRouter = require("./routes/schedule")
const annualRouter = require("./routes/annual")
const sickRouter=require("./routes/sick")
const salaryRouter = require("./routes/salary")
const attendenceRouter=require("./routes/attendence")
const hrRouter = require("./routes/hr")

app.use(cors());
app.use(express.json());

app.use("/employee",emplyoeeRouter)
app.use("/role",roleRouter)
app.use("/schedule",scheduleRouter)
app.use("/annual",annualRouter)
app.use("/sick",sickRouter)
app.use("/salary",salaryRouter)
app.use("/attendence",attendenceRouter)
app.use("/hrAction",hrRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT1, () => {
  console.log(`Server listening at http://localhost:${PORT1}`);
});
