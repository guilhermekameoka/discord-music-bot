# Discord Music Bot

> [!WARNING]
> [NodeJs](https://nodejs.org/en) version required: 20.12 or higher

## Instructions

### Setup
Create a folder for the bot
Open the terminal in that folder and paste the command below
```bash
git clone https://github.com/guilhermekameoka/discord-music-bot.git
```

Install dependencies
```bash
npm install
```

Rename `.env.example` file to `.env`

Place [your bot token](https://constatic-docs.vercel.app/discord/guides/application) in `.env` file
```
BOT_TOKEN=yourtoken
```

Run the bot in development with dev script
```bash
npm run dev
```

Build the project with the build command
```bash
npm run build
```

Run the built project with the start script
```bash
npm run start
```

### Usage

The bot has only one command, which contains some sub commands.

On the server use `/musica`

| Sub command | Usage | Description |
| - | - | - |
| tocar | `/musica tocar` | Play a song |
| pular | `/musica pular` | Skip queue song |
| embaralhar | `/musica embaralhar` | Shuffle queue song |
| pausar | `/musica pausar` | Stop the current song |
| retomar | `/musica retomar` | Resume the current song |
| parar | `/musica parar` | Stop the current song |
| pesquisar | `/musica pesquisar` | Search for a song using autocomplete |
| selecionar | `/musica selecionar` | Skip to a specific song in the queue |