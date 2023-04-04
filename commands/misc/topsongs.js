const { SlashCommandBuilder } = require('discord.js');
const topSongs = require('../../schema/topsongs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('topsongs')
    .setDescription('Shows the top 10 songs played in the server'),
  async execute(i) {
    const topSongsDocs = await topSongs
      .find({ guildID: i.guild.id })
      .sort({ playCount: -1 })
      .limit(10);

    const topSongsList = topSongsDocs.map(
      (doc, index) => `${index + 1}. ${doc.songName} - ${doc.playCount} plays`
    );

    const response = topSongsList.length
      ? `Top 10 songs played in the server:\n${topSongsList.join('\n')}`
      : 'No songs have been played yet!';

      await i.reply(response);
  },
};