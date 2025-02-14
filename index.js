console.clear();
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const config = require("./botconfig/config.json")
const client = new Discord.Client({
  fetchAllMembers: false,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
     Discord.Intents.FLAGS.GUILD_MEMBERS, //shouldn't be needed so u can uncomment it
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES, //if u want to use slash commands u can uncomment this after deploying
  ],
  presence: {
    activities: [{
      name: `${config.status.text}`.replace("{prefix}", config.prefix), 
      type: config.status.type, url: config.status.url
    }],
    status: "idle"
  }
});


/**********************************************************
 * @param {3} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)



/**********************************************************
 * @param {4} Raise_the_Max_Listeners to 25 (default 10)
 *********************************************************/
client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;



/**********************************************************
 * @param {5} LOAD_the_BOT_Functions_and_events 
*********************************************************/
Array("extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands").forEach(handler => {
  try{ require(`./handlers/${handler}`)(client); }catch (e){ console.warn(e) }
});


/**********************************************************
 * @param {6} Login_to_the_Bot
*********************************************************/
client.login(process.env.token || config.token);
