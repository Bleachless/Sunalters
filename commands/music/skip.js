const { SlashCommandBuilder } = require("discord.js");
const { toggleSkip } = require("../../constants/index")
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDMPermission(false)
    .setDescription("Skip the current song!"),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    await toggleSkip(i, queue);
  },
};
