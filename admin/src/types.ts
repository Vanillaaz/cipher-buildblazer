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
  location: string;
  organizer: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string;
  bio: string;
  category: 'executive' | 'lead' | 'faculty';
  linkedin?: string;
}

export interface DomainItem {
  id: string;
  title: string;
  code: string;
  icon: string;
  description: string;
  highlights: string[];
}

export interface JoinApplication {
  id: string;
  fullName: string;
  usn: string;
  email: string;
  yearSemester: string;
  areaOfInterest: string;
  message?: string;
  submittedAt: string;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
  loginTime: string;
}
