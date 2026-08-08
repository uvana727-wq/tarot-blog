let hasDrawn = false;

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

// Сборка всей колоды из 78 карт
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

// Карта дня
function initDailyCard() {
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const cardIndex = dateSeed % majorArcanaData.length;
    const card = majorArcanaData[cardIndex];

    document.getElementById('dailyIcon').innerText = card.icon;
    document.getElementById('dailyTitle').innerText = card.name;
    document.getElementById('dailyDescription').innerText = card.gen;
}

// 3D Переворот по клику
function flipCard(cardNumber) {
    if (hasDrawn) return;
    hasDrawn = true;

    const cardContainer = document.querySelectorAll('.card-flip-container')[cardNumber - 1];
    const userQ = document.getElementById('userQuestion').value.trim();

    // Случайная карта
    const randomIndex = Math.floor(Math.random() * full78Deck.length);
    const card = full78Deck[randomIndex];

    // Подставляем данные на обратную сторону
    document.getElementById(`icon${cardNumber}`).innerText = card.icon;
    document.getElementById(`title${cardNumber}`).innerText = card.name;

    // Переворачиваем карту с анимацией
    cardContainer.classList.add('flipped');

    // Блокируем ввод
    document.getElementById('userQuestion').disabled = true;
    document.getElementById('reloadNote').style.display = 'block';

    // Заполняем результат
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
    }, 400);
}

window.onload = initDailyCard;
