const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDMPermission(false)
    .setDescription("Shuffle the queue!"),

  async execute(i) {
    const queue = useQueue(i.guild.id);

    if (queue.tracks.size < 2) {
      return i.reply({
        embeds: [
          {
            description: "Is needed at least 3 songs to shuffle the queue.",
            color: 0x0099ff,
          },
        ],
        ephemeral: true,
      });
    }

    queue.tracks.shuffle();
    return i.reply({
      embeds: [
        {
          description: "The queue has been shuffled.",
          color: 0x0099ff,
        },
      ],
    });
  },
};
