const axios = require('axios');

function isCryptoCommand(text) {
    const commands = [
        '/crypto', 'crypto',
        '/крипта', 'крипта',
        '/Крипта', 'Крипта',
        '/КРИПТА', 'КРИПТА'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function extractCoin(text) {
    const parts = text.split(' ');
    if (parts.length < 2) {
        return null;
    }
    return parts[1].toLowerCase();
}

async function getCryptoPrice(coin) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids: coin,
                vs_currencies: 'usd'
            }
        });
        
        if (response.data && response.data[coin]) {
            return response.data[coin].usd;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function getCryptoList() {
    return `📊 ДОСТУПНІ КРИПТОВАЛЮТИ

BTC - Bitcoin
ETH - Ethereum
USDT - Tether
BNB - Binance Coin
XRP - Ripple
ADA - Cardano
SOL - Solana
DOGE - Dogecoin
DOT - Polkadot
MATIC - Polygon
LTC - Litecoin
TRX - TRON
AVAX - Avalanche
LINK - Chainlink
UNI - Uniswap

Приклад:
crypto btc
крипта eth
/crypto sol`;
}

async function getMessage(text) {
    const coinMap = {
        'btc': 'bitcoin',
        'bitcoin': 'bitcoin',
        'eth': 'ethereum',
        'ethereum': 'ethereum',
        'usdt': 'tether',
        'tether': 'tether',
        'bnb': 'binancecoin',
        'binancecoin': 'binancecoin',
        'xrp': 'ripple',
        'ripple': 'ripple',
        'ada': 'cardano',
        'cardano': 'cardano',
        'sol': 'solana',
        'solana': 'solana',
        'doge': 'dogecoin',
        'dogecoin': 'dogecoin',
        'dot': 'polkadot',
        'polkadot': 'polkadot',
        'matic': 'matic-network',
        'polygon': 'matic-network',
        'ltc': 'litecoin',
        'litecoin': 'litecoin',
        'trx': 'tron',
        'tron': 'tron',
        'avax': 'avalanche-2',
        'avalanche': 'avalanche-2',
        'link': 'chainlink',
        'chainlink': 'chainlink',
        'uni': 'uniswap',
        'uniswap': 'uniswap'
    };
    
    const coin = extractCoin(text);
    
    if (!coin) {
        return getCryptoList();
    }
    
    const coinId = coinMap[coin];
    
    if (!coinId) {
        return `❌ Криптовалюта "${coin}" не знайдена.\n\n${getCryptoList()}`;
    }
    
    const price = await getCryptoPrice(coinId);
    
    if (!price) {
        return `❌ Не вдалося отримати курс для "${coin.toUpperCase()}". Спробуйте пізніше.`;
    }
    
    return `💰 ${coin.toUpperCase()} = $${price.toLocaleString('en-US')}`;
}

module.exports = {
    isCryptoCommand,
    getMessage
};