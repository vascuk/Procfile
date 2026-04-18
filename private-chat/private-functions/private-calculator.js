const { evaluate } = require('mathjs');

function isCalculatorCommand(text) {
    const commands = [
        '/calc', 'calc',
        '/кальк', 'кальк',
        '/Кальк', 'Кальк',
        '/КАЛЬК', 'КАЛЬК',
        '/калькулятор', 'калькулятор',
        '/Калькулятор', 'Калькулятор',
        '/КАЛЬКУЛЯТОР', 'КАЛЬКУЛЯТОР',
        '/обчисли', 'обчисли',
        '/Обчисли', 'Обчисли',
        '/ОБЧИСЛИ', 'ОБЧИСЛИ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function isMathExpression(text) {
    const mathRegex = /^[\d\s+\-*/^().,]+$/;
    const hasOperations = /[+\-*/^()]/;
    return mathRegex.test(text) && hasOperations.test(text);
}

function extractExpression(text) {
    if (isCalculatorCommand(text)) {
        const parts = text.split(' ');
        if (parts.length > 1) {
            return parts.slice(1).join(' ');
        }
        return null;
    }
    return text;
}

function calculate(expression) {
    try {
        const result = evaluate(expression.trim());
        return `🧮 ${expression} = ${result}`;
    } catch (error) {
        return `❌ Помилка в обчисленні`;
    }
}

function getHelpMessage() {
    return `🧮 КАЛЬКУЛЯТОР

Команди:
/calc, calc
/кальк, кальк
/Кальк, Кальк
/КАЛЬК, КАЛЬК
/калькулятор, калькулятор
/Калькулятор, Калькулятор
/КАЛЬКУЛЯТОР, КАЛЬКУЛЯТОР
/обчисли, обчисли
/Обчисли, Обчисли
/ОБЧИСЛИ, ОБЧИСЛИ

Приклади:
calc 2+2
кальк 3+5*(5+7)*6
обчисли 10/3

Або просто напиши вираз:
3+5*(5+7)*6`;
}

module.exports = {
    isCalculatorCommand,
    isMathExpression,
    extractExpression,
    calculate,
    getHelpMessage
};