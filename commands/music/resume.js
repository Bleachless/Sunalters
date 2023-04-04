const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const { toggleResume } = require("../../constants/index")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDMPermission(false)
    .setDescription("Use this command to resume the music"),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    await toggleResume(i, queue);
  },
};
