const path = require('path');
const { escapeMarkdown } = require('discord.js');
const { oneLine, stripIndents } = require('common-tags');

class Command {
	constructor(info) {
		this.constructor.validateInfo(info);

		this.name = info.name;

		this.aliases = info.aliases || [];
		
		this.description = (!info.description.length) ? 'No Description' : info.description;

		this.hidden = Boolean(info.hidden);

		this.details = info.details || null;

		this.group = info.group;

		this.nsfw = Boolean(info.nsfw) || false;

		this.guildOnly = Boolean(info.guildOnly) || true;

		this.ownerOnly = Boolean(info.ownerOnly) || false;

		this.clientPermissions = info.clientPermissions || null;

		this.userPermissions = info.userPermissions || null;

		this.usage = info.usage || null;

    this.argsRequired = info.argsRequired || false;

    this.run = info.run;
    
	}

  onBlock(message, reason, data) {
		switch(reason) {
			case 'guildOnly':
				return message.reply(`The \`${this.name}\` command must be used in a server channel.`);
			case 'nsfw':
				return message.reply(`The \`${this.name}\` command can only be used in NSFW channels.`);
			case 'permission': {
				if(data.response) return message.reply(data.response);
				return message.reply(`You do not have permission to use the \`${this.name}\` command.`);
			}
			case 'clientPermissions': {
				if(data.missing.length === 1) {
					return message.reply(
						`I need the "${permissions[data.missing[0]]}" permission for the \`${this.name}\` command to work.`
					);
				}
				return message.reply(oneLine`
					I need the following permissions for the \`${this.name}\` command to work:
					${data.missing.map(perm => permissions[perm]).join(', ')}
				`);
			}
			default:
				return null;
		}
	}

	static validateInfo(info) {


    // info types
		if(typeof info !== 'object') throw new TypeError('Command info must be an Object.');

    // name
		if(typeof info.name !== 'string') throw new TypeError('Command name must be a string.');
		if(info.name !== info.name.toLowerCase()) throw new Error('Command name must be lowercase.');

    // alias
		if(info.aliases && (!Array.isArray(info.aliases) || info.aliases.some(ali => typeof ali !== 'string'))) {
			throw new TypeError('Command aliases must be an Array of strings.');
		}
		if(info.aliases && info.aliases.some(ali => ali !== ali.toLowerCase())) {
			throw new RangeError('Command aliases must be lowercase.');
		}

    // description
		if(typeof info.description !== 'string') throw new TypeError('Command description must be a string.');

    if(typeof info.argsRequired !== 'boolean') throw new TypeError('Command args must be a boolean.');

    // group
		if(typeof info.group !== 'string') throw new TypeError('Command group must be a string.');
		if(info.group !== info.group.toLowerCase()) throw new RangeError('Command group must be lowercase.');

    // details
		if('details' in info && typeof info.details !== 'string') throw new TypeError('Command details must be a string.');

    // usage
		if(info.usage && (!Array.isArray(info.usage) || info.usage.some(ex => typeof ex !== 'string'))) {
			throw new TypeError('Command usage must be an Array of strings.');
		}

    // bot perms
		if(info.clientPermissions) {
			if(!Array.isArray(info.clientPermissions)) {
				throw new TypeError('Command clientPermissions must be an Array of permission key strings.');
			}
			for(const perm of info.clientPermissions) {
				if(!permissions[perm]) throw new RangeError(`Invalid command clientPermission: ${perm}`);
			}
		}

    // user perms
		if(info.userPermissions) {
			if(!Array.isArray(info.userPermissions)) {
				throw new TypeError('Command userPermissions must be an Array of permission key strings.');
			}
			for(const perm of info.userPermissions) {
				if(!permissions[perm]) throw new RangeError(`Invalid command userPermission: ${perm}`);
			}
		}
    
	}
}

module.exports = Command;
