const express = require("express");
const cors = require("cors");
const db = require("./models/db")

const app = express();
const PORT1 = process.env.PORT 

app.use(cors());
app.use(express.json());

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT1, () => {
  console.log(`Server listening at http://localhost:${PORT1}`);
});
