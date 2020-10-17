const { BOT_OWNER } = process.env;

exports.run = async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'❌ You must have the following permissions to use that: Bot Owner.',
			);
		}

		const guild = client.guilds.cache.get(args[0]);
		if(!guild) {
			return message.channel.send(
				'❌ Please provide a valid guild id.',
			);
		}
		else {
			guild.leave();
			await message.channel.send(`✅ Successfully left ${guild.name} (ID:${guild.id})`);
		}
}

exports.help = {
    name: "Fleave",
    description: "invisible",
    usage: "invisible",
    example: "invisible"  
}

exports.conf = {
    aliases: ["Fleave"],
    cooldown: 10
}