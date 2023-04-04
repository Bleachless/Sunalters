const { QUEUE_STOPPED, ERROS } = require("../../constants/messages.js");

async function toggleStop(i, queue) {
  if (!queue.currentTrack) {
    return i.reply(ERROS);
  }
  try {
    await queue.node.stop();
    return i.reply(QUEUE_STOPPED);
  } catch (e) {
    console.error(e);
    return i.reply(ERROS);
  }
}

module.exports = {
  toggleStop,
};
