module.exports = {
	name: 'clear',
	description: 'clear messages',
	async execute(message,args){
		if(!args[0]) return message.reply("You need to tell me how many messages to clear...");
		if(isNaN(args[0])) return message.reply("Um... That's not a number");
		if(args[0] > 100) return message.reply("I can only erase 100 messages at a time...");
		if(args[0] < 1) return message.reply("That isn't possible");

		await message.channel.messages.fetch({limit: args[0]}).then(messages => {
			message.channel.bulkDelete(messages);
		});

	}
}