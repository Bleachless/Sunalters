const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("uptime")
		.setDMPermission(false)
        .setDescription("Get the uptime of the bot"),
    async execute(i) {
        //quanto tempo o bot está online
		const uptime = i.client.uptime;
		//quanto tempo o bot está online em segundos
		const uptimeInSeconds = Math.floor(uptime / 1000);
		//quanto tempo o bot está online em minutos
		const uptimeInMinutes = Math.floor(uptimeInSeconds / 60);
		//quanto tempo o bot está online em horas
		const uptimeInHours = Math.floor(uptimeInMinutes / 60);
		//quanto tempo o bot está online em dias
		const uptimeInDays = Math.floor(uptimeInHours / 24);
		//quanto tempo o bot está online em segundos
		const uptimeInSeconds2 = uptimeInSeconds % 60;
		//quanto tempo o bot está online em minutos
		const uptimeInMinutes2 = uptimeInMinutes % 60;
		//quanto tempo o bot está online em horas
		const uptimeInHours2 = uptimeInHours % 24;



		//criando embed
		const embed = new EmbedBuilder()
			.setColor("Random")
			.setTitle("My Uptime")
			.setDescription(
				`🏓 BOT Latency: ${Date.now() - i.createdTimestamp}ms. \n🏓 API Latency: ${Math.round(
					i.client.ws.ping
				)}ms. \n🏓 Uptime: ${uptimeInDays}d ${uptimeInHours2}h ${uptimeInMinutes2}m ${uptimeInSeconds2}s`
			);

		//enviando embed
		i.reply({ embeds: [embed] });
    },
};
