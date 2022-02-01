const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('odds')
        .setDescription('Play odds with yourself and another user')
        .addIntegerOption(option => {
            return option.setName('out-of')
                .setDescription('maximum number')
                .setRequired(true);
        })
        .addStringOption(option => {
            return option.setName('for')
                .setDescription('what is this round of odds for?')
                .setRequired(true)
        })
        .addUserOption(option => {
            return option.setName('opponent')
                .setDescription('the user you are playing against')
                .setRequired(true)
        })
    ,
    async execute(interaction) {
        let originChannel = interaction.channel;
        let user1 = interaction.user;
        let user2 = interaction.options.getUser('opponent');
        let range = interaction.options.getInteger('out-of');
        let stakes = interaction.options.getString('for');

        await interaction.reply(`Odds started.\nOdds out of ${range} for "${stakes}".\n${user1} vs ${user2}`);

        let user1Selection;
        let user2Selection;

        await user1.createDM().then(async dmChannel => {
            await dmChannel.send(`${user2} has challenged you to odds out of ${range} for "${stakes}". Send a number between 1 and ${range} within the next 5 minutes or forfeit.`);

            let userResponded = false;
            while (!userResponded) {
                await dmChannel.awaitMessages({ max: 1, time: 300000 })
                    .then(async collected => {
                        const message = collected.first();
                        const userSelection = parseInt(message);
                        if (!isNaN(userSelection)) {
                            if (userSelection >= 1 && userSelection <= range) {
                                user1Selection = userSelection;
                                userResponded = true;
                                await dmChannel.send('Got it, thanks!');
                            } else {
                                console.log('outside of range');
                                await dmChannel.send(`Your can't pick that number. Please send a number between 1 and ${range}`);
                            }
                        } else {
                            console.log('was not sent a number')
                            await dmChannel.send(`Your message was not a number. Please send a number between 1 and ${range}`);
                        }
                    })
                    .catch(async error => {
                        console.log('Timed out');
                        console.log(error);

                        await dmChannel.send(`Time's up, you just forfeited.`)
                        userResponded = true;

                        return await interaction.followUp(`${user1} forfeited this round.`)
                    })
            }



        }).catch(error => {
            console.log(error)
        });


        await user2.createDM().then(async dmChannel => {
            await dmChannel.send(`${user1} has challenged you to odds out of ${range} for "${stakes}". Send a number between 1 and ${range} within the next 5 minutes or forfeit.`);

            let userResponded = false;
            while (!userResponded) {
                await dmChannel.awaitMessages({ max: 1, time: 300000 })
                    .then(async collected => {
                        const message = collected.first();
                        const userSelection = parseInt(message);
                        if (!isNaN(userSelection)) {
                            if (userSelection >= 1 && userSelection <= range) {
                                user2Selection = userSelection;
                                userResponded = true;
                                await dmChannel.send('Got it, thanks!');
                            } else {
                                console.log('outside of range');
                                await dmChannel.send(`Your can't pick that number. Please send a number between 1 and ${range}`);
                            }
                        } else {
                            console.log('was not sent a number');
                            await dmChannel.send(`Your message was not a number. Please send a number between 1 and ${range}`);

                        }
                    })
                    .catch(async error => {
                        console.log('Timed out');
                        console.log(error);

                        await dmChannel.send(`Time's up, you just forfeited.`);
                        userResponded = true;

                        return await interaction.followUp(`${user2} forfeited this round.`)
                    });
            }
        }).catch(error => {
            console.log(error);
        });

        let oddsMet = user1Selection === user2Selection;
        let response = `**3, 2, 1, go!**\n||${user1} picked **${user1Selection}**\n${user2} picked **${user2Selection}**\n**ODDS ${oddsMet ? '' : 'NOT'} MET**||`;
        return await interaction.followUp(response);
    }
}