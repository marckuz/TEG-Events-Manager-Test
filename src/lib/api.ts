import { EventData } from '@/types/events';
import eventData from '@/data/event-data.json';

export async function fetchEvents(): Promise<EventData> {
  // Return local data directly
  return eventData as EventData;
}


// export async function fetchEvents(): Promise<EventData> {
//   const response = await fetch('https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json');
//   if (!response.ok) {
//     throw new Error('Failed to fetch events');
//   }
//   const data = await response.json();
//   return data as EventData;
// }