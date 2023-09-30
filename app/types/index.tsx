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
  reservation ?:SafeReservation[];
  listing : SafeListing& {
    user : SafeUser
  };
}

export interface TripsClientProps {
  currentUser?: SafeUser | null,
  reservations: SafeReservation[],
}

export interface ReservationsClientProps{
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

export interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}


export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

