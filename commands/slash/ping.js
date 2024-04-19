module.exports = {
    name: 'ping',
    description: 'Check bots ping',
    run: async (client, interaction) => {
        interaction.followUp({ content: client.ws.ping + 'ms' })
    }
}
