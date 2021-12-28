const escapeRegex = (str) => { return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'); }
const { oneLine, stripIndents } = require('common-tags');

class Handler {
	constructor(client, commands) {

		Object.defineProperty(this, 'client', { value: client });

		Object.defineProperty(this, 'commands', { value: commands });

    this.handleMessage(true)
  }

	async handleMessage(stat) {
    if(stat == false) return;
    
    this.client.on('messageCreate', async (message) => 
    { 
      if (message.author.bot || (message.channel.type === 'dm') || (message.type === 'THREAD_CREATED') ) return;
      if(!message.content.startsWith(this.client.commandPrefix)) return;
      let args = message.content.slice(this.client.commandPrefix.length).split(' ')
      let CMD = args[0]
      args.shift();

      let command = this.client.commands.get(CMD) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(CMD));

      // v13 Channel Type
    let CT = {
      'DM': 'dm',
      'GROUP_DM': 'group dm'
    }

    let argsCollect = [];

    if(command.guildOnly) {
      if(Boolean(CT[message.channel.type])) return message.reply(`The \`${command.name}\` command must be used in a server channel.`);
    }

		if(command.nsfw) return message.reply(`The \`${command.name}\` command can only be used in NSFW channels.`);

    if((command.argsRequired == true) && !args.length) {
      if(command.usage.length > 1) {
        let Arguments = '';
        let Use = `${this.client.commandPrefix}${command.name}`

        Arguments += `Usage:\n${Use} ${command.usage.join(`\n${Use} `)}\n`

        if(command.aliases.length >= 1) {
          let Alias = `${this.client.commandPrefix}${command.aliases[0]}`

          Arguments += `\nUsing Aliases:\n${Alias} ${command.usage.join(`\n${Alias} `)}`
        }
        return message.reply(stripIndents`\`\`\`yaml
        ${Arguments}
        \`\`\``);
      }
      if(command.usage.length == 0) {
        return message.reply('Please provide an arguments')
      }
    }

		if(command.ownerOnly) return;

    if(command.userPermissions) {
      if(command.length === 1) 
      {
        return message.reply(`You need the "${command.userPermissions[0]}" permission for the \`${command.name}\` command to work.`);
      }
      if(command.length > 1) {
        return message.reply(oneLine`
          You need the following permissions for the \`${command.name}\` command to work:
          ${command.userPermissions.join(', ')}
        `);   
      }
    }

		if(command.clientPermissions) {
      if(command.length === 1) 
      {
        return message.reply(`I need the "${command.clientPermissions[0]}" permission for the \`${command.name}\` command to work.`);
      }
      if(command.length > 1) {
        return message.reply(oneLine`
          I need the following permissions for the \`${command.name}\` command to work:
          ${command.clientPermissions.join(', ')}
        `);  
      }
    }

      if(command) {
        command.run(
          { 
            client: this.client,
            message, 
            args, 
            
          }
        )
      }

    })

	}
}

module.exports = Handler;
