
    const { SlashCommandBuilder } = require('@discordjs/builders');
    const ytdl = require('ytdl-core');
    const {
        AudioPlayerStatus,
        StreamType,
        createAudioPlayer,
        createAudioResource,
        getVoiceConnection,
        joinVoiceChannel,
    } = require('@discordjs/voice');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('play')
            .setDescription("play a song")
            .addStringOption(option => 
                option.setName("url")
                    .setDescription("url for song/video")
                    .setRequired(false)
                ),
        async execute(interaction) {
            console.log("tried to play song")
            const url = "https://open.spotify.com/track/5vWo4ErhZVUmtVvQvNIWel?si=9951483c051d4296"


            // console.log(interaction.user)
            // console.log(interaction)
            const connection = joinVoiceChannel({
                channelId: 656349014425600020,
                guildId: 656349013997649940,
                adapterCreator: interaction.member.guild.voiceAdapterCreator
            });
            console.log(interaction.guild)


            const stream = ytdl(url);
          
            const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary});
            
            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);
            
            player.on(AudioPlayerStatus.Idle, () => connection.destroy);
            
            await interaction.reply("aint done with this one yet piss baby");
        },
    };
 




