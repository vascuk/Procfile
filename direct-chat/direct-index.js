const directStart = require("./direct-functions/direct-start");
const directHelp = require("./direct-functions/direct-help");
const directCalculator = require("./direct-functions/direct-calculator");
const directWeather = require("./direct-functions/direct-weather");
const directRandom = require("./direct-functions/direct-random");
const directCoin = require("./direct-functions/direct-coin");
const directDice = require("./direct-functions/direct-dice");
const directYesNo = require("./direct-functions/direct-yesno");
const directTime = require("./direct-functions/direct-time");
const directDate = require("./direct-functions/direct-date");
const directTranslate = require("./direct-functions/direct-translate");
const directNews = require("./direct-functions/direct-news");
const directCrypto = require("./direct-functions/direct-crypto");
const directUsd = require("./direct-functions/direct-usd");
const directRemind = require("./direct-functions/direct-remind");

let bot;

function init(botInstance) {
  bot = botInstance;

  bot.on("message", handleMessage);

  console.log("📱 Direct-chat завантажено");
}

function handleStart(msg) {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "користувач";
  bot.sendMessage(chatId, directStart.getMessage(firstName));
}

function handleHelp(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directHelp.getHelpMessage(), { parse_mode: "HTML" });
}

function handleGames(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directHelp.getGamesMessage(), { parse_mode: "HTML" });
}

function handleCalculator(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  const expression = directCalculator.extractExpression(text);

  if (expression) {
    const result = directCalculator.calculate(expression);
    bot.sendMessage(chatId, result);
  } else {
    bot.sendMessage(chatId, directCalculator.getHelpMessage());
  }
}

async function handleWeather(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  const city = directWeather.extractCity(text);
  const weatherMessage = await directWeather.getWeatherMessage(city);
  bot.sendMessage(chatId, weatherMessage);
}

function handleRandom(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  bot.sendMessage(chatId, directRandom.getMessage(text));
}

function handleCoin(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directCoin.getMessage());
}

function handleDice(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directDice.getMessage());
}

function handleYesNo(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directYesNo.getMessage());
}

function handleTime(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directTime.getMessage());
}

function handleDate(msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, directDate.getMessage());
}

async function handleTranslate(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const translateMessage = await directTranslate.getMessage(text);
  bot.sendMessage(chatId, translateMessage);
}

async function handleNews(msg) {
  const chatId = msg.chat.id;
  const newsMessage = await directNews.getMessage();
  bot.sendMessage(chatId, newsMessage);
}

async function handleCrypto(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const cryptoMessage = await directCrypto.getMessage(text);
  bot.sendMessage(chatId, cryptoMessage);
}

async function handleUsd(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const usdMessage = await directUsd.getMessage(text);
  bot.sendMessage(chatId, usdMessage);
}

function handleRemind(msg) {
  const chatId = msg.chat.id;
  const text = msg.text;
  const remindMessage = directRemind.getMessage(text, chatId, bot);
  bot.sendMessage(chatId, remindMessage);
}

function handleMessage(msg) {
  const text = msg.text;
  if (!text) return;

  if (directStart.isStartCommand(text)) {
    handleStart(msg);
  } else if (directHelp.isHelpCommand(text)) {
    handleHelp(msg);
  } else if (directHelp.isGamesCommand(text)) {
    handleGames(msg);
  } else if (directCalculator.isCalculatorCommand(text)) {
    handleCalculator(msg);
  } else if (directWeather.isWeatherCommand(text)) {
    handleWeather(msg);
  } else if (directRandom.isRandomCommand(text)) {
    handleRandom(msg);
  } else if (directCoin.isCoinCommand(text)) {
    handleCoin(msg);
  } else if (directDice.isDiceCommand(text)) {
    handleDice(msg);
  } else if (directYesNo.isYesNoCommand(text)) {
    handleYesNo(msg);
  } else if (directTime.isTimeCommand(text)) {
    handleTime(msg);
  } else if (directDate.isDateCommand(text)) {
    handleDate(msg);
  } else if (directTranslate.isTranslateCommand(text)) {
    handleTranslate(msg);
  } else if (directNews.isNewsCommand(text)) {
    handleNews(msg);
  } else if (directCrypto.isCryptoCommand(text)) {
    handleCrypto(msg);
  } else if (directUsd.isUsdCommand(text)) {
    handleUsd(msg);
  } else if (directRemind.isRemindCommand(text)) {
    handleRemind(msg);
  } else if (directCalculator.isMathExpression(text)) {
    const result = directCalculator.calculate(text);
    bot.sendMessage(msg.chat.id, result);
  }
}

module.exports = { init };
