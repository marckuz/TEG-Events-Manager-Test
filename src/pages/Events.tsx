import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/api';
import { Event } from '@/types/events';
import VenueSelector from '@/components/VenueSelector';
import EventTable from '@/components/EventTable';
import EventCard from '@/components/EventCard';
import EventDetails from '@/components/EventDetails';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from 'lucide-react';

export default function Events() {
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log('Events data:', data);
  console.log("error:", error);

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    
    const events = selectedVenueId 
      ? data.events.filter(event => event.venueId === selectedVenueId)
      : data.events;
    
    // Sort by date (earliest first)
    return events.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [data?.events, selectedVenueId]);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const selectedVenue = data?.venues?.find(venue => venue.id === selectedEvent?.venueId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">TEG Events</h1>
          </div>
          <p className="text-muted-foreground">
            Discover and explore events at TEG venues
          </p>
        </header>

        {
          error ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Events data is currently unavailable</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <VenueSelector
                  venues={data?.venues || []}
                  selectedVenueId={selectedVenueId}
                  onVenueChange={setSelectedVenueId}
                />

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                    {selectedVenueId && (
                      <span> at {data?.venues?.find(v => v.id === selectedVenueId)?.name}</span>
                    )}
                  </p>
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No events found for the selected venue.</p>
                  </div>
                ) : isMobile ? (
                  <div className="grid gap-4">
                    {filteredEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        venue={data?.venues?.find(venue => venue.id === event.venueId)}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <EventTable
                    events={filteredEvents}
                    venues={data?.venues || []}
                    onViewDetails={handleViewDetails}
                  />
                )}
              </div>

              <EventDetails
                event={selectedEvent}
                venue={selectedVenue}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
              />
            </>
          )
        }
      </div>
    </div>
  );
}