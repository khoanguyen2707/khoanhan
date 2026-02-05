
import React, { useState, useEffect, useCallback } from 'react';
import { Option, GameState } from './types';
import { generateLoveLetter } from './services/geminiService';
import HeartBackground from './components/HeartBackground';

const OPTIONS: Option[] = [
  { id: '1', label: 'Một anh chàng đẹp trai nào đó', isCorrect: false },
  { id: '3', label: 'Anh Khoa :v', isCorrect: true },
  { id: '4', label: 'Tiền bạc và sự giàu sang', isCorrect: false },
];

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    status: 'idle',
    message: '',
    aiLoveLetter: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const handleSelection = async (option: Option) => {
    if (option.isCorrect) {
      setIsGenerating(true);
      setState(prev => ({ ...prev, status: 'success', message: 'Lựa chọn tuyệt vời nhất trần đời! ❤️' }));
      
      const letter = await generateLoveLetter();
      setState(prev => ({ ...prev, aiLoveLetter: letter }));
      setIsGenerating(false);
    } else {
      setWrongCount(prev => prev + 1);
      setState(prev => ({ 
        ...prev, 
        status: 'failed', 
        message: getFunnyErrorMessage(wrongCount)
      }));
      
      // Reset after a short delay to allow "trying again"
      setTimeout(() => {
        setState(prev => ({ ...prev, status: 'playing' }));
      }, 1500);
    }
  };

  const getFunnyErrorMessage = (count: number) => {
    const messages = [
      "Ui chu choa, chọn sai rồi kìa!",
      "Hết cơ hội rồi nhé... Đùa thôi, chọn lại đi!",
      "Ơ kìa, đáp án lù lù ra đó mà?",
      "Vẫn không chịu chọn anh à? Huhu giận luôn á!",
      "Nút đó hỏng rồi, đừng bấm nữa, hãy nhìn vào trái tim mình đi!",
    ];
    return messages[count % messages.length];
  };

  const restart = () => {
    setState({ status: 'playing', message: '', aiLoveLetter: '' });
    setWrongCount(0);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative">
      <HeartBackground />

      <div className="z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-pink-200 transform transition-all duration-500 hover:scale-[1.01]">
        {state.status === 'idle' && (
          <div className="text-center">
            <h1 className="text-4xl font-love text-red-500 mb-6">Em Sẽ Chọn Ai?</h1>
            <p className="text-gray-600 mb-8 italic">Giữa muôn vạn lựa chọn, đâu là định mệnh của cuộc đời em?</p>
            <button
              onClick={() => setState(prev => ({ ...prev, status: 'playing' }))}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              Bắt Đầu Tìm Kiếm <i className="fas fa-heart ml-2"></i>
            </button>
          </div>
        )}

        {state.status === 'playing' || state.status === 'failed' ? (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ai là người sẽ che chở cho em suốt đời?</h2>
            
            <div className="space-y-4">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelection(option)}
                  disabled={state.status === 'failed'}
                  className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group
                    ${state.status === 'failed' && !option.isCorrect ? 'border-red-300 bg-red-50 opacity-50' : 'border-pink-200 hover:border-red-400 hover:bg-red-50'}
                    ${option.isCorrect ? 'hover:scale-105 hover:shadow-md' : 'hover:scale-95'}
                  `}
                >
                  <span className="font-semibold text-gray-700">{option.label}</span>
                  <i className={`fas ${option.isCorrect ? 'fa-star text-yellow-400' : 'fa-circle text-pink-100 group-hover:text-pink-300'} transition-colors`}></i>
                </button>
              ))}
            </div>

            {state.status === 'failed' && (
              <div className="mt-6 p-3 bg-red-100 text-red-600 rounded-xl animate-bounce font-medium">
                {state.message}
              </div>
            )}
          </div>
        ) : null}

        {state.status === 'success' && (
          <div className="text-center animate-scaleIn">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <i className="fas fa-heart text-8xl text-red-500 animate-pulse"></i>
                <i className="fas fa-check text-4xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              </div>
            </div>
            
            <h2 className="text-3xl font-love text-red-600 mb-2">{state.message}</h2>
            
            <div className="bg-pink-50 p-6 rounded-2xl italic text-gray-700 border-l-4 border-red-500 shadow-inner mb-6 relative">
              {isGenerating ? (
                <div className="flex flex-col items-center py-4">
                  <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-red-400">Đang viết thư tay cho em...</p>
                </div>
              ) : (
                <>
                  <i className="fas fa-quote-left text-red-200 absolute top-2 left-2 text-2xl"></i>
                  <p className="leading-relaxed relative z-10">{state.aiLoveLetter}</p>
                </>
              )}
            </div>

            <button
              onClick={restart}
              className="text-pink-400 hover:text-pink-600 font-semibold underline decoration-dotted transition-colors"
            >
              Chọn lại lần nữa nhé?
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
