exports.run = async (client, message, args) => {
  if (message.channel.id !== "VERIFICATION_CHANNEL_ID") {
    // If the channel it wasn't verification channel, ignore it.
    return;
  }
  
  await message.delete();
  await message.member.roles.add("ROLE_ID"); // Member role.
  
  // Use this if you want to remove the role from the user.
  await message.member.roles.remove("ROLE_ID");
  return;
}

exports.help = {
  name: "verify",
  description: "Verify yourself to make sure you are not a robot."
}

exports.conf = {
  aliases: [],
  cooldown: 20
}
