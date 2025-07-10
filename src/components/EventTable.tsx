import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Event, Venue } from "@/types/events";

interface EventTableProps {
  events: Event[];
  venues: Venue[];
  onViewDetails: (event: Event) => void;
}

export default function EventTable({ events, venues, onViewDetails }: EventTableProps) {
  const getVenueName = (venueId: number) => {
    const venue = venues.find(v => v.id === venueId);
    return venue?.name || `Venue ${venueId}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-AU', { 
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

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-card-foreground font-semibold">Event Name</TableHead>
            <TableHead className="text-card-foreground font-semibold">Date</TableHead>
            <TableHead className="text-card-foreground font-semibold">Time</TableHead>
            <TableHead className="text-card-foreground font-semibold">Venue</TableHead>
            <TableHead className="text-card-foreground font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const { date, time } = formatDateTime(event.startDate);
            return (
              <TableRow 
                key={event.id} 
                className="border-border hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium text-card-foreground">
                  {event.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{date}</TableCell>
                <TableCell className="text-muted-foreground">{time}</TableCell>
                <TableCell className="text-muted-foreground">
                  {getVenueName(event.venueId)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => onViewDetails(event)}
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}