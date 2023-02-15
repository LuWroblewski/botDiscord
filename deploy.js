require('dotenv').config();

const { Routes, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');

const commands = [

  new SlashCommandBuilder()
    .setName('sexo')
    .setDescription('Selecione alguem para fazer sexo.')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Usuario para sexo')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('beijo')
    .setDescription('Selecione alguem para beijar.')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Usuario para ganhar beijo')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('abraço')
    .setDescription('Selecione alguem para abraçar.')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Usuario para ganhar abraço')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Selecione alguem para ver a foto de perfil')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Usuario para mostrar a foto')
        .setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName('ficha')
    .setDescription('ficha RPG'),

  new SlashCommandBuilder()
    .setName('configsinicial')
    .setDescription('Configure o bot para dar boas vindas')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  new SlashCommandBuilder()
    .setName('comandos')
    .setDescription('lista dos comandos'),

  new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Tutorial de como usar o bot'),

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