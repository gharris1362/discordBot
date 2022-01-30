
    const { SlashCommandBuilder } = require('@discordjs/builders');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('waynebrady')
            .setDescription("say hello to the hit star of 'whos line is it anyway', Wayne Brady!"),
        async execute(interaction) {
            await interaction.reply(`Hi its me Wayne Brady from Whos line is it anyway, nice to meet you ${interaction.member.nickname}, also known as ${interaction.user.tag}`)
        },
    };



    //Hi its me Wayne Brady from Whos line is it anyway, nice to meet you ${interaction.user.username}, also known as ${interaction.user.tag}