import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface JournalEntryProps {
  date: string;
}

export function JournalEntry({ date }: JournalEntryProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(`journal-${date}`);
    if (saved) setContent(saved);
    else setContent("");
  }, [date]);

  const handleSave = () => {
    localStorage.setItem(`journal-${date}`, content);
    toast({
      title: "Entry Saved",
      description: "Your thoughts have been safely recorded.",
    });
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-serif font-medium">Daily Reflection</h2>
        </div>
        <Button onClick={handleSave} variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
      <div className="flex-1 p-0 relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind today? Write freely..."
          className="w-full h-full min-h-[400px] resize-none border-0 focus-visible:ring-0 p-6 text-lg leading-relaxed bg-transparent font-serif"
          data-testid="input-journal"
        />
        {/* Lined paper effect overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_31px,#00000008_32px)] bg-[size:100%_32px] mt-[2px]" />
      </div>
    </div>
  );
}
