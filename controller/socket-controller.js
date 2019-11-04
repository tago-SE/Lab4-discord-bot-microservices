const io = require("socket.io-client");
const Discord = require('discord.js');
const ScoreboardHandler = require("../handlers/scoreboard-handler");
var client = null;

module.exports = class SocketController {

    static init(bot) {
        const server = require("./server.json");
        var url = server.url_socket;
        console.log(url);
        client = bot;   // set discord-bot client 
        var socket = io.connect(url);


        socket.on('scoreboard', function(data) {
            console.log("scoreboard updated: " + data);
            ScoreboardHandler.update(client, data);
        });
    }

}