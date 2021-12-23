let Bot = require('./ext/bot')


let bot = new Bot({
  commandPrefix: '.',
  case_insensitive: true,
  owner: '123456789012345678',
  intents: [ 'GUILDS', 'GUILD_MESSAGES' ],
  commandFolder: './cmd',
  token: process.env.t
})


bot.on('ready', () => p(bot.user.username+' is alive'))
