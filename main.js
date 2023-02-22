const interactions = []


const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { connection, collection } = require('./connection.js');
const discord = require('discord.js');
const { GatewayIntentBits } = discord;
const client = new discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences]
});
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
            { name: 'Ajuda', value: '**/ajuda se você precisar de ajuda **' },
            { name: 'Avatar', value: '**/avatar [usuario] ou só /avatar para ver a foto de perfil sua ou dos outros **' },
            { name: 'Abraço', value: '**/abraço [usuario] para abraçar quem você tanto ama :smiling_face_with_3_hearts: **' },
            { name: 'Beijo', value: '**/beijo [usuario] para beijar quem você quer marcar. :kissing_closed_eyes: **' },
            { name: 'Configsinicial', value: '**/configsinicial para você ADM do server configurar para ter mensagem de boas vindas **' },
            { name: 'Ficha', value: '**/ficha para criar uma ficha de personagem (será usado para nada)**' },
            { name: 'Sexo', value: '**/sexo [usuario] para fazer sexo quando você está com foguinho no rabo. :fire: :flushed: **' }
          )

        ]
      })
    }
    else if (commandName == `avatar`) {
      const membro = interaction.options.getMember('user') || interaction.member
      return interaction.reply({
        embeds: [new discord.EmbedBuilder()
          .setTitle('Aqui está a foto de perfil :sparkles:')
          .setDescription(`Aqui está a foto de perfil do user: ${membro}`)
          .setImage(membro.displayAvatarURL({ dynamic: false, size: 4096 }))
          .setColor(0xFF0000)
        ]
      })
    }

    else if (commandName == `ficha`) {

      const modal = new ModalBuilder()
        .setCustomId('modalFicha')
        .setTitle('Ficha do personagem');

      const playerName = new TextInputBuilder()
        .setCustomId('playerName')
        .setLabel("Qual é o SEU nome ?")
        .setStyle(TextInputStyle.Short);

      const nameCharacter = new TextInputBuilder()
        .setCustomId('nameCharacter')
        .setLabel("qual o nome do PERSONAGEM ?")
        .setStyle(TextInputStyle.Short);


      const firstLine = new ActionRowBuilder().addComponents(playerName);
      const secondLine = new ActionRowBuilder().addComponents(nameCharacter);

      modal.addComponents(firstLine, secondLine);
      await interaction.showModal(modal);
    }

    else if (commandName == `configsinicial`) {

      const modal = new ModalBuilder()
        .setCustomId('modalConfig')
        .setTitle('Configurações do bot');

      const chatWelcome = new TextInputBuilder()
        .setCustomId('chatWelcome')
        .setLabel("Em qual chat sera as boas vindas")
        .setPlaceholder('Digite apenas o ID')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const roleWelcome = new TextInputBuilder()
        .setCustomId('roleWelcome')
        .setLabel("Qual será o cargo inicial?")
        .setPlaceholder('Digite apenas o ID')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);


      const firstLine = new ActionRowBuilder().addComponents(chatWelcome);
      const secondLine = new ActionRowBuilder().addComponents(roleWelcome);

      modal.addComponents(firstLine, secondLine);
      await interaction.showModal(modal);
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
