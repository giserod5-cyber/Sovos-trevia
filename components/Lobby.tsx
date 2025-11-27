
import React, { useState } from 'react';
import { TriangleIcon, DiamondIcon, CircleIcon, SquareIcon, CloseIcon } from './icons';
import { Player, GameState } from '../types';

interface LobbyProps {
    onJoin: (name: string) => void;
    onStartGame: () => void;
    players: Player[];
    gameState: GameState;
}

const Lobby: React.FC<LobbyProps> = ({ onJoin, onStartGame, players, gameState }) => {
    const [name, setName] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onJoin(name.trim());
        }
    };

    if (gameState === 'WAITING_ROOM') {
        return (
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white text-center animate-fade-in">
                <h2 className="text-3xl font-black mb-6">Lobby</h2>
                <div className="mb-8">
                    <p className="text-xl font-semibold mb-2 animate-pulse">Waiting for players to connect...</p>
                    <div className="text-sm opacity-70 bg-white/10 inline-block px-4 py-1 rounded-full">
                        {players.length} participant{players.length !== 1 ? 's' : ''} joined
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 max-h-60 overflow-y-auto custom-scrollbar p-2">
                    {players.map((player) => (
                        <div key={player.id} className="bg-white/20 rounded-lg p-3 flex items-center gap-3 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                                {player.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold truncate">{player.name}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={onStartGame}
                    className="w-full px-5 py-4 text-xl font-bold bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    Start Trivia
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white text-center animate-fade-in relative">
            <h1 className="text-4xl font-black mb-2">Sovos Quiz Challenge</h1>
            <p className="text-lg opacity-80 mb-8">Ready to test your knowledge?</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-5 py-3 text-lg bg-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
                />
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full px-5 py-4 text-xl font-bold bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                    Join Game
                </button>
            </form>

            <button 
                onClick={() => setShowInstructions(true)}
                className="mt-6 text-white/80 hover:text-white underline text-sm transition-colors"
            >
                How to play?
            </button>

            {showInstructions && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
                        <div className="bg-[#0033A0] p-6 text-white flex justify-between items-center">
                            <h2 className="text-2xl font-bold">How to Play</h2>
                            <button onClick={() => setShowInstructions(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#0033A0] rounded-full flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Enter Your Name</h3>
                                    <p className="text-gray-600 leading-relaxed">Join the lobby to start the challenge. You'll be competing against virtual opponents.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#0033A0] rounded-full flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Answer Fast!</h3>
                                    <p className="text-gray-600 leading-relaxed">Points are awarded for accuracy and speed. The faster you answer, the higher your score.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#0033A0] rounded-full flex items-center justify-center font-bold">3</div>
                                <div className="w-full">
                                    <h3 className="font-bold text-lg mb-2">Know Your Icons</h3>
                                    <p className="text-gray-600 mb-3">Answers are matched with shapes and colors:</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center shadow-sm">
                                                <div className="scale-75"><TriangleIcon /></div>
                                            </div>
                                            <span className="font-medium text-gray-700">Triangle</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center shadow-sm">
                                                <div className="scale-75"><DiamondIcon /></div>
                                            </div>
                                            <span className="font-medium text-gray-700">Diamond</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-8 h-8 bg-yellow-500 text-white rounded flex items-center justify-center shadow-sm">
                                                <div className="scale-75"><CircleIcon /></div>
                                            </div>
                                            <span className="font-medium text-gray-700">Circle</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center shadow-sm">
                                                <div className="scale-75"><SquareIcon /></div>
                                            </div>
                                            <span className="font-medium text-gray-700">Square</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 flex justify-center border-t">
                            <button 
                                onClick={() => setShowInstructions(false)}
                                className="px-8 py-3 bg-[#0033A0] text-white font-bold rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
                            >
                                I'm Ready!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lobby;
