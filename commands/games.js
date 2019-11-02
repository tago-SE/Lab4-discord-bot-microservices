const Discord = require('discord.js');
const ReplaysController = require("../controller/replays-controller");
const MessageUtils = require("../utils/messageutils");
const config = require('../config.json');   
const dateFormat = require('dateformat');

module.exports = class GamesCommand {

    constructor() {
        this.name = 'games',
        this.alias = ['g'],
        this.usage = this.name + " [player]";
        this.desc = "Lists most recent games of a player.";
    }

    run(client, msg, args) {
        if (args.length < 1) {
            msg.channel.send(MessageUtils.error("No player specified."));
            return;
        }
        const search = args[0].toLowerCase();
        (async () => {
            try {
                const replays = await ReplaysController.searchReplayByUser(search);


                if (replays.length > 0) {

 
                    replays.sort(function (r1, r2) {
                        return r2.timestamp - r1.timestamp;
                    });
                    var ids = "";
                    var results = "";
                    var dates = "";
                    var title = search;
                    for (var i = 0; i < replays.length; i++) {
        
                        var replay = replays[i];
                        var titleStr = "(Unranked)";
                        if (replay.rankedMatch) 
                        titleStr = "(Ranked)";
                        if (replay.gameType === "ffa") 
                            titleStr = "FFA " + titleStr;
                        else if (replay.gameType === "solo")
                            titleStr = "Solo " + titleStr;
                        else if (replay.gameType === "team")
                            titleStr = "Team " + titleStr;
                        else if (replay.gameType === "single")
                            titleStr = " Single " + titleStr;
                        dates += dateFormat(new Date(replay.timestamp), "d/m/yyyy") + "\n";
                        ids += "[#" + replay.id + " " + titleStr + "](" + "https://wc3stats.com/games/" + replay.id + ")\n";
                        for (var j = 0; j < replay.players.length; j++) {
                            if (replay.players[j].name.toLowerCase() === search) {
                                title = replay.players[j].name;
                                results += replay.players[j].result + "\n";
                                break;
                            }
                        }
                    }
                    msg.channel.send(new Discord.RichEmbed()
                        .setColor(config.embedcolor)
                        .setTitle(title)
                        .addField('Replay', ids, true)
                        .addField('Result', results, true)
                        .addField('Date', dates, true));
                } 
                else {
                    msg.channel.send(MessageUtils.error("No players found matching {" + search + "}."));
                }
            } catch (err) {
                console.log(err);
                msg.channel.send(MessageUtils.error("Query failed."));
            }
        })();
    }
}