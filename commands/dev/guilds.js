const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;


exports.run = async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'❌ You must have the following permissions to use that: Bot Owner.',
			);
		}

		const list = client.guilds.cache.sort((a, b) => a.joinedAt - b.joinedAt).map(guild => `${guild.name} (${guild.id})`).join('\n');

		const botembed = new MessageEmbed()
			.setDescription(`**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`)
			.setColor('BLUE')
			.addField('Servers', list);
		message.channel.send(botembed);
}

exports.help = {
    name: "guilds",
    description: "invisible",
    usage: "invisible",
    example: "invisible"  
}

exports.conf = {
    aliases: ["serverlist"],
    cooldown: 10
}