const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');   
const { CommandHandler } = require('djs-commands');

const CH = new CommandHandler({
    folder: __dirname + "/commands/",
    prefix: config.prefix
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    
    if (msg.author.bot)  
        return;

    // Handle command
   
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "!say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const foundCommand = CH.getCommand('!' + command);

    if (!foundCommand) 
        return;
    try {
        foundCommand.run(client, msg, args);
    } catch (e) {
        console.log(e);
    }

});

client.login(config.token);