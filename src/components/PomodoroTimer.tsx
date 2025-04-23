
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Play, Pause, RefreshCw } from "lucide-react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

const PomodoroTimer: React.FC = () => {
  const TIMER_CONFIG: TimerConfig = {
    focus: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60, // 5 minutes in seconds
    longBreak: 15 * 60, // 15 minutes in seconds
  };

  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_CONFIG.focus);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(TIMER_CONFIG[mode]);
    setIsActive(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Could add notification sound here
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const toggleTimer = (): void => {
    setIsActive(!isActive);
  };

  const resetTimer = (): void => {
    setTimeLeft(TIMER_CONFIG[mode]);
    setIsActive(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleModeChange = (value: string): void => {
    setMode(value as TimerMode);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-card w-full max-w-xs mx-auto">
      <div className="text-5xl font-mono mb-2">{formatTime(timeLeft)}</div>
      
      <div className="flex gap-2 mb-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTimer}
          className="h-10 w-10 rounded-full"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={resetTimer}
          className="h-10 w-10 rounded-full"
        >
          <RefreshCw size={20} />
        </Button>
      </div>
      
      <RadioGroup 
        value={mode} 
        onValueChange={handleModeChange}
        className="flex gap-2"
      >
        <div className="flex items-center gap-1">
          <RadioGroupItem value="focus" id="focus" />
          <Label htmlFor="focus" className="text-sm">Focus</Label>
        </div>
        
        <div className="flex items-center gap-1">
          <RadioGroupItem value="shortBreak" id="shortBreak" />
          <Label htmlFor="shortBreak" className="text-sm">Short Break</Label>
        </div>
        
        <div className="flex items-center gap-1">
          <RadioGroupItem value="longBreak" id="longBreak" />
          <Label htmlFor="longBreak" className="text-sm">Long Break</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PomodoroTimer;
