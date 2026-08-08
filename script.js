let hasDrawn = false;
let currentReading = null;

// 22 Старших Аркана
const majorArcanaData = [
    { name: "0. Шут", icon: "🎒", gen: "Начало нового пути, чистый лист и отсутствие страхов.", love: "Спонтанные чувства, флирт, искренность.", work: "Креативный проект, смелый риск.", fut: "Неожиданный поворот судьбы. Доверьтесь жизни." },
    { name: "I. Маг", icon: "🪄", gen: "Мастерство, воля, умение воплощать мечты.", love: "Лидерство в союзе, сильное притяжение.", work: "Успех в переговорах, новое дело.", fut: "Благоприятное время для решительных шагов." },
    { name: "II. Жрица", icon: "🌙", gen: "Интуиция, тайны, глубинная мудрость.", love: "Скрытые чувства, духовная связь.", work: "Время наблюдать, а не действовать.", fut: "Доверяйте только своему внутреннему голосу." },
    { name: "III. Императрица", icon: "👑", gen: "Изобилие, процветание, забота.", love: "Гармония, теплота, создание семьи.", work: "Успешный рост и стабильный доход.", fut: "Плодотворный период во всех делах." },
    { name: "IV. Император", icon: "🏛️", gen: "Порядок, дисциплина, авторитет.", love: "Стабильный, надежный союз.", work: "Укрепление позиций, руководство.", fut: "Ситуация под вашим полным контролем." },
    { name: "XVII. Звезда", icon: "⭐", gen: "Надежда, вдохновение, исцеление.", love: "Мечты о совместном будущем.", work: "Перспективные проекты.", fut: "Ваша мечта скоро осуществится." },
    { name: "XIX. Солнце", icon: "☀️", gen: "Радость, триумф, успех.", love: "Искреннее счастье, тепло.", work: "Признание и отличный доход.", fut: "Вас ждет яркая и успешная полоса." },
    { name: "XXI. Мир", icon: "🌍", gen: "Завершение, гармония, целостность.", love: "Полное взаимопонимание.", work: "Завершение крупного проекта.", fut: "Достижение главной цели." }
];

const suits = [
    { name: "Жезлов", icon: "🔥", theme: "энергия, действия, идеи" },
    { name: "Кубков", icon: "🏆", theme: "чувства, эмоции, отношения" },
    { name: "Мечей", icon: "🗡️", theme: "разум, мысли, решения" },
    { name: "Пентаклей", icon: "🪙", theme: "деньги, ресурсы, стабильность" }
];

const ranks = [
    { r: "Туз", gen: "Мощный импульс и новая возможность.", love: "Вспышка чувств и вдохновения.", work: "Отличный шанс для старта.", fut: "Открывается новая дверь." },
    { r: "Король", gen: "Авторитет, лидерство, успех.", love: "Надежное плечо, ответственность.", work: "Высокий статус, победа.", fut: "Стабильное и сильное положение." }
];

const full78Deck = [...majorArcanaData.map(c => ({
    name: c.name, icon: c.icon, general: c.gen, love: c.love, work: c.work, future: c.fut
}))];

suits.forEach(s => {
    ranks.forEach(r => {
        full78Deck.push({
            name: `${r.r} ${s.name}`,
            icon: s.icon,
            general: `${r.gen} Сфера: ${s.theme}.`,
            love: r.love,
            work: r.work,
            future: r.fut
        });
    });
});

function initDailyCard() {
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const cardIndex = dateSeed % majorArcanaData.length;
    const card = majorArcanaData[cardIndex];

    document.getElementById('dailyIcon').innerText = card.icon;
    document.getElementById('dailyTitle').innerText = card.name;
    document.getElementById('dailyDescription').innerText = card.gen;
}

