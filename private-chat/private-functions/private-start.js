function isStartCommand(text) {
    const commands = ['/start', '/старт', '/Старт', '/СТАРТ', 'start', 'старт', 'Старт', 'СТАРТ'];
    return commands.includes(text);
}

function getMessage(firstName) {
    return `👋 Вітаю, ${firstName}!

Напиши /help для перегляду команд`;
}

module.exports = { isStartCommand, getMessage };