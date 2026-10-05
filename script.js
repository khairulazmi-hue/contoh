// Data Playlist Musik Utama
const playlist = [
    { 
        title: "Niscaya", 
        artist: "Bilal Indrajaya", 
        src: "Niscaya.mpeg", 
        lyric: '"Katanya kopi itu pahit, tapi kok tiap cerita sama kamu rasanya tetep manis ya?" ☕💭' 
    },
    { 
        title: "Jatuh Suka", 
        artist: "Tulus", 
        src: "jatuhsuka.mpeg", 
        lyric: '"Sesuai lagu ini, temenan sama kamu emang selalu bikin senyum-senyum sendiri!" 💖✨' 
    },
    { 
        title: "Adu Rayu", 
        artist: "Tulus", 
        src: "adurayu.mp4", 
        lyric: '"Gak usah diadu rayu, digombalin dikit aja kamu udah langsung terbang kan? 🕊️🙈"' 
    }
];

let currentSongIndex = 0;
let isMutedAll = false;

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const disc = document.getElementById('disc');

const blowSound = document.getElementById('blow-sound');
const ultahSound = document.getElementById('ultah-sound');

// INSIALISASI EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
    initFloatingHearts();
    startBirthdayTimer();

    if (audioPlayer) {
        audioPlayer.src = playlist[0].src;
        audioPlayer.load();
    }

    // Klik Polaroid Portrait
    const cards = document.querySelectorAll('.polaroid-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const caption = card.querySelector('.caption');
            if (img && caption) openPhotoModal(img.src, caption.innerText);
        });
    });

    // Klik Card Momen Istimewa (syifa14)
    const specialCard = document.querySelector('.special-card');
    if (specialCard) {
        specialCard.addEventListener('click', () => {
            const img = specialCard.querySelector('img');
            const caption = specialCard.querySelector('.caption');
            if (img && caption) openPhotoModal(img.src, caption.innerText);
        });
    }
});

// LOGIKA HITUNGAN JAM REAL-TIME KE TANGGAL 6 OKTOBER JAM 00:00
function startBirthdayTimer() {
    const targetDate = new Date("2026-10-06T00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
        } else {
            document.getElementById('days').innerText = "🎉";
            document.getElementById('hours').innerText = "0";
            document.getElementById('minutes').innerText = "0";
            document.getElementById('seconds').innerText = "0";
        }
    }, 1000);
}

// LOGIKA ANIMASI FLOATING HEARTS
function initFloatingHearts() {
    const container = document.getElementById('floating-hearts-container');
    if (!container) return;

    const icons = ['🌸', '💖', '🌷', '✨', '💕', '🌺'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerText = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 450);
}

// LOGIKA TOMBOL MUTE ALL
function toggleMuteAll() {
    isMutedAll = !isMutedAll;
    const btn = document.getElementById('mute-btn');

    [audioPlayer, blowSound, ultahSound].forEach(audio => {
        if (audio) audio.muted = isMutedAll;
    });

    if (isMutedAll) {
        btn.innerText = "🔇 Muted";
        btn.classList.add('is-muted');
    } else {
        btn.innerText = "🔊 Sound ON";
        btn.classList.remove('is-muted');
    }
}

function openPhotoModal(imgSrc, captionText) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    modalImg.src = imgSrc;
    modalCaption.innerText = captionText;
    modal.classList.remove('hidden');
}

function closePhotoModal() {
    document.getElementById('photo-modal').classList.add('hidden');
}

function focusPasswordInput() {
    document.getElementById('passcode-input').focus();
}

function checkEnterKey(e) {
    if (e.key === 'Enter') {
        openBirthdayWeb(e);
    }
}

// VALIDASI PASSCODE & BUKA HALAMAN
function openBirthdayWeb(e) {
    const passInput = document.getElementById('passcode-input');
    const errorMsg = document.getElementById('passcode-error');
    const rawVal = passInput.value.trim().replace(/[-/]/g, '');

    // PASSWORD DIPERBARUI KE 06102005
    if (rawVal !== "06102005") {
        errorMsg.classList.remove('hidden');
        passInput.style.borderColor = "#f43f5e";
        return;
    }

    errorMsg.classList.add('hidden');
    createFlowerBurst(e);

    const coffeeScreen = document.getElementById('coffee-screen');
    const mainScreen = document.getElementById('main-screen');
    const muteBtn = document.getElementById('mute-btn');

    coffeeScreen.style.opacity = '0';
    setTimeout(() => {
        coffeeScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        
        if (muteBtn) muteBtn.classList.remove('hidden');

        window.scrollTo(0, 0);

        if (audioPlayer) {
            audioPlayer.src = playlist[0].src;
            audioPlayer.load();
            playSong();
        }
    }, 600);
}

