const Discord = require("discord.js");

module.exports = (client) => {
  const channelId = '750143684716003328'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    if (channel) {
      channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('759803029443969024')
  updateMembers(guild)
}