function flipCard(cardNumber) {
    if (hasDrawn) return;
    hasDrawn = true;

    const cardContainer = document.querySelectorAll('.card-flip-container')[cardNumber - 1];
    const userQ = document.getElementById('userQuestion').value.trim();

    const randomIndex = Math.floor(Math.random() * full78Deck.length);
    const card = full78Deck[randomIndex];

    document.getElementById(`icon${cardNumber}`).innerText = card.icon;
    document.getElementById(`title${cardNumber}`).innerText = card.name;

    cardContainer.classList.add('flipped');

    document.getElementById('userQuestion').disabled = true;
    document.getElementById('reloadNote').style.display = 'block';

    currentReading = {
        question: userQ || "Без вопроса",
        cardName: card.name,
        cardIcon: card.icon,
        general: card.general,
        date: new Date().toLocaleDateString('ru-RU')
    };

    setTimeout(() => {
        const answerBox = document.getElementById('answerBox');
        const userQDisplay = document.getElementById('userQDisplay');
        const answerContent = document.getElementById('answerContent');

        if (userQ !== "") {
            userQDisplay.innerText = `Ваш вопрос: «${userQ}»`;
            userQDisplay.style.display = 'block';
        } else {
            userQDisplay.style.display = 'none';
        }

        answerContent.innerHTML = `
            <div class="sphere-block">
                <div class="sphere-title">✨ Общее значение:</div>
                <div>${card.general}</div>
            </div>
            <div class="sphere-block">
                <div class="sphere-title">❤️ В любви и отношениях:</div>
                <div>${card.love}</div>
            </div>
            <div class="sphere-block">
                <div class="sphere-title">💼 В карьере и финансах:</div>
                <div>${card.work}</div>
            </div>
            <div class="sphere-block">
                <div class="sphere-title">🔮 На будущее и совет:</div>
                <div>${card.future}</div>
            </div>
        `;

        document.getElementById('answerTitle').innerText = `Выпала карта №${cardNumber}: ${card.name}`;
        answerBox.style.display = 'block';

        saveToHistory(currentReading);
    }, 400);
}

// РАБОТА С ПАМЯТЬЮ (Local Storage)

function saveToHistory(item) {
    let history = JSON.parse(localStorage.getItem('tarotHistory')) || [];
    history.unshift(item);
    localStorage.setItem('tarotHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    let history = JSON.parse(localStorage.getItem('tarotHistory')) || [];
    const historyList = document.getElementById('historyList');

    if (history.length === 0) {
        historyList.innerHTML = `<p style="text-align: center; color: var(--text-muted);">История пока пуста.</p>`;
        return;
    }

    historyList.innerHTML = history.slice(0, 5).map(item => `
        <div class="history-item">
            <div class="history-item-title">${item.cardIcon} ${item.cardName} (${item.date})</div>
            <div class="history-item-q">Вопрос: "${item.question}"</div>
            <div style="font-size:0.85rem; margin-top:5px;">${item.general}</div>
        </div>
    `).join('');
}

function saveToFavorites() {
    if (!currentReading) return;
    let favs = JSON.parse(localStorage.getItem('tarotFavs')) || [];
    favs.unshift(currentReading);
    localStorage.setItem('tarotFavs', JSON.stringify(favs));
    renderFavorites();
    alert('⭐ Расклад сохранён в Любимые!');
}

function renderFavorites() {
    let favs = JSON.parse(localStorage.getItem('tarotFavs')) || [];
    const favsList = document.getElementById('favoritesList');

    if (favs.length === 0) {
        favsList.innerHTML = `<p style="text-align: center; color: var(--text-muted);">У вас пока нет сохранённых раскладов.</p>`;
        return;
    }

    favsList.innerHTML = favs.map(item => `
        <div class="history-item">
            <div class="history-item-title">${item.cardIcon} ${item.cardName} (${item.date})</div>
            <div class="history-item-q">Вопрос: "${item.question}"</div>
            <div style="font-size:0.85rem; margin-top:5px;">${item.general}</div>
        </div>
    `).join('');
}

function clearHistory() {
    localStorage.removeItem('tarotHistory');
    renderHistory();
}

window.onload = function() {
    initDailyCard();
    renderHistory();
    renderFavorites();
};
