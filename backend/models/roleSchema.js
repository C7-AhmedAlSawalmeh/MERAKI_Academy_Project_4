const mongoose = require("mongoose");
// Manager : 640573bf2185555d12771569
// Employee : 64057401c939d064928f0b39
const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: [{ type: String, required: true }],
});

module.exports = mongoose.model("Role", rolesSchema);