import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { TriangleIcon, DiamondIcon, CircleIcon, SquareIcon, MaximizeIcon, CloseIcon } from './icons';
import { playTick, playTimesUp } from '../utils/audio';

interface QuestionViewProps {
    question: Question;
    onAnswer: (answerIndex: number) => void;
    questionNumber: number;
    totalQuestions: number;
    hasAnswered: boolean;
}

const iconMap = {
    triangle: <TriangleIcon />,
    diamond: <DiamondIcon />,
    circle: <CircleIcon />,
    square: <SquareIcon />,
};

const colorMap = {
    triangle: 'bg-red-600 hover:bg-red-700',
    diamond: 'bg-blue-600 hover:bg-blue-700',
    circle: 'bg-yellow-500 hover:bg-yellow-600',
    square: 'bg-green-600 hover:bg-green-700',
};

const QuestionView: React.FC<QuestionViewProps> = ({ question, onAnswer, questionNumber, totalQuestions, hasAnswered }) => {
    const [timer, setTimer] = useState(question.timeLimit);
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    useEffect(() => {
        setTimer(question.timeLimit);
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [question]);

    useEffect(() => {
        if (timer <= 5 && timer > 0) {
            playTick();
        }
        if (timer === 0) {
            playTimesUp();
        }
    }, [timer]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsImageEnlarged(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const timerPercentage = (timer / question.timeLimit) * 100;

    let progressBarColor = 'bg-green-500';
    if (timerPercentage <= 30) {
        progressBarColor = 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]';
    } else if (timerPercentage <= 60) {
        progressBarColor = 'bg-yellow-400';
    }

    return (
        <div className="w-full flex flex-col items-center text-white animate-fade-in">
            {/* Full Screen Image Modal */}
            {isImageEnlarged && question.image && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in backdrop-blur-sm" onClick={() => setIsImageEnlarged(false)}>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsImageEnlarged(false);
                        }}
                        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                        title="Close"
                    >
                        <CloseIcon className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={question.image} 
                            alt="Question context full screen" 
                            className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden mb-6">
                <div className="p-6 md:p-8 pb-2 flex justify-between items-end">
                    <span className="text-lg font-semibold text-white/80">Question {questionNumber} / {totalQuestions}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-white/60">Time Left</span>
                        <span className={`text-2xl font-black w-12 text-right font-mono ${timer <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timer}s</span>
                    </div>
                </div>
                
                {/* Enhanced Progress Bar Container */}
                <div className="px-6 md:px-8 pb-6">
                    <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden border border-white/10">
                        <div 
                            className={`h-full ${progressBarColor} transition-all duration-1000 ease-linear rounded-full`}
                            style={{ width: `${timerPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="px-6 md:px-8 pb-8 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight">{question.question}</h2>
                </div>
            </div>
            
            {question.image && (
                <div className="w-full max-w-4xl mb-6 relative group">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-white/10 flex justify-center relative overflow-hidden">
                        <img 
                            src={question.image} 
                            alt="Question context" 
                            className="max-h-64 w-full object-contain rounded-lg cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]" 
                            onClick={() => setIsImageEnlarged(true)}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.src = "https://placehold.co/600x400?text=Image+Not+Found+Check+File+Path";
                            }}
                        />
                        <button 
                            onClick={() => setIsImageEnlarged(true)}
                            className="absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center gap-2 font-medium text-sm"
                            title="Enlarge Image"
                        >
                            <MaximizeIcon className="w-5 h-5" />
                            <span>Enlarge</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        disabled={hasAnswered}
                        className={`p-4 rounded-lg flex items-center justify-start text-left transition-all duration-300 transform hover:scale-105 ${colorMap[option.icon]} ${hasAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="w-12 h-12 bg-white/80 rounded-md flex items-center justify-center mr-4 text-black shadow-md flex-shrink-0">
                           {iconMap[option.icon]}
                        </div>
                        <span className="text-lg font-semibold">{option.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionView;