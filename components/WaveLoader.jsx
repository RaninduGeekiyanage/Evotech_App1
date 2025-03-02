'use client'
import { useEffect, useState } from 'react';

const WaveLoader = () => {
  const [bars, setBars] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prevBars) => (prevBars < 16 ? prevBars + 1 : 16));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const barStyles = [
    "w-[1px] bg-black rounded-full h-1",
    "w-1 bg-black rounded-full h-2",
    "w-1 bg-black rounded-full h-3",
    "w-1 bg-black rounded-full h-4",
    "w-1 bg-black rounded-full h-3",
    "w-1 bg-black rounded-full h-2",
    "w-1 bg-black rounded-full h-1",
    "w-1 bg-black rounded-full h-1",
    "w-1 bg-black rounded-full h-2",
    "w-1 bg-black rounded-full h-3",
    "w-1 bg-black rounded-full h-4",
    "w-1 bg-black rounded-full h-3",
    "w-1 bg-black rounded-full h-2",
    "w-1 bg-black rounded-full h-1",
    "w-1 bg-black rounded-full h-1",
    "w-1 bg-black rounded-full h-2",
  ];

  const delayClasses = [
    "delay-0",
    "delay-100",
    "delay-200",
    "delay-300",
    "delay-400",
    "delay-500",
    "delay-600",
    "delay-700",
    "delay-800",
    "delay-900",
    "delay-1000",
    "delay-1100",
    "delay-1200",
    "delay-1300",
    "delay-1400",
    "delay-1500",
  ];

  return (
    <div className="flex space-x-1 h-24 w-36">
      {Array.from({ length: bars }).map((_, index) => (
        <div
          key={index}
          className={`${barStyles[index]} animate-wave ${delayClasses[index]}`}
        ></div>
      ))}
    </div>
  );
};

export default WaveLoader;
