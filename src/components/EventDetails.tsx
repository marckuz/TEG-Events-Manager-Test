import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Hash } from "lucide-react";
import { Event, Venue } from "@/types/events";

interface EventDetailsProps {
  event: Event | null;
  venue?: Venue;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetails({ event, venue, isOpen, onClose }: EventDetailsProps) {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      fullDate: date.toLocaleDateString('en-AU', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-AU', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };
  };

  const { fullDate, time } = formatDate(event.startDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[85vh] bg-card border-border overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl text-card-foreground pr-6">
            {event.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4 overflow-y-auto flex-1 pr-2">
          <div className="flex items-start gap-3">
            <Hash size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Event ID</p>
              <p className="text-muted-foreground">{event.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Date</p>
              <p className="text-muted-foreground">{fullDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Time</p>
              <p className="text-muted-foreground">{time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Venue</p>
              <p className="text-muted-foreground">
                {venue?.name || `Venue ${event.venueId}`}
              </p>
              {venue?.location && (
                <p className="text-sm text-muted-foreground mt-1">{venue.location}</p>
              )}
            </div>
          </div>

          {event.description && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-card-foreground mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              TEG Event
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}