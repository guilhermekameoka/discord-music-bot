import { Command } from "#base";
import {icon, res} from "#functions";
import { ApplicationCommandType} from "discord.js";

new Command({
    name: "music",
    description: "Music command",
    dmPermission: false,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply(res.success(`${icon("pog")} Tudo certo`).toString());
    },
})