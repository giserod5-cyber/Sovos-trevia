
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { TriangleIcon, DiamondIcon, CircleIcon, SquareIcon } from './icons';

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

    useEffect(() => {
        setTimer(question.timeLimit);
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [question]);

    const timerPercentage = (timer / question.timeLimit) * 100;

    return (
        <div className="w-full flex flex-col items-center text-white animate-fade-in">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">{questionNumber} / {totalQuestions}</span>
                    <div className="relative w-20 h-20 flex items-center justify-center">
                         <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                            <path
                                className="text-white/20"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="text-green-400"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={`${timerPercentage}, 100`}
                                strokeLinecap="round"
                                transform="rotate(-90 18 18)"
                            />
                        </svg>
                        <span className="text-3xl font-bold">{timer}</span>
                    </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-center">{question.question}</h2>
            </div>
            
            {question.image && <img src={question.image} alt="Question context" className="rounded-lg shadow-lg mb-6 max-h-64 object-cover" />}

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        disabled={hasAnswered}
                        className={`p-4 rounded-lg flex items-center justify-start text-left transition-all duration-300 transform hover:scale-105 ${colorMap[option.icon]} ${hasAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="w-12 h-12 bg-white/80 rounded-md flex items-center justify-center mr-4 text-black">
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
