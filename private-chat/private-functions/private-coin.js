function isCoinCommand(text) {
    const commands = [
        '/coin', 'coin',
        '/монета', 'монета',
        '/Монета', 'Монета',
        '/МОНЕТА', 'МОНЕТА',
        '/орел', 'орел',
        '/Орел', 'Орел',
        '/ОРЕЛ', 'ОРЕЛ',
        '/решка', 'решка',
        '/Решка', 'Решка',
        '/РЕШКА', 'РЕШКА'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function getMessage() {
    const result = Math.random() < 0.5 ? 'Орел' : 'Решка';
    const emoji = result === 'Орел' ? '🦅' : '👑';
    return `${emoji} Випа${result === 'Орел' ? 'в' : 'ла'}: ${result}`;
}

module.exports = {
    isCoinCommand,
    getMessage
};