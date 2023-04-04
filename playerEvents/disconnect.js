const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "disconnect",
  async execute(queue) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Disconnected")
      .setDescription("I was disconnected from the channel")
      .setTimestamp();

    return queue.metadata.channel.send({ embeds: [embed] });
  },
};
