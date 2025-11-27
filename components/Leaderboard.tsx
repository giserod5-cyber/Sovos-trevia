
import React from 'react';
import { Player, Question } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface LeaderboardProps {
    players: Player[];
    question: Question;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, question }) => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    const getAnswerStyle = (index: number) => {
        if (question.correctAnswers.includes(index)) {
            return 'border-green-400 bg-green-500/30 ring-4 ring-green-300 animate-correct-pulse';
        }
        return 'border-gray-600 opacity-50';
    };

    return (
        <div className="w-full max-w-4xl text-white animate-fade-in flex flex-col gap-6">
            <style>{`
                @keyframes slideUpFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes correctPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
                    50% { transform: scale(1.02); box-shadow: 0 0 15px 0 rgba(74, 222, 128, 0.6); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
                }
                .animate-entry {
                    opacity: 0; /* Start invisible */
                    animation: slideUpFade 0.5s ease-out forwards;
                }
                .animate-correct-pulse {
                    animation: correctPulse 2s infinite ease-in-out;
                }
            `}</style>

            <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Correct Answer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((opt, i) => (
                        <div key={i} className={`p-3 rounded-lg border-2 ${getAnswerStyle(i)}`}>
                            <p className="font-semibold">{opt.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
                <h1 className="text-3xl font-black mb-4 text-center">Leaderboard</h1>
                <ul className="space-y-3">
                    {sortedPlayers.map((player, index) => {
                        const isMainPlayer = !player.id.startsWith('bot');
                        return (
                            <li 
                                key={player.id} 
                                className={`flex items-center justify-between p-3 rounded-lg transition-transform duration-300 hover:scale-102 animate-entry ${
                                    isMainPlayer 
                                        ? 'bg-blue-600/60 border-2 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                                        : 'bg-white/10 hover:bg-white/20'
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl font-bold w-8">{index + 1}</span>
                                    <span className={`text-lg ${isMainPlayer ? 'font-black text-white' : 'font-semibold'}`}>
                                        {player.name} {isMainPlayer && <span className="text-sm font-normal text-blue-100 ml-2 bg-blue-500/50 px-2 py-0.5 rounded-full">(You)</span>}
                                    </span>
                                    {player.lastAnswer && (
                                    <span className="ml-3">
                                        {player.lastAnswer.isCorrect ? 
                                            <CheckCircleIcon className="text-green-400" /> : 
                                            <XCircleIcon className="text-red-400" />}
                                    </span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                <span className="text-xl font-bold mr-4">{player.score}</span>
                                {player.lastAnswer && player.lastAnswer.points > 0 && (
                                    <span className="text-sm font-semibold text-green-300">+{player.lastAnswer.points}</span>
                                )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;
