const gameState = {
    players: [],
    currentPlayer: null,
    currentQuestion: null,
    gameStarted: false,
    usedQuestions: [],
    scores: {}
};

// Question Database
const questions = {
    funny: [
        "ما أغرب شيء أكلته في حياتك؟",
        "لو كنت حيوان، أي حيوان ستكون ولماذا؟",
        "اذكر أسوأ كذبة قلتها لوالديك",
        "ما أغرب حلم رأيته؟",
        "لو كان بإمكانك أن تكون مشهوراً بشيء سخيف، ماذا سيكون؟",
        "اذكر شيئاً تفعله عندما تكون وحيداً ولن تفعله أمام الناس",
        "ما أغرب اسم يمكن أن تطلقه على حيوانك الأليف؟",
        "لو كان لديك قناة يوتيوب، ماذا سيكون اسمها؟"
    ],
    embarrassing: [
        "متى كانت آخر مرة بكيت فيها؟",
        "ما أكثر شيء محرج حدث لك أمام شخص معجب به؟",
        "هل سبق أن رقصت أمام المرآة؟ على أي أغنية؟",
        "ما أسوأ موقف تعرضت له في المدرسة؟",
        "متى كانت آخر مرة تبولت على نفسك؟",
        "اذكر شيئاً فعلته ولم تخبر به أحداً",
        "هل سبق أن أحببت شخصاً لم يبادلك المشاعر؟",
        "ما أكثر شيء تخجل منه في شخصيتك؟"
    ],
    childhood: [
        "ما أجمل ذكرياتك من الطفولة؟",
        "ما أول كلمة تذكر أنك نطقتها؟",
        "من كان صديقك المفضل في الطفولة؟",
        "ما اللعبة المفضلة لديك عندما كنت طفلاً؟",
        "هل كنت تخاف من الوحوش تحت السرير؟",
        "ما أول فيلم شاهدته في السينما؟",
        "ماذا كنت تريد أن تصبح عندما تكبر؟",
        "ما أسوأ عقاب تلقيته من والديك؟"
    ],
    strange: [
        "لو كان بإمكانك قراءة أفكار شخص واحد لمدة يوم، من ستختار؟",
        "ما أغرب نظرية تؤمن بها؟",
        "لو استطعت السفر عبر الزمن، إلى أي فترة ستذهب؟",
        "لو كان بإمكانك امتلاك قوة خارقة واحدة، ماذا ستختار؟",
        "ما أغرب شيء تفكر فيه قبل النوم؟",
        "لو كنت خالداً، ماذا ستفعل؟",
        "هل تؤمن بوجود حياة على كواكب أخرى؟",
        "لو كان عليك أن تعيش في عصر آخر، أي عصر ستختار؟"
    ]
};

// Question Types Configuration
const questionTypes = {
    funny: { 
        name: 'مضحك', 
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>`, 
        color: 'bg-yellow-500' 
    },
    embarrassing: { 
        name: 'محرج', 
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>`, 
        color: 'bg-red-500' 
    },
    childhood: { 
        name: 'الطفولة', 
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>`, 
        color: 'bg-pink-500' 
    },
    strange: { 
        name: 'غريب', 
        icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>`, 
        color: 'bg-purple-500' 
    }
};

// DOM Elements
let setupPhase, gamePhase, playerInput, addPlayerBtn, playersList, startGameBtn;
let questionTypeContainer, questionText, currentPlayer, nextQuestionBtn, changeQuestionBtn, resetGameBtn, scoresContainer;

