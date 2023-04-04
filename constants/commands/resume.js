const { ERROS, NO_QUEUE } = require("../../constants/messages.js");

async function toggleResume(i, queue) {
  if (!queue.currentTrack) return i.reply(NO_QUEUE || ERROS);
  const state = queue.node.isPaused();
  queue.node.setPaused(!state);
  return i.reply({
    embeds: [
      {
        description: `The music was ben ${state ? "unpaused" : "paused"}`,
        color: 0x0099ff,
      },
    ],
  });
}

module.exports = {
  toggleResume,
};
