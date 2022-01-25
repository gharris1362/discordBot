
    const { SlashCommandBuilder } = require('@discordjs/builders');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('tobuscus')
            .setDescription("TOBUSCUS!!!"),
        async execute(interaction) {
            await interaction.reply("INTRO OF DARKNESS, THEN REDNESS, THEN WHITENESS!!!");
        },
    };