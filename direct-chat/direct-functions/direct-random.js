function isRandomCommand(text) {
    const commands = [
        '/random', 'random',
        '/рандом', 'рандом',
        '/Рандом', 'Рандом',
        '/РАНДОМ', 'РАНДОМ',
        '/випадкове', 'випадкове',
        '/Випадкове', 'Випадкове',
        '/ВИПАДКОВЕ', 'ВИПАДКОВЕ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function extractRange(text) {
    const parts = text.split(' ');
    if (parts.length >= 3) {
        const min = parseInt(parts[1]);
        const max = parseInt(parts[2]);
        if (!isNaN(min) && !isNaN(max) && min < max) {
            return { min, max };
        }
    }
    return null;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHelpMessage() {
    return `🎲 РАНДОМ

Генерує випадкове число.

Без параметрів - число від 1 до 100
З параметрами - число в заданому діапазоні

Приклади:
рандом
рандом 1 10
/random 50 200
випадкове 100 999`;
}

function getMessage(text) {
    const parts = text.split(' ');
    
    if (parts.length === 1) {
        return getHelpMessage();
    }
    
    const range = extractRange(text);
    
    if (range) {
        const number = getRandomNumber(range.min, range.max);
        return `🎲 Випадкове число від ${range.min} до ${range.max}: ${number}`;
    }
    
    return getHelpMessage();
}

module.exports = {
    isRandomCommand,
    getMessage
};