function createFlowerBurst(e) {
    const flowers = ['🌸', '🌺', '🌷', '✨', '💖', '🏵️'];
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;

    for (let i = 0; i < 20; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower-burst');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = `${x}px`; 
        flower.style.top = `${y}px`;

        const bx = (Math.random() - 0.5) * 250 + 'px';
        const by = (Math.random() - 0.5) * 250 + 'px';
        flower.style.setProperty('--bx', bx);
        flower.style.setProperty('--by', by);

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 1200);
    }
}

function switchSong(index) {
    currentSongIndex = index;
    const buttons = document.querySelectorAll('.song-btn');
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === index));

    document.getElementById('song-title').innerText = playlist[index].title;
    document.getElementById('song-artist').innerText = playlist[index].artist;
    document.getElementById('lyric-text').innerText = playlist[index].lyric;

    audioPlayer.src = playlist[index].src;
    audioPlayer.load();
    playSong();
}

function togglePlay() { 
    if (audioPlayer.paused) {
        playSong(); 
    } else {
        pauseSong();
    }
}

function playSong() {
    if (audioPlayer && !isMutedAll) {
        audioPlayer.play().then(() => {
            if (playBtn) playBtn.innerText = "⏸ Pause Music";
            if (disc) disc.classList.add('spinning');
        }).catch(err => console.log("Gagal memutar audio:", err));
    }
}

function pauseSong() {
    if (audioPlayer) {
        audioPlayer.pause();
        if (playBtn) playBtn.innerText = "▶ Play Music";
        if (disc) disc.classList.remove('spinning');
    }
}

function stopAllAudio() {
    pauseSong();
    
    if (blowSound) {
        blowSound.pause();
        blowSound.currentTime = 0;
    }

    if (ultahSound) {
        ultahSound.pause();
        ultahSound.currentTime = 0;
    }
}

function goToCakeScreen() { 
    hideAllScreens(); 
    document.getElementById('cake-screen').classList.remove('hidden'); 
    window.scrollTo(0,0); 

    if (blowSound && !isMutedAll) {
        blowSound.currentTime = 0;
        blowSound.play().catch(err => console.log("Sound tiup lilin gagal diputar:", err));
    }
}

function blowCandle(e) {
    document.getElementById('flame').classList.add('hidden');
    document.getElementById('smoke').classList.remove('hidden');

    document.getElementById('blow-btn').classList.add('hidden');
    document.getElementById('wish-message').classList.remove('hidden');

    createFireworks(e);

    if (blowSound) {
        blowSound.pause();
        blowSound.currentTime = 0;
    }

    if (ultahSound && !isMutedAll) {
        ultahSound.currentTime = 0;
        ultahSound.play().catch(err => console.log("Lagu selamat ultah gagal diputar:", err));
    }
}

