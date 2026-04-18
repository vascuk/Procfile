function isTimeCommand(text) {
    const commands = [
        '/time', 'time',
        '/час', 'час',
        '/Час', 'Час',
        '/ЧАС', 'ЧАС',
        '/година', 'година',
        '/Година', 'Година',
        '/ГОДИНА', 'ГОДИНА'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function getMessage() {
    const now = new Date();
    const time = now.toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    return `🕐 Поточний час: ${time}`;
}

module.exports = {
    isTimeCommand,
    getMessage
};