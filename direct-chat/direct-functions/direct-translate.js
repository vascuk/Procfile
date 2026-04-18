const axios = require('axios');

function isTranslateCommand(text) {
    const commands = [
        '/translate', 'translate',
        '/переклад', 'переклад',
        '/Переклад', 'Переклад',
        '/ПЕРЕКЛАД', 'ПЕРЕКЛАД',
        '/trans', 'trans',
        '/транс', 'транс'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function extractParams(text) {
    const parts = text.split(' ');
    if (parts.length < 3) {
        return null;
    }
    
    const targetLang = parts[1].toLowerCase();
    const textToTranslate = parts.slice(2).join(' ');
    
    return { targetLang, textToTranslate };
}

async function translateText(text, targetLang) {
    try {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: {
                q: text,
                langpair: `uk|${targetLang}`
            }
        });
        
        if (response.data && response.data.responseData) {
            return response.data.responseData.translatedText;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function getHelpMessage() {
    return `🌍 ПЕРЕКЛАД

Перекладає текст з української на вказану мову.

Формат:
переклад [код мови] [текст]

Коди мов:
en - англійська
pl - польська
de - німецька
fr - французька
es - іспанська
it - італійська
ru - російська
uk - українська
cs - чеська
sk - словацька
hu - угорська
ro - румунська
tr - турецька
zh - китайська
ja - японська
ko - корейська
ar - арабська

Приклади:
переклад en Привіт, як справи?
/translate pl Добрий день
trans de Як тебе звати?
/переклад es Я люблю програмувати`;
}

async function getMessage(text) {
    const parts = text.split(' ');
    
    if (parts.length === 1) {
        return getHelpMessage();
    }
    
    const params = extractParams(text);
    
    if (!params) {
        return `❌ Неправильний формат команди.\n\n${getHelpMessage()}`;
    }
    
    const translated = await translateText(params.textToTranslate, params.targetLang);
    
    if (!translated) {
        return `❌ Помилка перекладу. Перевірте код мови та спробуйте ще раз.\n\n${getHelpMessage()}`;
    }
    
    const langNames = {
        'en': 'Англійська',
        'pl': 'Польська',
        'de': 'Німецька',
        'fr': 'Французька',
        'es': 'Іспанська',
        'it': 'Італійська',
        'ru': 'Російська',
        'uk': 'Українська',
        'cs': 'Чеська',
        'sk': 'Словацька',
        'hu': 'Угорська',
        'ro': 'Румунська',
        'tr': 'Турецька',
        'zh': 'Китайська',
        'ja': 'Японська',
        'ko': 'Корейська',
        'ar': 'Арабська'
    };
    
    const langName = langNames[params.targetLang] || params.targetLang.toUpperCase();
    
    return `🌍 Переклад (${langName}):

${translated}`;
}

module.exports = {
    isTranslateCommand,
    getMessage
};