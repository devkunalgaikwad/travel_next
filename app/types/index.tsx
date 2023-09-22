import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing,'createdAt'> &{
  createdAt : string;
}

export interface ListenClientProps {
  currentUser ?: SafeUser | null;
  reservation ?:Reservation[];
  listing : SafeListing& {
    user : SafeUser
  };
}