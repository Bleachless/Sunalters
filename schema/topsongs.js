const moongoose = require('mongoose');

const topSongsSchema = new moongoose.Schema({
    guildID: String,
    songName: String,
    playCount: { type: Number, default: 0 }
});

module.exports = moongoose.model('topSongs', topSongsSchema);