
export type GameState = 'LOBBY' | 'QUESTION' | 'LEADERBOARD' | 'FINAL_PODIUM';

export interface Player {
    id: string;
    name: string;
    score: number;
    lastAnswer: {
        isCorrect: boolean;
        points: number;
        answerIndex: number;
    } | null;
}

export interface AnswerOption {
    text: string;
    icon: 'triangle' | 'diamond' | 'circle' | 'square';
}

export interface Question {
    question: string;
    options: AnswerOption[];
    correctAnswers: number[];
    timeLimit: number;
    image?: string;
}
