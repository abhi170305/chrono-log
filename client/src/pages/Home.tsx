import { Clock } from "@/components/Clock";
import { Todo } from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import generatedImage from '@assets/generated_images/soft_abstract_productivity_background_with_warm_light.png';

export default function Home() {
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-card border border-border/50 shadow-lg min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
            <img 
                src={generatedImage} 
                alt="Calm background" 
                className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <Clock />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Daily Focus Card */}
        <div className="md:col-span-1 lg:col-span-1">
          <Todo type="daily" date={today} className="h-full bg-white/50" title="Today's Priorities" />
        </div>

        {/* Journal Prompt Card */}
        <div className="md:col-span-1 lg:col-span-2 bg-primary/5 rounded-xl border border-primary/10 p-8 flex flex-col justify-center items-start gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-9xl font-serif">"</span>
            </div>
            
            <h2 className="text-3xl font-serif text-primary relative z-10">
                How are you feeling today?
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg relative z-10">
                Take a moment to reflect, clear your mind, and set your intentions. A clear mind is a productive mind.
            </p>
            
            <Link href="/log">
                <Button size="lg" className="mt-4 gap-2 relative z-10 rounded-full px-8">
                    Start Writing <ArrowRight className="w-4 h-4" />
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
