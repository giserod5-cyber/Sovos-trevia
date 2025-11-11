
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Player, Question } from './types';
import { QUIZ_QUESTIONS, GAME_TIMER, ANSWER_REVEAL_TIMER } from './constants';
import Lobby from './components/Lobby';
import QuestionView from './components/QuestionView';
import Leaderboard from './components/Leaderboard';
import FinalPodium from './components/FinalPodium';

const SovosLogo = () => (
    <svg width="120" height="40" viewBox="0 0 148 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M72.9336 40.8C65.0003 40.8 58.6003 38.0667 53.7336 32.6C48.8669 27.1333 46.4003 20.4 46.4003 12.4C46.4003 8.46667 47.0669 5.06667 48.4003 2.2C49.8003 -0.599999 51.8669 -1.93333 54.6003 -1.93333C56.6669 -1.93333 58.4669 -1.26667 60.0003 -0.0666656C61.4669 1.06667 62.4669 2.53333 63.0003 4.33333L60.0003 6.6C59.5336 5.46667 58.8003 4.66667 57.8003 4.2C56.8003 3.73333 55.7336 3.53333 54.6003 3.53333C53.4003 3.53333 52.4003 3.86667 51.6003 4.53333C50.8003 5.2 50.3336 6.2 50.2003 7.53333C52.0669 5.26667 54.4003 4.13333 57.2003 4.13333C61.4003 4.13333 64.9336 5.6 67.8003 8.53333C70.7336 11.4 72.2003 15.2 72.2003 19.9333C72.2003 25.6667 70.4003 30.2 66.8003 33.5333C63.2669 36.8 58.8003 38.4667 53.4003 38.4667C50.0003 38.4667 47.0669 37.6 44.6003 35.8667L46.8669 32.8667C48.6669 34.0667 50.8003 34.6667 53.2669 34.6667C57.0669 34.6667 60.0669 33.4 62.2669 30.8667C64.5336 28.3333 65.6669 24.8667 65.6669 20.4667C65.6669 17.6 64.9336 15.2 63.4669 13.2667C62.0003 11.2667 59.9336 10.2667 57.2669 10.2667C54.8003 10.2667 52.8003 11.2 51.2669 13.0667C49.8003 14.8667 49.0669 17.2667 49.0669 20.2667C49.0669 25.4 50.8003 29.6 54.2003 32.8667C57.6669 36.1333 61.6003 37.7333 66.0003 37.7333C68.3336 37.7333 70.4003 37.1333 72.2003 36L72.9336 40.8ZM27.1336 40.1333L20.4003 24.7333L13.6669 40.1333H6.53359L17.8003 20.8L7.40026 0.666667H14.4669L20.4003 14.1333L26.3336 0.666667H33.4003L23.0003 20.8L34.2669 40.1333H27.1336ZM94.2003 40.1333V4.8H100.8V17.8H109.8V4.8H116.4V40.1333H109.8V22.6667H100.8V40.1333H94.2003V40.1333ZM147.267 40.1333L140.534 24.7333L133.8 40.1333H126.667L137.934 20.8L127.534 0.666667H134.6L140.534 14.1333L146.467 0.666667H153.534L143.134 20.8L154.4 40.1333H147.267Z" fill="#0033A0"/>
        <path d="M91.875 22.4667C91.875 28.5333 90.0083 33.4 86.275 37.0667C82.5417 40.7333 77.675 42.5333 71.675 42.5333C65.675 42.5333 60.8083 40.7333 57.075 37.0667C53.3417 33.4 51.475 28.5333 51.475 22.4667C51.475 16.4 53.3417 11.5333 57.075 7.86667C60.8083 4.2 65.675 2.4 71.675 2.4C77.675 2.4 82.5417 4.2 86.275 7.86667C90.0083 11.5333 91.875 16.4 91.875 22.4667ZM85.2083 22.4667C85.2083 17.6 83.8083 13.8 81.0083 11.0667C78.2083 8.33333 75.1417 7 71.8083 7C68.475 7 65.475 8.33333 62.8083 11.0667C60.1417 13.8 58.8083 17.6 58.8083 22.4667C58.8083 27.3333 60.1417 31.1333 62.8083 33.8667C65.475 36.6 68.475 37.9333 71.8083 37.9333C75.1417 37.9333 78.2083 36.6 81.0083 33.8667C83.8083 31.1333 85.2083 27.3333 85.2083 22.4667Z" fill="white"/>
    </svg>
);

