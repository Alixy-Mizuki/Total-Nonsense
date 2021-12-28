let Command = require(process.botCommand())

module.exports = new Command({
      name: 'test',
      aliases: ['t'],
      description: "am testin",
      hidden: false,
      details: 'a test command lol, what you expect? a epic command?',
      group: 'test',
      nsfw: false,
      guildOnly: true,
      ownerOnly: false,
      clientPermissions: [],
      userPermissions: [],
      argsRequired: true,
      usage: ['hi','bye'],
      async run({client, message, args}) {
        
        
        message.channel.send('hi')
      }
})
