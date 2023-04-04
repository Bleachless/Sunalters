const { NO_QUEUE, QUEUE_BACK_ERROS, QUEUE_BACK } = require("../../constants/messages.js");

async function toggleBack (i, queue) {
    if (!queue.currentTrack) {
        return i.reply(NO_QUEUE);
      }
  
      if (!queue.history.previousTrack) {
        return i.reply(QUEUE_BACK_ERROS);
      }
  
      await queue.history.previous();
      return i.reply(QUEUE_BACK)
}

module.exports = {
    toggleBack
}
