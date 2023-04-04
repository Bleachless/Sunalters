const { ERROS, QUEUE_SKIP } = require("../../constants/messages.js");
async function toggleSkip(i, queue) {
  if (!queue.currentTrack) {
    return i.reply(ERROS);
  }
  try {
    await i.deferReply();
    queue.node.skip();
    return i.followUp(QUEUE_SKIP);
  } catch (error) {
    console.error(error);
    return i.followUp(ERROS);
  }
}

module.exports = {
  toggleSkip,
};
