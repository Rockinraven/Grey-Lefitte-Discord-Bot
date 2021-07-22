module.exports = {
	name: 'voteConfirm',
	description: 'Manages moving approved images into the gallery.',
	async execute(reaction, user, Discord, client, reactMsg) {
		const channel = reaction.message.channel;					//inspo-vote channel
		const yesEmoji = '✅';
		const arrowRightEmoji = '➡️';
		const galleryChannel = '836782874287669268';
		var inputCounter = 0;

		if (reactMsg.reactions.cache.find(reaction => reaction.emoji.name === arrowRightEmoji).count <= 1) {	//only if it hasn't been moved already.
			channel.send('Hm, seems like that one has already been moved into the gallery. Try re-uploading, or contact <@!473214825833431051> if I did something wrong');
			reactMsg.reactions.cache.get(arrowRightEmoji).remove().catch(error => console.error('Failed to remove reactions: ', error)); //remove everyone's reactions to the arrow 
		} else {
			let filter = m => m.author.id === user.id
			let confirmationMsg = await channel.send('Move this photo to the gallery? Type Yes or No');
			reaction.message.channel.awaitMessages(filter, {
				max: 1,
				time: 50000,
				errors: ['time']
			})
			.then(message => {inputResponse(message);})

			function inputResponse(message) {
				message = message.first();
				console.log(message.content.toLowerCase());
				if (message.content.toLowerCase() == 'no' || message.content.toLowerCase() == 'n') {												//dont approve the image:
					reactMsg.reactions.cache.get(arrowRightEmoji).remove().catch(error => console.error('Failed to remove reactions: ', error));	 // remove the arrowRightEmoji
					reactMsg.react(arrowRightEmoji);																								// resets to just the bot
					inputCounter = 0;

					channel.send('You said no, so I won\'t move this one into the gallery.');
					confirmationMsg.delete();
					message.delete();

				} else if (message.content.toLowerCase() == 'yes' || message.content.toLowerCase() == 'y') {										// approve the image
					//channel.send('you said yes');
					
					move_to_gallery(Discord, client, reactMsg, message, user, galleryChannel);
					reactMsg.reactions.cache.get(arrowRightEmoji).remove().catch(error => console.error('Failed to remove reactions: ', error)); //remove everyone's reactions to the arrow 
						
					
					confirmationMsg.delete();
					message.delete();
					inputCounter = 0;

				// 	//reactMsg.reactions.cache.get(channel).remove().catch(error => console.error(error));
				// } else if (message.content.toLowerCase() == 'test') {
				// 	//send the image in the gallery channel
				// 		reactMsg.attachments.forEach(async (attachment) => {
				// 		if (message.author.bot) return;
				// 		message.channel.send('voting override (moving image to #gallery)');
				// 		let img = attachment;
				// 		//message.channel.send('test');
				// 		const msg = await client.channels.cache.get(galleryChannel).send(`Image approved by <@${user.id}>`, img);
				// 		//const msg = await message.channel.send(`Image approved by <@${user.id}>`, img);
				// 		inputCounter = 0;
				// 	});

				} else {
					inputCounter++;
					
					if (inputCounter < 2) {
						channel.send('That\'s not quite right. Give it another shot.');
						reactMsg.channel.awaitMessages(filter, {
							max: 1,
							time: 50000,
							errors: ['time']
						})
						.then(message => {
							inputResponse(message);
						})

					} else {
						channel.send('I gave you another chance, and that\'s still not one of the valid answers. You\'ll have to try again 🤷‍♂️');
						inputCounter = 0;
					}
				}
			};
		}
		// .catch(collected => {
		// 	channel.send('Timeout ', collected);
		// });
	}
}

function move_to_gallery(Discord, client, reactMsg, message, user, galleryChannel) {
			console.log(reactMsg.user);
			reactMsg.attachments.forEach(async (attachment) => {
			if (message.author.bot) return;
			message.channel.send('Image approved! Adding to <#836782874287669268>.');
			let img = attachment;
			const msg = await client.channels.cache.get(galleryChannel).send(`Image approved by <@${user.id}>`, img);
			})
		};


// //asks to confirm
		// let confirmationMsg = await reaction.message.channel.send('Move this photo to the gallery? Type Yes or No');
		// const userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
		// //waits for response
		// const collector = new Discord.MessageCollector(reaction.message.channel, m => m.author.id === user, {time: 10000});
		// //console.log(collector);
		// collector.on('collect', message => {
		// 	console.log('test');
		// 	//if no, remove reaction and clean chat
		// 	if (message.content.toLowerCase === "no") {


		// 	} else if (message.content.toLowerCase === "yes") {
		// 		reaction.message.channel.send('test');
		// 		//send the image in the gallery channel
		// 		message.attachments.forEach(async (attachment) => {
		// 		if (message.author.bot) return;
		// 		let img = attachment;
		// 		//message.channel.send('test');
		// 		const msg = await client.channels.cache.get(galleryChannel).send(`Image approved by <@${user.id}>`, img);
		// 		//const msg = await message.channel.send(`Image approved by <@${user.id}>`, img);
		// 		});
		// 	//if yes, remove reaction, copy photo to Gallery, clean chat
		
		// 	}
		// });