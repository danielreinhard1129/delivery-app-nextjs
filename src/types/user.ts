export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarBucket: string | null;
  avatarKey: string | null;
  role: string;
}
