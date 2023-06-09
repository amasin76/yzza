const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const { prefix } = require('../../config.json');

exports.run = async (client, message, args) => {
  		if(args[0] === "btc"){
			axios.get("https://api.coinlore.net/api/ticker/?id=90").then(response => {
				crypto = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('BITCOIN PRICE')
                .setThumbnail('https://www.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitoin_btc_coin_crypto-512.png')
				.addFields(
					{ name: 'Cryptocurrency', value: crypto[0].name },
					{ name: 'Price USD', value: crypto[0].price_usd}
                )
                .setFooter('BIO*HACK', 'https://i.imgur.com/KHsCxbG.png');
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")
			});
		}
		else if(args[0] === "eth"){
			axios.get("https://api.coinlore.net/api/ticker/?id=90").then(response => {
				crypto = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
                .setTitle('ETHEREUM PRICE')
                .setThumbnail('https://icons-for-free.com/iconfiles/png/512/eth+ethcoin+etherium+icon-1320162857971241492.png')
				.addFields(
					{ name: 'Cryptocurrency', value: crypto[0].name },
					{ name: 'Price USD', value: crypto[0].price_usd}
                )
                .setFooter('BIO*HACK', 'https://i.imgur.com/KHsCxbG.png');
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")

			});
        }
        else{
            message.channel.send('I dunno wachu mean. ' + '`'+`${prefix}help crypto`+'`'+' to see all commands')
        }
		
        
        
	}

exports.help = {
    name: "crypto",
    description: "Checking yours, or other members money.",
    usage: "balance [@user | user ID]",
    example: "balance \nbalance @ray#1337"
}
  
exports.conf = {
    aliases: ["crp"],
    cooldown: 5
}
