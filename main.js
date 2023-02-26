const interactions = []


const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require('discord.js');

const { GatewayIntentBits } = discord;
const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]
});

const { connection, collection } = require('./connection.js');
const { ajuda, abraco, avatar, beijo, comandos, sexo, modalFicha, modalConfig } = require('./commands.js');

require('dotenv').config();
connection()

// quando liga o bot

client.on("ready", () => {
  console.log(`O bot ${client.user.tag} esta ativo!`)
  console.log()
  client.user.setActivity('Minecraft', {
    type: 0
  })
})

// interações das slashs

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    let user = interaction.options.getUser('user')
    const { commandName } = interaction;

    if (commandName == `ajuda`) {
      return interaction.reply(
        ajuda()
      )
    }

    if (commandName == `sexo`) {
      return interaction.reply(
        sexo(interaction, user)
      )
    }
    else if (commandName == `beijo`) {
      return interaction.reply(
        beijo(interaction, user)
      )
    }
    else if (commandName == `abraço`) {
      return interaction.reply(
        abraco(interaction, user)
      )
    }

    else if (commandName == `comandos`) {
      return interaction.reply(
        comandos()
      )
    }
    else if (commandName == `avatar`) {
      return interaction.reply(
        avatar(user)
      )
    }

    else if (commandName == `ficha`) {
      modalFicha(interaction)
    }

    else if (commandName == `configsinicial`) {
      modalConfig(interaction)
    }
  }
})

client.on("interactionCreate", async interaction => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'modalFicha') {
    collection
      .insert([{ playerName: interaction.fields.getTextInputValue('playerName'), nameCharacter: interaction.fields.getTextInputValue('nameCharacter') }])
      .then(() => {
        console.log('Enviado com sucesso');
      })
      .catch((error) => {
        console.log(error);
      })

    await interaction.reply({
      embeds: [new discord.EmbedBuilder()
        .setTitle('Ficha do personagem ')
        .setColor(0x0099FF)
        .addFields(
          { name: 'Nome', value: `** Seu nome é: ${interaction.fields.getTextInputValue('playerName')}**` },
          { name: 'Personagem', value: `** O nome do personagem é: ${interaction.fields.getTextInputValue('nameCharacter')}**` },
        )

      ]
    })

  }

  if (interaction.customId === 'modalConfig') {

    await interaction.reply({
      embeds: [new discord.EmbedBuilder()
        .setTitle('Configurações')
        .setColor(0x0099FF)
        .addFields(
          { name: 'Canal', value: `** O id canal configurado foi: ${interaction.fields.getTextInputValue('chatWelcome')}**` },
          { name: 'Personagem', value: `** O id cargo inicial agora é: ${interaction.fields.getTextInputValue('roleWelcome')}**` },
        )

      ]
    },



    )
    let chat = interaction.fields.getTextInputValue('chatWelcome')
    let role = interaction.fields.getTextInputValue('roleWelcome')
    interactions.push(chat)
    interactions.push(role)

  }

});



client.on("guildMemberAdd", async member => {

  member.guild.channels.cache.get(interactions[0]).send({
    embeds: [new discord.EmbedBuilder()
      .setTitle('Bem vindo ao server de teste :partying_face: ')
      .setDescription(`bem vindo ${member.user}. Clique no botão para ter acesso ao restante do servidor`)
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
})

client.on('interactionCreate', async interaction => {

  if (interaction.customId === 'membro') {
    interaction.member.roles.add(interactions[1])
    await interaction.update({ components: [] })
    interaction.followUp({
      embeds: [new discord.EmbedBuilder()
        .setTitle(':white_check_mark: Cargo adicionado')
        .setDescription(`Cargo adicionado para ${interaction.member}`)
        .setColor('Purple')
      ]
    })
  }
})










client.login(process.env.DISCORD_TOKEN); 
