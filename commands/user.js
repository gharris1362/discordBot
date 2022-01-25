
    const { SlashCommandBuilder } = require('@discordjs/builders');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('user')
            .setDescription("Responds with User Info"),
        async execute(interaction) {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nUser Created: ${interaction.user.createdAt}`);
        },
    };