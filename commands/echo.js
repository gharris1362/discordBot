const { SlashCommandBuilder } = require('@discordjs/builders');

// const data = new SlashCommandBuilder()
// 	.setName('echo')
// 	.setDescription('Replies with your input!')
// 	.addStringOption(option =>
// 		option.setName('input')
// 			.setDescription('The input to echo back')
// 			.setRequired(true));



// export default data;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription("echo")
        .addStringOption(option => 
            option.setName("ammount")
                .setDescription("number of echoes")
                .setRequired(true)
        ),
    async execute(interaction) {
        //put in loop for bullshit
        await interaction.reply(interaction.options.getString("ammount"));
    }
};
