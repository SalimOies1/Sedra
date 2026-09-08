const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const noCaption = document.getElementById('noCaption');
 
const dodgeLines = [
    "أوپس شكلو صار غلط",
    "جربي كمان مرة",
    "بالله مو قادرة تكبسي زر؟",
    "اختاري قلبك شو يقلك",
    "عندك حرية الاختيار ترا",
    "خلااااص اختاري اي جواب بدك ياه"
];
 
let dodgeCount = 0;
 
function moveNoButton() {
    noBtn.classList.add('escaping');
 
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const margin = 20;
 
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
 
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
 
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
 
    noCaption.textContent = dodgeLines[Math.min(dodgeCount, dodgeLines.length - 1)];
    dodgeCount++;
}
 
noBtn.addEventListener('click', moveNoButton);
 
/* ================= مراجع الشاشات ================= */
 
const firstScreen = document.querySelector('.first');
const secondScreen = document.getElementById('secondScreen');
const thirdScreen = document.getElementById('thirdScreen');
const fourthScreen = document.getElementById('fourthScreen');
const fifthScreen = document.getElementById('fifthScreen');
 
yesBtn.addEventListener('click', () => {
    firstScreen.style.display = 'none';
    secondScreen.classList.add('show');
});
 
/* ================= شاشة 2: اختيار الوجهة + التأكيد ================= */
 
const optionButtons = document.querySelectorAll('.dest-card');
const choiceResult = document.getElementById('choiceResult');
const confirmBtn = document.getElementById('confirmBtn');
 
let selectedPlace = null;
 
optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        optionButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
 
        selectedPlace = btn.dataset.place;
        confirmBtn.style.display = 'inline-block';
        choiceResult.textContent = '';
        choiceResult.className = 'choice-result';
    });
});
 
confirmBtn.addEventListener('click', () => {
    if (selectedPlace === 'كولن') {
    choiceResult.textContent = 'للأسف مارح نروح كولن جربي غيرها';
    choiceResult.className = 'choice-result decline';
}
else if (selectedPlace === 'دوسلدورف') {
    choiceResult.textContent = 'حاس مو عبالي نروح دوسلدورف جربي غيرها';
    choiceResult.className = 'choice-result decline';
}
    else if (selectedPlace === 'هولندا') {
        choiceResult.textContent = 'يـيّي رايحين ع هولندا';
        choiceResult.className = 'choice-result success';
        setTimeout(() => {
            secondScreen.classList.remove('show');
            thirdScreen.classList.add('show');
        }, 1200);
    }
    else if (selectedPlace === 'فاجئيني') {
        choiceResult.textContent = 'مبروك، رايحين ع هولندا';
        choiceResult.className = 'choice-result success';
        setTimeout(() => {
            secondScreen.classList.remove('show');
            thirdScreen.classList.add('show');
        }, 1200);
    }
});
 
/* ================= شاشة 3: شو حابة نعمل ================= */
 
const activityButtons = document.querySelectorAll('.activity-card');
const activityResult = document.getElementById('activityResult');
const activityConfirmBtn = document.getElementById('activityConfirmBtn');
 
const surpriseActivities = [
    "نتمشى على البحر",
    "نطلع على قارب",
    "نروح على متحف",
    "نركب بسكليتات بشوارع امستردام"
];
 
let selectedActivity = null;
let selectedFinalActivity = null;
 
activityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        activityButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
 
        selectedActivity = btn.dataset.activity;
        activityConfirmBtn.style.display = 'inline-block';
        activityResult.textContent = '';
    });
});
 
activityConfirmBtn.addEventListener('click', () => {
    let finalActivity = selectedActivity;
 
    if (selectedActivity === 'فاجئيني') {
        finalActivity = surpriseActivities[Math.floor(Math.random() * surpriseActivities.length)];
    }
 
    selectedFinalActivity = finalActivity;
 
    activityResult.textContent = `يلا  ${finalActivity} `;
    activityResult.className = 'choice-result success';
 
    setTimeout(() => {
        thirdScreen.classList.remove('show');
        fourthScreen.classList.add('show');
    }, 1200);
});
 
