const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const { QUEUE_STOPPED, ERROS } = require("../../constants/messages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDMPermission(false)
    .setDescription("Stop the music!"),

  execute(i) {
    const queue = useQueue(i.guild.id);

    try {
      queue.delete();
      return i.reply(QUEUE_STOPPED);
    } catch (error) {
      console.error(error);
      return i.reply(ERROS);
    }
  },
};
