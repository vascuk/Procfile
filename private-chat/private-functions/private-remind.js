const reminders = new Map();
let bot;

function isRemindCommand(text) {
    const commands = [
        '/remind', 'remind',
        '/нагадай', 'нагадай',
        '/Нагадай', 'Нагадай',
        '/НАГАДАЙ', 'НАГАДАЙ',
        '/rem', 'rem',
        '/нагадування', 'нагадування',
        '/Нагадування', 'Нагадування',
        '/НАГАДУВАННЯ', 'НАГАДУВАННЯ'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function parseTime(text) {
    const parts = text.split(' ');
    
    if (parts.length < 3) {
        return null;
    }
    
    const timePattern = /^(\d{1,2}):(\d{2})$/;
    const match = parts[1].match(timePattern);
    
    if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
            const now = new Date();
            const remindTime = new Date();
            remindTime.setHours(hours, minutes, 0, 0);
            
            if (remindTime < now) {
                remindTime.setDate(remindTime.getDate() + 1);
            }
            
            const message = parts.slice(2).join(' ');
            return { time: remindTime, message, type: 'exact' };
        }
    }
    
    const number = parseInt(parts[1]);
    if (!isNaN(number) && parts[2]) {
        let multiplier = 60000;
        const unit = parts[2].toLowerCase();
        
        if (unit.includes('хвил') || unit.includes('min') || unit === 'хв' || unit === 'хвилина' || unit === 'хвилини' || unit === 'хвилин') {
            multiplier = 60000;
        } else if (unit.includes('годин') || unit.includes('hour') || unit === 'год' || unit === 'година' || unit === 'години' || unit === 'годин') {
            multiplier = 3600000;
        } else if (unit.includes('секунд') || unit.includes('sec') || unit === 'сек' || unit === 'секунда' || unit === 'секунди' || unit === 'секунд') {
            multiplier = 1000;
        }
        
        const time = new Date(Date.now() + number * multiplier);
        const message = parts.slice(3).join(' ');
        return { time, message, type: 'relative' };
    }
    
    return null;
}

function setReminder(chatId, time, message, businessId) {
    const now = Date.now();
    const delay = time.getTime() - now;
    
    if (delay <= 0) return false;
    
    const reminderId = Date.now().toString();
    
    const timeout = setTimeout(() => {
        bot.sendMessage(chatId, `⏰ НАГАДУВАННЯ\n\n${message}`, {
            business_connection_id: businessId
        });
        reminders.delete(reminderId);
    }, delay);
    
    reminders.set(reminderId, { timeout, chatId, businessId });
    
    return true;
}

function getHelpMessage() {
    return `⏰ НАГАДУВАННЯ

Встановлює нагадування на певний час або через проміжок часу.

Формати:
1. Точний час: HH:MM
2. Через проміжок: число + одиниця

Одиниці часу:
хвилин, хв, min
годин, год, hour
секунд, сек, sec

Приклади:
remind 14:30 Зателефонувати клієнту
нагадай 10 хвилин Перевірити пошту
/rem 2 години Зустріч
нагадування 30 сек Подивитись в вікно
remind 5 хв Випити води`;
}

async function getMessage(text, chatId, botInstance, businessId) {
    bot = botInstance;
    
    const parts = text.split(' ');
    
    if (parts.length === 1) {
        return getHelpMessage();
    }
    
    const parsed = parseTime(text);
    
    if (!parsed) {
        return `❌ Неправильний формат команди.\n\n${getHelpMessage()}`;
    }
    
    const success = setReminder(chatId, parsed.time, parsed.message, businessId);
    
    if (!success) {
        return '❌ Час має бути в майбутньому.';
    }
    
    const timeStr = parsed.time.toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const dateStr = parsed.time.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long'
    });
    
    const today = new Date();
    const isToday = parsed.time.getDate() === today.getDate() && 
                    parsed.time.getMonth() === today.getMonth() && 
                    parsed.time.getFullYear() === today.getFullYear();
    
    if (isToday) {
        return `✅ Нагадування встановлено на сьогодні о ${timeStr}`;
    } else {
        return `✅ Нагадування встановлено на ${dateStr} о ${timeStr}`;
    }
}

module.exports = {
    isRemindCommand,
    getMessage
};