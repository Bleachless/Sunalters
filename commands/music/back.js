const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const { toggleBack } = require("../../constants/index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDMPermission(false)
    .setDescription("Go back to the previous song!"),
    
  async execute(i) {
    const queue = useQueue(i.guild.id);
    await toggleBack(i, queue);
  },
};
