import { bootstrapApp } from "#base";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

const YT_API_KEY = process.env.YT_API_KEY;

await bootstrapApp({ 
    workdir: import.meta.dirname,
    beforeLoad(client) {
        const player = Player.singleton(Object(client), {
            ytdlOptions: {
                quality: "highestaudio",
                filter: "videoonly"
            }
        });
        player.extractors.register(YoutubeiExtractor, {authentication: YT_API_KEY});
        Object.assign(client, { player });
    },
});