import React, { useState, useEffect, useCallback } from 'react';

interface GameItem {
  id: number;
  type: 'cash' | 'stone';
  x: number;
  y: number;
}

const InfiniteRunnerGame: React.FC = () => {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    round: 0,
    score: 0,
    timeLeft: 1000,
    items: [] as GameItem[],
    gameOver: false,
    roundStarted: false
  });

  const generateRandomItems = useCallback(() => {
    const items: GameItem[] = [];
    const itemCount = Math.floor(Math.random() * 5) + 8;
    
    for (let i = 0; i < itemCount; i++) {
      items.push({
        id: Date.now() + Math.random() * 1000 + i,
        type: Math.random() > 0.4 ? 'cash' : 'stone',
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15
      });
    }
    
    return items;
  }, []);

  const handleItemClick = useCallback((item: GameItem) => {
    const points = item.type === 'cash' ? 200 : -100;
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      items: prev.items.filter(i => i.id !== item.id)
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      round: 1,
      score: 0,
      timeLeft: 1000,
      items: [],
      gameOver: false,
      roundStarted: false
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      round: 0,
      score: 0,
      timeLeft: 1000,
      items: [],
      gameOver: false,
      roundStarted: false
    });
  }, []);

  const nextRound = useCallback(() => {
    setGameState(prev => {
      if (prev.round >= 5) {
        return { ...prev, gameOver: true, isPlaying: false };
      } else {
        return {
          ...prev,
          round: prev.round + 1,
          timeLeft: 1000,
          items: [],
          roundStarted: false
        };
      }
    });
  }, []); // REMOVE gameState.round from dependency array!

  // Remove line 87:
  // // Remove the conflicting useEffect (lines 95-105) and replace with:
  
  // Remove line 151:
  // // Remove line 151
  
  // Timer effect - Clean and simple
  useEffect(() => {
    if (!gameState.isPlaying || gameState.timeLeft <= 0 || !gameState.roundStarted) return;
  
    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 10;
        if (newTimeLeft <= 0) {
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 10);
  
    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.timeLeft, gameState.roundStarted]);
  
  // Single round progression effect
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft === 0 && gameState.roundStarted) {
      // Clear items immediately
      setGameState(prev => ({ ...prev, items: [], roundStarted: false }));
      
      // Transition to next round after delay
      const timeout = setTimeout(() => {
        setGameState(prev => {
          if (prev.round >= 5) {
            return { ...prev, gameOver: true, isPlaying: false };
          } else {
            return {
              ...prev,
              round: prev.round + 1,
              timeLeft: 1000,
              items: [],
              roundStarted: false
            };
          }
        });
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [gameState.isPlaying, gameState.timeLeft, gameState.roundStarted, gameState.round]);
  
  // Round start effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && !gameState.roundStarted && gameState.round >= 1) {
      const timeout = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          roundStarted: true,
          items: generateRandomItems(),
          timeLeft: 1000
        }));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.isPlaying, gameState.round, gameState.roundStarted, gameState.gameOver, generateRandomItems]);

  // Simplified round progression
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft === 0 && gameState.roundStarted) {
    

      
      // Immediately transition
      if (gameState.round >= 5) {
        setGameState(prev => ({ ...prev, gameOver: true, isPlaying: false, roundStarted: false }));
      } else {
        setGameState(prev => ({
          ...prev,
          round: prev.round + 1,
          timeLeft: 1000,
          items: [],
          roundStarted: false
        }));
      }
    }
  }, [gameState.isPlaying, gameState.timeLeft, gameState.roundStarted, gameState.round]);

  const timeDisplay = (gameState.timeLeft / 1000).toFixed(2);
  const progressWidth = (gameState.timeLeft / 1000) * 100;

  return (
    <div className="w-full h-[460px] bg-gradient-to-br from-gray-900 via-slate-800 to-black flex flex-col items-center justify-center text-white overflow-hidden rounded-2xl border-2 border-gray-600/40 shadow-2xl relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent animate-pulse"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header - Fixed responsive layout */}
      <div className="absolute top-1 left-1 right-1 z-20">
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-2">
          <div className="bg-black/50 rounded-lg px-2 py-1 border border-gray-500/30 order-2 sm:order-1">
            <div className="text-xs sm:text-sm font-bold text-yellow-400 flex items-center justify-center gap-1">
              💰 <span>{gameState.score}</span>
            </div>
          </div>
          
          <div className="bg-black/50 rounded-lg px-2 py-1 border border-gray-500/30 order-1 sm:order-2">
            <div className="text-xs sm:text-sm font-bold text-gray-300 text-center">
              Round {gameState.round}/5
            </div>
          </div>
          
          <div className="bg-black/50 rounded-lg px-2 py-1 border border-gray-500/30 order-3">
            <div className="text-xs sm:text-sm font-mono font-bold text-red-300 text-center">
              {timeDisplay}s
            </div>
            <div className="w-full h-1 bg-gray-800/50 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-400 to-yellow-400 transition-all duration-75 ease-linear"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-full flex items-center justify-center">
        {gameState.isPlaying && !gameState.gameOver && gameState.roundStarted && (
          <div className="relative w-full h-full">
            {/* Game Items */}
            {gameState.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl transition-all duration-150 hover:scale-125 active:scale-95 ${
                  item.type === 'cash' 
                    ? 'hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] filter drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]' 
                    : 'hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] filter drop-shadow-[0_0_4px_rgba(255,0,0,0.4)]'
                } cursor-pointer select-none`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  animation: `float 2s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 1000}ms`
                }}
              >
                {item.type === 'cash' ? '💰' : '🪨'}
              </button>
            ))}
          </div>
        )}

        {/* Round Transition */}
        {gameState.isPlaying && !gameState.gameOver && !gameState.roundStarted && (
          <div className="text-center space-y-4 animate-pulse">
            <div className="text-3xl font-bold text-gray-300">
              Round {gameState.round}
            </div>
            <div className="text-lg text-gray-400">
              Get Ready...
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!gameState.isPlaying && !gameState.gameOver && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-200 animate-bounce">
                💰 CASH GRAB
              </h1>
              <div className="text-xl text-gray-400 font-semibold">
                Quick Reflexes Game
              </div>
            </div>
            
            <div className="space-y-3 text-center">
              <p className="text-lg text-gray-300">Click 💰 for +200 points</p>
              <p className="text-lg text-gray-300">Avoid 🪨 (-100 points)</p>
              <div className="bg-black/30 rounded-lg p-3 border border-gray-500/20">
                <p className="text-md text-yellow-300 font-bold">5 Rounds • 1 Second Each</p>
                <p className="text-sm text-gray-400">React Fast!</p>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-2 border-gray-500/50"
            >
              🚀 START GAME
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState.gameOver && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-200">
                🎮 GAME OVER!
              </h2>
              <div className="text-2xl mb-4">
                Final Score: <span className={`font-bold text-3xl ${
                  gameState.score >= 600 ? 'text-green-400' : 
                  gameState.score >= 300 ? 'text-yellow-400' : 
                  gameState.score >= 0 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {gameState.score}
                </span>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-gray-500/20">
              <div className="text-2xl mb-2">
                {gameState.score >= 800 ? '🏆 LEGENDARY!' :
                 gameState.score >= 600 ? '🎉 EXCELLENT!' :
                 gameState.score >= 400 ? '👍 GREAT JOB!' :
                 gameState.score >= 200 ? '😊 GOOD EFFORT!' :
                 gameState.score >= 0 ? '😅 KEEP TRYING!' : '💀 BETTER LUCK NEXT TIME!'}
              </div>
              <div className="text-sm text-gray-400">
                {gameState.score >= 600 ? 'Amazing reflexes!' :
                 gameState.score >= 300 ? 'Nice work!' :
                 gameState.score >= 0 ? 'Practice makes perfect!' : 'Watch out for those stones!'}
              </div>
            </div>
            
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-2 border-gray-500/50"
            >
              🔄 PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Bottom Instructions */}
      <div className="absolute bottom-3 left-4 right-4 text-center text-xs text-gray-400">
        <p>💰 = +200 pts • 🪨 = -100 pts • Be Quick!</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-5px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteRunnerGame;