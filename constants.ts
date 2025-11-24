
import { Question } from './types';

export const GAME_TIMER = 15; // Default seconds per question
export const ANSWER_REVEAL_TIMER = 5000; // 5 seconds to show leaderboard

export const QUIZ_QUESTIONS: Question[] = [
    {
        question: "Which of the following is NOT a core value?",
        options: [
            { text: "Be Collaborative", icon: 'triangle' },
            { text: "Be Results-Driven", icon: 'diamond' },
            { text: "Be Accountable", icon: 'circle' },
            { text: "Be Prepared", icon: 'square' },
        ],
        correctAnswers: [3],
        timeLimit: 15,
        // Using a hosted image for reliability. 
        // If you have the local file, change this back to: "/core-values.png"
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "What does Sovos do?",
        options: [
            { text: "Technology solutions for businesses to meet their tax & compliance needs", icon: 'triangle' },
            { text: "Help people manage their money and reach their financial goals", icon: 'diamond' },
            { text: "Record and analyze financial information for individuals or businesses", icon: 'circle' },
            { text: "Help businesses make financial plans.", icon: 'square' },
        ],
        correctAnswers: [0],
        timeLimit: 20,
        image: "https://picsum.photos/seed/sovos-tax/600/300"
    },
    {
        question: "What are our two e-learning platforms? (Select one of the correct options)",
        options: [
            { text: "Sovos U", icon: 'triangle' },
            { text: "WorkTango", icon: 'diamond' },
            { text: "LinkedIn Learning", icon: 'circle' },
            { text: "Jira", icon: 'square' },
        ],
        correctAnswers: [0, 2], // Both Red (0) and Blue (2) are correct
        timeLimit: 20,
        image: "https://picsum.photos/seed/sovos-learning/600/300"
    },
    {
        question: "What is our thematic goal for FY26?",
        options: [
            { text: "Set a winning pace", icon: 'triangle' },
            { text: "Level Up", icon: 'diamond' },
            { text: "Our time is now", icon: 'circle' },
            { text: "Breaking barriers", icon: 'square' },
        ],
        correctAnswers: [3],
        timeLimit: 15,
    },
];
