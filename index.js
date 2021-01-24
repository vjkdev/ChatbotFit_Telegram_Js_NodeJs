const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

//TOKEN do Telegram
const token = '';

const bot = new TelegramBot(token, { polling: true });

// Primeira ligação com o TELEGRAM
/* bot.on('message', function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);
    bot.sendMessage(chatId, 'Obrigado por sua mensagem.');
}); */

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    if (dfResponse.intent === 'Treino específico') {
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});