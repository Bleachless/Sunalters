const { join } = require("path");
const { Player } = require("discord-player");
const { readdirSync } = require("fs");


module.exports = (client) => {
  const player =  new Player(client);

  client.player = player;

  const playerEventsDir = join(__dirname, "../playerEvents");
  readdirSync(playerEventsDir).forEach((file) => {
    if (!file.endsWith(".js")) return;
    let event = require(`${playerEventsDir}/${file}`);
    try {
      player.events.on(event.name, (...args) => event.execute(...args));
    } catch (error) {
      console.log(error);
    }
  });
};
