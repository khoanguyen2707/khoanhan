
import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 20 + 10}px`,
        delay: `${Math.random() * 2}s`
      };
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(heart => (
        <i
          key={heart.id}
          className="fas fa-heart text-red-400 opacity-30 floating-heart"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
          }}
        ></i>
      ))}
    </div>
  );
};

export default HeartBackground;
