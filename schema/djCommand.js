const mongoose = require('mongoose');

const djCommandSchema = new mongoose.Schema({
    guildID: String,
    commandName: String,
    dj: Boolean
});

module.exports = mongoose.model('djCommand', djCommandSchema);