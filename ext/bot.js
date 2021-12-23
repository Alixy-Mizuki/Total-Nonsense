let Discord = require('discord.js')
let Handler = require('./handler')
let { readdirSync } = require('fs')

class Bot extends Discord.Client {
  constructor(options = {}) {
    
    if(typeof options.commandPrefix !== 'string') options.commandPrefix = '!';
    if(typeof options.case_insensitive !== 'boolean') options.case_insensitive = false;
    if(typeof options.owner !== 'string' || options.owner.length != 18) options.owner = null;
    if(typeof options.intents !== 'object') options.intents = [];
    if(typeof options.commandFolder !== 'string' || options.commandFolder === undefined || options.commandFolder === null) throw new TypeError('commandFolder object not present in Bot Client')
    
    super({
      commandPrefix: options.commandPrefix,
      case_insensitive: options.case_insensitive,
      owner: options.owner,
      intents: options.intents
    });


    this.commandPrefix = options.commandPrefix;
    this.case_insensitive = options.case_insensitive;
    this.owner = options.owner;
    this.intents = options.intents;
    this.commandFolder = options.commandFolder
    this.token = options.token

    this.start(this.token)

    return this;

  }
  
  start(token) {
    super.login(token)

    this.commands = new Discord.Collection();
    const commandFolders = readdirSync(this.commandFolder);

    for (const folder of commandFolders) 
    {
      const commandFiles = readdirSync(`${this.commandFolder}/${folder}`).filter(file => file.endsWith('.js'));
      const FILES = readdirSync(`${this.commandFolder}/${folder}`);
        
      for (const file of commandFiles) 
      {
        const command = require(`./../${this.commandFolder}/${folder}/${file}`);
        this.commands.set(command.name, command)
        // console.log(command)
      }
    }


    new Handler(this, this.commands)
  }
}

module.exports = Bot;
