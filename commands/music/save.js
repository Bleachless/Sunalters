const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { NO_QUEUE } = require("../../constants/messages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDMPermission(false)
    .setDescription("Save the current song to your saved songs."),

  async execute(i, ) {
    const queue = useQueue(i.guild.id);

    if (!queue) {
      return i.reply(NO_QUEUE);
    }

    if (queue) {
      const save = new EmbedBuilder()
        .setTitle("Saved Song")
        .setAuthor({
          name: queue.currentTrack.author,
          iconUrl: queue.currentTrack.thumbnail,
          url: queue.currentTrack.url,
        })
        .setDescription(
          `**[${queue.currentTrack.title}](${queue.currentTrack.url})** has been saved to your saved songs.`
        )
        .setThumbnail(queue.currentTrack.thumbnail)
        .setColor("Random")
        .setTimestamp();

      return i.user
        .send({ embeds: [save] })
        .then(() => {
          i.reply({
            embeds: [{ description: "I sent music to your DMs" }],
            ephemeral: true,
          });
        })
        .catch((error) => {
          console.log(error);
          i.reply({
            embeds: [{ description: `I can't send message to your DMs` }],
            ephemeral: true,
          });
        });
    }
  },
};
