const getRandomActivity = require("../constants/activity");
const { ActivityType, Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity(getRandomActivity(), {
      type: ActivityType.Listening,
    });

    setInterval(() => {
      client.user.setActivity(getRandomActivity(), {
        type: ActivityType.Listening,
      });
    }, 7200000);
  },
};
