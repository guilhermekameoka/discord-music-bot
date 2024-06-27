import { Command } from "#base";
import {settings} from "#settings";
import { createQueueMetadata, icon, res } from "#functions";
import { brBuilder, createEmbed, limitText } from "@magicyan/discord";
import { multimenu } from "@magicyan/discord-ui";
import { QueryType, SearchQueryType, useMainPlayer } from "discord-player";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

new Command({
  name: "musica",
  description: "comando de música",
  dmPermission: false,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "tocar",
      description: "tocar música",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "busca",
          description: "nome da música ou URL",
          type: ApplicationCommandOptionType.String,
        },
        {
          name: "engine",
          description: "engine de busca",
          type: ApplicationCommandOptionType.String,
          choices: Object.values(QueryType).map((type) => ({
            name: type,
            value: type,
          })),
        },
      ],
    },
    {
      name: "pausar",
      description: "Pausa a música atual",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "retomar",
      description: "Retoma a música atual",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "parar",
      description: "Para a música atual",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "pular",
      description: "Pular músicas da fila",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "quantidade",
          description: "Quantidade de músicas para parar",
          type: ApplicationCommandOptionType.Integer,
          minValue: 1,
        },
      ],
    },
    {
      name: "fila",
      description: "Mostra a fila de reprodução",
      type: ApplicationCommandOptionType.Subcommand,
    },
    // {
    //   name: "pesquisar",
    //   description: "Pesquisar uma música",
    //   type: ApplicationCommandOptionType.Subcommand,
    //   options: [
    //     {
    //       name: "engine",
    //       description: "engine de busca",
    //       type: ApplicationCommandOptionType.String,
    //       choices: Object.values(QueryType).map((type) => ({
    //         name: type,
    //         value: type,
    //       })),
    //       required: true,
    //     },
    //     {
    //       name: "busca",
    //       description: "nome da música ou URL",
    //       type: ApplicationCommandOptionType.String,
    //       required: true,
    //       autocomplete: true,
    //     },
    //   ],
    //   async autocomplete(interaction) {
    //     const { options, /* guild */ } = interaction;
    //     const player = useMainPlayer();
    //     // const queue = player?.queues.cache.get(guild.id);

    //     switch (options.getSubcommand(true)) {
    //       case "pesquisar": {
    //         const searchEngine = options.getString("engine", true);
    //         const focused = options.getFocused?.();

    //         try {
    //           const results = await player.search(focused, {
    //             searchEngine: searchEngine as SearchQueryType,
    //           });
    //           if (!results.hasTracks()) return;
    //           interaction.respond(
    //             results.tracks.map((track) => ({
    //               name: limitText(`${track.duration} - ${track.title}`, 100),
    //               value: track.url,
    //             }))
    //           );
    //         } catch (_) {
    //           // Handle error
    //         }
    //       }
    //     }
    //   },
    // },
  ],
  async run(interaction) {
    const { options, member, guild, channel, client } = interaction;

    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      interaction.reply(
        "⚠️ Você precisa estar em um canal de voz para usar este comando!"
      );
      return;
    }
    if (!channel) {
      interaction.reply(
        "⚠️ Não foi possível utilizar este comando neste canal de texto!"
      );
      return;
    }

    const metadata = createQueueMetadata({
      channel,
      client,
      guild,
      voiceChannel,
    });
    const player = useMainPlayer();
    const queue = player?.queues.cache.get(guild.id);

    await interaction.deferReply({ ephemeral: true });

    switch (options.getSubcommand(true)) {
      case "tocar": {
        const query = options.getString("busca", true);
        const searchEngine = options.getString("engine") ?? QueryType.YOUTUBE;

        try {
          const { track, searchResult } = await player?.play(
            voiceChannel as never,
            query,
            {
              searchEngine: searchEngine as SearchQueryType,
              nodeOptions: { metadata },
            }
          );

          const display: string[] = [];

          if (searchResult.playlist) {
            const { tracks, title, url } = searchResult.playlist;
            display.push(
              `🎵 Adicionadas ${tracks.length} da playlist [${title}](${url})`
            );
            display.push(
              ...tracks.map((track) => `${track.title}`).slice(0, 8)
            );
            display.push("...");
          } else {
            display.push(
              `${icon(":a:dj")} ${
                queue?.size ? "Adicionado à fila" : "Tocando agora"
              } ${track?.toString()}`
            );
          }
          interaction.editReply(res.success(brBuilder(display).toString()));
        } catch (_) {
          interaction.editReply(
            res.danger("⚠️ Não foi possível tocar a música!")
          );
        }
        return;
      }
      /* case "pesquisar": {
        const trackUrl = options.getString("busca", true);
        const searchEngine = options.getString(
          "engine",
          true
        ) as SearchQueryType;

        try {
          const { track } = await player?.play(
            voiceChannel as never,
            trackUrl,
            {
              searchEngine,
              nodeOptions: { metadata },
            }
          );

          const text = queue?.size ? "Adicionado à fila" : "Tocando agora";
          interaction.editReply(
            res.success(`${icon(":a:dj")} ${text} ${track?.toString()}`)
          );
        } catch (_) {
          interaction.editReply(
            res.danger("⚠️ Não foi possível tocar a música!")
          );
        }
        return;
      } */
    }

    if (!queue) {
      interaction.editReply(
        res.danger("⚠️ Não há uma fila de reprodução ativa!")
      );
      return;
    }

    switch (options.getSubcommand(true)) {
      case "pausar": {
        if (queue.node.isPaused()) {
          interaction.editReply(
            res.danger("⚠️ A música atual já está pausada!")
          );
          return;
        }
        queue.node.pause();
        interaction.editReply(res.success("⏸️ Pausado"));
        return;
      }
      case "retomar": {
        if (!queue.node.isPaused()) {
          interaction.editReply(
            res.danger("⚠️ A música atual não está pausada!")
          );
          return;
        }
        queue.node.resume();
        interaction.editReply(res.success("▶️ Retomado"));
        return;
      }
      case "parar": {
        queue.node.stop();
        interaction.editReply(res.success("⏹️ Parado"));
        return;
      }
      case "pular": {
        const amount = options.getInteger("quantidade") ?? 1;
        const skipAmount = Math.min(queue.size, amount);
        for (let i = 0; i < skipAmount; i++) {
          queue.node.skip();
        }
        interaction.editReply(res.success(`⏭️ Puladas ${skipAmount} músicas`));
        return;
      }
      case "fila": {
        multimenu({
          embed: createEmbed({
            color: settings.colors.fuchsia,
            description: brBuilder(
              "#Fila atual",
              `Músicas: ${queue.tracks.size}`,
              "",
              `Música atual: ${queue.currentTrack?.title ?? "Nenhuma"}`
            ),
          }),
          items: queue.tracks.map((track) => ({
            color: settings.colors.green,
            description: brBuilder(
              `**Música**: [${track.title}](${track.url})`,
              `**Autor**: ${track.author}`,
              `**Duração**: ${track.duration}`
            ),
            thumbnail: track.thumbnail,
          })),
          render: (embeds, components) =>
            interaction.editReply({ embeds, components }),
        });
        return;
      }
    }
  },
});