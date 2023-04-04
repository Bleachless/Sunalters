const { SlashCommandBuilder } = require('discord.js');
const myTopSongs = require('../../schema/myTopSongs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mytopsongs')
    .setDescription('Shows the top 10 songs played by you'),
  async execute(i) {
    const myTopSongsDocs = await myTopSongs
      .find({ userId: i.user.id })
      .sort({ playCount: -1 })
      .limit(10);

    const myTopSongsList = myTopSongsDocs.map(
      (doc, index) => `${index + 1}. ${doc.songName} - ${doc.playCount} plays`
    );

    const response = myTopSongsList.length
      ? `Your top 10 songs played:\n${myTopSongsList.join('\n')}`
      : 'You have not played any songs yet!';

    await i.reply({ content: response, ephemeral: true });
    
  },
};
