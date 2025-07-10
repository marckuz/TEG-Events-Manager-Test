import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Event, Venue } from "@/types/events";

interface EventCardProps {
  event: Event;
  venue?: Venue;
  onViewDetails: (event: Event) => void;
}

export default function EventCard({ event, venue, onViewDetails }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-AU', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-AU', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = formatDate(event.startDate);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight text-card-foreground">
          {event.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{venue?.name || `Venue ${event.venueId}`}</span>
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}
        <Button 
          onClick={() => onViewDetails(event)}
          className="w-full mt-4"
          variant="default"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}