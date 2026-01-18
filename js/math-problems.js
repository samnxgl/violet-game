/**
 * Barbie Math Adventure - Math Problem Generator
 * Generates age-appropriate math problems for grades K-5
 */

const MathProblems = {
    // Categories of math problems
    categories: {
        counting: 'Counting',
        addition: 'Addition',
        subtraction: 'Subtraction',
        multiplication: 'Multiplication',
        division: 'Division',
        fractions: 'Fractions',
        comparison: 'Comparison',
        patterns: 'Patterns',
        placeValue: 'Place Value',
        measurement: 'Measurement',
        time: 'Time',
        money: 'Money'
    },

    // Fun Barbie-themed word problem templates
    wordProblemTemplates: {
        addition: [
            "Barbie has {a} pink dresses and buys {b} more. How many dresses does she have now?",
            "At the dreamhouse, there are {a} butterflies and {b} more fly in. How many butterflies are there?",
            "Barbie picked {a} flowers and her friend Chelsea picked {b} flowers. How many flowers do they have together?",
            "There are {a} cupcakes at the party. Barbie bakes {b} more. How many cupcakes are there now?",
            "Barbie has {a} gems and finds {b} more in the garden. How many gems does she have?"
        ],
        subtraction: [
            "Barbie has {a} sparkly stickers and gives {b} to her friend. How many stickers does she have left?",
            "There are {a} puppies at the pet salon. {b} puppies go home. How many puppies are left?",
            "Barbie has {a} ribbons. She uses {b} for her art project. How many ribbons remain?",
            "The boutique has {a} shoes. Barbie buys {b} pairs. How many shoes are left?",
            "There were {a} stars in Barbie's tiara. {b} fell off. How many stars are still on the tiara?"
        ],
        multiplication: [
            "Barbie has {a} boxes with {b} bracelets in each. How many bracelets does she have?",
            "There are {a} shelves with {b} dolls on each shelf. How many dolls are there?",
            "Barbie's garden has {a} rows with {b} flowers in each row. How many flowers are there?",
            "Each of Barbie's {a} friends brings {b} cupcakes. How many cupcakes do they bring in total?",
            "Barbie drives her car {a} times a week, {b} miles each time. How many miles does she drive each week?"
        ],
        division: [
            "Barbie has {a} cookies to share equally among {b} friends. How many cookies does each friend get?",
            "There are {a} gems to put in {b} treasure boxes equally. How many gems go in each box?",
            "Barbie needs to arrange {a} flowers into {b} vases equally. How many flowers in each vase?",
            "{a} stickers need to be divided among {b} pages equally. How many stickers per page?",
            "Barbie has {a} beads to make {b} necklaces. How many beads for each necklace?"
        ]
    },

    /**
     * Generate a problem based on grade level
     * @param {string} grade - Grade level (K, 1, 2, 3, 4, 5)
     * @param {string} difficulty - easy, normal, hard
     * @returns {Object} Problem object with question, answer, options, category
     */
    generateProblem(grade, difficulty = 'normal') {
        const difficultyMultiplier = {
            easy: 0.7,
            normal: 1,
            hard: 1.3
        };
        const mult = difficultyMultiplier[difficulty] || 1;

        switch (grade) {
            case 'K':
                return this.generateKindergartenProblem(mult);
            case '1':
                return this.generateGrade1Problem(mult);
            case '2':
                return this.generateGrade2Problem(mult);
            case '3':
                return this.generateGrade3Problem(mult);
            case '4':
                return this.generateGrade4Problem(mult);
            case '5':
                return this.generateGrade5Problem(mult);
            default:
                return this.generateGrade1Problem(mult);
        }
    },

    /**
     * Kindergarten: Counting, number recognition, simple addition up to 10
     */
    generateKindergartenProblem(mult) {
        const type = Math.random();

        if (type < 0.4) {
            // Counting
            const count = Math.floor(Math.random() * 10) + 1;
            const emoji = this.getRandomEmoji();
            const emojis = emoji.repeat(count);
            return {
                question: `Count the ${emoji}: ${emojis}`,
                answer: count,
                options: this.generateOptions(count, 1, 10),
                category: this.categories.counting,
                type: 'multiple-choice'
            };
        } else if (type < 0.7) {
            // Number comparison
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const answer = a > b ? '>' : (a < b ? '<' : '=');
            return {
                question: `Which is correct? ${a} ___ ${b}`,
                answer: answer,
                options: ['<', '=', '>'],
                category: this.categories.comparison,
                type: 'multiple-choice'
            };
        } else {
            // Simple addition (sum up to 10)
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * (10 - a)) + 1;
            const answer = a + b;
            return {
                question: `${a} + ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 1, 10),
                category: this.categories.addition,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Grade 1: Addition & subtraction within 20
     */
    generateGrade1Problem(mult) {
        const type = Math.random();
        const maxNum = Math.floor(20 * mult);

        if (type < 0.5) {
            // Addition
            const a = Math.floor(Math.random() * Math.min(15, maxNum)) + 1;
            const b = Math.floor(Math.random() * Math.min(maxNum - a, 10)) + 1;
            const answer = a + b;
            const useWordProblem = Math.random() < 0.3;

            if (useWordProblem) {
                const template = this.getRandomTemplate('addition');
                return {
                    question: template.replace('{a}', a).replace('{b}', b),
                    answer: answer,
                    options: this.generateOptions(answer, 2, 25),
                    category: this.categories.addition,
                    type: 'multiple-choice'
                };
            }

            return {
                question: `${a} + ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 2, 25),
                category: this.categories.addition,
                type: 'multiple-choice'
            };
        } else {
            // Subtraction
            const a = Math.floor(Math.random() * maxNum) + 5;
            const b = Math.floor(Math.random() * (a - 1)) + 1;
            const answer = a - b;
            const useWordProblem = Math.random() < 0.3;

            if (useWordProblem) {
                const template = this.getRandomTemplate('subtraction');
                return {
                    question: template.replace('{a}', a).replace('{b}', b),
                    answer: answer,
                    options: this.generateOptions(answer, 0, 20),
                    category: this.categories.subtraction,
                    type: 'multiple-choice'
                };
            }

            return {
                question: `${a} - ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 0, 20),
                category: this.categories.subtraction,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Grade 2: Two-digit addition & subtraction, intro to multiplication
     */
    generateGrade2Problem(mult) {
        const type = Math.random();

        if (type < 0.35) {
            // Two-digit addition
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 50) + 10;
            const answer = a + b;
            return {
                question: `${a} + ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 20, 120),
                category: this.categories.addition,
                type: 'multiple-choice'
            };
        } else if (type < 0.7) {
            // Two-digit subtraction
            const a = Math.floor(Math.random() * 50) + 30;
            const b = Math.floor(Math.random() * 30) + 5;
            const answer = a - b;
            return {
                question: `${a} - ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 0, 80),
                category: this.categories.subtraction,
                type: 'multiple-choice'
            };
        } else {
            // Introduction to multiplication (skip counting)
            const multiplier = Math.floor(Math.random() * 5) + 2;
            const count = Math.floor(Math.random() * 5) + 2;
            const answer = multiplier * count;
            return {
                question: `${count} groups of ${multiplier} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 4, 30),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Grade 3: Multiplication tables, basic division
     */
    generateGrade3Problem(mult) {
        const type = Math.random();

        if (type < 0.45) {
            // Multiplication
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 10) + 2;
            const answer = a * b;
            const useWordProblem = Math.random() < 0.3;

            if (useWordProblem) {
                const template = this.getRandomTemplate('multiplication');
                return {
                    question: template.replace('{a}', a).replace('{b}', b),
                    answer: answer,
                    options: this.generateOptions(answer, 4, 100),
                    category: this.categories.multiplication,
                    type: 'multiple-choice'
                };
            }

            return {
                question: `${a} × ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 4, 100),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        } else if (type < 0.8) {
            // Division
            const divisor = Math.floor(Math.random() * 9) + 2;
            const quotient = Math.floor(Math.random() * 10) + 1;
            const dividend = divisor * quotient;
            const answer = quotient;
            const useWordProblem = Math.random() < 0.3;

            if (useWordProblem) {
                const template = this.getRandomTemplate('division');
                return {
                    question: template.replace('{a}', dividend).replace('{b}', divisor),
                    answer: answer,
                    options: this.generateOptions(answer, 1, 15),
                    category: this.categories.division,
                    type: 'multiple-choice'
                };
            }

            return {
                question: `${dividend} ÷ ${divisor} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 1, 15),
                category: this.categories.division,
                type: 'multiple-choice'
            };
        } else {
            // Mixed operations
            const a = Math.floor(Math.random() * 30) + 10;
            const b = Math.floor(Math.random() * 20) + 5;
            const c = Math.floor(Math.random() * 10) + 1;
            const answer = a + b - c;
            return {
                question: `${a} + ${b} - ${c} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 5, 60),
                category: this.categories.addition,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Grade 4: Multi-digit multiplication, long division, fractions intro
     */
    generateGrade4Problem(mult) {
        const type = Math.random();

        if (type < 0.3) {
            // Multi-digit multiplication
            const a = Math.floor(Math.random() * 50) + 10;
            const b = Math.floor(Math.random() * 9) + 2;
            const answer = a * b;
            return {
                question: `${a} × ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 20, 500),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        } else if (type < 0.55) {
            // Division with larger numbers
            const divisor = Math.floor(Math.random() * 9) + 2;
            const quotient = Math.floor(Math.random() * 20) + 5;
            const dividend = divisor * quotient;
            const answer = quotient;
            return {
                question: `${dividend} ÷ ${divisor} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 2, 30),
                category: this.categories.division,
                type: 'multiple-choice'
            };
        } else if (type < 0.8) {
            // Simple fractions
            return this.generateFractionProblem('simple');
        } else {
            // Order of operations intro
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 5) + 2;
            const c = Math.floor(Math.random() * 10) + 1;
            const answer = a * b + c;
            return {
                question: `${a} × ${b} + ${c} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 5, 40),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Grade 5: Advanced operations, decimals, fraction operations
     */
    generateGrade5Problem(mult) {
        const type = Math.random();

        if (type < 0.25) {
            // Decimal operations
            const a = (Math.floor(Math.random() * 100) / 10).toFixed(1);
            const b = (Math.floor(Math.random() * 50) / 10).toFixed(1);
            const operation = Math.random() < 0.5 ? '+' : '-';
            const answer = operation === '+' ?
                (parseFloat(a) + parseFloat(b)).toFixed(1) :
                (parseFloat(a) - parseFloat(b)).toFixed(1);
            return {
                question: `${a} ${operation} ${b} = ?`,
                answer: parseFloat(answer),
                options: this.generateDecimalOptions(parseFloat(answer)),
                category: operation === '+' ? this.categories.addition : this.categories.subtraction,
                type: 'multiple-choice'
            };
        } else if (type < 0.45) {
            // Fraction operations
            return this.generateFractionProblem('advanced');
        } else if (type < 0.65) {
            // Larger multiplication
            const a = Math.floor(Math.random() * 100) + 20;
            const b = Math.floor(Math.random() * 20) + 5;
            const answer = a * b;
            return {
                question: `${a} × ${b} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 100, 3000),
                category: this.categories.multiplication,
                type: 'input' // Text input for harder problems
            };
        } else if (type < 0.85) {
            // Order of operations
            const a = Math.floor(Math.random() * 10) + 2;
            const b = Math.floor(Math.random() * 5) + 1;
            const c = Math.floor(Math.random() * 10) + 2;
            const d = Math.floor(Math.random() * 5) + 1;
            const answer = a * b + c * d;
            return {
                question: `${a} × ${b} + ${c} × ${d} = ?`,
                answer: answer,
                options: this.generateOptions(answer, 10, 80),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        } else {
            // Percentage basics
            const percentage = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
            const number = Math.floor(Math.random() * 10) * 10 + 20;
            const answer = (percentage / 100) * number;
            return {
                question: `What is ${percentage}% of ${number}?`,
                answer: answer,
                options: this.generateOptions(answer, 2, number),
                category: this.categories.multiplication,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Generate fraction problems
     */
    generateFractionProblem(level) {
        if (level === 'simple') {
            // Equivalent fractions or comparison
            const denominator = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
            const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;

            const type = Math.random();
            if (type < 0.5) {
                // Simplify or identify
                const multiplier = Math.floor(Math.random() * 3) + 2;
                const bigNum = numerator * multiplier;
                const bigDen = denominator * multiplier;
                return {
                    question: `Simplify: ${bigNum}/${bigDen} = ?`,
                    answer: `${numerator}/${denominator}`,
                    options: [
                        `${numerator}/${denominator}`,
                        `${numerator + 1}/${denominator}`,
                        `${numerator}/${denominator + 1}`,
                        `${bigNum}/${bigDen + 1}`
                    ].sort(() => Math.random() - 0.5),
                    category: this.categories.fractions,
                    type: 'multiple-choice'
                };
            } else {
                // Compare fractions
                const frac1Num = Math.floor(Math.random() * 3) + 1;
                const frac1Den = 4;
                const frac2Num = Math.floor(Math.random() * 3) + 1;
                const frac2Den = 4;
                const val1 = frac1Num / frac1Den;
                const val2 = frac2Num / frac2Den;
                const answer = val1 > val2 ? '>' : (val1 < val2 ? '<' : '=');
                return {
                    question: `Compare: ${frac1Num}/${frac1Den} ___ ${frac2Num}/${frac2Den}`,
                    answer: answer,
                    options: ['<', '=', '>'],
                    category: this.categories.fractions,
                    type: 'multiple-choice'
                };
            }
        } else {
            // Addition of fractions with same denominator
            const denominator = [4, 5, 6, 8, 10][Math.floor(Math.random() * 5)];
            const num1 = Math.floor(Math.random() * (denominator - 2)) + 1;
            const num2 = Math.floor(Math.random() * (denominator - num1 - 1)) + 1;
            const answerNum = num1 + num2;
            return {
                question: `${num1}/${denominator} + ${num2}/${denominator} = ?`,
                answer: `${answerNum}/${denominator}`,
                options: [
                    `${answerNum}/${denominator}`,
                    `${answerNum}/${denominator * 2}`,
                    `${num1 + num2 + 1}/${denominator}`,
                    `${num1}/${denominator}`
                ].sort(() => Math.random() - 0.5),
                category: this.categories.fractions,
                type: 'multiple-choice'
            };
        }
    },

    /**
     * Generate multiple choice options
     */
    generateOptions(correctAnswer, min, max) {
        const options = new Set([correctAnswer]);

        while (options.size < 4) {
            let wrongAnswer;
            const variation = Math.floor(Math.random() * 5) + 1;

            if (Math.random() < 0.5) {
                wrongAnswer = correctAnswer + variation;
            } else {
                wrongAnswer = correctAnswer - variation;
            }

            if (wrongAnswer >= min && wrongAnswer <= max && wrongAnswer !== correctAnswer) {
                options.add(wrongAnswer);
            } else {
                // Generate a random answer within range
                wrongAnswer = Math.floor(Math.random() * (max - min + 1)) + min;
                if (wrongAnswer !== correctAnswer) {
                    options.add(wrongAnswer);
                }
            }
        }

        return Array.from(options).sort(() => Math.random() - 0.5);
    },

    /**
     * Generate decimal options
     */
    generateDecimalOptions(correctAnswer) {
        const options = new Set([correctAnswer]);

        while (options.size < 4) {
            const variation = (Math.floor(Math.random() * 20) - 10) / 10;
            let wrongAnswer = parseFloat((correctAnswer + variation).toFixed(1));

            if (wrongAnswer !== correctAnswer && wrongAnswer >= 0) {
                options.add(wrongAnswer);
            }
        }

        return Array.from(options).sort(() => Math.random() - 0.5);
    },

    /**
     * Get random word problem template
     */
    getRandomTemplate(type) {
        const templates = this.wordProblemTemplates[type];
        return templates[Math.floor(Math.random() * templates.length)];
    },

    /**
     * Get random cute emoji for counting problems
     */
    getRandomEmoji() {
        const emojis = ['🌸', '🦋', '💖', '⭐', '🌈', '🎀', '💎', '🌷', '🦄', '🍭'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    },

    /**
     * Get a math tip based on category
     */
    getMathTip(category) {
        const tips = {
            [this.categories.counting]: "Count slowly and point to each item as you count!",
            [this.categories.addition]: "Addition means putting numbers together. Try using your fingers!",
            [this.categories.subtraction]: "Subtraction means taking away. Start with the bigger number!",
            [this.categories.multiplication]: "Multiplication is like adding groups! 3 × 4 means 4 + 4 + 4.",
            [this.categories.division]: "Division is sharing equally. Think about dividing treats among friends!",
            [this.categories.fractions]: "Fractions are parts of a whole, like slices of pizza!",
            [this.categories.comparison]: "Compare by thinking which pile of items is bigger!",
            [this.categories.patterns]: "Look for what repeats in the pattern!",
            default: "Take your time and think carefully. You've got this!"
        };
        return tips[category] || tips.default;
    }
};

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathProblems;
}
