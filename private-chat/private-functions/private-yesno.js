function isYesNoCommand(text) {
    const commands = [
        '/yesno', 'yesno',
        '/такні', 'такні',
        '/Такні', 'Такні',
        '/ТАКНІ', 'ТАКНІ',
        '/питання', 'питання',
        '/Питання', 'Питання',
        '/ПИТАННЯ', 'ПИТАННЯ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function getMessage() {
    const answers = ['Так', 'Ні', 'Можливо', 'Точно так', 'Точно ні', 'Не зараз', 'Спитай пізніше', 'Без сумніву', 'Навряд чи', 'Звісно'];
    const emojis = ['✅', '❌', '🤔', '✅', '❌', '⏳', '🕐', '✅', '❌', '✅'];
    const index = Math.floor(Math.random() * answers.length);
    return `${emojis[index]} Відповідь: ${answers[index]}`;
}

module.exports = {
    isYesNoCommand,
    getMessage
};