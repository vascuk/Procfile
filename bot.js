const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

// Підключаємо обробники
const directChat = require('./direct-chat/direct-index');
const privateChat = require('./private-chat/private-index');

// Створюємо бота
const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

console.log('🤖 Бот запускається...');

// Ініціалізуємо режими
directChat.init(bot);
privateChat.init(bot);

// Перевірка підключення
bot.getMe().then((info) => {
    console.log(`✅ Бот @${info.username} готовий до роботи!`);
    console.log('📋 Режими:');
    console.log('   1️⃣ Прямий чат з ботом');
    console.log('   2️⃣ Особисті чати між людьми');
}).catch((error) => {
    console.error('❌ Помилка підключення:', error.message);
    process.exit(1);
});

// Обробка помилок
bot.on('polling_error', (error) => {
    console.error('❌ Помилка:', error.message);
});