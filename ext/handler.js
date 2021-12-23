const escapeRegex = (str) => { return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'); }

class Handler {
	constructor(client, commands) {

		Object.defineProperty(this, 'client', { value: client });

		Object.defineProperty(this, 'commands', { value: commands });

    this.handleMessage(true)
  }

	async handleMessage(stat) {
    if(stat == false) return;
    
    this.client.on('messageCreate', message => 
    { 
      if (message.author.bot || (message.channel.type === 'dm') || (message.type === 'THREAD_CREATED') ) return;
      if(!message.content.startsWith(this.client.commandPrefix)) return;
      let args = message.content.slice(this.client.commandPrefix.length).split(' ')
      let CMD = args[0]
      args.shift();

      let COMMAND = this.client.commands.get(CMD) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(CMD));


      // console.log(COMMAND, COMMAND.name)

      if(COMMAND) {
        COMMAND.run({ message, args })
      }

    })


    


	}
}

module.exports = Handler;
