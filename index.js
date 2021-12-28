let Bot = require('./ext/bot')

let bot = new Bot({
  commandPrefix: '?',
  case_insensitive: true,
  owner: 'ID',
  intents: [ 'GUILDS', 'GUILD_MESSAGES' ],
  commandFolder: './cmd',
  token: process.env.t
})


bot.on('ready', () => { 
  console.log(bot.user.username+' is alive')
})
