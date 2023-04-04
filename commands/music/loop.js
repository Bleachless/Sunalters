const { SlashCommandBuilder } = require("discord.js");
const { QueueRepeatMode, useQueue } = require("discord-player");

const repeatModes = [
  { name: "Off", value: QueueRepeatMode.OFF },
  { name: "Track", value: QueueRepeatMode.TRACK },
  { name: "Queue", value: QueueRepeatMode.QUEUE },
  { name: "Autoplay", value: QueueRepeatMode.AUTOPLAY },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDMPermission(false)
    .setDescription("Loop the current song or the queue")
    .addNumberOption((option) =>
      option
        .setName("mode")
        .setDescription("Choose a loop mode")
        .setRequired(true)
        .addChoices(...repeatModes)
    ),

  async execute(i) {
    const queue = useQueue(i.guild.id);
    const mode = i.options.getNumber("mode");

    const name =
      mode === QueueRepeatMode.OFF
        ? "Repeat off"
        : repeatModes.find((x) => x.value === mode).name;

    queue.setRepeatMode(mode);

    return i.reply({
      embeds: [
        {
          description: `${name} is now **${
            mode === queue.repeatMode ? "enabled" : "disabled"
          }**!`,
          color: 0x0099ff,
        },
      ],
    });
  },
};
