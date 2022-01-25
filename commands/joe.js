
    const { SlashCommandBuilder } = require('@discordjs/builders');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('joe')
            .setDescription("deez nuts"),
        async execute(interaction) {
            await interaction.reply("joe mama.")
        },
    };