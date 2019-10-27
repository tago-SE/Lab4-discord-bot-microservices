const Discord = require('discord.js');

module.exports = class SubmitCommand {
    
    constructor() {
        this.name = 'submit'
        this.alias = 's'
        this.usage = this.name + " [id]"
        this.desc = 'Submits a uploaded replay by id from wc3stats.com.'
    }

    run(client, msg, args) {
        msg.reply('Submittting...');
    }
}