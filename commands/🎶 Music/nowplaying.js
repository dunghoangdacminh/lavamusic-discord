const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`${process.cwd()}/handlers/functions`);

module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, "trackinfo"],
  description: `Shows detailed information about the current Song`,
  usage: `nowplaying`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    // If no current song return error
    if (!player.queue.current)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable1"]))
        ]
      });

    // Define the footer text and URL
    const footerText = `Requested by: ${player.queue.current.requester.tag}`;
    const footerIcon = player.queue.current.requester.displayAvatarURL({
      dynamic: true
    });
    const authorText = `Current song playing:`;

    // Ensure footer text is a string
    const safeFooterText = typeof client.getFooter(footerText, message.guild.iconURL({ dynamic: true })) === 'string'
      ? client.getFooter(footerText, message.guild.iconURL({ dynamic: true }))
      : 'Thanks for choosing this bot. | Edited by Akimiya';

    // Create embed message
    const embed = new MessageEmbed()
      .setAuthor(authorText, message.guild.iconURL({ dynamic: true })) // Ensure this is a string
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor(es.color)
      .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable2"]))
      .addField(`${emoji.msg.time} Progress: `, createBar(player))
      .addField(`${emoji.msg.time} Duration: `, `\`${format(player.queue.current.duration).split(" | ")[0]}\` | \`${format(player.queue.current.duration).split(" | ")[1]}\``, true)
      .addField(`${emoji.msg.song_by} Song By: `, `\`${player.queue.current.author}\``, true)
      .addField(`${emoji.msg.repeat_mode} Queue length: `, `\`${player.queue.length} Songs\``, true)
      .setFooter(safeFooterText, footerIcon);

    // Send Now Playing Message
    return message.reply({
      embeds: [embed]
    });
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
