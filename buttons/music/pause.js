const { useQueue } = require("discord-player");
const { togglePause } = require("../../constants/index")

module.exports = {
  cooldown: 10,
  id: "pause",

  async execute(i) {
    const queue = useQueue(i.guild.id);
    await togglePause(i, queue);
  },
};
