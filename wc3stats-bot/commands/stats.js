const Discord = require('discord.js');
const UsersController = require("../controller/users-controller");
const MessageUtils = require("../utils/messageutils");
const config = require('../config.json');   

const unranked = "none";

module.exports = class StatsCommand {

    constructor() {
        this.name = 'stats'
        this.alias = ['st']
        this.usage = this.name + " (player)"
        this.desc = 'Reveals player stats.'
    }

    static ratio(n, m) {
        if (m == 0) {
            if (n != 0)
                return 1;
            return 0;
        }
        return n/m;
    }

    run(client, msg, args) {
        // target name 
        var name =  msg.member.nickname;
        if (name == null) {
            name = msg.author.username;
        }
        if (args.length > 0) {
            name = args[0];
        }

        const kd_decimal = config.kd_decimals;
        const wl_decimal = config.wl_decimal;

        (async () => {
            try {
                var user = await UsersController.getUserByName(name);
                if (user == null) {
                    if (args < 1) {
                        msg.channel.send(MessageUtils.error("No player by the name {" + name + "} was found, try specifying a player name or changing your channel nickname."));
                    } else {
                        msg.channel.send(MessageUtils.error("No player by the name {" + name + "} was found."));
                    }
                    return;
                }
                console.log(user);
                msg.channel.send(new Discord.RichEmbed()
                    .setColor(config.embedcolor)
                    .setTitle(user.name)
                    .addField('FFA', 
                        "Wins: " + user.ffaWins + 
                        "\nLosses: " + user.ffaLosses +
                        "\nRank: " + ((user.ffaRank > 0)? user.ffaRank : unranked) + 
                        "\nW/L " + (StatsCommand.ratio(user.ffaWins, user.ffaWins + user.ffaLosses)*100).toFixed(wl_decimal)  +
                        "%\nK/D: " + StatsCommand.ratio(user.ffaKills, user.ffaDeaths).toFixed(kd_decimal), true)
                    .addField('Team', 
                        "Wins: " + user.teamWins + 
                        "\nLosses: " + user.teamLosses +
                        "\nRank: " + ((user.teamRank > 0)? user.teamRank : unranked) + 
                        "\nW/L " + (StatsCommand.ratio(user.teamWins, user.teamWins + user.teamLosses)*100).toFixed(wl_decimal) +
                        "%\nK/D: " + StatsCommand.ratio(user.teamKills, user.teamDeaths).toFixed(kd_decimal), true)

                    .addField('Solo', 
                        "Wins: " + user.soloWins + 
                        "\nLosses: " + user.soloLosses +
                        "\nRank: " + ((user.soloRank > 0)? user.soloRank : unranked) + 
                        "\nW/L " + (StatsCommand.ratio(user.soloWins, user.soloWins + user.soloLosses)*100).toFixed(wl_decimal) +
                        "%\nK/D: " + StatsCommand.ratio(user.soloKills, user.soloDeaths).toFixed(kd_decimal), true)
                );
            } catch (err) {
                console.log(err);
            }
        })();
    }
}