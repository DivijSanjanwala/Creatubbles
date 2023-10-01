import React, { useState, useEffect } from "react";

interface TimerProps {
  resetkey: number;
  timer: number;
  timerCallBack: (time: number) => void;
}

const Timer: React.FC<TimerProps> = (props) => {
  
  const [remainingTime, setRemainingTime] = useState<number>(props.timer);

  useEffect(() => {
    setRemainingTime(props.timer);
  }, [props.resetkey]);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = Math.max(0, remainingTime - 1);
      setRemainingTime(time);
    }, 1000);

    return () => clearTimeout(timer);
  });

  // seperate use effect to handle callback
  useEffect(() => {
    if (remainingTime === 0) {
      props.timerCallBack(remainingTime);
    }
  }, [remainingTime]);

 
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <span className="text-lg font-semibold">
        {remainingTime}
      </span>
    </div> 
  );
};

export default Timer;
