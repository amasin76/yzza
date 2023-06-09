const Discord = require("discord.js")
const ms = require("ms")
const schedule = require("node-schedule")
const prompts = ['What do you want to send as a reminder?', 'When do you want to send this reminder (ex. 3s, 3m, 3d, 3h)?']


exports.run = async (client, msg, args) => {
    let channel_id = msg.content.split(" ")[1]
    let channel = msg.guild.channels.cache.get(channel_id)
    if (channel) {
      let content = msg.content.split(" ")
      let result = await getResponses(msg)
      const confirmEmbed = new Discord.MessageEmbed()
      confirmEmbed.setTitle("⏰Reminder")
      confirmEmbed.setDescription(`${msg.author} **your message will be sent in** ${channel}`)
      confirmEmbed.setColor("#36393F")
      msg.channel.send(confirmEmbed)
      result.endsOn = new Date(Date.now() + ms(result.duration))
      schedule.scheduleJob(result.endsOn, async () => {
        const reminderEmbed = new Discord.MessageEmbed()
        reminderEmbed.setTitle("⏰Reminder")
        reminderEmbed.setDescription(`${msg.author} 🔰** ${result.message} **🔰`)
        reminderEmbed.setColor("#36393F")
        channel.send(reminderEmbed)
      })
    } else {
      msg.reply("Channel does not exist!")
    }
  }

async function getResponses(msg) {
  let validTime = /^\d+(s|m|h|d)/;
  const result = { message: null, duration: 60 }
  for (let i = 0; i < prompts.length; i++) {
    await msg.reply(prompts[i])
    const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1 });
    let content = response.first().content;
    if (i === 0) {
      result.message = content;
    }
    else if (i === 1) {
      if (validTime.test(content)) {
        result.duration = content;
      }
      else {
        msg.reply(":beers: Invalid Time Format")
        throw new Error("Invalid Time Format");
      }
    }
  }
  return result
}

exports.help = {
    name: "reminder",
    description: "Reminder",
    usage: "reminder <channel.id> => <text> => <time>",
    example: "-reminder 717057694644830329 => reminde me plz => 10s"
}

exports.conf = {
    aliases: ["rd"],
    cooldown: 10
}
