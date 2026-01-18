/**
 * Barbie Math Adventure - Main Game Logic
 * Fashion rewards for solving math problems!
 */

const Game = {
    state: {
        currentScreen: 'main-menu',
        previousScreen: null,
        playerName: 'Barbie',
        grade: '1',
        difficulty: 'normal',

        // Player stats
        level: 1,
        xp: 0,
        gems: 0,

        // Character customization
        character: {
            hairStyle: 'long',
            hairColor: '#F4D03F',
            skinTone: '#FDEBD0',
            eyeColor: '#5DADE2',
            currentDress: 'pink-classic',
            currentTop: null,
            currentAccessory: 'none',
            currentShoes: 'pink-flats',
            currentHairstyle: 'long'
        },

        // Fashion unlocks - the core reward!
        unlockedFashion: {
            dresses: ['pink-classic'],
            tops: ['basic-tee'],
            accessories: ['none'],
            shoes: ['pink-flats'],
            hairstyles: ['long']
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
            timer: null,
            pendingReward: null
        },

        // Achievements
        achievements: [],

        // Settings
        settings: {
            music: true,
            sfx: true,
            timerEnabled: true
        }
    },

    init() {
        this.loadGame();
        this.setupEventListeners();
        this.initializeCustomization();
        this.generateSparkles();
        this.updateAllDisplays();
    },

    setupEventListeners() {
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

        document.getElementById('character-name')?.addEventListener('input', (e) => {
            this.state.playerName = e.target.value || 'Barbie';
        });

        document.getElementById('answer-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            this.state.previousScreen = this.state.currentScreen;
            this.state.currentScreen = screenId;
            targetScreen.classList.add('active');
        }

        switch (screenId) {
            case 'world-map':
                this.renderWorldMap();
                this.updateNextUnlockHint();
                break;
            case 'fashion-closet':
                this.renderFashionCloset();
                this.showClosetCategory('dresses');
                break;
            case 'achievements':
                this.renderAchievements();
                break;
        }

        this.updateAllDisplays();
    },

    goBack() {
        if (this.state.previousScreen) {
            this.showScreen(this.state.previousScreen);
        } else {
            this.showScreen('main-menu');
        }
    },

    continueGame() {
        if (this.state.completedLevels.length > 0) {
            this.showScreen('world-map');
        } else {
            this.showScreen('character-select');
        }
    },

    initializeCustomization() {
        const hairOptions = document.getElementById('hair-options');
        const hairColorOptions = document.getElementById('hair-color-options');
        const skinOptions = document.getElementById('skin-options');
        const eyeColorOptions = document.getElementById('eye-color-options');

        if (!hairOptions) return;

        // Hair styles (only unlocked ones)
        const unlockedHairstyles = this.state.unlockedFashion.hairstyles;
        GameData.fashionItems.hairstyles.forEach(style => {
            if (unlockedHairstyles.includes(style.id)) {
                const btn = document.createElement('button');
                btn.className = 'option-btn' + (style.id === this.state.character.hairStyle ? ' selected' : '');
                btn.textContent = style.name;
                btn.onclick = () => this.selectHairStyle(style.id);
                hairOptions.appendChild(btn);
            }
        });

        // Hair colors
        GameData.customization.hairColors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'color-btn' + (color.color === this.state.character.hairColor ? ' selected' : '');
            btn.style.background = color.color;
            btn.onclick = () => this.selectHairColor(color.color);
            hairColorOptions.appendChild(btn);
        });

        // Skin tones
        GameData.customization.skinTones.forEach(tone => {
            const btn = document.createElement('button');
            btn.className = 'color-btn' + (tone.color === this.state.character.skinTone ? ' selected' : '');
            btn.style.background = tone.color;
            btn.onclick = () => this.selectSkinTone(tone.color);
            skinOptions.appendChild(btn);
        });

        // Eye colors
        if (eyeColorOptions) {
            GameData.customization.eyeColors.forEach(color => {
                const btn = document.createElement('button');
                btn.className = 'color-btn' + (color.color === this.state.character.eyeColor ? ' selected' : '');
                btn.style.background = color.color;
                btn.onclick = () => this.selectEyeColor(color.color);
                eyeColorOptions.appendChild(btn);
            });
        }

        this.updateBarbieDisplay();
    },

    selectHairStyle(styleId) {
        this.state.character.hairStyle = styleId;
        this.state.character.currentHairstyle = styleId;
        this.updateBarbieDisplay();
        this.saveGame();
    },

    selectHairColor(color) {
        this.state.character.hairColor = color;
        document.querySelectorAll('#hair-color-options .color-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.style.background === color) btn.classList.add('selected');
        });
        this.updateBarbieDisplay();
    },

    selectSkinTone(color) {
        this.state.character.skinTone = color;
        document.querySelectorAll('#skin-options .color-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.style.background === color) btn.classList.add('selected');
        });
        this.updateBarbieDisplay();
    },

    selectEyeColor(color) {
        this.state.character.eyeColor = color;
        document.querySelectorAll('#eye-color-options .color-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.style.background === color) btn.classList.add('selected');
        });
        this.updateBarbieDisplay();
    },

    updateBarbieDisplay() {
        // Update all Barbie doll displays on the page
        this.updateBarbieElement('creator-barbie');
        this.updateBarbieElement('closet-barbie');
        this.updateBarbieElement('victory-barbie');
    },

    updateBarbieElement(elementId) {
        const barbie = document.getElementById(elementId);
        if (!barbie) return;

        // Update hair color
        const hairParts = barbie.querySelectorAll('.hair-back, .hair-front, .hair-bangs');
        hairParts.forEach(part => {
            part.style.background = this.state.character.hairColor;
        });

        // Update hair style class
        const hairEl = barbie.querySelector('.barbie-hair');
        if (hairEl) {
            hairEl.className = 'barbie-hair ' + this.state.character.hairStyle;
        }

        // Update skin color
        const skinParts = barbie.querySelectorAll('.barbie-face, .barbie-neck, .arm, .leg');
        skinParts.forEach(part => {
            part.style.background = this.state.character.skinTone;
        });

        // Update eye color
        const irises = barbie.querySelectorAll('.iris');
        irises.forEach(iris => {
            iris.style.background = this.state.character.eyeColor;
        });

        // Update accessory
        const accessoryEl = barbie.querySelector('.barbie-accessory');
        if (accessoryEl) {
            const accessory = GameData.getFashionItemById('accessories', this.state.character.currentAccessory);
            accessoryEl.textContent = accessory ? accessory.emoji : '';
        }

        // Update dress
        const dressEl = barbie.querySelector('.barbie-dress');
        if (dressEl) {
            const dress = GameData.getFashionItemById('dresses', this.state.character.currentDress);
            if (dress) {
                dressEl.className = 'barbie-dress';
                const dressTop = dressEl.querySelector('.dress-top');
                const dressSkirt = dressEl.querySelector('.dress-skirt');
                if (dressTop && dress.color) {
                    dressTop.style.background = `linear-gradient(180deg, ${dress.color} 0%, ${this.darkenColor(dress.color)} 100%)`;
                }
                if (dressSkirt && dress.color) {
                    dressSkirt.style.background = `linear-gradient(180deg, ${this.darkenColor(dress.color)} 0%, ${dress.color} 100%)`;
                }
            }
        }

        // Update shoes
        const shoesEl = barbie.querySelector('.barbie-shoes');
        if (shoesEl) {
            const shoes = GameData.getFashionItemById('shoes', this.state.character.currentShoes);
            if (shoes && shoes.color) {
                const shoeEls = shoesEl.querySelectorAll('.shoe');
                shoeEls.forEach(shoe => {
                    shoe.style.background = `linear-gradient(180deg, ${shoes.color} 0%, ${this.darkenColor(shoes.color)} 100%)`;
                });
            }
        }
    },

    darkenColor(color) {
        if (color === 'rainbow') return '#E0218A';
        if (color.startsWith('linear-gradient')) return '#E0218A';
        // Simple color darkening
        return color;
    },

    startAdventure() {
        const nameInput = document.getElementById('character-name');
        if (nameInput && nameInput.value) {
            this.state.playerName = nameInput.value;
        }
        this.saveGame();
        this.showScreen('grade-select');
    },

    selectGrade(grade) {
        this.state.grade = grade;
        this.saveGame();
        this.showScreen('world-map');
    },

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

            // Show reward preview for current level
            if (isCurrent && level.reward) {
                const rewardItem = GameData.getFashionItemById(level.reward.type, level.reward.id);
                if (rewardItem) {
                    const rewardSpan = document.createElement('div');
                    rewardSpan.className = 'location-reward';
                    rewardSpan.textContent = rewardItem.emoji;
                    rewardSpan.title = rewardItem.name;
                    nodeDiv.appendChild(rewardSpan);
                }
            }

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
            pathContainer.appendChild(locationDiv);
        });
    },

    updateNextUnlockHint() {
        const hintEl = document.getElementById('next-unlock-hint');
        if (!hintEl) return;

        const nextUnlock = GameData.getNextUnlockableItem(
            this.getAllUnlockedItemIds(),
            this.state.completedLevels
        );

        if (nextUnlock) {
            hintEl.textContent = `Complete Level ${nextUnlock.level.id} to unlock: ${nextUnlock.item.emoji} ${nextUnlock.item.name}`;
        } else {
            hintEl.textContent = 'You\'ve unlocked all fashion items! Amazing!';
        }
    },

    getAllUnlockedItemIds() {
        const ids = [];
        for (const items of Object.values(this.state.unlockedFashion)) {
            ids.push(...items);
        }
        return ids;
    },

    startLevel(levelId) {
        const level = GameData.getLevelById(levelId);
        if (!level) return;

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
            timer: null,
            pendingReward: level.reward
        };

        // Setup battle screen
        document.getElementById('enemy-name').textContent = level.enemyName;
        const enemySprite = document.querySelector('.enemy-sprite');
        if (enemySprite) {
            enemySprite.textContent = level.enemy;
        }

        const enemyAvatar = document.getElementById('enemy-avatar');
        if (enemyAvatar) {
            enemyAvatar.textContent = level.enemy;
        }

        // Show reward preview
        if (level.reward) {
            const rewardItem = GameData.getFashionItemById(level.reward.type, level.reward.id);
            if (rewardItem) {
                const rewardPreview = document.getElementById('reward-item-preview');
                if (rewardPreview) {
                    rewardPreview.textContent = rewardItem.emoji + ' ' + rewardItem.name;
                }
            }
        }

        // Update problems counter
        document.getElementById('problems-total').textContent = level.questions;
        document.getElementById('problems-done').textContent = '0';

        this.showScreen('battle-screen');
        this.nextQuestion();
    },

    nextQuestion() {
        if (this.state.battle.currentQuestion >= this.state.battle.totalQuestions) {
            this.endBattle(true);
            return;
        }

        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        const problem = MathProblems.generateProblem(this.state.grade, this.state.difficulty);

        document.getElementById('question-category').textContent = problem.category;
        document.getElementById('question-text').textContent = problem.question;

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

        document.getElementById('streak-count').textContent = this.state.battle.currentStreak;
        document.getElementById('problems-done').textContent = this.state.battle.currentQuestion;
    },

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

    checkAnswer(selected, correct, button, category) {
        const isCorrect = selected === correct;

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

    processAnswer(isCorrect, category) {
        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        this.state.totalQuestionsAnswered++;
        this.state.categoryStats[category] = (this.state.categoryStats[category] || 0) + 1;

        if (isCorrect) {
            this.state.battle.correctAnswers++;
            this.state.battle.currentStreak++;
            this.state.battle.maxStreak = Math.max(this.state.battle.maxStreak, this.state.battle.currentStreak);

            if (this.state.battle.currentStreak > this.state.highestStreak) {
                this.state.highestStreak = this.state.battle.currentStreak;
            }

            const damage = 20 + (this.state.battle.currentStreak * 2);
            this.state.battle.enemyHealth = Math.max(0, this.state.battle.enemyHealth - damage);
            this.updateHealthBars();

            if (this.state.battle.currentStreak >= 3) {
                this.showCombo(this.state.battle.currentStreak);
            }

            this.playSound('correct');
        } else {
            this.state.battle.wrongAnswers++;
            this.state.battle.currentStreak = 0;

            this.state.battle.playerHealth = Math.max(0, this.state.battle.playerHealth - 15);
            this.updateHealthBars();

            if (this.state.battle.playerHealth <= 0) {
                setTimeout(() => this.endBattle(false), 1000);
                return;
            }

            this.playSound('wrong');
        }

        this.checkAchievements();

        this.state.battle.currentQuestion++;
        setTimeout(() => {
            if (this.state.battle.enemyHealth <= 0) {
                this.endBattle(true);
            } else {
                this.nextQuestion();
            }
        }, 1500);
    },

    handleTimeout() {
        clearInterval(this.state.battle.timer);
        this.state.battle.currentStreak = 0;
        this.state.battle.wrongAnswers++;
        this.state.battle.playerHealth = Math.max(0, this.state.battle.playerHealth - 10);
        this.updateHealthBars();

        this.showNotification("Time's up!", '⏰');

        if (this.state.battle.playerHealth <= 0) {
            setTimeout(() => this.endBattle(false), 1000);
            return;
        }

        this.state.battle.currentQuestion++;
        setTimeout(() => this.nextQuestion(), 1500);
    },

    updateHealthBars() {
        const playerHealth = document.getElementById('player-health');
        const enemyHealth = document.getElementById('enemy-health');

        if (playerHealth) playerHealth.style.width = `${this.state.battle.playerHealth}%`;
        if (enemyHealth) enemyHealth.style.width = `${this.state.battle.enemyHealth}%`;
    },

    updateTimerDisplay() {
        const timerFill = document.getElementById('timer-fill');
        if (timerFill) {
            timerFill.style.width = `${(this.state.battle.timeRemaining / 30) * 100}%`;
        }
    },

    showCombo(streak) {
        const comboDisplay = document.getElementById('combo-display');
        if (comboDisplay) {
            comboDisplay.textContent = `${streak}x Combo!`;
            comboDisplay.classList.remove('show');
            void comboDisplay.offsetWidth;
            comboDisplay.classList.add('show');
        }
    },

    endBattle(victory) {
        if (this.state.battle.timer) {
            clearInterval(this.state.battle.timer);
        }

        if (victory) {
            const accuracy = this.state.battle.correctAnswers / this.state.battle.totalQuestions;
            const stars = accuracy >= 1 ? 3 : (accuracy >= 0.7 ? 2 : 1);

            const baseXP = 50 + (this.state.battle.levelId * 5);
            const bonusXP = Math.floor(this.state.battle.maxStreak * 5);
            const totalXP = Math.floor(baseXP * accuracy) + bonusXP;

            // Add gems for boss levels or perfect scores
            const level = GameData.getLevelById(this.state.battle.levelId);
            if (level && level.boss) {
                this.state.gems += 10;
                this.state.bossesDefeated++;
            }
            if (accuracy === 1) {
                this.state.gems += 5;
                this.state.perfectLevels++;
            }

            // Track level completion
            if (!this.state.completedLevels.includes(this.state.battle.levelId)) {
                this.state.completedLevels.push(this.state.battle.levelId);
            }
            this.state.levelStars[this.state.battle.levelId] = Math.max(
                this.state.levelStars[this.state.battle.levelId] || 0,
                stars
            );

            // UNLOCK FASHION REWARD!
            let unlockedItem = null;
            if (this.state.battle.pendingReward) {
                const reward = this.state.battle.pendingReward;
                const category = reward.type;
                if (!this.state.unlockedFashion[category].includes(reward.id)) {
                    this.state.unlockedFashion[category].push(reward.id);
                    unlockedItem = GameData.getFashionItemById(category, reward.id);
                }
            }

            // Update XP and level
            const oldLevel = this.state.level;
            this.state.xp += totalXP;
            this.state.level = GameData.getLevelFromXP(this.state.xp);

            // Update victory screen
            document.getElementById('xp-earned').textContent = `+${totalXP}`;
            document.getElementById('correct-answers').textContent = this.state.battle.correctAnswers;
            document.getElementById('best-streak').textContent = this.state.battle.maxStreak;

            // Update stars display
            const starsDisplay = document.querySelector('.victory-stars');
            if (starsDisplay) {
                starsDisplay.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
            }

            // Show fashion reward
            const rewardShowcase = document.getElementById('fashion-reward-showcase');
            if (unlockedItem && rewardShowcase) {
                rewardShowcase.style.display = 'block';
                document.querySelector('.unlock-icon').textContent = unlockedItem.emoji;
                document.getElementById('reward-name').textContent = unlockedItem.name;
            } else if (rewardShowcase) {
                rewardShowcase.style.display = 'none';
            }

            this.showScreen('victory-screen');

            if (this.state.level > oldLevel) {
                setTimeout(() => this.showLevelUp(this.state.level), 1000);
            }
        } else {
            // Game over
            const tip = MathProblems.getMathTip(document.getElementById('question-category')?.textContent || 'default');
            document.getElementById('math-tip').textContent = tip;

            // Show what they almost unlocked
            if (this.state.battle.pendingReward) {
                const item = GameData.getFashionItemById(
                    this.state.battle.pendingReward.type,
                    this.state.battle.pendingReward.id
                );
                if (item) {
                    document.getElementById('almost-item').textContent = item.emoji;
                }
            }

            this.showScreen('gameover-screen');
        }

        this.checkAchievements();
        this.saveGame();
    },

    showLevelUp(newLevel) {
        document.getElementById('new-level').textContent = newLevel;
        const unlockItems = document.getElementById('unlock-items');
        unlockItems.innerHTML = '';

        const item = document.createElement('span');
        item.className = 'unlock-item';
        item.textContent = `🌟 Reached Level ${newLevel}!`;
        unlockItems.appendChild(item);

        document.getElementById('level-up-modal').classList.add('show');
        this.saveGame();
    },

    closeLevelUpModal() {
        document.getElementById('level-up-modal').classList.remove('show');
    },

    closeFashionModal() {
        document.getElementById('fashion-unlock-modal').classList.remove('show');
    },

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

    retryLevel() {
        this.startLevel(this.state.battle.levelId);
    },

    // Fashion Closet
    renderFashionCloset() {
        const outfitCount = this.getTotalUnlockedCount();
        const totalCount = GameData.getTotalFashionCount();

        document.getElementById('closet-outfits').textContent = outfitCount;
        document.getElementById('closet-gems').textContent = this.state.gems;
        document.getElementById('outfit-count').textContent = outfitCount;
        document.getElementById('outfit-total').textContent = totalCount;

        this.updateBarbieDisplay();
    },

    getTotalUnlockedCount() {
        let count = 0;
        for (const items of Object.values(this.state.unlockedFashion)) {
            count += items.length;
        }
        return count;
    },

    showClosetCategory(category) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(category.substring(0, 4))) {
                btn.classList.add('active');
            }
        });

        const container = document.getElementById('closet-items');
        if (!container) return;
        container.innerHTML = '';

        const items = GameData.getItemsForCategory(category);
        const unlockedItems = this.state.unlockedFashion[category] || [];

        items.forEach(item => {
            const isUnlocked = unlockedItems.includes(item.id);
            const isSelected = this.isItemSelected(category, item.id);

            const itemDiv = document.createElement('div');
            itemDiv.className = `closet-item ${isUnlocked ? '' : 'locked'} ${isSelected ? 'selected' : ''}`;
            itemDiv.style.position = 'relative';

            const preview = document.createElement('div');
            preview.className = 'item-preview';
            preview.textContent = item.emoji || '👗';

            const name = document.createElement('div');
            name.className = 'item-name';
            name.textContent = item.name;

            itemDiv.appendChild(preview);
            itemDiv.appendChild(name);

            if (!isUnlocked) {
                const unlockInfo = document.createElement('div');
                unlockInfo.className = 'item-unlock-info';
                unlockInfo.textContent = `Level ${item.unlockLevel}`;
                itemDiv.appendChild(unlockInfo);
            } else {
                itemDiv.onclick = () => this.equipFashionItem(category, item.id);
            }

            container.appendChild(itemDiv);
        });
    },

    isItemSelected(category, itemId) {
        switch (category) {
            case 'dresses': return this.state.character.currentDress === itemId;
            case 'tops': return this.state.character.currentTop === itemId;
            case 'accessories': return this.state.character.currentAccessory === itemId;
            case 'shoes': return this.state.character.currentShoes === itemId;
            case 'hairstyles': return this.state.character.currentHairstyle === itemId;
            default: return false;
        }
    },

    equipFashionItem(category, itemId) {
        switch (category) {
            case 'dresses':
                this.state.character.currentDress = itemId;
                break;
            case 'tops':
                this.state.character.currentTop = itemId;
                break;
            case 'accessories':
                this.state.character.currentAccessory = itemId;
                break;
            case 'shoes':
                this.state.character.currentShoes = itemId;
                break;
            case 'hairstyles':
                this.state.character.currentHairstyle = itemId;
                this.state.character.hairStyle = itemId;
                break;
        }

        const item = GameData.getFashionItemById(category, itemId);
        if (item) {
            document.getElementById('current-outfit-name').textContent = item.name;
            this.showNotification(`Wearing: ${item.name}`, item.emoji);
        }

        this.showClosetCategory(category);
        this.updateBarbieDisplay();
        this.saveGame();
    },

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;
        grid.innerHTML = '';

        let unlocked = 0;

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

        document.getElementById('total-achievements').textContent = unlocked;
        document.getElementById('total-fashion').textContent = this.getTotalUnlockedCount();
    },

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
                case 'fashion':
                    earned = this.getTotalUnlockedCount() >= req.count;
                    break;
                case 'category':
                    earned = (this.state.categoryStats[req.category] || 0) >= req.count;
                    break;
                case 'bosses':
                    earned = this.state.bossesDefeated >= req.count;
                    break;
                case 'totalQuestions':
                    earned = this.state.totalQuestionsAnswered >= req.count;
                    break;
                case 'world':
                    const worldLevels = GameData.worlds[req.world].levels.map(l => l.id);
                    earned = worldLevels.every(id => this.state.completedLevels.includes(id));
                    break;
            }

            if (earned) {
                this.state.achievements.push(achievement.id);
                this.showNotification(`Achievement: ${achievement.name}!`, achievement.icon);
            }
        });
    },

    updateAllDisplays() {
        // Update currency/fashion displays
        const gemCount = document.getElementById('gem-count');
        if (gemCount) gemCount.textContent = this.state.gems;

        const outfitCount = document.getElementById('outfit-count');
        const outfitTotal = document.getElementById('outfit-total');
        if (outfitCount) outfitCount.textContent = this.getTotalUnlockedCount();
        if (outfitTotal) outfitTotal.textContent = GameData.getTotalFashionCount();

        // Update player info
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

        // Update mini barbie avatar
        const miniBarbie = document.getElementById('mini-barbie');
        if (miniBarbie) {
            miniBarbie.textContent = '👸';
            miniBarbie.style.background = this.state.character.hairColor;
        }
    },

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

    playSound(type) {
        if (!this.state.settings.sfx) return;
    },

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('barbieMathAdventure');
            location.reload();
        }
    },

    saveGame() {
        const saveData = {
            playerName: this.state.playerName,
            grade: this.state.grade,
            level: this.state.level,
            xp: this.state.xp,
            gems: this.state.gems,
            character: this.state.character,
            unlockedFashion: this.state.unlockedFashion,
            completedLevels: this.state.completedLevels,
            levelStars: this.state.levelStars,
            highestStreak: this.state.highestStreak,
            totalQuestionsAnswered: this.state.totalQuestionsAnswered,
            categoryStats: this.state.categoryStats,
            perfectLevels: this.state.perfectLevels,
            bossesDefeated: this.state.bossesDefeated,
            achievements: this.state.achievements,
            settings: this.state.settings
        };

        localStorage.setItem('barbieMathAdventure', JSON.stringify(saveData));
    },

    loadGame() {
        const saved = localStorage.getItem('barbieMathAdventure');
        if (saved) {
            try {
                const saveData = JSON.parse(saved);
                Object.assign(this.state, saveData);

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

document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
