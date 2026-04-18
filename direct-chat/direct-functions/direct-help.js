function isHelpCommand(text) {
    const commands = ['/help', '/хелп', '/Хелп', '/ХЕЛП', '/допомога', '/Допомога', '/ДОПОМОГА', 'help', 'хелп', 'Хелп', 'ХЕЛП', 'допомога', 'Допомога', 'ДОПОМОГА'];
    return commands.includes(text);
}

function isGamesCommand(text) {
    const commands = ['/games', '/ігри', '/Ігри', '/ІГРИ', 'games', 'ігри', 'Ігри', 'ІГРИ', '/game', 'game', '/гра', 'гра'];
    return commands.includes(text);
}

function getHelpMessage() {
    return `📋 <b>ОСНОВНІ КОМАНДИ</b>

<b>СТАРТ</b>
<blockquote expandable>/start, start
/старт, старт
/Старт, Старт
/СТАРТ, СТАРТ</blockquote>
Привітання та початок роботи

<b>ДОПОМОГА</b>
<blockquote expandable>/help, help
/хелп, хелп
/Хелп, Хелп
/ХЕЛП, ХЕЛП
/допомога, допомога
/Допомога, Допомога
/ДОПОМОГА, ДОПОМОГА</blockquote>
Показати список команд

<b>ІГРИ</b>
<blockquote expandable>/games, games
/ігри, ігри
/Ігри, Ігри
/ІГРИ, ІГРИ
/game, game
/гра, гра</blockquote>
Показати ігри та розваги

<b>ПОГОДА</b>
<blockquote expandable>/weather, weather
/погода, погода
/Погода, Погода
/ПОГОДА, ПОГОДА</blockquote>
Погода в будь-якому місті

<b>КАЛЬКУЛЯТОР</b>
<blockquote expandable>/calc, calc
/кальк, кальк
/Кальк, Кальк
/КАЛЬК, КАЛЬК
/калькулятор, калькулятор
/Калькулятор, Калькулятор
/КАЛЬКУЛЯТОР, КАЛЬКУЛЯТОР
/обчисли, обчисли
/Обчисли, Обчисли
/ОБЧИСЛИ, ОБЧИСЛИ</blockquote>
Обчислення математичних виразів

<b>ПЕРЕКЛАД</b>
<blockquote expandable>/translate, translate
/переклад, переклад
/Переклад, Переклад
/ПЕРЕКЛАД, ПЕРЕКЛАД
/trans, trans</blockquote>
Переклад з української на інші мови

<b>НОВИНИ</b>
<blockquote expandable>/news, news
/новини, новини
/Новини, Новини
/НОВИНИ, НОВИНИ</blockquote>
Останні новини України

<b>КРИПТОВАЛЮТИ</b>
<blockquote expandable>/crypto, crypto
/крипта, крипта
/Крипта, Крипта
/КРИПТА, КРИПТА</blockquote>
Курси криптовалют

<b>ВАЛЮТИ</b>
<blockquote expandable>/usd, usd
/dollar, dollar
/долар, долар
/Долар, Долар
/ДОЛАР, ДОЛАР
/курс, курс
/Курс, Курс
/КУРС, КУРС
/currency, currency
/валюта, валюта
/Валюта, Валюта
/ВАЛЮТА, ВАЛЮТА</blockquote>
Курси валют до гривні

<b>ЧАС</b>
<blockquote expandable>/time, time
/час, час
/Час, Час
/ЧАС, ЧАС
/година, година
/Година, Година
/ГОДИНА, ГОДИНА</blockquote>
Поточний час

<b>ДАТА</b>
<blockquote expandable>/date, date
/дата, дата
/Дата, Дата
/ДАТА, ДАТА
/сьогодні, сьогодні
/Сьогодні, Сьогодні
/СЬОГОДНІ, СЬОГОДНІ</blockquote>
Поточна дата

<b>НАГАДУВАННЯ</b>
<blockquote expandable>/remind, remind
/нагадай, нагадай
/Нагадай, Нагадай
/НАГАДАЙ, НАГАДАЙ
/нагадування, нагадування
/Нагадування, Нагадування
/НАГАДУВАННЯ, НАГАДУВАННЯ
/rem, rem</blockquote>
Встановити нагадування`;
}

function getGamesMessage() {
    return `🎲 <b>ІГРИ ТА РОЗВАГИ</b>

<b>РАНДОМ</b>
<blockquote expandable>/random, random
/рандом, рандом
/Рандом, Рандом
/РАНДОМ, РАНДОМ
/випадкове, випадкове
/Випадкове, Випадкове
/ВИПАДКОВЕ, ВИПАДКОВЕ</blockquote>
Генерує випадкове число

<b>МОНЕТА</b>
<blockquote expandable>/coin, coin
/монета, монета
/Монета, Монета
/МОНЕТА, МОНЕТА
/орел, орел
/Орел, Орел
/ОРЕЛ, ОРЕЛ
/решка, решка
/Решка, Решка
/РЕШКА, РЕШКА</blockquote>
Підкидає монетку (орел/решка)

<b>КУБИК</b>
<blockquote expandable>/dice, dice
/кубик, кубик
/Кубик, Кубик
/КУБИК, КУБИК
/кістка, кістка
/Кістка, Кістка
/КІСТКА, КІСТКА</blockquote>
Кидає кубик (1-6)

<b>ТАК/НІ</b>
<blockquote expandable>/yesno, yesno
/такні, такні
/Такні, Такні
/ТАКНІ, ТАКНІ
/питання, питання
/Питання, Питання
/ПИТАННЯ, ПИТАННЯ</blockquote>
Відповідає Так або Ні на питання`;
}

module.exports = { 
    isHelpCommand, 
    isGamesCommand,
    getHelpMessage, 
    getGamesMessage 
};