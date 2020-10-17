const Discord = require('discord.js');
const Translator = require('@danke77/google-translate-api');
exports.run = async (bot, msg, args) => {

    const args1 = msg.content.split(' ').slice(1); 
    const giventext = args1.join(' '); 

    const notext = new Discord.MessageEmbed()
        .setColor('#FF665B')
        .setTitle("Invalid argument")
        .setDescription('prefix+tr translate [text]')
        .setFooter("You didn't enter text to translate.")

    if (!giventext) return msg.channel.send(notext)
 
    const translator = new Translator({
        from: 'auto',
        to: 'ar',
        raw: false,
        client: 'gtx',
        tld: 'cn',
    });
    
    const res = await translator.translate(giventext)
        .catch(err => {
            console.error(err);
            msg.channel.send("Error while translating.")
            msg.channel.send("```" + err + "```")
        });

    const translateembed = new Discord.MessageEmbed()
        .setColor("#301934")
        .setTitle("Translation result")
        .setDescription(res.text)
        .setFooter(`Given language: ${res.from.language.iso}`)

    msg.channel.send(translateembed)
    
}

exports.help = {
    name: "translate",
    description: " google translator to arabe",
    usage: "prefix+tr translate [text]",
    example: "-tr hi"
}

exports.conf = {
    aliases: ["tr"],
    cooldown: 5
}