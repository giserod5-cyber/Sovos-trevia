
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
        // Hosted image representing teamwork/values
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
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
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "What are our two e-learning platforms? (Select both correct answers)",
        options: [
            { text: "Sovos U", icon: 'triangle' },
            { text: "LinkedIn Learning", icon: 'diamond' },
            { text: "Worktango", icon: 'circle' },
            { text: "Sovos SharePoint", icon: 'square' },
        ],
        correctAnswers: [0, 1], // Both Sovos U and LinkedIn Learning
        timeLimit: 20,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "What is our thematic goal for FY26?",
        options: [
            { text: "Set a Winning Pace", icon: 'triangle' },
            { text: "Our Time Is Now", icon: 'diamond' },
            { text: "Level Up", icon: 'circle' },
            { text: "Breaking Barriers", icon: 'square' },
        ],
        correctAnswers: [3],
        timeLimit: 15,
        // Alternative "Breaking Barriers" / Action image
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "What is our Sovos vision?",
        options: [
            { text: "To help solve tax for people.", icon: 'triangle' },
            { text: "To assist in filing taxes for businesses.", icon: 'diamond' },
            { text: "To transform compliance from a business requirement to a force for growth.", icon: 'circle' },
            { text: "To monitor and regulate tax and compliance needs for organizations.", icon: 'square' },
        ],
        correctAnswers: [2],
        timeLimit: 20,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "Which of these is NOT considered a Sovos hub?",
        options: [
            { text: "Santiago, Chile", icon: 'triangle' },
            { text: "Helsinki, Finland", icon: 'diamond' },
            { text: "Atlanta, United States", icon: 'circle' },
            { text: "London, England", icon: 'square' },
        ],
        correctAnswers: [1],
        timeLimit: 15,
        image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"
    },
    {
        question: "Where do you go to get guidance on information about career development?",
        options: [
            { text: "Sovos U - Learning Management System", icon: 'triangle' },
            { text: "SovosConnects - myCareer", icon: 'diamond' },
            { text: "Manager", icon: 'circle' },
            { text: "All of the above", icon: 'square' },
        ],
        correctAnswers: [3],
        timeLimit: 15,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    },
];
