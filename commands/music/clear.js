const { SlashCommandBuilder } = require("discord.js");
const { QUEUE_CLEAR, ERROS } = require("../../constants/messages.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDMPermission(false)
    .setDescription("Clear the queue!"),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    if (!queue.tracks) {
      return i.reply(ERROS);
    }
    queue.tracks.clear() 
    return i.reply(QUEUE_CLEAR);
  },
};
