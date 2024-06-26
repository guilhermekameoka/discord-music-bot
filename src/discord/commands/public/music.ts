import { Command } from "#base";
import {icon} from "#functions";
import { ApplicationCommandType} from "discord.js";

new Command({
    name: "music",
    description: "Music command",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply((`${icon("pog")} Tudo certo`));
    },
})