import { bootstrapApp } from "#base";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

const { ACCESS_TOKEN, REFRESH_TOKEN, SCOPE, TOKEN_TYPE, EXPIRY_DATE } = process.env;

await bootstrapApp({ 
    workdir: import.meta.dirname,
    beforeLoad(client) {
        const player = Player.singleton(Object(client), {
            ytdlOptions: {
                quality: "highestaudio",
                filter: "videoonly"
            }
        });

        const oauthTokens = JSON.stringify({
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN,
            scope: SCOPE,
            token_type: TOKEN_TYPE,
            expiry_date: EXPIRY_DATE
        });

        player.extractors.register(YoutubeiExtractor, {
            authentication: oauthTokens
        });

        Object.assign(client, { player });
    },
});