import { Todo } from "@/components/Todo";
import { format } from "date-fns";

export default function Tasks() {
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-foreground mb-2">Task Manager</h1>
        <p className="text-muted-foreground">Organize your daily duties and long-term ambitions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Todo 
            type="daily" 
            date={today} 
            className="h-full min-h-[500px]" 
            title="Today's To-Do List"
          />
        </div>
        
        <div className="space-y-4">
          <Todo 
            type="overall" 
            className="h-full min-h-[500px] border-primary/20 bg-primary/5" 
            title="Master To-Do List"
          />
        </div>
      </div>
    </div>
  );
}
