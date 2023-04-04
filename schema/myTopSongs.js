const moongoose = require('mongoose');

const myTopSongsSchema = new moongoose.Schema({
    userId: String,
    songName: String,
    playCount: { type: Number, default: 0 }
});

module.exports = moongoose.model('myTopSongs', myTopSongsSchema);