function createFireworks(e) {
    const colors = ['#f43f5e', '#fb7185', '#ffaa00', '#ffffff', '#e11d48'];
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${x}px`; 
        particle.style.top = `${y}px`;

        const fx = (Math.random() - 0.5) * 300 + 'px';
        const fy = (Math.random() - 0.5) * 300 + 'px';
        particle.style.setProperty('--fx', fx);
        particle.style.setProperty('--fy', fy);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

function hideAllScreens() {
    stopAllAudio();

    ['main-screen', 'cake-screen', 'book-screen', 'game-screen'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
}

function goToBookScreen() { 
    hideAllScreens(); 
    document.getElementById('mute-btn').classList.add('hidden');
    document.getElementById('book-screen').classList.remove('hidden'); 
    window.scrollTo(0,0); 
}

function goToGameScreen() { 
    hideAllScreens(); 
    document.getElementById('mute-btn').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden'); 
    window.scrollTo(0,0); 
    initMemoryGame(); 
}

function backToMain() { 
    hideAllScreens(); 
    document.getElementById('mute-btn').classList.remove('hidden');
    document.getElementById('main-screen').classList.remove('hidden'); 
    window.scrollTo(0,0); 
}

let currentPage = 1;
const totalPages = 10;

function updateBook() {
    for (let i = 1; i <= totalPages; i++) {
        const pageEl = document.getElementById(`page-${i}`);
        if (pageEl) pageEl.classList.toggle('active-page', i === currentPage);
    }
    document.getElementById('book-indicator').innerText = `${currentPage} / ${totalPages}`;
}

function prevBookPage() { if (currentPage > 1) { currentPage--; updateBook(); } }
function nextBookPage() { if (currentPage < totalPages) { currentPage++; updateBook(); } }

function switchGameTab(tabIndex) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`game-box-${i}`).classList.toggle('hidden', i !== tabIndex);
    }
    const btns = document.querySelectorAll('.g-tab-btn');
    btns.forEach((btn, idx) => btn.classList.toggle('active', idx + 1 === tabIndex));
    resetGameWin();

    if (tabIndex === 2) initMemoryGame();
    if (tabIndex === 3) startTowerGame();
    if (tabIndex === 4) initQuizGame();
}

function showGameWin(msg) {
    createFireworks(null);
    document.getElementById('win-text').innerText = msg;
    document.getElementById('game-win-overlay').classList.remove('hidden');
}

function resetGameWin() {
    document.getElementById('game-win-overlay').classList.add('hidden');
}

let catchScore = 0;
let catchInterval;
let basketX = 100;

function startCatchGame() {
    catchScore = 0;
    document.getElementById('catch-score').innerText = catchScore;
    clearInterval(catchInterval);

    const catchArea = document.getElementById('catch-area');
    const basket = document.getElementById('basket');

    catchArea.ontouchmove = (e) => {
        const rect = catchArea.getBoundingClientRect();
        basketX = e.touches[0].clientX - rect.left - 40;
        basketX = Math.max(0, Math.min(rect.width - 80, basketX));
        basket.style.left = `${basketX}px`;
    };

    catchArea.onmousemove = (e) => {
        const rect = catchArea.getBoundingClientRect();
        basketX = e.clientX - rect.left - 40;
        basketX = Math.max(0, Math.min(rect.width - 80, basketX));
        basket.style.left = `${basketX}px`;
    };

    catchInterval = setInterval(() => {
        const cup = document.createElement('div');
        cup.classList.add('falling-cup');
        cup.innerText = '☕';
        cup.style.left = Math.random() * (catchArea.clientWidth - 30) + 'px';
        catchArea.appendChild(cup);

        let cupY = 0;
        const fall = setInterval(() => {
            cupY += 4;
            cup.style.top = `${cupY}px`;

            if (cupY >= 210 && cupY <= 230) {
                const cupX = parseFloat(cup.style.left);
                if (cupX >= basketX - 15 && cupX <= basketX + 75) {
                    catchScore++;
                    document.getElementById('catch-score').innerText = catchScore;
                    cup.remove();
                    clearInterval(fall);

                    if (catchScore >= 5) {
                        clearInterval(catchInterval);
                        showGameWin("Hore! Kamu berhasil menangkap 5 cangkir kopi kesukaanmu! ☕🎉");
                    }
                }
            }

            if (cupY > 250) {
                cup.remove();
                clearInterval(fall);
            }
        }, 30);
    }, 1000);
}

const cardIcons = ['☕', '☕', '💖', '💖', '🌸', '🌸', '🎁', '🎁'];
let flippedCards = [];
let matchedPairs = 0;

function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    const shuffled = [...cardIcons].sort(() => Math.random() - 0.5);
    shuffled.forEach((icon, idx) => {
        const card = document.createElement('div');
        card.classList.add('mem-card');
        card.dataset.icon = icon;
        card.dataset.index = idx;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.icon;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
                matchedPairs++;
                flippedCards = [];
                if (matchedPairs === 4) {
                    setTimeout(() => showGameWin("Hebat! Semua pasangan gambar tertebak dengan sempurna! 🃏✨"), 500);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(c => { c.classList.remove('flipped'); c.innerText = ''; });
                    flippedCards = [];
                }, 800);
            }
        }
    }
}

let towerLevel = 0;
let blockPos = 0;
let blockDirection = 3;
let blockWidth = 140;
let moveInterval;
let isMoving = false;

function startTowerGame() {
    const area = document.getElementById('tower-area');
    area.innerHTML = '';
    towerLevel = 0;
    blockWidth = 140;
    document.getElementById('tower-score').innerText = towerLevel;
    spawnMovingBlock();
}

function spawnMovingBlock() {
    const area = document.getElementById('tower-area');
    clearInterval(moveInterval);

    const block = document.createElement('div');
    block.id = 'current-moving-block';
    block.classList.add('moving-block');
    block.style.width = blockWidth + 'px';
    block.style.bottom = (towerLevel * 28 + 10) + 'px';
    block.style.left = '0px';

    area.appendChild(block);

    blockPos = 0;
    blockDirection = 3;
    isMoving = true;

    moveInterval = setInterval(() => {
        blockPos += blockDirection;
        const maxPos = area.clientWidth - blockWidth;

        if (blockPos >= maxPos || blockPos <= 0) {
            blockDirection *= -1;
        }

        block.style.left = blockPos + 'px';
    }, 20);
}

function dropBlock() {
    if (!isMoving) {
        startTowerGame();
        return;
    }

    clearInterval(moveInterval);
    isMoving = false;

    const movingBlock = document.getElementById('current-moving-block');
    if (!movingBlock) return;

    movingBlock.removeAttribute('id');
    movingBlock.classList.remove('moving-block');
    movingBlock.classList.add('stacked-block');

    towerLevel++;
    document.getElementById('tower-score').innerText = towerLevel;

    blockWidth = Math.max(50, blockWidth - 15);

    if (towerLevel >= 5) {
        setTimeout(() => {
            showGameWin("Hebat banget! Keseimbanganmu luar biasa, 5 balok berhasil tersusun rapi! 🧱🎉");
        }, 300);
    } else {
        setTimeout(spawnMovingBlock, 400);
    }
}

const quizData = [
    {
        question: "1. Siapa cewek paling manis yang hobinya minum kopi tapi gampang panikan?",
        options: [
            { text: "Kamu lah pastinya! 😊", correct: true },
            { text: "Kamu dong! 💖", correct: true }
        ]
    },
    {
        question: "2. Kalau kepala lagi terasa ramai atau panik mulai datang, hal terbaik apa yang harus kamu lakukan?",
        options: [
            { text: "Seduh kopi/minuman hangat & dengerin lagu favorit ☕🎵", correct: true },
            { text: "Istirahat sejenak & ambil napas dalam-dalam 🌿", correct: true }
        ]
    },
    {
        question: "3. Menurut rumus fisika tersembunyi, seberapa manis kopi yang diminum temanmu saat bareng kamu?",
        options: [
            { text: "Kalah manis sama senyumanmu! ✨", correct: true },
            { text: "Gak butuh gula lagi kalau ada kamu 😜", correct: true }
        ]
    },
    {
        question: "4. Apa yang harus kamu ingat saat merasa harimu tidak berjalan sempurna?",
        options: [
            { text: "Perasaanmu valid & kamu sudah berjuang hebat 🤍", correct: true },
            { text: "Langkah kecil tetaplah sebuah kemajuan 🌸", correct: true }
        ]
    },
    {
        question: "5. Apa harapan terbaik untukmu di usia yang baru ini?",
        options: [
            { text: "Makin tenang, bahagia, dan selalu dikelilingi hal manis! 🥳", correct: true },
            { text: "Semua impianmu tercapai & makin sering ngopi santai! ☕💖", correct: true }
        ]
    }
];

let currentQuizIndex = 0;

function initQuizGame() {
    currentQuizIndex = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const qData = quizData[currentQuizIndex];
    document.getElementById('quiz-progress').innerText = `${currentQuizIndex + 1}/${quizData.length}`;
    document.getElementById('quiz-question').innerText = qData.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-opt');
        btn.innerText = opt.text;
        btn.onclick = () => answerQuiz();
        optionsContainer.appendChild(btn);
    });
}

function answerQuiz() {
    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
        renderQuizQuestion();
    } else {
        showGameWin("100% Benar! Kamu berhasil menyelesaikan semua pertanyaan kuis dengan manis! 💖✨");
    }
}