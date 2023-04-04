const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "emptyChannel",

  async execute(queue) {
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle("The queue is empty")
      .setDescription("Its been 5 minutes since the last song was played, so I left the channel")
      .setTimestamp();

    return queue.metadata.channel.send({ embeds: [embed] });
  },
};
