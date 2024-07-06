import { Event } from "#base";
import { brBuilder } from "#functions";
import { hexToRgb } from "#functions";
import { settings } from "#settings";
import { EmbedBuilder, TextChannel, time, GuildMember } from "discord.js";

const channelId = "1252440973074497587";

export default new Event({
    event: "guildMemberAdd",
    name: "guildMemberAdd",
    run(member: GuildMember) {
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;

        if (!channel) {
            console.error(`Não foi possível achar o canal com ID ${channelId}`);
            return;
        }

        const memberAvatarUrl = member.displayAvatarURL({ size: 512 });

        try {
            channel.send({
                embeds: [new EmbedBuilder({
                    color: hexToRgb(settings.colors.success),
                    author: {
                        name: `${member.displayName} entrou no servidor!`,
                        iconURL: memberAvatarUrl
                    },
                    thumbnail: { url: memberAvatarUrl },
                    description: brBuilder(
                        `${member} acabou de entrar no servidor 👀`,
                        time(new Date(), "f")
                    )
                })]
            });
        } catch (error) {
            console.error('Ocorreu um erro ao tentar enviar a menssagem:', error);
        }
    },
});