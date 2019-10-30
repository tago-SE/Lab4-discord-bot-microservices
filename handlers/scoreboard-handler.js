const Discord = require('discord.js');


const MessageUtils = require("../utils/messageutils");
const config = require('../config.json');

module.exports = class ScoreboardHandler {

    static update(client, scoreboard) { 

        // Format display
        var names = "";
        var wl = "";
        var kd = "";
        for (var i = 0; i < scoreboard.users.length; i++) {
            var user = scoreboard.users[i];
            names += (i + 1) + ". " + user.name + "\n";
            wl += user.ffaWins + " - " + user.ffaLosses + "\n";
            kd += MessageUtils.formatRatio(user.ffaKills, user.ffaDeaths,  config.scoreboard.kd_decmial) + "\n";
        }
        var embed = new Discord.RichEmbed();
        var title = null;
        switch (scoreboard.gameType) {
            case "ffa": title = config.scoreboard.ffaTitle; break;
            case "team": title = config.scoreboard.teamTitle; break;
            case "solo": title = config.scoreboard.soloTitle; break;
            default: 
                console.log("Invalid game scoreboard game type!"); 
                return;
        }
        if (names.length > 0) {
            embed
            .setTitle(title)
            .setColor(config.embedcolor)
            .addField("Player", names, true)
            .addField("Score", wl, true)
            .addField("K/D", kd, true);
        }

        // Send or edit into scoreboard witht he same title
        const scoreboardChannel = client.channels.get(config.scoreboard.channelId);
        scoreboardChannel.fetchMessages({limit: 100}).then(msgMap => {
            const messages = msgMap.array();
            try {
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].embeds !== null && messages[i].embeds.length > 0) {
                        if (messages[i].embeds[0].title === title) {
                            if (names.length > 0)
                                messages[i].edit(embed);
                            else 
                                messages[i].delete();
                            return;
                        }
                    }
                }
                if (names.length > 0)
                    scoreboardChannel.send(embed)
            } catch(err) {
                console.log(err);
            }
        });
    }
}