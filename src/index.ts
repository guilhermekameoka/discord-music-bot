import { bootstrapApp } from "#base";
import { Player } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";

const yt_token = process.env.YOUTUBE_TOKEN;

async function startApp() {
  await bootstrapApp({
    workdir: import.meta.dirname,
    beforeLoad: async (client) => {
      const player = Player.singleton(Object(client), {
        ytdlOptions: {
          quality: "highestaudio",
          highWaterMark: 1 << 25,
        },
      });

      await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
      await player.extractors.register(YoutubeiExtractor, {
        authentication: yt_token,
        streamOptions: {
          useClient: "ANDROID",
        },
      });

      Object.assign(client, { player });
    },
  });
}

startApp().catch(console.error);