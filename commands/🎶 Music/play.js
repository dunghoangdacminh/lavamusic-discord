const { MessageEmbed } = require('discord.js');
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);

module.exports = {
  name: 'play',
  category: '🎶 Music',
  aliases: ['p'],
  description: 'Plays a song from YouTube',
  usage: 'play <Song / URL>',
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  type: 'queuesong',
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    // Check if there are no arguments
    if (!args[0]) {
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle('Please provide a song name or URL.')
        ]
      });
    }

    // Determine the source and create the response embed
    let source;
    let embedTitle;
    if (args.join('').includes('youtube')) {
      source = 'song:youtube';
      embedTitle = `${emoji.msg.search} Searching for your request on ${emoji.msg.youtube} YouTube`;
    } else if (args.join('').includes('spotify')) {
      source = 'song:raw';
      embedTitle = `${emoji.msg.search} Searching for your request on ${emoji.msg.spotify} Spotify`;
    } else if (args.join('').includes('apple')) {
      source = 'song:raw';
      embedTitle = `${emoji.msg.search} Searching for your request on ${emoji.msg.apple} Apple Music`;
    } else {
      source = 'song:soundcloud';
      embedTitle = `${emoji.msg.search} Searching for your request on ${emoji.msg.soundcloud} SoundCloud`;
    }

    // Send a response to the user
    message.reply({
      embeds: [new MessageEmbed()
        .setColor(es.color)
        .setTitle(embedTitle)
        .setDescription(`\`\`\`${String(args.join(' ')).substr(0, 2000)}\`\`\``)
      ]
    });

    // Play the song using the determined source
    try {
      await playermanager(client, message, args, source);
    } catch (error) {
      console.error('Error playing the song:', error);
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle('An error occurred while trying to play the song.')
          .setDescription('Please make sure the URL is valid or the video is available.')
        ]
      });
    }
  }
};

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
