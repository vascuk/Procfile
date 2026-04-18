function isDiceCommand(text) {
    const commands = [
        '/dice', 'dice',
        '/кубик', 'кубик',
        '/Кубик', 'Кубик',
        '/КУБИК', 'КУБИК',
        '/кістка', 'кістка',
        '/Кістка', 'Кістка',
        '/КІСТКА', 'КІСТКА'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function getMessage() {
    const result = Math.floor(Math.random() * 6) + 1;
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
    return `🎲 Випало: ${emojis[result - 1]} ${result}`;
}

module.exports = {
    isDiceCommand,
    getMessage
};