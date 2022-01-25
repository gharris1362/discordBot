const { clientId } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        
        /*
            Auto-Spoiler
            The Discord API does not allow a bot to edit the messages of other users, so we are not able to dynamically
            add spoiler tags to messages that need them.
            The compromise here is to delete messages as users send them, and have the bot send a message back to
            the text channel of origin with the message author's username, spoiler-tagged message content, and 
            spoiler-tagged attachments.
        */
        if (message.channel.name === 'spoilers' && message.author.id !== (process.env.CLIENTID || clientId)) {
            // Delete original message
            await message.delete();

            // Prep bot spoiler'd message object
            let response = {};

            // Get original message author and content, add to bot message object in spoiler tags.
            let sender = message.author.username;
            let content = message.content; // TODO: REGEX OUT SPOILER TAGS IN ORIGINAL MESSAGE
            let spoileredMessage = `**${sender}**: ${content ? `||${content}||` : ''}`;
            response.content = spoileredMessage;

            // Get original message attachments, add to bot message object in spoiler tags if attachments present.
            let attachments = message.attachments;
            let spoileredAttachments = [];
            attachments.forEach((value, key) => {
                value.setName(`SPOILER_${value.name}`);
                spoileredAttachments.push(value);
            });
            if (spoileredAttachments.length > 0) {
                response.files = spoileredAttachments;
            }

            // Send spoiler'd message
            await message.channel.send(response);
        }
    },
};