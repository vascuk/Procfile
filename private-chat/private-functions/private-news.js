const axios = require('axios');

function isNewsCommand(text) {
    const commands = [
        '/news', 'news',
        '/новини', 'новини',
        '/Новини', 'Новини',
        '/НОВИНИ', 'НОВИНИ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

async function getNews() {
    try {
        const response = await axios.get('https://api.rss2json.com/v1/api.json', {
            params: {
                rss_url: 'https://www.pravda.com.ua/rss/'
            }
        });
        
        if (response.data && response.data.items) {
            return response.data.items.slice(0, 5);
        }
        return null;
    } catch (error) {
        return null;
    }
}

async function getMessage() {
    const news = await getNews();
    
    if (!news) {
        return '❌ Не вдалося отримати новини. Спробуйте пізніше.';
    }
    
    let message = '📰 ОСТАННІ НОВИНИ\n\n';
    
    news.forEach((item, index) => {
        const title = item.title.replace(/<\/?[^>]+(>|$)/g, '');
        message += `${index + 1}. ${title}\n`;
    });
    
    return message;
}

module.exports = {
    isNewsCommand,
    getMessage
};