const Discord = require('discord.js');
const ReplaysController = require("../controller/replays-controller");
const MessageUtils = require("../utils/messageutils");
const config = require('../config.json');   

module.exports = class SubmitCommand {
    
    constructor() {
        this.name = 'submit'
        this.alias = 's'
        this.usage = this.name + " [id]"
        this.desc = 'Submits a uploaded replay by id from wc3stats.com.'
    }

    static formatResultTitle(replay) 
    {
        console.log("format replay...?");
        var rankedStr = "(Unranked)";
        if (replay.rankedMatch)
            rankedStr = "(Ranked)";
        switch (replay.gameType) 
        {
            case "team": return "#" + replay.id + " Team Game " + rankedStr;
            case "solo": return "#" + replay.id + " Solo Game " + rankedStr;  
            case "ffa": return "#" + replay.id + " FFA Game " + rankedStr;  
            case "single": return "#" + replay.id + " Singe Player";  
        }
        return "#" + replay.id + " Invalid Game Type"; 
    }

    static formatResultSettings(replay) 
    {
        if (replay.fog == 0)
            return "Fog off";
        if (replay.fog == 1)
            return "Fog on";
        if (replay.fog == 2)
            return "Night fog";
        if (replay.fog == 3)
            return "Partial fog";
        return "Invalid Settings";
    }

    static  displayResult(msg, replay) {
        var playerStr = "";
        var resultStr = "";
        var kdStr = "";
        for (var i = 0; i < replay.players.length; i++)  {
            if (replay.gameType === "team" && replay.players[i].team != -1) {
                playerStr += "(" + replay.players[i].team + ") " + replay.players[i].name + " (" + replay.players[i].apm + ")\n";  
           } 
           else {
               playerStr += replay.players[i].name + " (" + replay.players[i].apm + ")\n";  
           }
           resultStr += replay.players[i].result + "\n";
           kdStr += replay.players[i].kills + "/" + replay.players[i].deaths + "\n";
        }
        msg.channel.send(new Discord.RichEmbed()
        .setColor(config.embedcolor)
        .setTitle(SubmitCommand.formatResultTitle(replay))
        .setURL('https://wc3stats.com/games/' + replay.id)
        .setDescription(SubmitCommand.formatResultSettings(replay))
        .addField('Players', playerStr, true)
        .addField('Result', resultStr, true)
        .addField('K/D', kdStr, true)
        .setTimestamp(new Date(replay.timestamp))
        .setFooter(replay.turns + ' turns', config.embedIconUrl));
    }
    
    run(client, msg, args) {
        const id = parseInt(args[0]);
        if (isNaN(id)) {
            msg.channel.send(MessageUtils.error("Invalid replay id {" + args[0] + "}"));
            return;
        }
        (async () => {
            try {
                var res = await ReplaysController.submitReplayId(id);
                if (res.body.id == id) { 
                    // Submission was accepted 
                    SubmitCommand.displayResult(msg, res.body);
                } else {
                    // Submission failed
                    msg.channel.send(MessageUtils.error(res.body));
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

}