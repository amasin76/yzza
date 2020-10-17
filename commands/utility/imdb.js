  
const discord = require("discord.js");
const fetch = require("node-fetch")


exports.run = async (client, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("Please give the name of movie or series")
    }


    let msg = await message.channel.send({embed: {
      "description": "Getting the information...",
      "color": "YELLOW"
    }})

    
    try {
    let movie = await fetch(`https://www.omdbapi.com/?apikey=5e36f0db&t=${args.join("+")}`)
    movie = await movie.json()

    if(movie.Responce) return msg.edit({
        embed: {
          "description": "Unable to find Something about `" + args.join(" ") + "`",
          "color": "RED"
        }
      })
    
    let embed = new discord.MessageEmbed()
    .setTitle(movie.Title)
    .setColor("GREEN")
    .setThumbnail(movie.Poster)
    .setDescription(movie.Plot)
    .setFooter(`Ratings: ${movie.imdbRating} | Seasons: ${movie.totalSeasons || "0"}`)
    .addField("🌍Country", movie.Country, true)
    .addField("▶Languages", movie.Language, true)
    .addField("🎞Type", movie.Type, true)
    .addField("📆Year", movie.Year, true)
    .addField("🎭Genre", movie.Genre, true)
    .addField("🏆Awards", movie.Awards, true);
    
    
    msg.edit(embed)
    } catch(err) {
      msg.edit({
        embed: {
          "description": "Something went Wrong :/",
          "color": "RED"
        }
      })
    }
    
    
  }

exports.help = {
    name: "imdb",
    description: "Get the information about series and movie",
    usage: "imdb <name>",
    example: "-imdb titanic"  
}

exports.conf = {
    aliases: ["imdb"],
    cooldown: 10
}
