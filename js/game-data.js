/**
 * Barbie Math Adventure - Game Data
 * Contains all game content: fashion items, achievements, world, customization
 * Fashion items are unlocked by completing math levels!
 */

const GameData = {
    // Fashion Items - The core reward system!
    // Each level completion unlocks a specific fashion item
    fashionItems: {
        dresses: [
            { id: 'pink-classic', name: 'Pink Classic Dress', emoji: '👗', color: '#FF69B4', unlockLevel: 0, category: 'dresses' },
            { id: 'casual-blue', name: 'Casual Blue Dress', emoji: '👗', color: '#87CEEB', unlockLevel: 1, category: 'dresses' },
            { id: 'party-purple', name: 'Party Purple', emoji: '👗', color: '#9B59B6', unlockLevel: 2, category: 'dresses' },
            { id: 'summer-yellow', name: 'Summer Yellow', emoji: '👗', color: '#F4D03F', unlockLevel: 3, category: 'dresses' },
            { id: 'elegant-red', name: 'Elegant Red', emoji: '👗', color: '#E74C3C', unlockLevel: 5, category: 'dresses' },
            { id: 'mermaid-teal', name: 'Mermaid Gown', emoji: '🧜‍♀️', color: '#48D1CC', unlockLevel: 7, category: 'dresses' },
            { id: 'princess-pink', name: 'Princess Ball Gown', emoji: '👸', color: '#FFB6C1', unlockLevel: 10, category: 'dresses' },
            { id: 'fairy-lavender', name: 'Fairy Dress', emoji: '🧚', color: '#E8D4E8', unlockLevel: 12, category: 'dresses' },
            { id: 'glamour-gold', name: 'Golden Glamour', emoji: '✨', color: '#FFD700', unlockLevel: 15, category: 'dresses' },
            { id: 'rainbow-queen', name: 'Rainbow Queen Gown', emoji: '🌈', color: 'rainbow', unlockLevel: 20, category: 'dresses' }
        ],
        tops: [
            { id: 'basic-tee', name: 'Basic Pink Tee', emoji: '👚', color: '#FF69B4', unlockLevel: 0, category: 'tops' },
            { id: 'sporty-tank', name: 'Sporty Tank', emoji: '👕', color: '#FF6B6B', unlockLevel: 4, category: 'tops' },
            { id: 'fancy-blouse', name: 'Fancy Blouse', emoji: '👚', color: '#DDA0DD', unlockLevel: 6, category: 'tops' },
            { id: 'sparkle-top', name: 'Sparkle Top', emoji: '✨', color: '#C0C0C0', unlockLevel: 8, category: 'tops' },
            { id: 'crop-heart', name: 'Heart Crop Top', emoji: '💖', color: '#E0218A', unlockLevel: 11, category: 'tops' },
            { id: 'royal-corset', name: 'Royal Corset', emoji: '👑', color: '#8E44AD', unlockLevel: 14, category: 'tops' }
        ],
        accessories: [
            { id: 'none', name: 'None', emoji: '', unlockLevel: 0, category: 'accessories' },
            { id: 'hair-bow', name: 'Pink Hair Bow', emoji: '🎀', unlockLevel: 1, category: 'accessories' },
            { id: 'flower-clip', name: 'Flower Clip', emoji: '🌸', unlockLevel: 2, category: 'accessories' },
            { id: 'star-clip', name: 'Star Clip', emoji: '⭐', unlockLevel: 4, category: 'accessories' },
            { id: 'butterfly-pin', name: 'Butterfly Pin', emoji: '🦋', unlockLevel: 6, category: 'accessories' },
            { id: 'silver-tiara', name: 'Silver Tiara', emoji: '👑', unlockLevel: 8, category: 'accessories' },
            { id: 'gold-crown', name: 'Golden Crown', emoji: '👑', unlockLevel: 10, category: 'accessories' },
            { id: 'diamond-tiara', name: 'Diamond Tiara', emoji: '💎', unlockLevel: 15, category: 'accessories' },
            { id: 'fairy-wings', name: 'Fairy Wings', emoji: '🪽', unlockLevel: 18, category: 'accessories' },
            { id: 'angel-halo', name: 'Angel Halo', emoji: '😇', unlockLevel: 20, category: 'accessories' }
        ],
        shoes: [
            { id: 'pink-flats', name: 'Pink Flats', emoji: '👟', color: '#FF69B4', unlockLevel: 0, category: 'shoes' },
            { id: 'ballet-slippers', name: 'Ballet Slippers', emoji: '🩰', color: '#FFB6C1', unlockLevel: 3, category: 'shoes' },
            { id: 'sparkle-heels', name: 'Sparkle Heels', emoji: '👠', color: '#C0C0C0', unlockLevel: 5, category: 'shoes' },
            { id: 'red-heels', name: 'Red High Heels', emoji: '👠', color: '#E74C3C', unlockLevel: 7, category: 'shoes' },
            { id: 'glass-slippers', name: 'Glass Slippers', emoji: '👠', color: '#87CEEB', unlockLevel: 10, category: 'shoes' },
            { id: 'gold-heels', name: 'Golden Heels', emoji: '👠', color: '#FFD700', unlockLevel: 13, category: 'shoes' },
            { id: 'diamond-heels', name: 'Diamond Heels', emoji: '💎', color: '#E8E8E8', unlockLevel: 17, category: 'shoes' },
            { id: 'rainbow-boots', name: 'Rainbow Boots', emoji: '🌈', color: 'rainbow', unlockLevel: 19, category: 'shoes' }
        ],
        hairstyles: [
            { id: 'long', name: 'Long & Straight', emoji: '💇', unlockLevel: 0, category: 'hairstyles' },
            { id: 'ponytail', name: 'High Ponytail', emoji: '💇', unlockLevel: 2, category: 'hairstyles' },
            { id: 'curly', name: 'Bouncy Curls', emoji: '💇', unlockLevel: 4, category: 'hairstyles' },
            { id: 'braids', name: 'Twin Braids', emoji: '💇', unlockLevel: 6, category: 'hairstyles' },
            { id: 'bun', name: 'Elegant Bun', emoji: '💇', unlockLevel: 9, category: 'hairstyles' },
            { id: 'princess', name: 'Princess Waves', emoji: '👸', unlockLevel: 12, category: 'hairstyles' },
            { id: 'mermaid', name: 'Mermaid Waves', emoji: '🧜‍♀️', unlockLevel: 16, category: 'hairstyles' }
        ]
    },

    // Character customization - colors available from start
    customization: {
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
        eyeColors: [
            { id: 'blue', name: 'Blue', color: '#5DADE2' },
            { id: 'green', name: 'Green', color: '#58D68D' },
            { id: 'brown', name: 'Brown', color: '#8B7355' },
            { id: 'hazel', name: 'Hazel', color: '#9A7B4F' },
            { id: 'purple', name: 'Purple', color: '#9B59B6' },
            { id: 'pink', name: 'Pink', color: '#FF69B4' }
        ]
    },

    // World/Adventure map locations - each level unlocks a fashion item!
    worlds: {
        dreamland: {
            name: "Barbie's Dreamland",
            description: "Begin your magical math adventure!",
            background: 'linear-gradient(180deg, #87CEEB 0%, #98D8AA 60%, #90EE90 100%)',
            levels: [
                { id: 1, name: 'Dreamhouse Garden', icon: '🏠', enemy: '🐛', enemyName: 'Garden Bug', questions: 5, reward: { type: 'dresses', id: 'casual-blue' } },
                { id: 2, name: 'Flower Path', icon: '🌸', enemy: '🐝', enemyName: 'Buzzy Bee', questions: 5, reward: { type: 'accessories', id: 'flower-clip' } },
                { id: 3, name: 'Rainbow Bridge', icon: '🌈', enemy: '🦋', enemyName: 'Puzzle Butterfly', questions: 6, reward: { type: 'shoes', id: 'ballet-slippers' } },
                { id: 4, name: 'Sparkle Lake', icon: '✨', enemy: '🐸', enemyName: 'Froggy', questions: 6, reward: { type: 'tops', id: 'sporty-tank' } },
                { id: 5, name: 'Crystal Cave', icon: '💎', enemy: '🦇', enemyName: 'Math Bat', questions: 7, reward: { type: 'dresses', id: 'elegant-red' }, boss: true }
            ]
        },
        fairyForest: {
            name: 'Enchanted Forest',
            description: 'Magical creatures await!',
            background: 'linear-gradient(180deg, #9B59B6 0%, #8E44AD 50%, #6B2D5B 100%)',
            levels: [
                { id: 6, name: 'Fairy Grove', icon: '🧚', enemy: '🍄', enemyName: 'Mushroom Sprite', questions: 6, reward: { type: 'tops', id: 'fancy-blouse' } },
                { id: 7, name: 'Unicorn Meadow', icon: '🦄', enemy: '🌙', enemyName: 'Moon Pixie', questions: 6, reward: { type: 'dresses', id: 'mermaid-teal' } },
                { id: 8, name: 'Magic Stream', icon: '💫', enemy: '🐟', enemyName: 'Math Fish', questions: 7, reward: { type: 'accessories', id: 'silver-tiara' } },
                { id: 9, name: 'Treehouse Village', icon: '🌳', enemy: '🐿️', enemyName: 'Nutty Squirrel', questions: 7, reward: { type: 'hairstyles', id: 'bun' } },
                { id: 10, name: 'Dragon\'s Den', icon: '🐉', enemy: '🐲', enemyName: 'Number Dragon', questions: 8, reward: { type: 'dresses', id: 'princess-pink' }, boss: true }
            ]
        },
        oceanKingdom: {
            name: 'Ocean Kingdom',
            description: 'Dive into underwater math!',
            background: 'linear-gradient(180deg, #3498DB 0%, #2980B9 50%, #1A5276 100%)',
            levels: [
                { id: 11, name: 'Coral Reef', icon: '🪸', enemy: '🦀', enemyName: 'Crabby Calculator', questions: 7, reward: { type: 'tops', id: 'crop-heart' } },
                { id: 12, name: 'Mermaid Cove', icon: '🧜‍♀️', enemy: '🐙', enemyName: 'Octo-Math', questions: 7, reward: { type: 'dresses', id: 'fairy-lavender' } },
                { id: 13, name: 'Sunken Ship', icon: '⚓', enemy: '🦈', enemyName: 'Sharky', questions: 8, reward: { type: 'shoes', id: 'gold-heels' } },
                { id: 14, name: 'Pearl Palace', icon: '🏰', enemy: '🐚', enemyName: 'Shell Guardian', questions: 8, reward: { type: 'tops', id: 'royal-corset' } },
                { id: 15, name: 'Kraken\'s Lair', icon: '🌊', enemy: '🦑', enemyName: 'Kraken King', questions: 10, reward: { type: 'dresses', id: 'glamour-gold' }, boss: true }
            ]
        },
        skycastle: {
            name: 'Sky Castle',
            description: 'Reach for the stars!',
            background: 'linear-gradient(180deg, #FFB6C1 0%, #FF69B4 50%, #E0218A 100%)',
            levels: [
                { id: 16, name: 'Cloud Garden', icon: '☁️', enemy: '🌤️', enemyName: 'Sun Sprite', questions: 8, reward: { type: 'hairstyles', id: 'mermaid' } },
                { id: 17, name: 'Star Bridge', icon: '⭐', enemy: '🌟', enemyName: 'Twinkle', questions: 8, reward: { type: 'shoes', id: 'diamond-heels' } },
                { id: 18, name: 'Moon Tower', icon: '🌙', enemy: '🦉', enemyName: 'Wise Owl', questions: 9, reward: { type: 'accessories', id: 'fairy-wings' } },
                { id: 19, name: 'Aurora Hall', icon: '🌌', enemy: '👻', enemyName: 'Ghost Guardian', questions: 9, reward: { type: 'shoes', id: 'rainbow-boots' } },
                { id: 20, name: 'Royal Throne', icon: '👑', enemy: '🧙‍♀️', enemyName: 'Math Sorceress', questions: 10, reward: { type: 'dresses', id: 'rainbow-queen' }, boss: true }
            ]
        }
    },

    // Achievements
    achievements: [
        { id: 'first_win', name: 'First Victory', description: 'Complete your first level', icon: '🌟', requirement: { type: 'levels', count: 1 } },
        { id: 'fashionista_5', name: 'Fashion Starter', description: 'Unlock 5 fashion items', icon: '👗', requirement: { type: 'fashion', count: 5 } },
        { id: 'fashionista_15', name: 'Fashion Expert', description: 'Unlock 15 fashion items', icon: '👠', requirement: { type: 'fashion', count: 15 } },
        { id: 'fashionista_30', name: 'Fashion Queen', description: 'Unlock all fashion items', icon: '👑', requirement: { type: 'fashion', count: 30 } },
        { id: 'streak_5', name: 'On Fire!', description: 'Get a 5 answer streak', icon: '🔥', requirement: { type: 'streak', count: 5 } },
        { id: 'streak_10', name: 'Unstoppable!', description: 'Get a 10 answer streak', icon: '💥', requirement: { type: 'streak', count: 10 } },
        { id: 'perfect_level', name: 'Perfect Score', description: 'Complete a level with no mistakes', icon: '💯', requirement: { type: 'perfect', count: 1 } },
        { id: 'math_explorer', name: 'Math Explorer', description: 'Complete 10 levels', icon: '🗺️', requirement: { type: 'levels', count: 10 } },
        { id: 'math_master', name: 'Math Master', description: 'Complete all 20 levels', icon: '🏆', requirement: { type: 'levels', count: 20 } },
        { id: 'addition_ace', name: 'Addition Ace', description: 'Answer 50 addition problems', icon: '➕', requirement: { type: 'category', category: 'Addition', count: 50 } },
        { id: 'multiplication_maven', name: 'Multiplication Maven', description: 'Answer 50 multiplication problems', icon: '✖️', requirement: { type: 'category', category: 'Multiplication', count: 50 } },
        { id: 'boss_slayer', name: 'Boss Slayer', description: 'Defeat all 4 bosses', icon: '🐲', requirement: { type: 'bosses', count: 4 } },
        { id: 'dedication', name: 'Dedicated Learner', description: 'Answer 500 questions total', icon: '📚', requirement: { type: 'totalQuestions', count: 500 } },
        { id: 'complete_world1', name: 'Dreamland Champion', description: 'Complete all of Dreamland', icon: '🏠', requirement: { type: 'world', world: 'dreamland' } },
        { id: 'complete_world2', name: 'Forest Friend', description: 'Complete Enchanted Forest', icon: '🧚', requirement: { type: 'world', world: 'fairyForest' } },
        { id: 'complete_world3', name: 'Ocean Explorer', description: 'Complete Ocean Kingdom', icon: '🧜‍♀️', requirement: { type: 'world', world: 'oceanKingdom' } },
        { id: 'complete_world4', name: 'Sky Princess', description: 'Complete Sky Castle', icon: '👸', requirement: { type: 'world', world: 'skycastle' } }
    ],

    // XP requirements per level
    xpRequirements: [
        0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700,
        3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10500
    ],

    // Messages
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

    // Helper methods
    getDefeatMessage() {
        return this.defeatMessages[Math.floor(Math.random() * this.defeatMessages.length)];
    },

    getEncouragement() {
        return this.encouragementMessages[Math.floor(Math.random() * this.encouragementMessages.length)];
    },

    getLevelById(levelId) {
        for (const world of Object.values(this.worlds)) {
            const level = world.levels.find(l => l.id === levelId);
            if (level) {
                return { ...level, world: world.name, worldKey: Object.keys(this.worlds).find(k => this.worlds[k] === world), background: world.background };
            }
        }
        return null;
    },

    getAllLevels() {
        const levels = [];
        for (const [worldKey, world] of Object.entries(this.worlds)) {
            for (const level of world.levels) {
                levels.push({ ...level, world: world.name, worldKey, background: world.background });
            }
        }
        return levels;
    },

    getAllFashionItems() {
        const items = [];
        for (const [category, categoryItems] of Object.entries(this.fashionItems)) {
            for (const item of categoryItems) {
                items.push({ ...item, category });
            }
        }
        return items;
    },

    getFashionItemById(category, id) {
        const categoryItems = this.fashionItems[category];
        if (categoryItems) {
            return categoryItems.find(item => item.id === id);
        }
        return null;
    },

    getItemsForCategory(category) {
        return this.fashionItems[category] || [];
    },

    getTotalFashionCount() {
        let count = 0;
        for (const items of Object.values(this.fashionItems)) {
            count += items.length;
        }
        return count;
    },

    getXPForLevel(level) {
        if (level >= this.xpRequirements.length) {
            return this.xpRequirements[this.xpRequirements.length - 1] + (level - this.xpRequirements.length + 1) * 1200;
        }
        return this.xpRequirements[level];
    },

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
    },

    // Get the next fashion item the player will unlock
    getNextUnlockableItem(unlockedItems, completedLevels) {
        const allLevels = this.getAllLevels();
        for (const level of allLevels) {
            if (!completedLevels.includes(level.id) && level.reward) {
                const item = this.getFashionItemById(level.reward.type, level.reward.id);
                if (item && !unlockedItems.includes(item.id)) {
                    return { level, item };
                }
            }
        }
        return null;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameData;
}
