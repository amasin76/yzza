

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('**:x: You Dont Have Perms `ADMINISTRATOR`**');
       if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**:x: I Dont Have Perms `MOVE_MEMBERS`**");
    if (message.member.voice.channel == null) return message.channel.send(`**You Have To Be In Room Voice**`)
     var author = message.member.voice.channelID;
     var m = message.guild.members.filter(m=>m.voiceChannel)
     message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
     m.setVoiceChannel(author)
     })
     message.channel.send(`**:white_check_mark: Success Moved All To Your Channel**`)


}

exports.help = {
    name: "tmoveAll",
    description: "Not Allowed",
    usage: "N/A",
    example: "N/A"
}

exports.conf = {
    aliases: ["tmvall"],
    cooldown: 8
}

