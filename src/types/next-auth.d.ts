import { User } from "./user.ts";

interface LoginPayload extends User {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: LoginPayload;
  }
}
