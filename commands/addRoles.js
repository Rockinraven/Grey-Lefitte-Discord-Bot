module.exports = {
	name: 'addRoles',
	description: 'adds roles to users when they react in #roles',
	async execute(reaction, user) {
		let reactMsg = reaction.message;
    const Database = require("@replit/database");
    const db = new Database(process.env.REPLIT_DB_URL);
		const channel = '837709993796173845';	//roles channel
		//emojis :art: :computer: and :pencil:
		const writerEmoji = '📝';
		const artistEmoji = '🎨';
		const techieEmoji = '💻';
    reactionRolesMsg = reactMsg;
    defaultMessage = reactMsg;

		//all of the roles available to choose
		const writer = reactMsg.guild.roles.cache.find(role => role.name === "Writer");
		const artist = reactMsg.guild.roles.cache.find(role => role.name === "Artist");
		const techie = reactMsg.guild.roles.cache.find(role => role.name === "Techie");
		// console.log(reactMsg.embeds);

    //check if the key exists
    await reaction.message.fetch(message => {
      defaultMessage = message;
    }).catch(error => {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		})

    await db.get("reactionRolesMsg").then(message => {
      if (!message) {
        db.set("reactionRolesMsg", defaultMessage)
      }
      console.log(db.list)
    })
		//make sure we are reacting to the roles message only
		if (reactMsg == reactionRolesMsg) {	//if the proper message and it was sent by the bot //&& reactMsg.author.bot
			
			if (reaction.emoji.name === writerEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.add(writer);
			}
			if (reaction.emoji.name === artistEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.add(artist);
			}
			if (reaction.emoji.name === techieEmoji) {
				await reaction.message.guild.members.cache.get(user.id).roles.add(techie);
			}

		// let m = await c.fetchMessage(837808593768153118);

		} else {
      console.log("didn't match the message ID")
    }
	}
}

