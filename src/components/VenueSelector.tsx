import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Venue } from "@/types/events";

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenueId: number | null;
  onVenueChange: (venueId: number | null) => void;
}

export default function VenueSelector({ venues, selectedVenueId, onVenueChange }: VenueSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="venue-select" className="text-sm font-medium text-foreground">
        Select Venue
      </label>
      <Select 
        value={selectedVenueId?.toString() || "all"} 
        onValueChange={(value) => onVenueChange(value === "all" ? null : parseInt(value))}
      >
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue placeholder="Choose a venue" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Venues</SelectItem>
          {venues.map((venue) => (
            <SelectItem key={venue.id} value={venue.id.toString()}>
              {venue.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}