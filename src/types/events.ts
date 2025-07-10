export interface Event {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  venueId: number;
}

export interface Venue {
  id: number;
  name: string;
  location?: string;
  capacity?: number;
}

export interface EventData {
  events: Event[];
  venues: Venue[];
}