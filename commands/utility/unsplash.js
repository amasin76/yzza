const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const token = process.env.UNSPLASH_CLIENT_TOKEN;

exports.run = async (client, message, args) => {
		const url = 'https://api.unsplash.com/photos/random?client_id=' + token;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(response.description ? response.description : 'Random Wallpaper')
			.setURL(response.urls.raw)
			.setImage(response.urls.raw)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
}

exports.help = {
    name: "unsplash",
    description: "Get random wallpaper from unsplash",
    usage: "wallpaper",
    example: "---"
}

exports.conf = {
    aliases: ["usp", "wallpaper"],
    cooldown: 10
}