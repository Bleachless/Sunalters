# Sunalters

Welcome to the Sunalters Discord bot repository. This bot is currently in the testing phase.

## ✨ Features

-  Lyrics: The bot can search for song lyrics and display them in the chat.
-  DJ: The bot can play music in a voice channel using commands.
-  Command-only DJ: The bot can be configured to only respond to music commands from a specific role.

## 🚀 Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.


## 🔧 Configuration
Before you can use the bot, you must configure it with the following environment variables:
- `token`: Your Discord API token.
- `owner`: Your Discord user ID.
- `app_id`: Your Discord application ID.
- `test_guild_id`: The ID of a server you own to test the bot on.
- `MONGODB`: Your MongoDB connection string.
- `genius`: Your Genius API token.

To configure the environment variables, follow these instructions:
1. Rename the .env.example file to .env.
2. Open the .env file and replace the values with your own.

```sh
token=your-token-here
owner=your-user-id-here
app_id=your-application-id-here
test_guild_id=your-test-guild-id-here
MONGODB=your-mongodb-connection-string-here
genius=your-genius-api-token-here
```
3. Save the file.
`Note`: Do not share your token or other sensitive information with anyone.

## 📝 Usage
To start the bot, run the following command:
```sh
node bot.js
```

## Author
🧙‍♀️ **João Rafael**
- Website: [jdev](https://joaodev.me)


## 🤝 Contributing
Contributions to this repository are welcome. If you find any issues or have any suggestions for improvements, please create an issue or submit a pull request.