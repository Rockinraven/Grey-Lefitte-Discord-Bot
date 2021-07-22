module.exports = {
	name: 'roles',
	description: 'creates the messages for assigning roles',
	async execute(message,args,Discord,client){
		const channel = '837709993796173845';	//roles channedb.set("key", "value").then(() => {});l
    const Database = require("@replit/database")
    const db = new Database(process.env.REPLIT_DB_URL)
		//all of the roles available to choose
		const writer = message.guild.roles.cache.find(role => role.name === "Writer");
		const artist = message.guild.roles.cache.find(role => role.name === "Artist");
		const techie = message.guild.roles.cache.find(role => role.name === "Techie");

		//emojis :art: :computer: and :pencil:
		const writerEmoji = '📝';
		const artistEmoji = '🎨';
		const techieEmoji = '💻';

		let myMessage = new Discord.MessageEmbed()
			.setTitle('Choose your Roles')
			.setDescription('This lets the rest of the crew know who is working on what part of the Visual Novel.\n'
				+ `You can pick more than one role, so don\'t worry if you wear many hats :cowboy:\n\n`
				+ `${writerEmoji} for Writer\n`
				+ `${artistEmoji} for Artist\n`
				+ `${techieEmoji} for Techie`);
			
		//wait for message to be sent then react to it
		let messageEmbed = await message.channel.send(myMessage);
		messageEmbed.react(writerEmoji);
		messageEmbed.react(artistEmoji);
		messageEmbed.react(techieEmoji);
    // db.set("reactionRolesMsgID", myMessage.id)     //keep track of the most recent reaction message generated

		// //when a reaction is added
		// client.on('messageReactionAdd', async (reaction, user) => {
		// 	//makes sure we're not in the in the middle of a reaction (is that what partials do?) and that it isn't the bot reacting to the message
		// 	//loads old messages
		// 	// let m = await c.fetchMessage(837808593768153118);
		// 	if (reaction.message.partial) {
		// 		await reaction.message.fetch().catch(error => {
		// 			console.error('Something went wrong when fetching the message: ', error);
		// 			return;
		// 		});
		// 	};

		// 	if (reaction.partial) {
		// 	 	await reaction.fetch().catch(error => {
		// 		console.error('Something went wrong when fetching the reaction: ', error);
		// 		return;
		// 	 	});
		// 	};

		// 	if (user.bot) return;
		// 	if (!reaction.message.guild) return;

		// 	//make sure we are in the proper channel (roles channel) and look for each reaction then assign the associated role
		// 	if (reaction.message.channel.id == channel) {
		// 		if (reaction.emoji.name === writerEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.add(writer);
		// 		}
		// 		if (reaction.emoji.name === artistEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.add(artist);
		// 		}
		// 		if (reaction.emoji.name === techieEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.add(techie);
		// 		}
		// 	}
		// });

		// client.on('messageReactionRemove', async (reaction, user) => {
		// 	//makes sure we're not in the in the middle of a reaction (is that what partials do?) and that it isn't the bot reacting to the message
		// 	if (reaction.message.partial) {
		// 		await reaction.message.fetch().catch(error => {
		// 			console.error('Something went wrong when fetching the message: ', error);
		// 			return;
		// 		});
		// 	};

		// 	if (reaction.partial) {
		// 	 	await reaction.fetch().catch(error => {
		// 		console.error('Something went wrong when fetching the reaction: ', error);
		// 		return;
		// 	 	});
		// 	};
		// 	if (user.bot) return;
		// 	if (!reaction.message.guild) return;

		// 	//make sure we are in the proper channel (roles channel) and look for each reaction then assign the associated role
		// 	if (reaction.message.channel.id == channel) {
		// 		if (reaction.emoji.name === writerEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.remove(writer);
		// 		}
		// 		if (reaction.emoji.name === artistEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.remove(artist);
		// 		}
		// 		if (reaction.emoji.name === techieEmoji) {
		// 			await reaction.message.guild.members.cache.get(user.id).roles.remove(techie);
		// 		}
		// 	}
		// });
	}

}