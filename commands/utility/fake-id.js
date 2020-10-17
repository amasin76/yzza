const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const { prefix } = require('../../config.json');

exports.run = async (client, message, args) => {
		if(args[0] === "person"){
			axios.get("https://pipl.ir/v1/getPerson").then(response => {
				let data = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle('FAKE DATA PERSON')
				.addFields(
					{ name: 'First Name', value: data.person.personal.name, inline: true },
					{ name: 'Last Name', value: data.person.personal.last_name, inline: true },
					{ name: 'Gender', value: data.person.personal.gender, inline: true },
					{ name: 'Age', value: data.person.personal.age, inline: true },
					{ name: 'Height', value: data.person.personal.height, inline: true },
                    { name: 'Weight', value: data.person.personal.weight, inline: true },
                    { name: 'Blood', value: data.person.personal.blood, inline: true },
					{ name: 'Religion', value: data.person.personal.religion, inline: true },
					{ name: 'Marriage', value: data.person.marriage.married, inline: true },
					{ name: 'City', value: data.person.personal.city, inline: true },
					{ name: 'Country', value: data.person.personal.country, inline: true },
                    { name: 'National Code', value: data.person.personal.national_code, inline: true  },
                    { name: 'Education Certificate', value: data.person.education.certificate, inline: true },
                    { name: 'University', value: data.person.education.university, inline: true },
                    { name: 'Work Country Code', value: data.person.work.country_code, inline: true },
                    { name: 'Insurance', value: data.person.work.insurance, inline: true },
                    { name: 'Position', value: data.person.work.position, inline: true },
                    { name: 'Salary', value: data.person.work.salary, inline: true }
                )
                .setFooter('BIO*HACK', 'https://i.imgur.com/KHsCxbG.png');
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")

			});
		}
		else if(args[0] === "cc"){
			axios.get("https://fakerapi.it/api/v1/credit_cards?_quantity=1").then(response => {
				let cc = response.data;
				const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle('FAKE CREDIT CARD')
				.addFields(
					{ name: 'Type', value: cc.data[0].type},
					{ name: 'Number', value: cc.data[0].number },
					{ name: 'Expiration', value: cc.data[0].expiration },
					{ name: 'Owner', value: cc.data[0].owner }
                )
                .setFooter('BIO*HACK', 'https://i.imgur.com/KHsCxbG.png');
			message.channel.send(embed);
			}).catch((e) => {
				message.channel.send("**An error occured**")

			});
        }
        else{
            message.channel.send('I dunno wachu mean. ' + '`'+`${prefix}help faker`+'`'+' to see all commands')
        }
		
        
        
}

exports.help = {
    name: "fakeid",
    description: "Get the information about series and movie",
    usage: "imdb <name>",
    example: "-imdb titanic"  
}

exports.conf = {
    aliases: ["fid"],
    cooldown: 10
}
