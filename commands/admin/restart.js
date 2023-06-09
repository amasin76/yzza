exports.run = async (client, message, args) => {
        if (message.author.id !== '484524591696576523') {
            return message.channel.send(`⛔ **Restarting the BOT! is only allowed for the Developer** ⛔`)
        }
        await message.channel.send(`✅Done`)
        console.log('Bot rebooting...');
        process.exit();
    }

exports.help = {
  name: "restart",
  description: " reboot/restart bot",
  usage: "restart",
  example: "/restart"
}

exports.conf = {
  aliases: ["restart", "reboot", "go"],
  cooldown: 5
}
