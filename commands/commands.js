const { ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

function ajuda() {
    return ({
        embeds: [new EmbedBuilder()
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
function sexo(interaction, user) {
    return ({
        embeds: [new EmbedBuilder()
            .setTitle('Alguem aqui está com fogo no rabo :fire:')
            .setDescription(`<@${interaction.user.id}> fez sexo com ${user}`)
            .setColor('Gold')
            .setImage("http://i.redd.it/bpx5l5b8dym41.gif")
        ]
    })
}
function beijo(interaction, user) {
    return ({
        embeds: [new EmbedBuilder()
            .setTitle('Um *beijinho* para lhe deixar feliz :heart:')
            .setDescription(`<@${interaction.user.id}> **beijou** ${user}`)
            .setColor('DarkRed')
            .setImage("https://acegif.com/wp-content/uploads/anime-kiss-23.gif")
        ]
    })
}
function abraco(interaction, user) {
    return ({
        embeds: [new EmbedBuilder()
            .setTitle('Um abraço quentinho? :pleading_face:')
            .setDescription(`<@${interaction.user.id}> abraçou ${user}`)
            .setColor('DarkVividPink')
            .setImage("https://media2.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif")
        ]
    })
}
function comandos() {
    return ({
        embeds: [new EmbedBuilder()
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
function avatar(user) {
    return ({
        embeds: [new EmbedBuilder()
            .setTitle('Aqui está a foto de perfil :sparkles:')
            .setDescription(`Aqui está a foto de perfil do user: ${user}`)
            .setImage(user.displayAvatarURL({ dynamic: false, size: 4096 }))
            .setColor(0xFF0000)
        ]
    })
}
async function modalFicha(interaction) {

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
async function modalConfig(interaction) {

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
module.exports = { ajuda, abraco, avatar, beijo, comandos, sexo, modalFicha, modalConfig }
