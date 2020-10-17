// This system requires a database.
const db = require("quick.db"); // v7.1.1

module.exports = async (client, message) => {
  if (message.partial) await message.fetch();
  // Uncached message can be fetched.
  
  // If the system are doing in DM, return it.
  if (!message.guild || message.channel.type === "dm") return;
  
  // If the user was a robot, return.
  if (message.author.bot || message.author === client.user) return;
  
  // Save the content.
  db.set(`snipe.${message.guild.id}.content`, message.content);
  
  // Save the user tag.
  db.set(`snipe.${message.guild.id}.user`, message.author.tag);
  
  // Save the channel.
  db.set(`snipe.${message.guild.id}.user`, message.channel.id);
  
  // Reset the snipe database every minute.
  setTimeout(function() {
    db.delete(`snipe.${message.guild.id}`);
  }, 60000) // 60 seconds in milliseconds.
}
