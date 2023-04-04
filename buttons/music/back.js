const { useQueue } = require("discord-player");
const { toggleBack } = require("../../constants/index");

module.exports = {
  cooldown: 10,
  id: "back",

  async execute(i) {
    const queue = useQueue(i.guild.id);
    await toggleBack(i, queue);
  },
};
