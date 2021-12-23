let Command = require(process.cwd() + '/ext/command')

module.exports = new Command({
      name: 'test',
      aliases: ['t'],
      description: "am testin",
      hidden: false,
      details: 'a test command lol, what you expect? a epic command?',
      group: 'test',
      nsfw: false,
      guildOnly: true,
      ownerOnly: true,
      clientPermissions: [],
      userPermissions: [],
      usage: [],
      async run({message, args}) {
        message.channel.send('hi')
      }
})
