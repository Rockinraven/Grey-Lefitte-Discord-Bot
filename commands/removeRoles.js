module.exports = {
	name: 'removeRoles',
	description: 'removes roles from users when they un-react in #roles',
	async execute(reaction, user) {
		let reactMsg = reaction.message;

		const channel = '837709993796173845';	//roles channel

		//emojis :art: :computer: and :pencil:
		const writerEmoji = '📝';
		const artistEmoji = '🎨';
		const techieEmoji = '💻';

		//all of the roles available to choose
		const writer = reactMsg.guild.roles.cache.find(role => role.name === "Writer");
		const artist = reactMsg.guild.roles.cache.find(role => role.name === "Artist");
		const techie = reactMsg.guild.roles.cache.find(role => role.name === "Techie");

		//make sure we are reacting to the roles message only
		if (reactMsg.embeds.title = 'Choose your Roles' ) {	//if the proper message and it was sent by the bot //&& reactMsg.author.bot
			if (reaction.emoji.name === writerEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove(writer);
			}
			if (reaction.emoji.name === artistEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove(artist);
			}
			if (reaction.emoji.name === techieEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.remove(techie);
			}
		}

		// let m = await c.fetchMessage(837808593768153118);

		
	}
}

