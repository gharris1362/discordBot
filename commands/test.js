
    const { SlashCommandBuilder } = require('@discordjs/builders');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('test')
            .setDescription("test if the bot works"),
        async execute(interaction) {
            await interaction.reply("Deez Nuts")
        },
    };