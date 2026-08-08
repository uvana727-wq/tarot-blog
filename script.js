let hasDrawn = false;

// 22 Старших Аркана
const majorArcanaData = [
    { name: "0. Шут", icon: "🎒", gen: "Начало нового пути, чистый лист и отсутствие страхов.", love: "Спонтанные чувства, флирт, искренность.", work: "Креативный проект, смелый риск.", fut: "Неожиданный поворот судьбы. Доверьтесь жизни." },
    { name: "I. Маг", icon: "🪄", gen: "Мастерство, воля, умение воплощать мечты.", love: "Лидерство в союзе, сильное притяжение.", work: "Успех в переговорах, новое дело.", fut: "Благоприятное время для решительных шагов." },
    { name: "II. Жрица", icon: "🌙", gen: "Интуиция, тайны, глубинная мудрость.", love: "Скрытые чувства, духовная связь.", work: "Время наблюдать, а не действовать.", fut: "Доверяйте только своему внутреннему голосу." },
    { name: "III. Императрица", icon: "👑", gen: "Изобилие, процветание, забота.", love: "Гармония, теплота, создание семьи.", work: "Успешный рост и стабильный доход.", fut: "Плодотворный период во всех делах." },
    { name: "IV. Император", icon: "🏛️", gen: "Порядок, дисциплина, авторитет.", love: "Стабильный, надежный союз.", work: "Укрепление позиций, руководство.", fut: "Ситуация под вашим полным контролем." },
    { name: "V. Иерофант", icon: "📜", gen: "Традиции, обучение, мораль.", love: "Серьезные обязательства, брак.", work: "Обучение, работа по правилам.", fut: "Следуйте проверенным советам." },
    { name: "VI. Влюбленные", icon: "💖", gen: "Выбор сердца, союз, доверие.", love: "Искренняя любовь, важный выбор.", work: "Выгодное партнерство.", fut: "Сделайте выбор, опираясь на чувства." },
    { name: "VII. Колесница", icon: "⚔️", gen: "Победа, прорыв, движение.", love: "Совместные поездки, преодоление преград.", work: "Быстрый карьерный рост.", fut: "Вы преодолеете любые препятствия." },
    { name: "VIII. Сила", icon: "🦁", gen: "Терпение, стойкость, мягкая сила.", love: "Страсть, умение прощать.", work: "Упорство приведет к победе.", fut: "Проявите выдержку и доброту." },
    { name: "IX. Отшельник", icon: "🕯️", gen: "Поиск истины, пауза, мудрость.", love: "Период осмысления отношений.", work: "Самостоятельный глубокий анализ.", fut: "Полезное время для уединения." },
    { name: "X. Колесо Фортуны", icon: "🎡", gen: "Перемены, удача, судьба.", love: "Неожиданная судьбоносная встреча.", work: "Новый успешный виток.", fut: "Фортуна поворачивается к вам." },
    { name: "XI. Справедливость", icon: "⚖️", gen: "Честность, баланс, закон.", love: "Равноправие, честный разговор.", work: "Официальные сделки, договоры.", fut: "Справедливое разрешение дела." },
    { name: "XII. Повешенный", icon: "🧘", gen: "Новый взгляд, пауза, переоценка.", love: "Необходимость уступок.", work: "Задержка дел для подготовки.", fut: "Посмотрите на вопрос под другим углом." },
    { name: "XIII. Смерть", icon: "🦋", gen: "Завершение старого, трансформация.", love: "Прощание с прошлым, обновление.", work: "Смена работы или формата.", fut: "Конец одного этапа и начало нового." },
    { name: "XIV. Умеренность", icon: "🍷", gen: "Баланс, спокойствие, мера.", love: "Тихое счастье, компромиссы.", work: "Стабильный рабочий ритм.", fut: "Все наладится гармонично." },
    { name: "XV. Дьявол", icon: "🔗", gen: "Соблазны, привязанности.", love: "Страсть, сильная привязанность.", work: "Заманчивые, но рискованные схемы.", fut: "Остерегайтесь манипуляций." },
    { name: "XVI. Башня", icon: "⚡", gen: "Внезапные перемены, прозрение.", love: "Вспышка эмоций, прояснение.", work: "Смена планов, перестройка.", fut: "Разрушение иллюзий освободит путь." },
    { name: "XVII. Звезда", icon: "⭐", gen: "Надежда, вдохновение, исцеление.", love: "Мечты о совместном будущем.", work: "Перспективные проекты.", fut: "Ваша мечта скоро осуществится." },
    { name: "XVIII. Луна", icon: "🌊", gen: "Интуиция, таинственность.", love: "Неопределенность, туман.", work: "Проверяйте входящую информацию.", fut: "Доверяйте чувственному восприятию." },
    { name: "XIX. Солнце", icon: "☀️", gen: "Радость, триумф, успех.", love: "Искреннее счастье, тепло.", work: "Признание и отличный доход.", fut: "Вас ждет яркая и успешная полоса." },
    { name: "XX. Суд", icon: "🎺", gen: "Пробуждение, перемены, итог.", love: "Прощение, переход на новый уровень.", work: "Важное решение, призвание.", fut: "Время важных положительных изменений." },
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
    { r: "Двойка", gen: "Выбор, баланс двух сторон.", love: "Диалог, поиск компромисса.", work: "Планирование и партнёрство.", fut: "Взвесьте все варианты." },
    { r: "Тройка", gen: "Первый результат и рост.", love: "Развитие отношений, радость.", work: "Успешные первые шаги.", fut: "Перспективы расширяются." },
    { r: "Четверка", gen: "Стабильность и отдых.", love: "Прочный уют, уверенность.", work: "Закрепление позиций.", fut: "Надежный и спокойный период." },
    { r: "Пятерка", gen: "Соревнование, проверка сил.", love: "Преодоление небольших разногласий.", work: "Конкуренция, поиск решения.", fut: "Опыт сделает вас сильнее." },
    { r: "Шестерка", gen: "Успех, гармония, помощь.", love: "Взаимная забота, радость.", work: "Признание заслуг.", fut: "Удачный поворот дел." },
    { r: "Семерка", gen: "Стратегия, отстаивание позиций.", love: "Защита своих границ.", work: "Терпение и расчет.", fut: "Проявите настойчивость." },
    { r: "Восьмерка", gen: "Скорость, мастерство, ход дел.", love: "Быстрое развитие событий.", work: "Повышение навыков.", fut: "События ускорятся." },
    { r: "Девятка", gen: "Почти финиш, ресурсность.", love: "Самодостаточность, комфорт.", work: "Уверенное завершение.", fut: "Вы у самой цели." },
    { r: "Десятка", gen: "Завершение цикла, изобилие.", love: "Семейное счастье и покой.", work: "Полный результат труда.", fut: "Успешный финал этапа." },
    { r: "Паж", gen: "Шанс, известие, учеба.", love: "Приятное сообщение, флирт.", work: "Новые знания, предложение.", fut: "Ждите хороших новостей." },
    { r: "Рыцарь", gen: "Движение, активность, драйв.", love: "Яркие поступки, романтика.", work: "Командировка, прорыв.", fut: "Время действовать решительно." },
    { r: "Королева", gen: "Мудрость, опыт, поддержка.", love: "Душевная теплота, забота.", work: "Уверенное управление.", fut: "Доверяйте своему опыту." },
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

    const currentReading = {
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

function clearHistory() {
    localStorage.removeItem('tarotHistory');
    renderHistory();
}

window.onload = function() {
    initDailyCard();
    renderHistory();
};
