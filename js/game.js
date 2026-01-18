/**
 * Barbie Math Adventure - Main Game Logic
 * Handles all game states, screens, and gameplay
 */

const Game = {
    // Game state
    state: {
        currentScreen: 'main-menu',
        previousScreen: null,
        playerName: 'Player',
        grade: '1',
        difficulty: 'normal',

        // Player stats
        level: 1,
        xp: 0,
        coins: 0,
        gems: 0,

        // Character customization
        character: {
            hairStyle: 'long',
            hairColor: '#F4D03F',
            skinTone: '#FDEBD0',
            outfit: 'princess',
            accessory: 'tiara'
        },

        // Progress tracking
        completedLevels: [],
        levelStars: {},
        highestStreak: 0,
        totalQuestionsAnswered: 0,
        categoryStats: {},
        perfectLevels: 0,
        bossesDefeated: 0,

        // Current battle state
        battle: {
            levelId: null,
            currentQuestion: 0,
            totalQuestions: 5,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentStreak: 0,
            maxStreak: 0,
            playerHealth: 100,
            enemyHealth: 100,
            timeRemaining: 30,
            timer: null
        },

        // Unlocked items
        unlockedOutfits: ['princess', 'casual'],
        unlockedAccessories: ['none', 'tiara'],
        unlockedHairColors: ['blonde', 'brunette', 'black', 'red', 'pink'],

        // Achievements
        achievements: [],

        // Settings
        settings: {
            music: true,
            sfx: true,
            timerEnabled: true
        }
    },

    /**
     * Initialize the game
     */
    init() {
        this.loadGame();
        this.setupEventListeners();
        this.initializeCustomization();
        this.generateSparkles();
        this.updateAllDisplays();

        // Check for saved game
        if (this.state.completedLevels.length > 0) {
            // Has save data, enable continue button
            document.querySelector('.btn-secondary').style.display = 'inline-flex';
        }
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Settings toggles
        document.getElementById('music-toggle')?.addEventListener('change', (e) => {
            this.state.settings.music = e.target.checked;
            this.saveGame();
        });

        document.getElementById('sfx-toggle')?.addEventListener('change', (e) => {
            this.state.settings.sfx = e.target.checked;
            this.saveGame();
        });

        document.getElementById('timer-toggle')?.addEventListener('change', (e) => {
            this.state.settings.timerEnabled = e.target.checked;
            this.saveGame();
        });

        document.getElementById('difficulty-select')?.addEventListener('change', (e) => {
            this.state.difficulty = e.target.value;
            this.saveGame();
        });

        // Character name input
        document.getElementById('character-name')?.addEventListener('input', (e) => {
            this.state.playerName = e.target.value || 'Player';
        });

        // Answer input for text entry problems
        document.getElementById('answer-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
    },

    /**
     * Show a specific screen
     */
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            this.state.previousScreen = this.state.currentScreen;
            this.state.currentScreen = screenId;
            targetScreen.classList.add('active');
        }

        // Screen-specific initialization
        switch (screenId) {
            case 'world-map':
                this.renderWorldMap();
                break;
            case 'wardrobe':
                this.renderWardrobe();
                break;
            case 'achievements':
                this.renderAchievements();
                break;
            case 'grade-select':
                // After character creation, show grade select
                break;
        }

        this.updateAllDisplays();
    },

    /**
     * Go back to previous screen
     */
    goBack() {
        if (this.state.previousScreen) {
            this.showScreen(this.state.previousScreen);
        } else {
            this.showScreen('main-menu');
        }
    },

    /**
     * Continue saved game
     */
    continueGame() {
        if (this.state.completedLevels.length > 0) {
            this.showScreen('world-map');
        } else {
            this.showScreen('character-select');
        }
    },

    /**
     * Initialize character customization options
     */
    initializeCustomization() {
        const hairOptions = document.getElementById('hair-options');
        const hairColorOptions = document.getElementById('hair-color-options');
        const skinOptions = document.getElementById('skin-options');
        const outfitOptions = document.getElementById('outfit-options');

        if (!hairOptions) return;

        // Hair styles
        GameData.customization.hairStyles.forEach(style => {
            const btn = document.createElement('button');
            btn.className = 'option-btn' + (style.id === this.state.character.hairStyle ? ' selected' : '');
            btn.textContent = style.name;
            btn.onclick = () => this.selectHairStyle(style.id);
            hairOptions.appendChild(btn);
        });

        // Hair colors
        GameData.customization.hairColors.forEach(color => {
            if (this.state.unlockedHairColors.includes(color.id)) {
                const btn = document.createElement('button');
                btn.className = 'color-btn' + (color.color === this.state.character.hairColor ? ' selected' : '');
                btn.style.background = color.color;
                btn.onclick = () => this.selectHairColor(color.color);
                hairColorOptions.appendChild(btn);
            }
        });

        // Skin tones
        GameData.customization.skinTones.forEach(tone => {
            const btn = document.createElement('button');
            btn.className = 'color-btn' + (tone.color === this.state.character.skinTone ? ' selected' : '');
            btn.style.background = tone.color;
            btn.onclick = () => this.selectSkinTone(tone.color);
            skinOptions.appendChild(btn);
        });

        // Outfits
        GameData.customization.outfits.forEach(outfit => {
            if (this.state.unlockedOutfits.includes(outfit.id)) {
                const btn = document.createElement('button');
                btn.className = 'option-btn' + (outfit.id === this.state.character.outfit ? ' selected' : '');
                btn.textContent = outfit.emoji + ' ' + outfit.name;
                btn.onclick = () => this.selectOutfit(outfit.id);
                outfitOptions.appendChild(btn);
            }
        });

        this.updateAvatarDisplay();
    },

    /**
     * Selection handlers for customization
     */
    selectHairStyle(styleId) {
        this.state.character.hairStyle = styleId;
        this.updateSelectionButtons('hair-options', styleId);
        this.updateAvatarDisplay();
    },

    selectHairColor(color) {
        this.state.character.hairColor = color;
        document.querySelectorAll('#hair-color-options .color-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.style.background === color);
        });
        this.updateAvatarDisplay();
    },

    selectSkinTone(color) {
        this.state.character.skinTone = color;
        document.querySelectorAll('#skin-options .color-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.style.background === color);
        });
        this.updateAvatarDisplay();
    },

    selectOutfit(outfitId) {
        this.state.character.outfit = outfitId;
        this.updateSelectionButtons('outfit-options', outfitId);
        this.updateAvatarDisplay();
    },

    updateSelectionButtons(containerId, selectedId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.querySelectorAll('.option-btn').forEach((btn, index) => {
            const items = containerId === 'hair-options' ?
                GameData.customization.hairStyles :
                GameData.customization.outfits.filter(o => this.state.unlockedOutfits.includes(o.id));
            btn.classList.toggle('selected', items[index]?.id === selectedId);
        });
    },

    /**
     * Update avatar display
     */
    updateAvatarDisplay() {
        const hairEl = document.getElementById('avatar-hair');
        const faceEl = document.getElementById('avatar-face');
        const outfitEl = document.getElementById('avatar-outfit');
        const accessoryEl = document.getElementById('avatar-accessory');

        if (hairEl) {
            hairEl.style.background = this.state.character.hairColor;
            const style = GameData.customization.hairStyles.find(s => s.id === this.state.character.hairStyle);
            if (style) {
                hairEl.style.cssText = `background: ${this.state.character.hairColor}; ${style.style}`;
            }
        }

        if (faceEl) {
            faceEl.style.background = this.state.character.skinTone;
        }

        if (outfitEl) {
            const outfit = GameData.customization.outfits.find(o => o.id === this.state.character.outfit);
            if (outfit) {
                outfitEl.style.background = outfit.color;
            }
        }

        if (accessoryEl) {
            const accessory = GameData.customization.accessories.find(a => a.id === this.state.character.accessory);
            accessoryEl.textContent = accessory ? accessory.emoji : '';
        }
    },

    /**
     * Start the adventure
     */
    startAdventure() {
        const nameInput = document.getElementById('character-name');
        if (nameInput && nameInput.value) {
            this.state.playerName = nameInput.value;
        }
        this.saveGame();
        this.showScreen('grade-select');
    },

    /**
     * Select grade level
     */
    selectGrade(grade) {
        this.state.grade = grade;
        this.saveGame();
        this.showScreen('world-map');
    },

    /**
     * Render the world map
     */
    renderWorldMap() {
        const pathContainer = document.getElementById('world-path');
        if (!pathContainer) return;

        pathContainer.innerHTML = '';
        const allLevels = GameData.getAllLevels();

        allLevels.forEach((level, index) => {
            const isCompleted = this.state.completedLevels.includes(level.id);
            const isUnlocked = index === 0 || this.state.completedLevels.includes(allLevels[index - 1].id);
            const isCurrent = isUnlocked && !isCompleted;

            const locationDiv = document.createElement('div');
            locationDiv.className = 'world-location';

            const nodeDiv = document.createElement('div');
            nodeDiv.className = `location-node ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''} ${isCurrent ? 'current' : ''}`;

            if (isUnlocked) {
                nodeDiv.onclick = () => this.startLevel(level.id);
            }

            const iconSpan = document.createElement('span');
            iconSpan.className = 'location-icon';
            iconSpan.textContent = isUnlocked ? level.icon : '🔒';

            const numberSpan = document.createElement('span');
            numberSpan.className = 'location-number';
            numberSpan.textContent = level.id;

            nodeDiv.appendChild(iconSpan);
            nodeDiv.appendChild(numberSpan);

            // Add stars for completed levels
            if (isCompleted) {
                const starsDiv = document.createElement('div');
                starsDiv.className = 'location-stars';
                const stars = this.state.levelStars[level.id] || 1;
                for (let i = 0; i < 3; i++) {
                    const star = document.createElement('span');
                    star.textContent = i < stars ? '⭐' : '☆';
                    starsDiv.appendChild(star);
                }
                nodeDiv.appendChild(starsDiv);
            }

            locationDiv.appendChild(nodeDiv);

            // Add path line (except for last)
            if (index < allLevels.length - 1) {
                const pathLine = document.createElement('div');
                pathLine.className = 'path-line';
                locationDiv.appendChild(pathLine);
            }

            pathContainer.appendChild(locationDiv);
        });
    },

    /**
     * Start a level
     */
    startLevel(levelId) {
        const level = GameData.getLevelById(levelId);
        if (!level) return;

        // Reset battle state
        this.state.battle = {
            levelId: levelId,
            currentQuestion: 0,
            totalQuestions: level.questions,
            correctAnswers: 0,
            wrongAnswers: 0,
            currentStreak: 0,
            maxStreak: 0,
            playerHealth: 100,
            enemyHealth: 100,
            timeRemaining: 30,
            timer: null
        };

        // Setup battle screen
        document.getElementById('enemy-name').textContent = level.enemyName;
        const enemySprite = document.querySelector('.enemy-sprite');
        if (enemySprite) {
            enemySprite.textContent = level.enemy;
        }

        // Update enemy avatar
        const enemyAvatar = document.getElementById('enemy-avatar');
        if (enemyAvatar) {
            enemyAvatar.textContent = level.enemy;
        }

        this.showScreen('battle-screen');
        this.nextQuestion();
    },

    /**
     * Generate and display next question
     */
    nextQuestion() {
        if (this.state.battle.currentQuestion >= this.state.battle.totalQuestions) {
            this.endBattle(true);
            return;
        }

        // Stop previous timer
        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        // Generate problem based on grade and difficulty
        const problem = MathProblems.generateProblem(this.state.grade, this.state.difficulty);

        // Display question
        document.getElementById('question-category').textContent = problem.category;
        document.getElementById('question-text').textContent = problem.question;

        // Setup answer options
        const optionsContainer = document.getElementById('answer-options');
        const inputContainer = document.getElementById('answer-input-container');

        if (problem.type === 'input') {
            optionsContainer.style.display = 'none';
            inputContainer.style.display = 'flex';
            document.getElementById('answer-input').value = '';
            document.getElementById('answer-input').focus();
            this.currentAnswer = problem.answer;
        } else {
            optionsContainer.style.display = 'grid';
            inputContainer.style.display = 'none';
            optionsContainer.innerHTML = '';

            problem.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'answer-btn';
                btn.textContent = option;
                btn.onclick = () => this.checkAnswer(option, problem.answer, btn, problem.category);
                optionsContainer.appendChild(btn);
            });
        }

        // Start timer if enabled
        if (this.state.settings.timerEnabled) {
            this.state.battle.timeRemaining = 30;
            this.updateTimerDisplay();
            this.state.battle.timer = setInterval(() => {
                this.state.battle.timeRemaining--;
                this.updateTimerDisplay();
                if (this.state.battle.timeRemaining <= 0) {
                    this.handleTimeout();
                }
            }, 1000);
        }

        // Update streak display
        document.getElementById('streak-count').textContent = this.state.battle.currentStreak;
    },

    /**
     * Submit typed answer
     */
    submitAnswer() {
        const input = document.getElementById('answer-input');
        const userAnswer = parseFloat(input.value);

        if (isNaN(userAnswer)) {
            this.showNotification('Please enter a number!', '⚠️');
            return;
        }

        const isCorrect = userAnswer === this.currentAnswer;
        this.processAnswer(isCorrect, 'Multiplication');
    },

    /**
     * Check answer from multiple choice
     */
    checkAnswer(selected, correct, button, category) {
        const isCorrect = selected === correct;

        // Disable all buttons
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.onclick = null;
            if (btn.textContent == correct) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        this.processAnswer(isCorrect, category);
    },

    /**
     * Process answer result
     */
    processAnswer(isCorrect, category) {
        // Stop timer
        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        // Update stats
        this.state.totalQuestionsAnswered++;
        this.state.categoryStats[category] = (this.state.categoryStats[category] || 0) + 1;

        if (isCorrect) {
            this.state.battle.correctAnswers++;
            this.state.battle.currentStreak++;
            this.state.battle.maxStreak = Math.max(this.state.battle.maxStreak, this.state.battle.currentStreak);

            // Update highest streak
            if (this.state.battle.currentStreak > this.state.highestStreak) {
                this.state.highestStreak = this.state.battle.currentStreak;
            }

            // Damage enemy
            const damage = 20 + (this.state.battle.currentStreak * 2);
            this.state.battle.enemyHealth = Math.max(0, this.state.battle.enemyHealth - damage);
            this.updateHealthBars();

            // Show combo if streak >= 3
            if (this.state.battle.currentStreak >= 3) {
                this.showCombo(this.state.battle.currentStreak);
            }

            // Play sound effect
            this.playSound('correct');
        } else {
            this.state.battle.wrongAnswers++;
            this.state.battle.currentStreak = 0;

            // Damage player
            this.state.battle.playerHealth = Math.max(0, this.state.battle.playerHealth - 15);
            this.updateHealthBars();

            // Check for game over
            if (this.state.battle.playerHealth <= 0) {
                setTimeout(() => this.endBattle(false), 1000);
                return;
            }

            // Play sound effect
            this.playSound('wrong');
        }

        // Check achievements
        this.checkAchievements();

        // Next question after delay
        this.state.battle.currentQuestion++;
        setTimeout(() => {
            if (this.state.battle.enemyHealth <= 0) {
                this.endBattle(true);
            } else {
                this.nextQuestion();
            }
        }, 1500);
    },

    /**
     * Handle timer timeout
     */
    handleTimeout() {
        clearInterval(this.state.battle.timer);
        this.state.battle.currentStreak = 0;
        this.state.battle.wrongAnswers++;
        this.state.battle.playerHealth = Math.max(0, this.state.battle.playerHealth - 10);
        this.updateHealthBars();

        // Show timeout notification
        this.showNotification("Time's up!", '⏰');

        if (this.state.battle.playerHealth <= 0) {
            setTimeout(() => this.endBattle(false), 1000);
            return;
        }

        this.state.battle.currentQuestion++;
        setTimeout(() => this.nextQuestion(), 1500);
    },

    /**
     * Update health bars
     */
    updateHealthBars() {
        const playerHealth = document.getElementById('player-health');
        const enemyHealth = document.getElementById('enemy-health');

        if (playerHealth) {
            playerHealth.style.width = `${this.state.battle.playerHealth}%`;
        }
        if (enemyHealth) {
            enemyHealth.style.width = `${this.state.battle.enemyHealth}%`;
        }
    },

    /**
     * Update timer display
     */
    updateTimerDisplay() {
        const timerFill = document.getElementById('timer-fill');
        if (timerFill) {
            timerFill.style.width = `${(this.state.battle.timeRemaining / 30) * 100}%`;
        }
    },

    /**
     * Show combo animation
     */
    showCombo(streak) {
        const comboDisplay = document.getElementById('combo-display');
        if (comboDisplay) {
            comboDisplay.textContent = `${streak}x Combo!`;
            comboDisplay.classList.remove('show');
            void comboDisplay.offsetWidth; // Trigger reflow
            comboDisplay.classList.add('show');
        }
    },

    /**
     * End the battle
     */
    endBattle(victory) {
        // Stop timer
        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        if (victory) {
            // Calculate rewards
            const accuracy = this.state.battle.correctAnswers / this.state.battle.totalQuestions;
            const stars = accuracy >= 1 ? 3 : (accuracy >= 0.7 ? 2 : 1);

            const baseXP = 50 + (this.state.battle.levelId * 5);
            const bonusXP = Math.floor(this.state.battle.maxStreak * 5);
            const totalXP = Math.floor(baseXP * accuracy) + bonusXP;

            const baseCoins = 20 + (this.state.battle.levelId * 2);
            const totalCoins = Math.floor(baseCoins * accuracy);

            const gems = stars === 3 ? 1 : 0;

            // Update state
            if (!this.state.completedLevels.includes(this.state.battle.levelId)) {
                this.state.completedLevels.push(this.state.battle.levelId);
            }
            this.state.levelStars[this.state.battle.levelId] = Math.max(
                this.state.levelStars[this.state.battle.levelId] || 0,
                stars
            );

            // Check for perfect level
            if (accuracy === 1) {
                this.state.perfectLevels++;
            }

            // Check for boss
            const level = GameData.getLevelById(this.state.battle.levelId);
            if (level && level.boss) {
                this.state.bossesDefeated++;
            }

            // Add rewards
            const oldLevel = this.state.level;
            this.state.xp += totalXP;
            this.state.coins += totalCoins;
            this.state.gems += gems;
            this.state.level = GameData.getLevelFromXP(this.state.xp);

            // Update victory screen
            document.getElementById('xp-earned').textContent = `+${totalXP} XP`;
            document.getElementById('coins-earned').textContent = `+${totalCoins} Coins`;

            const gemReward = document.getElementById('gem-reward');
            if (gems > 0) {
                gemReward.style.display = 'flex';
                document.getElementById('gems-earned').textContent = `+${gems} Gem`;
            } else {
                gemReward.style.display = 'none';
            }

            document.getElementById('questions-answered').textContent = this.state.battle.totalQuestions;
            document.getElementById('correct-answers').textContent = this.state.battle.correctAnswers;
            document.getElementById('best-streak').textContent = this.state.battle.maxStreak;

            // Update stars display
            const starsDisplay = document.querySelector('.victory-stars');
            if (starsDisplay) {
                starsDisplay.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
            }

            this.showScreen('victory-screen');

            // Check for level up
            if (this.state.level > oldLevel) {
                setTimeout(() => this.showLevelUp(this.state.level), 1000);
            }
        } else {
            // Game over
            const tip = MathProblems.getMathTip(document.getElementById('question-category')?.textContent || 'default');
            document.getElementById('math-tip').textContent = tip;
            this.showScreen('gameover-screen');
        }

        this.checkAchievements();
        this.saveGame();
    },

    /**
     * Show level up modal
     */
    showLevelUp(newLevel) {
        document.getElementById('new-level').textContent = newLevel;

        const unlockItems = document.getElementById('unlock-items');
        unlockItems.innerHTML = '';

        // Check for unlocks
        const rewards = GameData.levelRewards[newLevel];
        if (rewards) {
            if (rewards.coins) {
                this.state.coins += rewards.coins;
                const item = document.createElement('span');
                item.className = 'unlock-item';
                item.textContent = `🪙 +${rewards.coins} Coins`;
                unlockItems.appendChild(item);
            }
            if (rewards.gems) {
                this.state.gems += rewards.gems;
                const item = document.createElement('span');
                item.className = 'unlock-item';
                item.textContent = `💎 +${rewards.gems} Gems`;
                unlockItems.appendChild(item);
            }
            if (rewards.message) {
                const item = document.createElement('span');
                item.className = 'unlock-item';
                item.textContent = rewards.message;
                unlockItems.appendChild(item);
            }
        }

        // Unlock outfits based on level
        GameData.customization.outfits.forEach(outfit => {
            if (outfit.unlockLevel === newLevel && !this.state.unlockedOutfits.includes(outfit.id)) {
                this.state.unlockedOutfits.push(outfit.id);
            }
        });

        // Unlock accessories based on level
        GameData.customization.accessories.forEach(accessory => {
            if (accessory.unlockLevel === newLevel && !this.state.unlockedAccessories.includes(accessory.id)) {
                this.state.unlockedAccessories.push(accessory.id);
            }
        });

        document.getElementById('level-up-modal').classList.add('show');
        this.saveGame();
    },

    /**
     * Close level up modal
     */
    closeLevelUpModal() {
        document.getElementById('level-up-modal').classList.remove('show');
    },

    /**
     * Go to next level
     */
    nextLevel() {
        const currentLevelId = this.state.battle.levelId;
        const nextLevelId = currentLevelId + 1;
        const nextLevel = GameData.getLevelById(nextLevelId);

        if (nextLevel) {
            this.startLevel(nextLevelId);
        } else {
            this.showScreen('world-map');
        }
    },

    /**
     * Retry current level
     */
    retryLevel() {
        this.startLevel(this.state.battle.levelId);
    },

    /**
     * Render wardrobe screen
     */
    renderWardrobe() {
        this.updateCurrencyDisplay('wardrobe');
        this.showWardrobeTab('outfits');
    },

    /**
     * Show wardrobe tab
     */
    showWardrobeTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.toLowerCase().includes(tab));
        });

        const container = document.getElementById('wardrobe-items');
        if (!container) return;
        container.innerHTML = '';

        let items = [];
        switch (tab) {
            case 'outfits':
                items = [...GameData.customization.outfits, ...GameData.shopItems.outfits];
                break;
            case 'hair':
                items = GameData.shopItems.hair;
                break;
            case 'accessories':
                items = [...GameData.customization.accessories.filter(a => a.id !== 'none'), ...GameData.shopItems.accessories];
                break;
        }

        items.forEach(item => {
            const isUnlocked = tab === 'outfits' ?
                this.state.unlockedOutfits.includes(item.id) :
                (tab === 'accessories' ? this.state.unlockedAccessories.includes(item.id) :
                this.state.unlockedHairColors.includes(item.id));

            const itemDiv = document.createElement('div');
            itemDiv.className = `wardrobe-item ${isUnlocked ? '' : 'locked'} ${
                (tab === 'outfits' && this.state.character.outfit === item.id) ||
                (tab === 'accessories' && this.state.character.accessory === item.id) ? 'selected' : ''
            }`;

            const iconDiv = document.createElement('div');
            iconDiv.className = 'item-icon';
            iconDiv.textContent = item.emoji || '🎨';
            if (item.color && !item.emoji) {
                iconDiv.style.background = item.color;
                iconDiv.style.width = '40px';
                iconDiv.style.height = '40px';
                iconDiv.style.borderRadius = '50%';
                iconDiv.style.margin = '0 auto';
                iconDiv.textContent = '';
            }

            const nameDiv = document.createElement('div');
            nameDiv.className = 'item-name';
            nameDiv.textContent = item.name;

            itemDiv.appendChild(iconDiv);
            itemDiv.appendChild(nameDiv);

            if (!isUnlocked && item.price) {
                const priceDiv = document.createElement('div');
                priceDiv.className = 'item-price';
                priceDiv.textContent = `${item.priceType === 'gems' ? '💎' : '🪙'} ${item.price}`;
                itemDiv.appendChild(priceDiv);
                itemDiv.onclick = () => this.purchaseItem(tab, item);
            } else if (isUnlocked) {
                itemDiv.onclick = () => this.equipItem(tab, item.id);
            }

            container.appendChild(itemDiv);
        });
    },

    /**
     * Purchase an item
     */
    purchaseItem(type, item) {
        const currency = item.priceType === 'gems' ? 'gems' : 'coins';
        if (this.state[currency] < item.price) {
            this.showNotification(`Not enough ${currency}!`, '😢');
            return;
        }

        this.state[currency] -= item.price;

        switch (type) {
            case 'outfits':
                this.state.unlockedOutfits.push(item.id);
                break;
            case 'accessories':
                this.state.unlockedAccessories.push(item.id);
                break;
            case 'hair':
                this.state.unlockedHairColors.push(item.id);
                break;
        }

        this.showNotification(`${item.name} purchased!`, '🎉');
        this.updateCurrencyDisplay('wardrobe');
        this.showWardrobeTab(type);
        this.checkAchievements();
        this.saveGame();
    },

    /**
     * Equip an item
     */
    equipItem(type, itemId) {
        switch (type) {
            case 'outfits':
                this.state.character.outfit = itemId;
                break;
            case 'accessories':
                this.state.character.accessory = itemId;
                break;
            case 'hair':
                const hairColor = GameData.customization.hairColors.find(c => c.id === itemId) ||
                    GameData.shopItems.hair.find(c => c.id === itemId);
                if (hairColor) {
                    this.state.character.hairColor = hairColor.color;
                }
                break;
        }

        this.showWardrobeTab(type);
        this.updateAvatarDisplay();
        this.saveGame();
    },

    /**
     * Render achievements screen
     */
    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;
        grid.innerHTML = '';

        let unlocked = 0;
        let totalStars = 0;

        GameData.achievements.forEach(achievement => {
            const isUnlocked = this.state.achievements.includes(achievement.id);
            if (isUnlocked) unlocked++;

            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? '' : 'locked'}`;

            const icon = document.createElement('div');
            icon.className = 'achievement-icon';
            icon.textContent = achievement.icon;

            const name = document.createElement('div');
            name.className = 'achievement-name';
            name.textContent = achievement.name;

            const desc = document.createElement('div');
            desc.className = 'achievement-desc';
            desc.textContent = achievement.description;

            card.appendChild(icon);
            card.appendChild(name);
            card.appendChild(desc);
            grid.appendChild(card);
        });

        // Calculate total stars
        Object.values(this.state.levelStars).forEach(stars => {
            totalStars += stars;
        });

        document.getElementById('total-achievements').textContent = unlocked;
        document.getElementById('total-stars').textContent = totalStars;
    },

    /**
     * Check and award achievements
     */
    checkAchievements() {
        GameData.achievements.forEach(achievement => {
            if (this.state.achievements.includes(achievement.id)) return;

            let earned = false;
            const req = achievement.requirement;

            switch (req.type) {
                case 'levels':
                    earned = this.state.completedLevels.length >= req.count;
                    break;
                case 'streak':
                    earned = this.state.highestStreak >= req.count;
                    break;
                case 'perfect':
                    earned = this.state.perfectLevels >= req.count;
                    break;
                case 'category':
                    earned = (this.state.categoryStats[req.category] || 0) >= req.count;
                    break;
                case 'gems':
                    earned = this.state.gems >= req.count;
                    break;
                case 'outfits':
                    earned = this.state.unlockedOutfits.length >= req.count;
                    break;
                case 'playerLevel':
                    earned = this.state.level >= req.count;
                    break;
                case 'bosses':
                    earned = this.state.bossesDefeated >= req.count;
                    break;
                case 'totalQuestions':
                    earned = this.state.totalQuestionsAnswered >= req.count;
                    break;
            }

            if (earned) {
                this.state.achievements.push(achievement.id);
                this.showNotification(`Achievement: ${achievement.name}!`, achievement.icon);
            }
        });
    },

    /**
     * Update all displays
     */
    updateAllDisplays() {
        this.updateCurrencyDisplay('map');
        this.updateCurrencyDisplay('wardrobe');
        this.updatePlayerDisplay();
    },

    /**
     * Update currency display
     */
    updateCurrencyDisplay(location) {
        const prefix = location === 'wardrobe' ? 'wardrobe-' : '';
        const gemEl = document.getElementById(prefix + 'gems') || document.getElementById('gem-count');
        const coinEl = document.getElementById(prefix + 'coins') || document.getElementById('coin-count');

        if (gemEl) gemEl.textContent = this.state.gems;
        if (coinEl) coinEl.textContent = this.state.coins;
    },

    /**
     * Update player display
     */
    updatePlayerDisplay() {
        const nameEl = document.getElementById('display-name');
        const levelEl = document.getElementById('player-level');
        const xpFill = document.getElementById('xp-fill');

        if (nameEl) nameEl.textContent = this.state.playerName;
        if (levelEl) levelEl.textContent = this.state.level;

        if (xpFill) {
            const currentLevelXP = GameData.getXPForLevel(this.state.level - 1);
            const nextLevelXP = GameData.getXPForLevel(this.state.level);
            const progress = ((this.state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
            xpFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }

        // Update mini avatar
        const miniAvatar = document.getElementById('mini-avatar');
        if (miniAvatar) {
            const accessory = GameData.customization.accessories.find(a => a.id === this.state.character.accessory);
            miniAvatar.textContent = accessory ? accessory.emoji : '👸';
            miniAvatar.style.background = this.state.character.hairColor;
        }
    },

    /**
     * Generate sparkle effects
     */
    generateSparkles() {
        const container = document.getElementById('sparkles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            sparkle.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
            container.appendChild(sparkle);
        }
    },

    /**
     * Show notification
     */
    showNotification(text, icon = '✨') {
        const notification = document.getElementById('notification');
        if (!notification) return;

        notification.querySelector('.notification-icon').textContent = icon;
        notification.querySelector('.notification-text').textContent = text;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    },

    /**
     * Play sound effect
     */
    playSound(type) {
        if (!this.state.settings.sfx) return;
        // Sound effects would be implemented here with Web Audio API
        // For now, we'll skip actual audio implementation
    },

    /**
     * Reset game progress
     */
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('barbieMathAdventure');
            location.reload();
        }
    },

    /**
     * Save game to localStorage
     */
    saveGame() {
        const saveData = {
            playerName: this.state.playerName,
            grade: this.state.grade,
            level: this.state.level,
            xp: this.state.xp,
            coins: this.state.coins,
            gems: this.state.gems,
            character: this.state.character,
            completedLevels: this.state.completedLevels,
            levelStars: this.state.levelStars,
            highestStreak: this.state.highestStreak,
            totalQuestionsAnswered: this.state.totalQuestionsAnswered,
            categoryStats: this.state.categoryStats,
            perfectLevels: this.state.perfectLevels,
            bossesDefeated: this.state.bossesDefeated,
            unlockedOutfits: this.state.unlockedOutfits,
            unlockedAccessories: this.state.unlockedAccessories,
            unlockedHairColors: this.state.unlockedHairColors,
            achievements: this.state.achievements,
            settings: this.state.settings
        };

        localStorage.setItem('barbieMathAdventure', JSON.stringify(saveData));
    },

    /**
     * Load game from localStorage
     */
    loadGame() {
        const saved = localStorage.getItem('barbieMathAdventure');
        if (saved) {
            try {
                const saveData = JSON.parse(saved);
                Object.assign(this.state, saveData);

                // Apply settings to UI
                document.getElementById('music-toggle').checked = this.state.settings.music;
                document.getElementById('sfx-toggle').checked = this.state.settings.sfx;
                document.getElementById('timer-toggle').checked = this.state.settings.timerEnabled;
                document.getElementById('difficulty-select').value = this.state.difficulty || 'normal';
            } catch (e) {
                console.error('Failed to load save data:', e);
            }
        }
    }
};

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
