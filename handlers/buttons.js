const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = (client) => {
    client.buttons = new Collection();
    client.cooldowns = new Collection();
    const buttonDir = join(__dirname, '../buttons');
    readdirSync(buttonDir).forEach((dir) => {
        let buttonFiles = readdirSync(`${buttonDir}/${dir}`).filter((file) => file.endsWith('.js'));
        for (let file of buttonFiles) {
            const command = require(`${buttonDir}/${dir}/${file}`);
            client.buttons.set(command.id, command);
        }
    });

}