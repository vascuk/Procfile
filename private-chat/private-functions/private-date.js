function isDateCommand(text) {
    const commands = [
        '/date', 'date',
        '/дата', 'дата',
        '/Дата', 'Дата',
        '/ДАТА', 'ДАТА',
        '/сьогодні', 'сьогодні',
        '/Сьогодні', 'Сьогодні',
        '/СЬОГОДНІ', 'СЬОГОДНІ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function getMessage() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        weekday: 'long'
    };
    const date = now.toLocaleDateString('uk-UA', options);
    return `📅 Сьогодні: ${date}`;
}

module.exports = {
    isDateCommand,
    getMessage
};