// Initialize DOM Elements after page load
document.addEventListener('DOMContentLoaded', () => {
    setupPhase = document.getElementById('setupPhase');
    gamePhase = document.getElementById('gamePhase');
    playerInput = document.getElementById('playerInput');
    addPlayerBtn = document.getElementById('addPlayerBtn');
    playersList = document.getElementById('playersList');
    startGameBtn = document.getElementById('startGameBtn');
    questionTypeContainer = document.getElementById('questionTypeContainer');
    questionText = document.getElementById('questionText');
    currentPlayer = document.getElementById('currentPlayer');
    nextQuestionBtn = document.getElementById('nextQuestionBtn');
    changeQuestionBtn = document.getElementById('changeQuestionBtn');
    resetGameBtn = document.getElementById('resetGameBtn');
    scoresContainer = document.getElementById('scoresContainer');

    // Add Event Listeners
    addPlayerBtn.addEventListener('click', addPlayer);
    playerInput.addEventListener('keypress', handleKeyPress);
    startGameBtn.addEventListener('click', startNextRound);
    nextQuestionBtn.addEventListener('click', markAnswered);
    changeQuestionBtn.addEventListener('click', startNextRound);
    resetGameBtn.addEventListener('click', resetGame);
    
    // Initialize UI
    updateStartButtonState();
});

// Functions
function addPlayer() {
    const name = playerInput.value.trim();
    if (name && !gameState.players.includes(name)) {
        gameState.players.push(name);
        gameState.scores[name] = 0;
        playerInput.value = '';
        renderPlayersList();
        updateStartButtonState();
    }
}

function removePlayer(player) {
    gameState.players = gameState.players.filter(p => p !== player);
    delete gameState.scores[player];
    renderPlayersList();
    updateStartButtonState();
}

function renderPlayersList() {
    playersList.innerHTML = '';
    gameState.players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        playerItem.innerHTML = `
            <span class="player-name">${player}</span>
            <button class="remove-btn" onclick="removePlayer('${player}')">×</button>
        `;
        playersList.appendChild(playerItem);
    });
}

function updateStartButtonState() {
    startGameBtn.disabled = gameState.players.length < 2;
}

function getRandomQuestion() {
    const allTypes = Object.keys(questions);
    const availableQuestions = [];
    
    allTypes.forEach(type => {
        questions[type].forEach(question => {
            if (!gameState.usedQuestions.includes(question)) {
                availableQuestions.push({ question, type });
            }
        });
    });

    if (availableQuestions.length === 0) {
        gameState.usedQuestions = [];
        return getRandomQuestion();
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
}

function getRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * gameState.players.length);
    return gameState.players[randomIndex];
}

function startNextRound() {
    if (gameState.players.length < 2) {
        alert('يجب إضافة لاعبين على الأقل لبدء اللعبة');
        return;
    }

    const questionData = getRandomQuestion();
    const selectedPlayer = getRandomPlayer();
    
    gameState.currentQuestion = questionData;
    gameState.currentPlayer = selectedPlayer;
    gameState.usedQuestions.push(questionData.question);
    gameState.gameStarted = true;
    
    // Update UI
    setupPhase.style.display = 'none';
    gamePhase.style.display = 'block';
    
    renderQuestion();
    renderScores();
}

function renderQuestion() {
    const { type } = gameState.currentQuestion;
    const typeInfo = questionTypes[type];
    
    questionTypeContainer.innerHTML = `
        <div class="question-icon ${typeInfo.color}">
            ${typeInfo.icon}
        </div>
        <p class="question-type-label">${typeInfo.name}</p>
    `;
    
    questionText.textContent = gameState.currentQuestion.question;
    currentPlayer.textContent = `🎯 ${gameState.currentPlayer}`;
}

function renderScores() {
    scoresContainer.innerHTML = '';
    Object.entries(gameState.scores).forEach(([player, score]) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        scoreItem.innerHTML = `
            <p class="score-name">${player}</p>
            <p class="score-value">${score}</p>
        `;
        scoresContainer.appendChild(scoreItem);
    });
}

function markAnswered() {
    gameState.scores[gameState.currentPlayer]++;
    startNextRound();
}

function resetGame() {
    gameState.gameStarted = false;
    gameState.currentQuestion = null;
    gameState.currentPlayer = null;
    gameState.usedQuestions = [];
    
    // Reset scores to zero
    Object.keys(gameState.scores).forEach(player => {
        gameState.scores[player] = 0;
    });
    
    // Update UI
    setupPhase.style.display = 'block';
    gamePhase.style.display = 'none';
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        addPlayer();
    }
}
