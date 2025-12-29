import { useState, useEffect } from "react";
import { Bell, BellOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setEnabled(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "This browser does not support desktop notifications.",
        variant: "destructive"
      });
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    setEnabled(result === 'granted');

    if (result === 'granted') {
      new Notification("Daily Flow", {
        body: "Reminders are now enabled! We'll help you stay on track.",
      });
    }
  };

  const toggleReminders = (checked: boolean) => {
    if (checked && permission !== 'granted') {
      requestPermission();
    } else {
      setEnabled(checked);
      if (checked) {
        toast({ title: "Reminders On", description: "You will receive periodic reminders." });
      } else {
        toast({ title: "Reminders Off", description: "Notifications silenced." });
      }
    }
  };

  // Mock reminder effect
  useEffect(() => {
    if (!enabled) return;

    // In a real app, this would use a service worker or more complex logic
    // Here we just set up a mock interval for demo purposes (e.g., every minute)
    // to show it works, but in production it would be hourly
    const interval = setInterval(() => {
        // Just a console log for now to avoid spamming user in demo
        console.log("Checking for reminders..."); 
    }, 60000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {enabled ? <Bell className="w-5 h-5 text-primary" /> : <BellOff className="w-5 h-5 text-muted-foreground" />}
          {enabled && <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Stay consistent with gentle reminders to log your day and check your tasks.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between py-4">
          <div className="space-y-0.5">
            <Label className="text-base">Daily Reminders</Label>
            <p className="text-sm text-muted-foreground">
              Receive periodic nudges to update your log.
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={toggleReminders}
            disabled={permission === 'denied'}
          />
        </div>
        {permission === 'denied' && (
          <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">
            Notifications are blocked in your browser settings. Please enable them manually to use this feature.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
