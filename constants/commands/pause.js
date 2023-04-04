const { ERROS, NO_QUEUE } = require("../../constants/messages.js");

// Function shared between skip button and skip command
async function togglePause(i, queue) {
  if (!queue.currentTrack) {
    return i.reply(ERROS || NO_QUEUE);
  }

  const state = queue.node.isPaused();
  await i.deferReply();
  queue.node.setPaused(!state);
  return i.followUp({
    embeds: [
      {
        description: `The music was ben ${state ? "unpaused" : "paused"}`,
        color: 0x0099ff,
      },
    ],
  });
}

module.exports = {
  togglePause
};
