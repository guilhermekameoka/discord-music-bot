import { icon } from "#functions";
import { discordUI } from "@magicyan/discord-ui";

discordUI({
    menus: {
        multimenu: {
            buttons: {
                next: {
                    emoji: icon("next"),
                    label: "",
                },
                home: {
                    emoji: icon("home"),
                    label: "",
                },
                previous: {
                    emoji: icon("previous"),
                    label: "",
                },
                close: {
                    emoji: icon("close"),
                    label: "",
                }
            }
        }
    }
})