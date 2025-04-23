
import React from "react";
import Clock from "@/components/Clock";
import PomodoroTimer from "@/components/PomodoroTimer";
import TodoList from "@/components/TodoList";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4 lg:pr-8">
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Clock */}
            <div className="mb-10">
              <Clock />
            </div>
            
            {/* Pomodoro Timer */}
            <PomodoroTimer />
          </div>
        </div>
        
        {/* TodoList - Right sidebar */}
        <div className="lg:w-80 w-full h-96 lg:h-auto mt-8 lg:mt-0">
          <TodoList />
        </div>
      </div>
      
      <footer className="p-4 text-center text-xs text-muted-foreground">
        <p>Made with ♥ by JeanMendanhaJr 🤟🏽 {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
