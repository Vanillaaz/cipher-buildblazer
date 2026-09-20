export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  displayDate: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  location?: string;
  organizer?: string;
  featured?: boolean;
}
