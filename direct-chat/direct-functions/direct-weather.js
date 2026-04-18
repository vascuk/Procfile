const axios = require('axios');
const config = require('../../config');

function isWeatherCommand(text) {
    const commands = [
        '/weather', 'weather',
        '/погода', 'погода',
        '/Погода', 'Погода',
        '/ПОГОДА', 'ПОГОДА'
    ];
    
    const firstWord = text.split(' ')[0];
    return commands.includes(firstWord);
}

function extractCity(text) {
    const parts = text.split(' ');
    if (parts.length > 1) {
        return parts.slice(1).join(' ');
    }
    return null;
}

async function getCoordinates(cityName) {
    try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: {
                name: cityName,
                count: 1,
                language: 'uk',
                format: 'json'
            }
        });
        
        if (response.data.results && response.data.results.length > 0) {
            const result = response.data.results[0];
            return {
                latitude: result.latitude,
                longitude: result.longitude,
                name: result.name,
                country: result.country
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

async function getWeather(latitude, longitude) {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: latitude,
                longitude: longitude,
                current: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m'],
                timezone: 'auto'
            }
        });
        
        return response.data.current;
    } catch (error) {
        return null;
    }
}

function getWeatherDescription(code) {
    const codes = {
        0: '☀️ Ясно',
        1: '🌤 Переважно ясно',
        2: '⛅ Мінлива хмарність',
        3: '☁️ Хмарно',
        45: '🌫 Туман',
        48: '🌫 Іній',
        51: '🌧 Легка мряка',
        53: '🌧 Помірна мряка',
        55: '🌧 Сильна мряка',
        56: '🌧 Льодяна мряка',
        57: '🌧 Сильна льодяна мряка',
        61: '🌧 Легкий дощ',
        63: '🌧 Помірний дощ',
        65: '🌧 Сильний дощ',
        66: '🌧 Льодяний дощ',
        67: '🌧 Сильний льодяний дощ',
        71: '🌨 Легкий сніг',
        73: '🌨 Помірний сніг',
        75: '🌨 Сильний сніг',
        77: '🌨 Сніжні зерна',
        80: '🌦 Короткочасний дощ',
        81: '🌦 Помірний дощ',
        82: '🌦 Сильний дощ',
        85: '🌨 Короткочасний сніг',
        86: '🌨 Сильний сніг',
        95: '⛈ Гроза',
        96: '⛈ Гроза з градом',
        99: '⛈ Сильна гроза'
    };
    
    return codes[code] || 'Невідомо';
}

async function getWeatherMessage(cityName) {
    if (!cityName) {
        const weather = await getWeather(config.NOVOVOLYNSK.latitude, config.NOVOVOLYNSK.longitude);
        if (!weather) {
            return '❌ Помилка отримання погоди';
        }
        
        const description = getWeatherDescription(weather.weather_code);
        const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
        
        return `🌍 ПОГОДА В НОВОВОЛИНСЬКУ

🌡 Температура: ${weather.temperature_2m}°C
💧 Вологість: ${weather.relative_humidity_2m}%
🌬 Вітер: ${weather.wind_speed_10m} км/год
📊 Стан: ${description}

🕐 Оновлено: ${time}`;
    }
    
    const coords = await getCoordinates(cityName);
    if (!coords) {
        // Замінити рядок помилки на цей:
return `❌ Місто "${cityName}" не знайдено

Приклади правильних назв:
Володимир, Луцьк, Нововолинськ, Львів, Київ

Приклад команди:
погода Луцьк`;
    }
    
    const weather = await getWeather(coords.latitude, coords.longitude);
    if (!weather) {
        return '❌ Помилка отримання погоди';
    }
    
    const description = getWeatherDescription(weather.weather_code);
    const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    const location = coords.country ? `${coords.name}, ${coords.country}` : coords.name;
    
    return `🌍 ПОГОДА В ${location.toUpperCase()}

🌡 Температура: ${weather.temperature_2m}°C
💧 Вологість: ${weather.relative_humidity_2m}%
🌬 Вітер: ${weather.wind_speed_10m} км/год
📊 Стан: ${description}

🕐 Оновлено: ${time}`;
}

module.exports = {
    isWeatherCommand,
    extractCity,
    getWeatherMessage
};