const {MessageAttachment, DiscordAPIError} = require('discord.js');
const fs = require('fs');
const path = require('path');
const https = require('https');

module.exports = {
	name: 'reminder_upload',
    description: 'Command to upload reminder files (.txt).',
    usage: '[class code] <.txt file> (format for class code is [subject code][class number], ex "math1600", "cs1027")',
    aliases: ['ru', 'upload'],
    args: true,
    permissions: 'ADMINISTRATOR',
	execute(message, args) {
        if (message.attachments.size == 0) { //catches when no file is provided
            message.channel.send("Error: must upload a file along with your message");   
        } else {
            const files = fs.readdirSync('D:/CSBless/classes');
            message.attachments.forEach((attachment, id) => { //fetches every attached file
                const stream = fs.createWriteStream('D:/CSBless/classes/' + args[0] + ".txt"); 
                const request = https.get(attachment.url, function(response) { //pipes the file to the classes folder
                    response.pipe(stream);
                });           
            });
            message.channel.send("Task completed successfully.");
            files.close();
        }
	},
};