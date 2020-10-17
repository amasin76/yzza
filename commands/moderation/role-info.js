const { MessageEmbed, Permissions } = require('discord.js');

exports.run = async (client, message, args) => {
        // code starts here
        try {
            const roleName = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()))
            console.log(roleName)
            const perms = new Permissions(roleName.permissions.bitfield).toArray()

            const embed = new MessageEmbed()
                .setColor(roleName.color)
                .setTitle(roleName.name)
                .addFields(
                    {
                        name: 'Role ID: ',
                        value: roleName.id,
                        inline: true
                    },
                    {
                        name: 'Role Name: ',
                        value: roleName.name,
                        inline: true
                    },
                    {
                        name: 'Mentionable: ',
                        value: roleName.mentionable ? 'Yes' : 'No',
                        inline: true
                    },
                    {
                        name: 'Role Permissions: ',
                        value: perms.join(', ')
                    }
                )

            await message.channel.send(embed)

        } catch (e) {
            return message.channel.send('Role Doesn\'t Exist').then(() => console.log(e))
        }

    }

exports.help = {
    name: "Role-info",
    description: "get role info (perms/id..)",
    usage: "roleinfo <role>",
    example: "/roleinfo owner"
}

exports.conf = {
    aliases: ["roleinfo", "ri"],
    cooldown: 5
}
