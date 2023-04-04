const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("discord.js");
const {
  ERROS,
  QUEUE_ALREADY_VOLUME,
  QUEUE_VOLUME_INVALID,
} = require("../../constants/messages.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("set volume!")
    .setDMPermission(false)
    .addIntegerOption((option) =>
      option.setName("volume").setDescription("volume").setRequired(true)
    ),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    const volume = i.options.getInteger("volume");

    if (volume < 0 || volume > 100) {
      return i.reply(QUEUE_VOLUME_INVALID);
    }

    if (queue.node.volume == volume) {
      return i.reply(QUEUE_ALREADY_VOLUME);
    }

    if (queue) {
      return queue.node.setVolume(volume)
        ? await i.reply({
            embeds: [
              {
                description: `Volume set to ${volume}`,
                color: 0x0099ff,
              },
            ],
          })
        : await i.reply(ERROS);
    }
  },
};
