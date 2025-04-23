
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Plus } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to parse todos from localStorage", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (): void => {
    if (newTodo.trim() === "") return;
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg p-4 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={addTodo}
          className="h-10 w-10"
        >
          <Plus size={18} />
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {todos.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No tasks yet</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li 
                key={todo.id} 
                className="flex items-center justify-between p-2 rounded border border-border hover:bg-accent/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)} 
                  />
                  <label 
                    htmlFor={`todo-${todo.id}`}
                    className={`flex-1 cursor-pointer ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteTodo(todo.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
