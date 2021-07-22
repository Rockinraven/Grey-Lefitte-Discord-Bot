const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});  	//partials are for reaction roles 
const Database = require("@replit/database")
const db = new Database()
const keepAlive = require("./server")
const prefix = '!';
const fs = require('fs');
const errorChannel = '838118417005412433';
const rolesChannel = '837709993796173845';	//roles channel

client.commands = new Discord.Collection();

//read only js files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

//goes through all of the files to find the available commands?
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

//when it's active, log that we are active.
client.once('ready', () => {
	console.log('Grey Lefitte is online.');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//assign everyone to Member role when they join
client.on('guildMemberAdd', guildMember => {
	let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
	try {
		guildMember.roles.add(welcomeRole);
	}catch (error) {
		guildMember.guild.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when <@${guildMember.user.id}> joined: ` + error);
	}

	//send them a welcome message from Lefitte in #general
	guildMember.guild.channels.cache.get('836778225556389902').send(`Welcome <@${guildMember.user.id}>! Glad to have you on the crew! I'm pretty new 'round here myself, so reach out to <@!473214825833431051> if there's anything missin.`);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//REACTIONS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///ADD REACTION
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) {
		await reaction.message.fetch().catch(error => {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		});
	};

	if (reaction.partial) {
	 	await reaction.fetch().catch(error => {
		console.error('Something went wrong when fetching the reaction: ', error);
		return;
	 	});
	};
	if (user.bot) return;
	if (!reaction.message.guild) return;


	//adding roles when react to messages in roles channel only
	if (reaction.message.channel.id == rolesChannel) {
		client.commands.get('addRoles').execute(reaction, user);
	}
});

///REMOVE REACTION
client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) {
		await reaction.message.fetch().catch(error => {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		});
	};

	if (reaction.partial) {
	 	await reaction.fetch().catch(error => {
		console.error('Something went wrong when fetching the reaction: ', error);
		return;
	 	});
	};
	if (user.bot) return;
	if (!reaction.message.guild) return;


	//adding roles when react to messages in roles channel only
	if (reaction.message.channel.id == rolesChannel) {
		client.commands.get('removeRoles').execute(reaction, user);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//COMMANDS 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//whenever a message is sent
client.on('message', message => {

	//if starts with the proper prefix and or written by bot (do nothing)
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	//gets the command that comes after the prefix
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	//send google drive link (embedded)
	if (command === 'drive') {
		try{
			client.commands.get('drive').execute(message, args, Discord);
		}catch (error) {
			client.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when calling !drive: ` + error);
		};
	}
	//send a list of the commands (embedded)
	else if (command === 'commands') {
		try {
			client.commands.get('commands').execute(message, args, Discord);
		}catch (error) {
			client.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when calling !commands: ` + error);
		};
		
	}
	else if (command === 'roles') {
		try {
			client.commands.get('roles').execute(message, args, Discord, client);
		} catch (error) {
			client.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when calling !emojis: ` + error);
		};
	}
	else if (command === 'clear') {
		try {
			client.commands.get('clear').execute(message, args);
		}catch (error) {
			client.channels.cache.get(errorChannel).send(`<@!473214825833431051> there was an error when calling !clear: ` + error)
		}
	}
	
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//voting channel

const voteChannel = '836782841450725417';
const galleryChannel = '836782874287669268';
const yesEmoji = '✅';
const noEmoji = '❌';
const thinkingEmoji = '🤔';
const arrowRightEmoji = '➡️';

client.on('message', message => {
	if (message.channel.id === voteChannel && (message.attachments.size > 0)) {		//if in proper channel and has an attachment
		message.react(yesEmoji);													//react to it with the right emojis for voting
		message.react(thinkingEmoji);
		message.react(noEmoji);
		message.react(arrowRightEmoji);			//add the emoji at the start, and if it's no longer an option then it disappears. (if it's already been moved)
	}
	
	// const myAttachment = message.attachments.first();
	// 	if (!attachment) return;
	// 	else voteChannel.send(myAttachment);

})

//when reacting with the arrow emoji
client.on('messageReactionAdd', async (reaction, user) => {
	//console.log('I see you reacted to a message')
	if (reaction.message.partial) {
		await reaction.message.fetch().catch(error => {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		});
	};

	if (reaction.partial) {
	 	await reaction.fetch().catch(error => {
		console.error('Something went wrong when fetching the reaction: ', error);
		return;
	 	});
	};

	if (user.bot) return;
	if (!reaction.message.guild) return;
	const {message, emoji} = reaction;
	//////////////////////////////////////
	//if correct channel, emoji, and has photo
	if ((reaction.message.channel.id === voteChannel) && (reaction.emoji.name === arrowRightEmoji) && (reaction.message.attachments.size > 0)) {		
		//message.channel.send('test');
		client.commands.get('voteConfirm').execute(reaction, user, Discord, client, message);							//start the confirmation process
	};
		// const myAttachment = message.attachments.first();
		// if (!attachment) return;
		// else voteChannel.send(myAttachment);
})
keepAlive()
//log into bot (should be last step?)
client.login(process.env['TOKEN']);