
    const { SlashCommandBuilder } = require('@discordjs/builders');
    const ytdl = require('ytdl-core');
    const {
        AudioPlayerStatus,
        StreamType,
        createAudioPlayer,
        createAudioResource,
        joinVoiceChannel,
    } = require('@discordjs/voice');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('play')
            .setDescription("play a song")
            .addStringOption(option => 
                option.setName("url")
                    .setDescription("url for song/video")
                    .setRequired(true)
                ),
        async execute(interaction) {
            console.log("tried to play song")
            // await interaction.reply("aint done with this one yet piss baby")
            
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.member.guildId,
                adapterCreator: interaction.member.voice.channel.voiceAdapterCreator
            })

        },
    };