/* ================= شاشة 4: شو ناكل (تنقل بالأسهم + حركة مرنة) ================= */
 
const foodData = [
    { food: "سوشي", emoji: "🍣" },
    { food: "بيتزا", emoji: "🍕" },
    { food: "برقر", emoji: "🍔" },
    { food: "شاورما", emoji: "🌯" },
    { food: "مطعم فخم", emoji: "🍷" },
    { food: "كل ما سبق", emoji: "😋" }
];
 
let foodIndex = 0;
 
const foodCard = document.getElementById('foodCard');
const foodEmoji = document.getElementById('foodEmoji');
const foodName = document.getElementById('foodName');
const foodDots = document.getElementById('foodDots');
const foodConfirmBtn = document.getElementById('foodConfirmBtn');
const foodResult = document.getElementById('foodResult');
const prevFoodBtn = document.getElementById('prevFood');
const nextFoodBtn = document.getElementById('nextFood');
 
function renderFoodCard() {
    const current = foodData[foodIndex];
    foodEmoji.textContent = current.emoji;
    foodName.textContent = current.food;
 
    // إعادة تشغيل الحركة المرنة كل مرة تتغير فيها البطاقة
    foodCard.classList.remove('pop');
    void foodCard.offsetWidth; // إجبار المتصفح يعيد حساب الستايل قبل ما نضيف الكلاس من جديد
    foodCard.classList.add('pop');
 
    foodDots.innerHTML = '';
    foodData.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === foodIndex ? ' active' : '');
        foodDots.appendChild(dot);
    });
}
 
renderFoodCard();
 
function goToNextFood() {
    foodIndex = (foodIndex + 1) % foodData.length;
    renderFoodCard();
    foodResult.textContent = '';
}
 
function goToPrevFood() {
    foodIndex = (foodIndex - 1 + foodData.length) % foodData.length;
    renderFoodCard();
    foodResult.textContent = '';
}
 
nextFoodBtn.addEventListener('click', goToNextFood);
prevFoodBtn.addEventListener('click', goToPrevFood);
 
let selectedFood = null;
 
foodConfirmBtn.addEventListener('click', () => {
    const chosen = foodData[foodIndex].food;
    selectedFood = chosen;
    foodResult.textContent = `تمام، ${chosen} 😋`;
    foodResult.className = 'choice-result success';
 
    setTimeout(() => {
        fourthScreen.classList.remove('show');
        document.getElementById('fifthScreen').classList.add('show');
    }, 1200);
});
 
/* ================= الأزهار المتساقطة ================= */
 
const petalEmojis = ['🌸', '🌹', '💮', '🌷'];
const petalContainer = document.body;
 
for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.fontSize = (14 + Math.random() * 16) + 'px';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    petalContainer.appendChild(p);
}
 
/* ================= شاشة 5: اختيار الأغنية ================= */
 
const artistCards = document.querySelectorAll('.artist-card');
const songPlayer = document.getElementById('songPlayer');
 
let selectedSong = null;
 
artistCards.forEach(card => {
    card.addEventListener('click', () => {
        artistCards.forEach(c => {
            if (c === card) {
                c.classList.add('selected');
                c.classList.remove('shrink');
            } else {
                c.classList.remove('selected');
                c.classList.add('shrink');
            }
        });
 
        selectedSong = card;
        songConfirmBtn.style.display = 'inline-block';
 
        const startTime = parseFloat(card.dataset.start) || 0;
 
        songPlayer.src = card.dataset.song;
        songPlayer.volume = 0.4;
 
        songPlayer.addEventListener('loadedmetadata', () => {
            songPlayer.currentTime = startTime;
            songPlayer.play();
        }, { once: true });
    });
});
const songConfirmBtn = document.getElementById('songConfirmBtn');
 
songConfirmBtn.addEventListener('click', () => {
    songPlayer.pause();
    songPlayer.currentTime = 0;
 
    fifthScreen.classList.remove('show');
    sixthScreen.classList.add('show');
});
 
