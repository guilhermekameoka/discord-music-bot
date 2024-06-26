import { bootstrapApp } from "#base";
import {Player} from "discord-player";
await bootstrapApp({
    workdir: import.meta.dirname,
    beforeLoad(client){
        const player = new Player(client as never);
        player.extractors.loadDefault();
    }
})
