const privateStart = require('./private-functions/private-start');
const privateHelp = require('./private-functions/private-help');
const privateCalculator = require('./private-functions/private-calculator');
const privateWeather = require('./private-functions/private-weather');
const privateRandom = require('./private-functions/private-random');
const privateCoin = require('./private-functions/private-coin');
const privateDice = require('./private-functions/private-dice');
const privateYesNo = require('./private-functions/private-yesno');
const privateTime = require('./private-functions/private-time');
const privateDate = require('./private-functions/private-date');
const privateTranslate = require('./private-functions/private-translate');
const privateNews = require('./private-functions/private-news');
const privateCrypto = require('./private-functions/private-crypto');
const privateUsd = require('./private-functions/private-usd');
const privateRemind = require('./private-functions/private-remind');

let bot;

function init(botInstance) {
    bot = botInstance;
    
    bot.on('business_connection', handleConnection);
    bot.on('business_message', handleBusinessMessage);
    
    console.log('💬 Private-chat завантажено');
}

function handleConnection(update) {
    const status = update.is_enabled ? 'підключено' : 'відключено';
    console.log(`💬 Private-chat: бізнес ${status}`);
}

async function handleBusinessMessage(msg) {
    console.log('📨 ОТРИМАНО БІЗНЕС:', msg.text);
    
    const chatId = msg.chat.id;
    const text = msg.text;
    // ...

    const businessId = msg.business_connection_id;
    const firstName = msg.from.first_name || 'користувач';
    
    if (!text) return;
    
    if (privateStart.isStartCommand(text)) {
        await bot.sendMessage(chatId, privateStart.getMessage(firstName), {
            business_connection_id: businessId
        });
    }
    else if (privateHelp.isHelpCommand(text)) {
    await bot.sendMessage(chatId, privateHelp.getHelpMessage(), {
        business_connection_id: businessId
    });
    }
    else if (privateHelp.isGamesCommand(text)) {
        await bot.sendMessage(chatId, privateHelp.getGamesMessage(), {
            business_connection_id: businessId,
            parse_mode: 'Markdown'
        });
    }
    else if (privateCalculator.isCalculatorCommand(text)) {
        const expression = privateCalculator.extractExpression(text);
        if (expression) {
            const result = privateCalculator.calculate(expression);
            await bot.sendMessage(chatId, result, {
                business_connection_id: businessId
            });
        } else {
            await bot.sendMessage(chatId, privateCalculator.getHelpMessage(), {
                business_connection_id: businessId
            });
        }
    }
    else if (privateWeather.isWeatherCommand(text)) {
        const city = privateWeather.extractCity(text);
        const weatherMessage = await privateWeather.getWeatherMessage(city);
        await bot.sendMessage(chatId, weatherMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateRandom.isRandomCommand(text)) {
        await bot.sendMessage(chatId, privateRandom.getMessage(text), {
            business_connection_id: businessId
        });
    }
    else if (privateCoin.isCoinCommand(text)) {
        await bot.sendMessage(chatId, privateCoin.getMessage(), {
            business_connection_id: businessId
        });
    }
    else if (privateDice.isDiceCommand(text)) {
        await bot.sendMessage(chatId, privateDice.getMessage(), {
            business_connection_id: businessId
        });
    }
    else if (privateYesNo.isYesNoCommand(text)) {
        await bot.sendMessage(chatId, privateYesNo.getMessage(), {
            business_connection_id: businessId
        });
    }
    else if (privateTime.isTimeCommand(text)) {
        await bot.sendMessage(chatId, privateTime.getMessage(), {
            business_connection_id: businessId
        });
    }
    else if (privateDate.isDateCommand(text)) {
        await bot.sendMessage(chatId, privateDate.getMessage(), {
            business_connection_id: businessId
        });
    }
    else if (privateTranslate.isTranslateCommand(text)) {
        const translateMessage = await privateTranslate.getMessage(text);
        await bot.sendMessage(chatId, translateMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateNews.isNewsCommand(text)) {
        const newsMessage = await privateNews.getMessage();
        await bot.sendMessage(chatId, newsMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateCrypto.isCryptoCommand(text)) {
        const cryptoMessage = await privateCrypto.getMessage(text);
        await bot.sendMessage(chatId, cryptoMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateUsd.isUsdCommand(text)) {
        const usdMessage = await privateUsd.getMessage(text);
        await bot.sendMessage(chatId, usdMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateRemind.isRemindCommand(text)) {
        const remindMessage = await privateRemind.getMessage(text, chatId, bot, businessId);
        await bot.sendMessage(chatId, remindMessage, {
            business_connection_id: businessId
        });
    }
    else if (privateCalculator.isMathExpression(text)) {
        const result = privateCalculator.calculate(text);
        await bot.sendMessage(chatId, result, {
            business_connection_id: businessId
        });
    }
}

module.exports = { init };
