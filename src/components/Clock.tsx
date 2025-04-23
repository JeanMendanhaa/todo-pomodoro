
import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update immediately on mount
    updateClock();
    
    // Set interval to update clock every second
    const intervalId = setInterval(updateClock, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-6xl font-mono font-light tracking-wider text-primary">
      {time}
    </div>
  );
};

export default Clock;
