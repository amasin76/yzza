//lock server===================================
/*
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lock",
    category: "moderation",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('locked all channels');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('unlocked all channels')
        }
    }
}

//countdown==================
const Command = require("../core/command.js");

class Countdown extends Command {
    constructor (client){
        super(client, {
            name: "countdown",
            description: "Countdown to the end of the school year!",
        });
    }

    async run(message, args){
        if (args.length > 0) return;

        try {
            const now = new Date().getTime();
            const distance = new Date("May 31, 2021 14:00:00").getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            message.reply(`There are ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until 2pm on May 31st!`);
        } catch (e) {
            console.log(e);
        }
    }
}

//apex==============
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const { tgg } = require('../../config.json');

exports.run = async (client, message, args) => {
			axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${args[0]}/${args[1]}`, { headers: {
                'TRN-Api-Key': tgg 
                }
            }).then(response => {
				let apex = response.data;
				console.dir(apex,{depth:null})
				//console.log(apex.data.platformInfo.platformSlug)
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('APEX PLAYER STATS')
                .setThumbnail(apex.data.platformInfo.avatarUrl)
				.addFields(
					{ name: 'Platform', value: apex.data.platformInfo.platformSlug },
					{ name: 'IGN', value: apex.data.platformInfo.platformUserIdentifier },
					{ name: 'Main Legend', value: apex.data.metadata.activeLegendName },
					{ name: 'Level', value: apex.data.segments[0].stats.level.value },
					{ name: 'Kills', value: apex.data.segments[0].stats.kills.value },
                    { name: 'Damage', value: apex.data.segments[0].stats.damage.value },
                    { name: 'Headshots', value: apex.data.segments[0].stats.headshots.value },
					{ name: 'Pistol Kills', value: apex.data.segments[0].stats.pistolKills.value },
                )
                .setFooter('BIO*HACK', 'https://i.imgur.com/KHsCxbG.png');
			message.channel.send(embed);
			}).catch((e) => {
				// if (e.response.data.errors[0].code === "CollectorResultStatus::NotFound") {
                //     message.channel.send(e.response.data.errors[0].message + " `;help apex` to see how to use.")
				// }
				//else{
					message.channel.send("An error occured. `;help apex` to see how to use.")
				//}
			});
}

//VeiwScript
module.exports = {
  name: 'scriptview',
  execute(client, message, args) {
    const script = args.join(' ');
    if(!script){
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('You must have a script to present!')
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed);
    };

    let embed = new discord.MessageEmbed()
      .setAuthor('SCRIPT')
      .setDescription(`\`\`\`${script}\`\`\``);
    return message.channel.send(embed);
  },
};















*/