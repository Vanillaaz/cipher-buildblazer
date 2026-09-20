export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  photo: string;
  bio?: string;
  category?: 'head' | 'faculty' | 'student';
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}
