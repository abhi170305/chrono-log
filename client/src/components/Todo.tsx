import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Calendar, ListTodo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  type: 'daily' | 'overall';
  date?: string; // For daily tasks
}

interface TodoProps {
  type: 'daily' | 'overall';
  date?: string; // specific date key for daily tasks
  className?: string;
  title?: string;
}

export function Todo({ type, date, className, title }: TodoProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    const storageKey = type === 'daily' && date 
      ? `tasks-${type}-${date}` 
      : `tasks-${type}`;
    
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks([]);
    }
  }, [type, date]);

  // Save to local storage on change
  useEffect(() => {
    const storageKey = type === 'daily' && date 
      ? `tasks-${type}-${date}` 
      : `tasks-${type}`;
    
    if (tasks.length > 0 || localStorage.getItem(storageKey)) {
       localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
  }, [tasks, type, date]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      type,
      date
    };

    setTasks(prev => [...prev, newTask]);
    setInputValue("");
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className={cn("bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {type === 'daily' ? <Calendar className="w-5 h-5" /> : <ListTodo className="w-5 h-5" />}
        </div>
        <h2 className="text-xl font-serif font-medium">{title || (type === 'daily' ? "Today's Focus" : "Long Term Goals")}</h2>
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={type === 'daily' ? "Add a task for today..." : "Add a long term goal..."}
          className="bg-background/50 border-border/50 focus:bg-background transition-colors"
          data-testid={`input-task-${type}`}
        />
        <Button type="submit" size="icon" variant="secondary" data-testid={`button-add-${type}`}>
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {tasks.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-muted-foreground text-sm py-4 italic"
            >
              No tasks yet. Stay focused.
            </motion.p>
          )}
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="group flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                  task.completed 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground/30 hover:border-primary/50"
                )}
                data-testid={`checkbox-task-${task.id}`}
              >
                {task.completed && <Check className="w-3.5 h-3.5" />}
              </button>
              
              <span className={cn(
                "flex-1 text-sm transition-all duration-300",
                task.completed && "text-muted-foreground line-through decoration-muted-foreground/50"
              )}>
                {task.text}
              </span>

              <button
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                data-testid={`button-delete-${task.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
