const { MessageEmbed } = require('discord.js');
const config = require(`${process.cwd()}/botconfig/config.json`);

module.exports = {
  name: 'join',
  category: '🎶 Music',
  aliases: ['summon', 'create'],
  description: 'Summons the Bot in your Channel',
  usage: 'join',
  parameters: {
    "type": "radio",
    "activeplayer": false,
    "previoussong": false
  },
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    var { channel } = message.member.voice;
    if (!channel) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(client.la[ls].common.join_vc)
        ]
      });
    }

    // If there's an active player, check if it's in the same voice channel
    var player = client.manager.players.get(message.guild.id);
    if (player) {
      var vc = player.voiceChannel;
      var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(eval(client.la[ls]["cmds"]["music"]["join"]["variable1"]))
        ]
      });
    }

    // Ensure default values for settings
    const selfDeaf = config.settings ? config.settings.selfDeaf : true;

    // Create the player
    player = await client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: selfDeaf,
    });

    // Join the channel
    if (player.state !== 'CONNECTED') {
      await player.connect();
      await message.react('🎙').catch(e => console.error('Failed to react:', e));
      await player.stop();
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.color)
          .setTitle(client.la[ls].cmds.music.join.title)
          .setDescription(eval(client.la[ls]["cmds"]["music"]["join"]["variable2"]))
        ]
      });
    } else {
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(client.la[ls].common.wrong_vc)
          .setDescription(eval(client.la[ls]["cmds"]["music"]["join"]["variable3"]))
        ]
      });
    }
  }
};
