const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const { togglePause } = require("../../constants/index")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDMPermission(false)
    .setDescription("Pause the current song"),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    await togglePause(i, queue);
  },
};