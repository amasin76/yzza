const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
		const url = 'https://www.boredapi.com/api/activity/';

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('❌ An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('You should...')
			.setDescription(response.activity)
			.addField('Participants', response.participants, true)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
}

exports.help = {
    name: "bored",
    description: "Get the information about series and movie",
    usage: "imdb <name>",
    example: "-imdb titanic"  
}

exports.conf = {
    aliases: ["bored"],
    cooldown: 10
}