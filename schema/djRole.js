const mongoose = require("mongoose");

const djRoleSchema = new mongoose.Schema({
  guildID: String,
  djRoleID: String,
  dj: Boolean,
});

module.exports = mongoose.model("djRole", djRoleSchema);
