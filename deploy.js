require('dotenv').config();

const { Routes, User, discordSort, ApplicationCommandOptionType, mem, ApplicationCommandPermissionType, Role  } = require('discord.js');
const { REST } = require('@discordjs/rest');
const commands = [

  {
    name: `sexo`,
    description: 'sexo com o bot',
    options: [
      {
        name: 'user',
        description: 'escolhe com quem faz sexo',
        type: ApplicationCommandOptionType.User,
        required: true,
      }
]},

  {
    name: 'beijo',
    description: 'Beijar o bot',
    options: [
      {
        name: 'user',
        description: 'Escolha alguém para beijar',
        type: ApplicationCommandOptionType.User,
        required: true,
      }
]},
  {
    name: 'abraço',
    description: 'Abraçar o bot',
    options: [
      {
        name: 'user',
        description: 'Escolha alguém para abraçar',
        type: ApplicationCommandOptionType.User,
        required: true,
      }
]},

{
  name: `ficha`,
  description: 'ficha RPG',
},

{
  name: `comandos`,
  description: 'lista dos comandos',
},

{
name: 'ajuda',
description: 'Tutorial de como usar o bot',
},

];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENTE_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})()