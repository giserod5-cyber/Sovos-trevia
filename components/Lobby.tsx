
import React, { useState } from 'react';

interface LobbyProps {
    onStart: (name: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStart }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white text-center">
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
                    className="w-full px-5 py-4 text-xl font-bold bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                    Join Game
                </button>
            </form>
        </div>
    );
};

export default Lobby;
