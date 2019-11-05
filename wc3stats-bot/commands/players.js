const Discord = require('discord.js');
const UsersController = require("../controller/users-controller");
const MessageUtils = require("../utils/messageutils");
const config = require('../config.json');   
const MaxUsersShown = 50;

module.exports = class PlayersCommand {

    constructor() {
        this.name = 'players'
        this.alias = ['p']
        this.usage = this.name + " (search)"
        this.desc = 'Queries for matching player names.'
    }

    run(client, msg, args) {
        var search = "";
        (async () => {
            try {
                if (args.length >= 1) {
                    search = args[0].toLowerCase();
                }
                const users = await UsersController.searchForUsersByName(search);
                if (users.length > 0) {
                    var names = "";
                    for (var i = 0; i < users.length && i < MaxUsersShown; i++) 
                        names += users[i].name + ", ";
                    names = names.substring(0, names.length - 2) + ".";
                    if (users.length >= MaxUsersShown)
                        names += "..";
                    msg.channel.send("(" + users.length + "): " + names);
                } else {
                    msg.channel.send(MessageUtils.error("Could not find {" + search + "}"));
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

}