import { bootstrapApp } from "#base";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

const yt_token = process.env.YOUTUBE_TOKEN;

await bootstrapApp({
  workdir: import.meta.dirname,
  beforeLoad: async (client) => {
    const player = Player.singleton(Object(client), {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    });

    player.extractors.register(YoutubeiExtractor, {
      authentication: yt_token,
      streamOptions: {
        useClient: "ANDROID",
      },
    });

    Object.assign(client, { player });
  },
});
