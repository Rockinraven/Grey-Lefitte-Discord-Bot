module.exports = {
	name: 'drive',
	description: 'Sends the google drive link',
	execute(message,args,Discord){
		const embedMessage = new Discord.MessageEmbed()
		.setTitle('Drive Link')
		.setURL('https://drive.google.com/drive/folders/1WRbSZQ1ekmTSGrs-JAV8E9y0W9ja5swk?usp=sharing')
		.setDescription('Here is the link to the Cimeris Google Drive Folder!');
		//message.channel.send("[Drive Link](https://drive.google.com/drive/folders/1WRbSZQ1ekmTSGrs-JAV8E9y0W9ja5swk?usp=sharing)")
		message.channel.send(embedMessage);
	}
}