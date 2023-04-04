const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDMPermission(false)
    .setDescription("Play a song.")
    .addStringOption((option) =>
      option
        .setName("track")
        .setDescription("The name/url/playlist you want to play.")
        .setRequired(true)
    ),

  async execute(i) {
    await i.deferReply();
    const query = i.options.getString("track", true);

    if (!i.member.voice.channelId) {
      return await i.editReply({
        embeds: [
          {
            description:
              "You need to be in a voice channel to use this command.",
            color: 0x0099ff,
          },
        ],
      });
    }

    if (
      i.guild.members.me.voice.channelId &&
      i.member.voice.channelId !== i.guild.members.me.voice.channelId
    ) {
      return await i.editReply({
        embeds: [
          {
            description: "You need to be in the same voice channel as me.",
            color: 0x0099ff,
          },
        ],
      });
    }
    const voiceChannel = i.member.voice.channelId;
    const result = await i.client.player.search(query);
    if (!result.hasTracks()) {
      return await i.editReply({
        embeds: [
          {
            description: `No results found for: **${query}**`,
            color: 0x0099ff,
          },
        ],
      });
    }
    try {
      const res = i.client.player.play(voiceChannel, result, {
        nodeOptions: {
          metadata: {
            channel: i.channel,
            requestedBy: i.user.username,
            requestedById: i.user.id,
            client: i.guild.members.me,
          },
          leaveOnEmptyCooldown: 300000,
          leaveOnEmpty: true,
          leaveOnEnd: false,
          bufferingTimeout: 0,
        },
      });
      return await i.followUp({
        embeds: [
          {
            description: `${
              result.playlist ? 
              `Added a playlist with **${result.tracks.length}** tracks to the queue` :
              `Added track: **${result.tracks[0].title}** to the queue!`
            }`,
            color: 0x0099ff,

          },
        ],
      });
    } catch (error) {
      return await i.editReply({
        embeds: [
          {
            description: `error: ${error}`,
            color: 0x0099ff,
          },
        ],
      });
    }
  },
};
