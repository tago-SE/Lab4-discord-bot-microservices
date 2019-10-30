const io = require("socket.io-client");
const Discord = require('discord.js');

var client = null;

module.exports = class SocketController {

    static init(bot, url) {
        
        client = bot;   // set discord-bot client 

        var socket = io.connect(url);

        socket.on('scoreboard', function(data) {
            const ScoreboardHandler = require("../handlers/scoreboard-handler");
            ScoreboardHandler.update(client, data);
        });
    }

}