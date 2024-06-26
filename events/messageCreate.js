module.exports.run = async (client, message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(client.config.prefix)) return;
    if (!message.member) message.guild.fetchMembers(message);

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g); // SCLICE to remove prefix, TRIM to remove spaces and SPLIT to make content in array
    const cmd = args.shift().toLowerCase(); // SHIFT commands to remove the prefix and toLowerCase to avoid capital letter like '!HeLp MoDeRaTiOn' 
    if (cmd.length === 0) return;
    let command = client.commands.normal.get(cmd);
    if (!command) command = client.commands.normal.find(a => a.aliases && a.aliases.includes(cmd)); //Check aliases to use as commands

    if (command) { // if no command found (alias either) return
        try {
            command.run(client, message, args) // if  a command is found run it :D
        } catch (error) {
            client.log.error('Error while running command: ' + error) // Log the error in discord and in the terminal
            const errorCommandEmbed = new client.discord.EmbedBuilder() // Send the executor the error log in case 
                .setColor("RED")
                .addField(`Error while executing this command`, `\`\`\`js\n${error}\`\`\``)
            return message.channel.send({ embeds: [errorCommandEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            })
        }
    }
}