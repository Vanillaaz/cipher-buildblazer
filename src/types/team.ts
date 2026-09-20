export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string;
  bio?: string;
  category?: 'head' | 'faculty' | 'student' | 'executive';
  linkedin?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}
