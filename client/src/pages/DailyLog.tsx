import { JournalEntry } from "@/components/JournalEntry";
import { format } from "date-fns";

export default function DailyLog() {
  const today = format(new Date(), "yyyy-MM-dd");
  const displayDate = format(new Date(), "MMMM do, yyyy");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-serif text-foreground">Daily Journal</h1>
        <p className="text-muted-foreground">{displayDate}</p>
      </div>

      <div className="min-h-[600px]">
        <JournalEntry date={today} />
      </div>
    </div>
  );
}