export default function App() {
    const [gameState, setGameState] = useState<GameState>('LOBBY');
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(0);

    const handleStartQuiz = (name: string) => {
        const mainPlayer: Player = { id: Date.now().toString(), name, score: 0, lastAnswer: null };
        const botPlayers: Player[] = [
            { id: 'bot1', name: 'Alex', score: 0, lastAnswer: null },
            { id: 'bot2', name: 'Maria', score: 0, lastAnswer: null },
            { id: 'bot3', name: 'David', score: 0, lastAnswer: null },
        ];
        setPlayers([mainPlayer, ...botPlayers]);
        setCurrentQuestionIndex(0);
        setGameState('QUESTION');
    };

    const handleReset = () => {
        setPlayers([]);
        setCurrentQuestionIndex(0);
        setGameState('LOBBY');
    };

    const handlePlayerAnswer = useCallback((playerId: string, answerIndex: number, question: Question) => {
        setPlayers(prevPlayers => {
            const timeTaken = (Date.now() - questionStartTime) / 1000;
            const isCorrect = question.correctAnswers.includes(answerIndex);
            
            let points = 0;
            if (isCorrect) {
                const timePenalty = (timeTaken / question.timeLimit) * 500;
                points = Math.max(0, Math.round(1000 - timePenalty));
            }

            return prevPlayers.map(p => {
                if (p.id === playerId && !p.lastAnswer) {
                    return {
                        ...p,
                        score: p.score + points,
                        lastAnswer: {
                            isCorrect,
                            points,
                            answerIndex,
                        }
                    };
                }
                return p;
            });
        });
    }, [questionStartTime]);

    // Bot answering logic
    useEffect(() => {
        if (gameState === 'QUESTION') {
            const question = QUIZ_QUESTIONS[currentQuestionIndex];
            const bots = players.filter(p => p.id.startsWith('bot'));
            
            bots.forEach(bot => {
                const answerDelay = Math.random() * (question.timeLimit - 2) * 1000 + 1000;
                setTimeout(() => {
                    const isCorrect = Math.random() > 0.25; // 75% chance to be correct
                    let answerIndex;
                    if (isCorrect) {
                        answerIndex = question.correctAnswers[Math.floor(Math.random() * question.correctAnswers.length)];
                    } else {
                        const wrongAnswers = question.options.map((_, i) => i).filter(i => !question.correctAnswers.includes(i));
                        answerIndex = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
                    }
                    handlePlayerAnswer(bot.id, answerIndex, question);
                }, answerDelay);
            });
        }
    }, [gameState, currentQuestionIndex, players, handlePlayerAnswer]);

    // Game state transition logic
    useEffect(() => {
        if (gameState === 'QUESTION') {
            setQuestionStartTime(Date.now());
            setPlayers(p => p.map(player => ({ ...player, lastAnswer: null })));

            const timer = setTimeout(() => {
                setGameState('LEADERBOARD');
            }, QUIZ_QUESTIONS[currentQuestionIndex].timeLimit * 1000);
            return () => clearTimeout(timer);
        }

        if (gameState === 'LEADERBOARD') {
            const timer = setTimeout(() => {
                if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setGameState('QUESTION');
                } else {
                    setGameState('FINAL_PODIUM');
                }
            }, ANSWER_REVEAL_TIMER);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, currentQuestionIndex]);
    
    const renderGameState = () => {
        const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

        switch (gameState) {
            case 'LOBBY':
                return <Lobby onStart={handleStartQuiz} />;
            case 'QUESTION':
                return <QuestionView 
                          question={currentQuestion} 
                          onAnswer={(answerIndex) => handlePlayerAnswer(players[0].id, answerIndex, currentQuestion)}
                          questionNumber={currentQuestionIndex + 1}
                          totalQuestions={QUIZ_QUESTIONS.length}
                          hasAnswered={!!players.find(p => p.id === players[0].id)?.lastAnswer}
                       />;
            case 'LEADERBOARD':
                return <Leaderboard 
                          players={players} 
                          question={currentQuestion}
                        />;
            case 'FINAL_PODIUM':
                return <FinalPodium players={players} onPlayAgain={handleReset} />;
            default:
                return <Lobby onStart={handleStartQuiz} />;
        }
    }

    return (
        <div className="min-h-screen bg-white text-[#4A4A4A] flex flex-col items-center justify-center p-4"
             style={{ background: 'linear-gradient(135deg, #0033A0 0%, #0052C2 100%)' }}>
             <header className="absolute top-0 left-0 p-6">
                <SovosLogo />
            </header>
            <main className="w-full max-w-5xl mx-auto flex-grow flex items-center justify-center">
                {renderGameState()}
            </main>
        </div>
    );
}
