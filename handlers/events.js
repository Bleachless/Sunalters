const { readdirSync } = require("fs");
const { join } = require("path");
module.exports = (client) => {
  let eventsDir = join(__dirname, "../events");
  readdirSync(eventsDir).forEach((file) => {
    if (!file.endsWith(".js")) return;
    let event = require(`${eventsDir}/${file}`);
    try {
      event.once
        ? client.once(event.name, (...args) => event.execute(...args))
        : client.on(event.name, (...args) => event.execute(...args));
    } catch (error) {
      console.log(error);
    }
  });
};
