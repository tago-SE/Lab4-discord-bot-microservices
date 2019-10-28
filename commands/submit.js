const Discord = require('discord.js');
const ReplaysController = require("../controller/replays-controller");

module.exports = class SubmitCommand {
    
    constructor() {
        this.name = 'submit'
        this.alias = 's'
        this.usage = this.name + " [id]"
        this.desc = 'Submits a uploaded replay by id from wc3stats.com.'
    }

    run(client, msg, args) {
        msg.reply('Submittting...');
        (async () => {
            console.log("RESULT: " + x);
            var x = await ReplaysController.postReplay({"data:": "lol"});
            
        })();
    }

}