
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
            return 'border-green-400 bg-green-500/30 ring-4 ring-green-300';
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
                .animate-entry {
                    opacity: 0; /* Start invisible */
                    animation: slideUpFade 0.5s ease-out forwards;
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
                    {sortedPlayers.map((player, index) => (
                        <li 
                            key={player.id} 
                            className="flex items-center justify-between bg-white/10 p-3 rounded-lg transition-transform duration-300 hover:scale-102 hover:bg-white/20 animate-entry"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center">
                                <span className="text-xl font-bold w-8">{index + 1}</span>
                                <span className="text-lg font-semibold">{player.name}</span>
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;
