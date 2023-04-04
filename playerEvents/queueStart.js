const { EmbedBuilder } = require("discord.js");
const { rw } = require("../constants/buttons");
const topSongs = require("../schema/topsongs");
const myTopSongs = require("../schema/myTopSongs");

module.exports = {
  name: "playerStart",

  async execute(queue, track) {
    const playerEmbed = new EmbedBuilder()
      .setColor('Random')
      .setTitle("Now playing")
      .setDescription(`[${track.title ?? "No data"}](${track.url})  `)
      .addFields(
        { name: "Duration", value: `${track.duration ?? "No data"}` },
        {
          name: "Request by",
          value: `${queue.metadata.requestedBy ?? "No data"} `,
        }
      )
      .setThumbnail(
        track.thumbnail ??
          "https://letsgeek.com.br/wp-content/uploads/2021/09/79519-kimetsu-no-yaiba-nezuko-inspira-un-enorme-y-adorable-peluche.jpg"
      )
      .setTimestamp();

    await queue.metadata.channel.send({
      embeds: [playerEmbed],
      components: [rw],
    });

    const topSongsDoc = await topSongs.findOne({ guildID: queue.guild.id, songName: track.title });
    if (!topSongsDoc) {
      const newTopSongs = new topSongs({
        guildID: queue.guild.id,
        songName: track.title,
        playCount: 1,
      });
      await newTopSongs.save();
    } else {
      topSongsDoc.playCount++;
      await topSongsDoc.save();

    }

    const userId = queue.metadata.requestedById;
    
    const myTopSongsDoc = await myTopSongs.findOne({ userId: userId, songName: track.title });
    if (!myTopSongsDoc) {
      const newMyTopSongs = new myTopSongs({
        userId: userId,
        songName: track.title,
        playCount: 1,
      });
      await newMyTopSongs.save();
    } else {
      myTopSongsDoc.playCount++;
      await myTopSongsDoc.save();
    }
  },
};