
import React from 'react';
import { Player } from '../types';
import { GoldMedal, SilverMedal, BronzeMedal } from './icons';

interface FinalPodiumProps {
    players: Player[];
    onPlayAgain: () => void;
}

const FinalPodium: React.FC<FinalPodiumProps> = ({ players, onPlayAgain }) => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const topThree = sortedPlayers.slice(0, 3);

    const podiumStyles = [
        { height: 'h-64', order: 'order-2', medal: <GoldMedal />, bg: 'bg-yellow-400/20', border: 'border-yellow-400' },
        { height: 'h-48', order: 'order-1', medal: <SilverMedal />, bg: 'bg-gray-300/20', border: 'border-gray-300' },
        { height: 'h-32', order: 'order-3', medal: <BronzeMedal />, bg: 'bg-orange-400/20', border: 'border-orange-400' },
    ];

    return (
        <div className="w-full max-w-4xl text-white text-center animate-fade-in">
            <h1 className="text-5xl font-black mb-4">Final Results!</h1>
            
            <div className="flex items-end justify-center gap-2 h-80 my-8">
                {topThree.map((player, index) => (
                    <div key={player.id} className={`flex flex-col justify-end items-center w-1/3 ${podiumStyles[index].order}`}>
                        <div className={`w-full ${podiumStyles[index].bg} ${podiumStyles[index].border} border-4 rounded-t-lg p-4 flex flex-col items-center justify-center backdrop-blur-sm ${podiumStyles[index].height}`}>
                             <div className="mb-2">{podiumStyles[index].medal}</div>
                             <p className="text-2xl font-bold truncate">{player.name}</p>
                             <p className="text-xl font-semibold text-yellow-300">{player.score} pts</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">All Players</h2>
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                    {sortedPlayers.map((player, index) => (
                        <li key={player.id} className="flex justify-between items-center text-lg p-2 bg-black/20 rounded-md">
                            <span><span className="font-bold w-8 inline-block">{index + 1}.</span> {player.name}</span>
                            <span className="font-semibold">{player.score}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={onPlayAgain}
                className="mt-8 px-8 py-4 text-xl font-bold bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition-all duration-300 transform hover:scale-105"
            >
                Play Again
            </button>
        </div>
    );
};

export default FinalPodium;
