import { Event } from "#base";
import { brBuilder } from "#functions";
import { hexToRgb } from "#functions";
import { settings } from "#settings";
import{ EmbedBuilder, TextChannel, time, GuildMember } from "discord.js";

const channelId = "1252440973074497587";

export default new Event({
    event: "guildMemberRemove",
    name: "guildMemberRemove",
    run(member: GuildMember) {
        const channel = member.guild.channels.cache.get(channelId) as TextChannel;
        const memberAvatarUrl = member.displayAvatarURL({ size: 512 });

        channel.send({
            embeds: [new EmbedBuilder({
                color: hexToRgb(settings.colors.danger),
                author: {
                    name: `${member.displayName} saiu do servidor!`,
                    iconURL: memberAvatarUrl
                },
                thumbnail: {url: memberAvatarUrl},
                description: brBuilder(
                    `${member} acabou de sair do servidor 😢`,
                    time(new Date(), "f")
                )
            })]
         });
    },
});