import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8 space-y-2"
    >
      <h1 className="text-6xl md:text-8xl font-serif text-foreground tracking-tight" data-testid="display-time">
        {format(time, "h:mm")}
        <span className="text-2xl md:text-4xl ml-2 text-muted-foreground font-sans font-light">
          {format(time, "a")}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground font-light" data-testid="display-date">
        {format(time, "EEEE, MMMM do, yyyy")}
      </p>
    </motion.div>
  );
}
