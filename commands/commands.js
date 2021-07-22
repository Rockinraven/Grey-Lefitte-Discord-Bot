module.exports = {
	name: 'commands',
	description: 'Sends the google drive link',
	execute(message,args,Discord){
		const embedMessage = new Discord.MessageEmbed()
		.setTitle('Commands')
		.setDescription('Here\'s everything I\'m willing do to for you.\nDon\'t ask me to do anything else, I\'m busy.')
		.addFields (
			{name: '!drive', value: 'Get a link to the project Drive Folder'},
			{name: '!commands', value: 'You just typed this one, it lists all the commands'}
		)
		message.channel.send(embedMessage);
	}
}