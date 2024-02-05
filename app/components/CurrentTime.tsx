import React, { useState, useEffect, FC } from 'react';

interface CurrentTimeProps {
  initialTime: string;
}

const CurrentTime: FC<CurrentTimeProps> = ({ initialTime }) => {
  const [currentTime, setCurrentTime] = useState<string>(initialTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <div>{currentTime}</div>;
};

export default CurrentTime;