/* ================= شاشة 6: الكالندر ================= */
 
const sixthScreen = document.getElementById('sixthScreen');
const calendarContainer = document.getElementById('calendarContainer');
const resultOverlay = document.getElementById('resultOverlay');
const overlayText = document.getElementById('overlayText');
 
const weekdayLabels = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
 
let selectedDate = null; // Date object كامل (يوم + شهر + سنة + وقت)
let rejectOverlayTimer = null;
 
const monthsToShow = [
    { year: 2026, monthIndex: 8, name: 'september' },   // شهر 9
    { year: 2026, monthIndex: 9, name: 'october' },   // شهر 10
    { year: 2026, monthIndex: 10, name: 'november' }   // شهر 11
];
 
function buildCalendar() {
    monthsToShow.forEach(m => {
        const monthBlock = document.createElement('div');
        monthBlock.className = 'month-block';
 
        const title = document.createElement('h3');
        title.textContent = `${m.name} ${m.year}`;
        monthBlock.appendChild(title);
 
        const weekdayRow = document.createElement('div');
        weekdayRow.className = 'weekday-row';
        weekdayLabels.forEach(w => {
            const span = document.createElement('span');
            span.textContent = w;
            weekdayRow.appendChild(span);
        });
        monthBlock.appendChild(weekdayRow);
 
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
 
        const firstDayIndex = new Date(m.year, m.monthIndex, 1).getDay();
        const daysInMonth = new Date(m.year, m.monthIndex + 1, 0).getDate();
 
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'day-cell empty';
            daysGrid.appendChild(empty);
        }
 
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('button');
            cell.className = 'day-cell';
            cell.textContent = day;
 
            const isBirthday = (m.monthIndex === 10 && day === 4); // 4/11
 
            if (isBirthday) {
                cell.classList.add('birthday');
            }
 
            cell.addEventListener('click', () => {
                handleDayClick(isBirthday, m.year, m.monthIndex, day);
            });
 
            daysGrid.appendChild(cell);
        }
 
        monthBlock.appendChild(daysGrid);
        calendarContainer.appendChild(monthBlock);
    });
}
 
buildCalendar();
 
function handleDayClick(isBirthday, year, monthIndex, day) {
    sixthScreen.classList.add('shake');
    setTimeout(() => sixthScreen.classList.remove('shake'), 400);
 
    if (isBirthday) {
        pendingDateParts = { year, monthIndex, day };
        openTimeModal();
       } else {
        overlayText.textContent = 'مرفوووض ❌';
        resultOverlay.className = 'result-overlay reject show';
 
        clearTimeout(rejectOverlayTimer);
        rejectOverlayTimer = setTimeout(() => {
            resultOverlay.classList.remove('show');
 
            setTimeout(() => {
                resultOverlay.className = 'result-overlay';
            }, 320);
        }, 1200);
    }
    }
 
 
 
/* ================= شاشة 7: ملخص الرحلة ================= */
 
const seventhScreen = document.getElementById('seventhScreen');
 
 
function formatArabicDate(date) {
    const monthObj = monthsToShow.find(m => m.year === date.getFullYear() && m.monthIndex === date.getMonth());
    const monthName = monthObj ? monthObj.name : (date.getMonth() + 1);
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
}
 
function formatTime(date) {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
}
 
function populateSummary() {
    document.getElementById('summaryPlace').textContent = selectedPlace || '-';
    document.getElementById('summaryActivity').textContent = selectedFinalActivity || '-';
    document.getElementById('summaryFood').textContent = selectedFood || '-';
    document.getElementById('summaryDate').textContent = selectedDate ? formatArabicDate(selectedDate) : '-';
    document.getElementById('summaryTime').textContent = selectedDate ? formatTime(selectedDate) : '-';
 
    if (selectedSong) {
        const img = selectedSong.querySelector('img');
        const name = selectedSong.querySelector('.artist-name');
        document.getElementById('summarySongImg').src = img ? img.src : '';
        document.getElementById('summarySongName').textContent = name ? name.textContent.trim() : '-';
    }
 
   
}
 
