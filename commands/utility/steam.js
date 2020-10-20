const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const Discord = require('discord.js');

exports.run = async (bot, message, args, emojis, settings) => {
	// Steam config
  /*if (!args[0]) return message.channel.send("Put name profile");//.then(m => m.delete({ timeout: 5000 }));
	const r = await message.channel.send('Gathering account...');
	const token = "5661E4716C04A4A4AE01F44674DA790A";
	const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(' ')}`;
	fetch(url).then(res => res.json()).then(body => {
		if (body.response.success === 42) {
			r.delete();
			message.channel.send('I was unable to find a steam profile with that name').then(m => m.delete({ timeout: 2000 }));
			return;
		}
		const id = body.response.steamid;
		const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
		const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
		const state = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play'];
		fetch(summaries).then(res => res.json()).then(body2 => {
			if (!body2.response) {
				r.delete();
				return message.channel.send({ embed:{ color:15158332, description:`${emojis[0]} An error occured when running this command, please try again or contact support.` } }).then(m => m.delete({ timeout: 10000 }));
			}
			const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body2.response.players[0];
			fetch(bans).then(res => res.json()).then(body3 => {
				if (!body3.players) {
					r.delete();
					return message.channel.send({ embed:{ color:15158332, description:`${emojis[0]} An error occured when running this command, please try again or contact support.` } }).then(m => m.delete({ timeout: 10000 }));
				}
				const { NumberOfGameBans } = body3.players[0];
				// Display results
				const embed = new Discord.MessageEmbed()
					.setColor(0x0099ff)
					.setAuthor(`Steam Services | ${personaname}`, avatarfull)
					.setThumbnail(avatarfull)
					.setDescription(`**Real name:** ${realname || 'Unknown'}\n
					**Status:** ${state[personastate]}\n
					**Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : 'white'}:\n
					**Account Created:** ${dateFormat(timecreated * 1000, 'd/mm/yyyy (h:MM:ss TT)')}\n
					**Bans:** Vac: ${NumberOfGameBans}, Game: ${NumberOfGameBans} \n
					**Link:** [Link to profile](${profileurl})`)
					.setTimestamp();
				r.delete();
				message.channel.send(embed);
			});
		});
	});
};*/
	        let steamSearch = message.content.split('racoon steam').join("")

        if (steamSearch == '') {
            message.reply("Invalid steamID!");
        } else {
            // Get player summaries
            fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=51A077A7E3AAED89CDD9946AE5560A4C&steamids=${steamSearch}`)
                .then((response) => {
                    return response.json(); // <-- return a json response
                }).then((response) => {

                // Decode player country, state and city
                fetch('https://raw.githubusercontent.com/Holek/steam-friends-countries/master/data/steam_countries.json')
                    .then((response) => {
                        return response.json(); // <-- return a json response
                    }).then((responseCheck) => {

                    // Get friend list
                    fetch(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=51A077A7E3AAED89CDD9946AE5560A4C&steamid=${steamSearch}&relationship=friend`)
                        .then((response) => {
                            return response.json(); // <-- return a json file
                        }).then((responseFriend) => {

                        // Get owned games
                        fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=51A077A7E3AAED89CDD9946AE5560A4C&steamid=${steamSearch}&format=json`)
                            .then((response) => {
                                return response.json(); // <-- return a json file
                            }).then((responseGame) => {

                            // Get player bans
                            fetch(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=51A077A7E3AAED89CDD9946AE5560A4C&steamids=${steamSearch}`)
                                .then((response) => {
                                    return response.json(); // <-- return a json file
                                }).then((responseVAC) => {

                                // Get recently played game
                                fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=51A077A7E3AAED89CDD9946AE5560A4C&steamid=${steamSearch}&format=json`)
                                    .then((response) => {
                                        return response.json(); // <-- return a json file
                                    }).then((responseRecentGame) => {

                                    // Get the recent game for the user
                                    if (responseRecentGame.response.hasOwnProperty('games')){
                                        var recentGame = responseRecentGame.response.games[0].name;
                                    } else {
                                        var recentGame = 'unknown';
                                    }

                                    // Check if the player has a vac ban in his profile
                                    if (responseVAC.players[0].hasOwnProperty('VACBanned')) {
                                        var vacCheck = responseVAC.players[0].VACBanned;

                                        if (vacCheck === true) {
                                            var vacBanned = 'Yes';
                                        } else {
                                            var vacBanned = 'No';
                                        }
                                    } else {
                                        var varCheck = 'unknown';
                                    }

                                    if (response.response.players[0].hasOwnProperty('realname')) {
                                        var realName = response.response.players[0].realname;
                                    } else {
                                        var realName = 'unknown';
                                    }

                                    // Count how many games the player have
                                    if (responseGame.response.hasOwnProperty('game_count')) {
                                        var gameCount = responseGame.response.game_count;
                                    } else {
                                        var gameCount = 'unknown';
                                    }

                                    // Count how many friends the player have
                                    if (responseFriend.hasOwnProperty('friendslist')) {
                                        // Friends counter
                                        function length(obj) {
                                            return Object.keys(obj).length;
                                        }

                                        // Store the result in a variable
                                        var friendsCount = length(responseFriend.friendslist.friends);
                                    } else {
                                        var friendsCount = 'unknown';
                                    }

                                    // store output from the steam api in a variable
                                    //console.log(response.response.players[0].hasOwnProperty('loccountrycode'));
                                    if (response.response.players[0].hasOwnProperty('loccountrycode')) {
                                        var countryDecode = response.response.players[0].loccountrycode;
                                        var country = responseCheck[countryDecode].name;
                                    } else {
                                        var country = 'Unknown';
                                    }

                                    //console.log(response.response.players[0].hasOwnProperty('locstatecode'));
                                    if (response.response.players[0].hasOwnProperty('locstatecode')) {
                                        var stateDecode = response.response.players[0].locstatecode;
                                        var state = responseCheck[countryDecode].states[stateDecode].name;
                                    } else {
                                        var state = 'Unknown';
                                    }

                                    //console.log(response.response.players[0].hasOwnProperty('loccityid'));
                                    if (response.response.players[0].hasOwnProperty('loccityid')) {
                                        var cityDecode = response.response.players[0].loccityid;
                                        var city = responseCheck[countryDecode].states[stateDecode].cities[cityDecode].name;
                                    } else {
                                        var city = 'Unknown';
                                    }

                                    // Get the exact country, state and city with the variables
                                    /*
                                    console.log(responseCheck[country].name);
                                    console.log(responseCheck[country].states[state].name);
                                    console.log(responseCheck[country].states[state].cities[city].name);
                                     */

                                    // Check if the profile is public or private
                                    if (response.response.players[0].communityvisibilitystate == 1) {
                                        var stateProfile = 'Private';
                                    }
                                    if (response.response.players[0].communityvisibilitystate == 3) {
                                        var stateProfile = 'Public';
                                    }

                                    // Display the last time the user was seen online and set it in a variable that will convert into a readable format for human
                                    let unix_timestamp = response.response.players[0].lastlogoff;

                                    // Create a new JavaScript Date object based on the timestamp
                                    var dateLogoff = new Date(unix_timestamp * 1000); // multiplied by 1000 so that the argument is in milliseconds and not seconds
                                    var hours = dateLogoff.getHours() + 1; // Hours
                                    var minutes = "0" + dateLogoff.getMinutes(); // Minutes
                                    var seconds = "0" + dateLogoff.getSeconds(); // Seconds
                                    var lastlogoffTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); // Will display time in 00:00:00 format

                                    // Display the date when the user created his profile and convert it into a correct and readable date format
                                    const unixTime = response.response.players[0].timecreated;
                                    const dateCreatedat = new Date(unixTime * 1000);

                                    // Display result in a Message Embed
                                    const steamEmbed = new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .setTitle(response.response.players[0].personaname)
                                        .setDescription(`Realname : ${realName}`)
                                        .setURL(response.response.players[0].profileurl)
                                        .addField('SteamID', response.response.players[0].steamid, false)
                                        .addField('Profile visibility', stateProfile, false)
                                        .addField('Country', country, true)
                                        .addField('State', state, true)
                                        .addField('City', city, true)
                                        .addField('Friends count', friendsCount, true)
                                        .addField('Games count', gameCount, true)
                                        .addField('VAC banned?', vacBanned, true)
                                        .addField('Recent game', recentGame, false)
                                        .addField('Last logoff', lastlogoffTime, false)
                                        .addField('Created at', dateCreatedat, false)
                                        .setThumbnail(response.response.players[0].avatarfull)

                                    message.channel.send(steamEmbed);
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}

exports.help = {
    name: "steam",
    description: "Gets info on a steam account",
    usage: "--",
    example: "---"
}

exports.conf = {
    aliases: ["steam"],
    cooldown: 10
}
