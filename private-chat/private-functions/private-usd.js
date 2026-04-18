const axios = require('axios');

function isUsdCommand(text) {
    if (!text) return false;
    
    const commands = [
        '/usd', 'usd',
        '/dollar', 'dollar',
        '/долар', 'долар',
        '/Долар', 'Долар',
        '/ДОЛАР', 'ДОЛАР',
        '/курс', 'курс',
        '/Курс', 'Курс',
        '/КУРС', 'КУРС',
        '/currency', 'currency',
        '/валюта', 'валюта',
        '/Валюта', 'Валюта',
        '/ВАЛЮТА', 'ВАЛЮТА'
    ];
    
    const firstWord = text.split(' ')[0].toLowerCase();
    return commands.some(cmd => cmd.toLowerCase() === firstWord);
}

async function getExchangeRate(from, to) {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        return response.data.rates[to];
    } catch (error) {
        return null;
    }
}

function getHelpMessage() {
    return `💱 КУРСИ ВАЛЮТ

Показує актуальні курси валют.

Без параметрів - ця підказка
З параметром - курс конкретної валюти

Доступні валюти:
USD - Долар США
EUR - Євро
PLN - Польський злотий
GBP - Британський фунт
CHF - Швейцарський франк
CZK - Чеська крона

Приклади:
курс usd
валюта eur
/currency pln`;
}

async function getMessage(text) {
    if (!text) {
        return getHelpMessage();
    }
    
    const parts = text.split(' ');
    const currency = parts.length > 1 ? parts[1].toUpperCase() : null;
    
    const currencies = ['USD', 'EUR', 'PLN', 'GBP', 'CHF', 'CZK'];
    const currencyNames = {
        'USD': 'Долар США',
        'EUR': 'Євро',
        'PLN': 'Польський злотий',
        'GBP': 'Британський фунт',
        'CHF': 'Швейцарський франк',
        'CZK': 'Чеська крона'
    };
    
    if (!currency) {
        return getHelpMessage();
    }
    
    if (!currencies.includes(currency)) {
        return `❌ Валюта "${currency}" не знайдена.\n\n${getHelpMessage()}`;
    }
    
    const rate = await getExchangeRate(currency, 'UAH');
    
    if (!rate) {
        return `❌ Не вдалося отримати курс для ${currency}. Спробуйте пізніше.`;
    }
    
    return `💱 ${currency} (${currencyNames[currency]})

Курс: ${rate.toFixed(2)} ₴

🕐 Оновлено: ${new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}`;
}

module.exports = {
    isUsdCommand,
    getMessage
};