function showSeventhScreen() {
    populateSummary();
    seventhScreen.classList.add('show');
 
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});
 
    animateSummaryCard();
}
 
function animateSummaryCard() {
    const rows = document.querySelectorAll('.seventh .summary-row');
    const card = document.querySelector('.seventh .summary-card');
    const introText = document.querySelector('.seventh-text');
    const countdownBlock = document.getElementById('seventhCountdown');
 
    rows.forEach(row => row.classList.remove('revealed'));
    card.classList.remove('fade-out');
    introText.classList.remove('fade-out');
    countdownBlock.classList.remove('show-countdown');
 
    const revealStep = 700;
    const pauseAfterRows = 1400;
    const fadeOutDuration = 700;
    const pauseBeforeCountdown = 1300;
 
    rows.forEach((row, i) => {
        setTimeout(() => {
            row.classList.add('revealed');
        }, i * revealStep);
    });
 
    const afterRowsTime = rows.length * revealStep + pauseAfterRows;
 
    setTimeout(() => {
        card.classList.add('fade-out');
        introText.classList.add('fade-out');
    }, afterRowsTime);
 
    setTimeout(() => {
        countdownBlock.classList.add('show-countdown');
        startCountdown();
    }, afterRowsTime + fadeOutDuration + pauseBeforeCountdown);
}
 
 
 
 
 
 
/* ================= شاشة 8: Countdown ================= */
 
 
let countdownInterval = null;
 
function updateCountdown() {
    if (!selectedDate) return;
 
    const now = new Date();
    let diff = selectedDate - now;
 
    const grid = document.querySelector('.countdown-grid');
    const finishedMsg = document.getElementById('countdownFinishedMsg');
 
    if (diff <= 0) {
        clearInterval(countdownInterval);
        ['cdDays', 'cdHours', 'cdMinutes', 'cdSeconds'].forEach(id => {
            document.getElementById(id).textContent = '00';
        });
        if (grid) grid.style.display = 'none';
        finishedMsg.style.display = 'block';
        return;
    }
 
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);
 
    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cdSeconds').textContent = String(seconds).padStart(2, '0');
}
 
function startCountdown() {
    document.getElementById('countdownDateText').textContent = '04.11.2026';
 
    document.querySelector('.countdown-grid').style.display = 'flex';
    document.getElementById('countdownFinishedMsg').style.display = 'none';
 
    updateCountdown();
 
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
}
 
/* ================= مودال اختيار الوقت ================= */
 
const timeModalOverlay = document.getElementById('timeModalOverlay');
const hourScroll = document.getElementById('hourScroll');
const minuteScroll = document.getElementById('minuteScroll');
const timeConfirmBtn = document.getElementById('timeConfirmBtn');
 
let pendingDateParts = null;
let chosenHour = 18;
let chosenMinute = 0;
const ITEM_HEIGHT = 40;
 
function buildScrollColumn(container, max, step = 1) {
    container.innerHTML = '';
    for (let i = 0; i < max; i += step) {
        const item = document.createElement('div');
        item.className = 'time-scroll-item';
        item.textContent = String(i).padStart(2, '0');
        item.dataset.value = i;
        container.appendChild(item);
    }
}
 
buildScrollColumn(hourScroll, 24, 1);
buildScrollColumn(minuteScroll, 60, 5); // كل 5 دقايق، بدلها لـ 1 اذا بدك كل دقيقة بالتحديد
 
function scrollToValue(container, value) {
    const items = container.querySelectorAll('.time-scroll-item');
    const index = Array.from(items).findIndex(it => Number(it.dataset.value) === value);
    if (index !== -1) container.scrollTop = index * ITEM_HEIGHT;
}
 
function updateActiveItem(container) {
    const items = container.querySelectorAll('.time-scroll-item');
    const index = Math.round(container.scrollTop / ITEM_HEIGHT);
    items.forEach((it, i) => it.classList.toggle('active', i === index));
