/**
 * Barbie Math Adventure - Game Data
 * Contains all game content: customization, achievements, world, items
 */

const GameData = {
    // Character customization options
    customization: {
        hairStyles: [
            { id: 'long', name: 'Long', style: 'border-radius: 60px 60px 20px 20px; height: 80px;' },
            { id: 'short', name: 'Short', style: 'border-radius: 50px 50px 10px 10px; height: 50px;' },
            { id: 'ponytail', name: 'Ponytail', style: 'border-radius: 50px 50px 0 0; height: 55px; position: relative;' },
            { id: 'curly', name: 'Curly', style: 'border-radius: 60px 60px 30px 30px; height: 70px; border: 3px wavy;' },
            { id: 'braids', name: 'Braids', style: 'border-radius: 45px 45px 5px 5px; height: 85px;' },
            { id: 'bun', name: 'Bun', style: 'border-radius: 50%; height: 50px; width: 70px;' }
        ],
        hairColors: [
            { id: 'blonde', name: 'Blonde', color: '#F4D03F' },
            { id: 'brunette', name: 'Brunette', color: '#6B4423' },
            { id: 'black', name: 'Black', color: '#1C1C1C' },
            { id: 'red', name: 'Red', color: '#C0392B' },
            { id: 'pink', name: 'Pink', color: '#FF69B4' },
            { id: 'purple', name: 'Purple', color: '#9B59B6' },
            { id: 'blue', name: 'Blue', color: '#3498DB' },
            { id: 'rainbow', name: 'Rainbow', color: 'linear-gradient(90deg, #FF69B4, #9B59B6, #3498DB)' }
        ],
        skinTones: [
            { id: 'light', name: 'Light', color: '#FDEBD0' },
            { id: 'fair', name: 'Fair', color: '#F5CBA7' },
            { id: 'medium', name: 'Medium', color: '#E59866' },
            { id: 'tan', name: 'Tan', color: '#CA9865' },
            { id: 'brown', name: 'Brown', color: '#A0522D' },
            { id: 'dark', name: 'Dark', color: '#6B4423' }
        ],
        outfits: [
            { id: 'princess', name: 'Princess Dress', color: '#FF69B4', emoji: '👗', unlockLevel: 1 },
            { id: 'casual', name: 'Casual Chic', color: '#87CEEB', emoji: '👚', unlockLevel: 1 },
            { id: 'sporty', name: 'Sporty', color: '#98D8AA', emoji: '🏃‍♀️', unlockLevel: 2 },
            { id: 'glamour', name: 'Glamour Gown', color: '#9B59B6', emoji: '✨', unlockLevel: 3 },
            { id: 'mermaid', name: 'Mermaid', color: '#48D1CC', emoji: '🧜‍♀️', unlockLevel: 5 },
            { id: 'fairy', name: 'Fairy', color: '#DDA0DD', emoji: '🧚', unlockLevel: 7 },
            { id: 'astronaut', name: 'Astronaut', color: '#C0C0C0', emoji: '🚀', unlockLevel: 10 },
            { id: 'superhero', name: 'Superhero', color: '#E74C3C', emoji: '🦸‍♀️', unlockLevel: 12 },
            { id: 'rainbow', name: 'Rainbow Queen', color: 'linear-gradient(#FF69B4, #9B59B6, #3498DB)', emoji: '🌈', unlockLevel: 15 }
        ],
        accessories: [
            { id: 'none', name: 'None', emoji: '', unlockLevel: 1 },
            { id: 'tiara', name: 'Tiara', emoji: '👑', unlockLevel: 1 },
            { id: 'bow', name: 'Hair Bow', emoji: '🎀', unlockLevel: 2 },
            { id: 'flower', name: 'Flower', emoji: '🌸', unlockLevel: 3 },
            { id: 'star', name: 'Star', emoji: '⭐', unlockLevel: 5 },
            { id: 'butterfly', name: 'Butterfly', emoji: '🦋', unlockLevel: 7 },
            { id: 'heart', name: 'Heart', emoji: '💖', unlockLevel: 10 },
            { id: 'diamond', name: 'Diamond', emoji: '💎', unlockLevel: 15 }
        ]
    },

    // World/Adventure map locations
    worlds: {
        dreamland: {
            name: "Barbie's Dreamland",
            description: "Begin your magical math adventure!",
            background: 'linear-gradient(180deg, #87CEEB 0%, #98D8AA 60%, #90EE90 100%)',
            levels: [
                { id: 1, name: 'Dreamhouse Garden', icon: '🏠', enemy: '🐛', enemyName: 'Garden Bug', questions: 5 },
                { id: 2, name: 'Flower Path', icon: '🌸', enemy: '🐝', enemyName: 'Buzzy Bee', questions: 5 },
                { id: 3, name: 'Rainbow Bridge', icon: '🌈', enemy: '🦋', enemyName: 'Puzzle Butterfly', questions: 6 },
                { id: 4, name: 'Sparkle Lake', icon: '✨', enemy: '🐸', enemyName: 'Froggy', questions: 6 },
                { id: 5, name: 'Crystal Cave', icon: '💎', enemy: '🦇', enemyName: 'Math Bat', questions: 7, boss: true }
            ]
        },
        fairyForest: {
            name: 'Enchanted Forest',
            description: 'Magical creatures await!',
            background: 'linear-gradient(180deg, #9B59B6 0%, #8E44AD 50%, #6B2D5B 100%)',
            levels: [
                { id: 6, name: 'Fairy Grove', icon: '🧚', enemy: '🍄', enemyName: 'Mushroom Sprite', questions: 6 },
                { id: 7, name: 'Unicorn Meadow', icon: '🦄', enemy: '🌙', enemyName: 'Moon Pixie', questions: 6 },
                { id: 8, name: 'Magic Stream', icon: '💫', enemy: '🐟', enemyName: 'Math Fish', questions: 7 },
                { id: 9, name: 'Treehouse Village', icon: '🌳', enemy: '🐿️', enemyName: 'Nutty Squirrel', questions: 7 },
                { id: 10, name: 'Dragon\'s Den', icon: '🐉', enemy: '🐲', enemyName: 'Number Dragon', questions: 8, boss: true }
            ]
        },
        oceanKingdom: {
            name: 'Ocean Kingdom',
            description: 'Dive into underwater math!',
            background: 'linear-gradient(180deg, #3498DB 0%, #2980B9 50%, #1A5276 100%)',
            levels: [
                { id: 11, name: 'Coral Reef', icon: '🪸', enemy: '🦀', enemyName: 'Crabby Calculator', questions: 7 },
                { id: 12, name: 'Mermaid Cove', icon: '🧜‍♀️', enemy: '🐙', enemyName: 'Octo-Math', questions: 7 },
                { id: 13, name: 'Sunken Ship', icon: '⚓', enemy: '🦈', enemyName: 'Sharky', questions: 8 },
                { id: 14, name: 'Pearl Palace', icon: '🏰', enemy: '🐚', enemyName: 'Shell Guardian', questions: 8 },
                { id: 15, name: 'Kraken\'s Lair', icon: '🌊', enemy: '🦑', enemyName: 'Kraken King', questions: 10, boss: true }
            ]
        },
        skycastle: {
            name: 'Sky Castle',
            description: 'Reach for the stars!',
            background: 'linear-gradient(180deg, #FFB6C1 0%, #FF69B4 50%, #E0218A 100%)',
            levels: [
                { id: 16, name: 'Cloud Garden', icon: '☁️', enemy: '🌤️', enemyName: 'Sun Sprite', questions: 8 },
                { id: 17, name: 'Star Bridge', icon: '⭐', enemy: '🌟', enemyName: 'Twinkle', questions: 8 },
                { id: 18, name: 'Moon Tower', icon: '🌙', enemy: '🦉', enemyName: 'Wise Owl', questions: 9 },
                { id: 19, name: 'Aurora Hall', icon: '🌌', enemy: '👻', enemyName: 'Ghost Guardian', questions: 9 },
                { id: 20, name: 'Royal Throne', icon: '👑', enemy: '🧙‍♀️', enemyName: 'Math Sorceress', questions: 10, boss: true }
            ]
        }
    },

    // Achievements
    achievements: [
        { id: 'first_win', name: 'First Victory', description: 'Complete your first level', icon: '🌟', requirement: { type: 'levels', count: 1 } },
        { id: 'streak_5', name: 'On Fire!', description: 'Get a 5 answer streak', icon: '🔥', requirement: { type: 'streak', count: 5 } },
        { id: 'streak_10', name: 'Unstoppable!', description: 'Get a 10 answer streak', icon: '💥', requirement: { type: 'streak', count: 10 } },
        { id: 'perfect_level', name: 'Perfect Score', description: 'Complete a level with no mistakes', icon: '💯', requirement: { type: 'perfect', count: 1 } },
        { id: 'math_explorer', name: 'Math Explorer', description: 'Complete 10 levels', icon: '🗺️', requirement: { type: 'levels', count: 10 } },
        { id: 'math_master', name: 'Math Master', description: 'Complete all 20 levels', icon: '🏆', requirement: { type: 'levels', count: 20 } },
        { id: 'addition_ace', name: 'Addition Ace', description: 'Answer 50 addition problems', icon: '➕', requirement: { type: 'category', category: 'Addition', count: 50 } },
        { id: 'subtraction_star', name: 'Subtraction Star', description: 'Answer 50 subtraction problems', icon: '➖', requirement: { type: 'category', category: 'Subtraction', count: 50 } },
        { id: 'multiplication_maven', name: 'Multiplication Maven', description: 'Answer 50 multiplication problems', icon: '✖️', requirement: { type: 'category', category: 'Multiplication', count: 50 } },
        { id: 'division_diva', name: 'Division Diva', description: 'Answer 50 division problems', icon: '➗', requirement: { type: 'category', category: 'Division', count: 50 } },
        { id: 'collector', name: 'Gem Collector', description: 'Collect 100 gems', icon: '💎', requirement: { type: 'gems', count: 100 } },
        { id: 'fashionista', name: 'Fashionista', description: 'Unlock 5 outfits', icon: '👗', requirement: { type: 'outfits', count: 5 } },
        { id: 'level_5', name: 'Rising Star', description: 'Reach level 5', icon: '⭐', requirement: { type: 'playerLevel', count: 5 } },
        { id: 'level_10', name: 'Shining Star', description: 'Reach level 10', icon: '🌟', requirement: { type: 'playerLevel', count: 10 } },
        { id: 'level_20', name: 'Superstar', description: 'Reach level 20', icon: '💫', requirement: { type: 'playerLevel', count: 20 } },
        { id: 'boss_slayer', name: 'Boss Slayer', description: 'Defeat all 4 bosses', icon: '🐲', requirement: { type: 'bosses', count: 4 } },
        { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 10 questions in under 30 seconds', icon: '⚡', requirement: { type: 'speed', count: 10 } },
        { id: 'dedication', name: 'Dedicated Learner', description: 'Answer 500 questions total', icon: '📚', requirement: { type: 'totalQuestions', count: 500 } }
    ],

    // Shop items
    shopItems: {
        outfits: [
            { id: 'ballerina', name: 'Ballerina', emoji: '🩰', price: 500, priceType: 'coins' },
            { id: 'chef', name: 'Chef', emoji: '👩‍🍳', price: 500, priceType: 'coins' },
            { id: 'doctor', name: 'Doctor', emoji: '👩‍⚕️', price: 750, priceType: 'coins' },
            { id: 'pilot', name: 'Pilot', emoji: '👩‍✈️', price: 750, priceType: 'coins' },
            { id: 'rockstar', name: 'Rockstar', emoji: '🎸', price: 25, priceType: 'gems' },
            { id: 'queen', name: 'Queen', emoji: '👸', price: 50, priceType: 'gems' }
        ],
        accessories: [
            { id: 'glasses', name: 'Sparkle Glasses', emoji: '👓', price: 200, priceType: 'coins' },
            { id: 'necklace', name: 'Pearl Necklace', emoji: '📿', price: 300, priceType: 'coins' },
            { id: 'wings', name: 'Fairy Wings', emoji: '🪽', price: 15, priceType: 'gems' },
            { id: 'halo', name: 'Golden Halo', emoji: '😇', price: 20, priceType: 'gems' }
        ],
        hair: [
            { id: 'silver', name: 'Silver Hair', color: '#C0C0C0', price: 400, priceType: 'coins' },
            { id: 'rose_gold', name: 'Rose Gold Hair', color: '#B76E79', price: 500, priceType: 'coins' },
            { id: 'galaxy', name: 'Galaxy Hair', color: 'linear-gradient(180deg, #1A1A2E, #9B59B6, #FF69B4)', price: 30, priceType: 'gems' }
        ]
    },

    // Level up rewards
    levelRewards: {
        2: { coins: 100, message: 'New outfit unlocked: Sporty!' },
        3: { coins: 150, gems: 5, message: 'New accessory unlocked: Flower!' },
        5: { coins: 200, gems: 10, message: 'New outfit unlocked: Mermaid!' },
        7: { coins: 250, gems: 10, message: 'New outfit unlocked: Fairy!' },
        10: { coins: 500, gems: 25, message: 'New outfit unlocked: Astronaut!' },
        12: { coins: 500, gems: 25, message: 'New outfit unlocked: Superhero!' },
        15: { coins: 750, gems: 50, message: 'New outfit unlocked: Rainbow Queen!' },
        20: { coins: 1000, gems: 100, message: 'Congratulations! You are a Math Champion!' }
    },

    // XP requirements per level
    xpRequirements: [
        0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, // Levels 1-10
        3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10500 // Levels 11-20
    ],

    // Enemy defeat messages
    defeatMessages: [
        "Fabulous! You solved it!",
        "Amazing work, math star!",
        "You're glowing with genius!",
        "Sparkle-tastic problem solving!",
        "That was totally glamorous!",
        "You're on fire!",
        "Math magic at its finest!",
        "Absolutely brilliant!",
        "You make math look easy!",
        "Pink power prevails!"
    ],

    // Encouragement messages for wrong answers
    encouragementMessages: [
        "Almost! Try again!",
        "You've got this!",
        "Keep going, superstar!",
        "Practice makes perfect!",
        "Don't give up!",
        "Think it through!",
        "You're learning!",
        "Every try makes you stronger!"
    ],

    // Get random defeat message
    getDefeatMessage() {
        return this.defeatMessages[Math.floor(Math.random() * this.defeatMessages.length)];
    },

    // Get random encouragement
    getEncouragement() {
        return this.encouragementMessages[Math.floor(Math.random() * this.encouragementMessages.length)];
    },

    // Get level data by ID
    getLevelById(levelId) {
        for (const world of Object.values(this.worlds)) {
            const level = world.levels.find(l => l.id === levelId);
            if (level) {
                return { ...level, world: world.name, background: world.background };
            }
        }
        return null;
    },

    // Get all levels as flat array
    getAllLevels() {
        const levels = [];
        for (const world of Object.values(this.worlds)) {
            for (const level of world.levels) {
                levels.push({ ...level, world: world.name, background: world.background });
            }
        }
        return levels;
    },

    // Calculate XP needed for next level
    getXPForLevel(level) {
        if (level >= this.xpRequirements.length) {
            return this.xpRequirements[this.xpRequirements.length - 1] + (level - this.xpRequirements.length + 1) * 1200;
        }
        return this.xpRequirements[level];
    },

    // Calculate level from total XP
    getLevelFromXP(totalXP) {
        let level = 1;
        for (let i = 1; i < this.xpRequirements.length; i++) {
            if (totalXP >= this.xpRequirements[i]) {
                level = i + 1;
            } else {
                break;
            }
        }
        return level;
    }
};

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameData;
}
