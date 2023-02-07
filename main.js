const { userMention, ApplicationCommandType, messageLink, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageButton } = require('discord.js');
const discord = require('discord.js');
const { GatewayIntentBits } = discord;
const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]
});
require('dotenv').config();


// quando liga o bot

client.on("ready", () => {
  console.log(`O bot ${client.user.tag} esta ativo!`)
  client.user.setActivity('Minecraft', {
    type: 0
  })
})

// menu de boas vindas

client.on("guildMemberAdd", member => {
  member.guild.channels.cache.get('1013494771517497374').send({
    embeds: [new discord.EmbedBuilder()
      .setTitle('Bem vindo ao server de teste :partying_face: ')
      .setDescription(`bem vindo ${member.user} `)
      .setColor('Yellow')
      .setImage("https://c.tenor.com/I1JtFdfmNP8AAAAC/bem-vindo-cute.gif")
      .addFields(
        { name: 'Como usar o bot?', value: 'Digite **/ajuda**' },
        { name: 'Como ver os comandos do bot?', value: 'Digite **/comandos**' },
      )
    ], components: [new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('membro')
        .setLabel('Membro')
        .setStyle(ButtonStyle.Danger)
    )]
  })

  client.on('interactionCreate', async interaction => {

    if (interaction.customId === 'membro') {
      interaction.member.roles.add('1013318472412954726')
      await interaction.update({ components: [] })
      interaction.followUp({
        embeds: [new discord.EmbedBuilder()
          .setTitle(':white_check_mark: Cargo adicionado')
          .setDescription(`Cargo <@&1013318472412954726> adicionado para ${member.user}`)
          .setColor('Purple')
        ]
      })
    }
  })
})

// interações das slashs

client.on("interactionCreate", interaction => {
  if (interaction.isChatInputCommand()) {
    let user = interaction.options.getUser('user')
    const { commandName } = interaction;

    if (commandName == `ajuda`) {
      return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setTitle('Chamou ajuda? :sunglasses:')
          .setDescription(`Aqui está algumas duvidas frequentes: `)
          .setColor('White')
          .setImage("https://y.yarn.co/1db9c9f6-c612-4958-a6f7-2995393acfba_text.gif")
          .addFields(
            { name: 'Como usar o bot?', value: '**Para usar algum comando digite /oNomeDoComando [usuario].**' },
            { name: 'Como ver os comandos do bot?', value: 'Digite **/comandos**' },
          )
        ]
      })
    }

    if (commandName == `sexo`) {
      return interaction.reply({

        embeds: [new discord.EmbedBuilder()
          .setTitle('Alguem aqui está com fogo no rabo :fire:')
          .setDescription(`<@${interaction.user.id}> fez sexo com ${user}`)
          .setColor('Gold')
          .setImage("http://i.redd.it/bpx5l5b8dym41.gif")
        ]
      })
    }
    else if (commandName == `beijo`) {
      return interaction.reply({

        embeds: [new discord.EmbedBuilder()
          .setTitle('Um *beijinho* para lhe deixar feliz :heart:')
          .setDescription(`<@${interaction.user.id}> **beijou** ${user}`)
          .setColor('DarkRed')
          .setImage("https://acegif.com/wp-content/uploads/anime-kiss-23.gif")
        ]
      })
    }
    else if (commandName == `abraço`) {
      return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setTitle('Um abraço quentinho? :pleading_face:')
          .setDescription(`<@${interaction.user.id}> abraçou ${user}`)
          .setColor('DarkVividPink')
          .setImage("https://media2.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif")
        ]
      })
    }
    else if (commandName == `comandos`) {
      return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setTitle('Aqui está uma lista dos comandos :partying_face: ')
          .setDescription(`Lista dos comandos que posso fazer. :heart: `)
          .setColor(0x0099FF)
          .setImage("https://media.tenor.com/hWWn-MsXY0kAAAAM/anime-bookworm.gif")
          .addFields(
            { name: 'Abraço', value: '**/abraço [usuario] para abraçar quem você tanto ama :smiling_face_with_3_hearts: **' },
            { name: 'Beijo', value: '**/beijo [usuario] para beijar quem você quer marcar. :kissing_closed_eyes: **' },
            { name: 'Sexo', value: '**/sexo [usuario] para fazer sexo quando você está com foguinho no rabo. :fire: :flushed: **' },
          )

        ]
      })
    }



  }
})


client.login(process.env.DISCORD_TOKEN); 
