import { useState } from "react";

export type RoomStatus = "clean" | "dirty" | "occupied" | "free" | "blocked";

export interface Arrival {
  id: string;
  reservationNo: string;
  room: string;
  guest: string;
  arrival: string;
  departure: string;
  guests: number;
  source: string;
  roomStatus: RoomStatus;
}

export interface Departure {
  id: string;
  reservationNo: string;
  room: string;
  guest: string;
  arrival: string;
  departure: string;
  balance: number;
  roomStatus: RoomStatus;
}

export interface HotelStats {
  occupiedRooms: number;
  occupiedBeds: number;
  freeRooms: number;
  freeBeds: number;
  reservedRooms: number;
  reservedBeds: number;
  blockedRooms: number;
  blockedBeds: number;
  occupancyPercent: number;
  arrivalsToday: number;
  departuresToday: number;
}

export interface CashState {
  openingBalance: number;
  closingBalance: number;
  currency: string;
}

export const MOCK_STATS: HotelStats = {
  occupiedRooms: 26,
  occupiedBeds: 52,
  freeRooms: 193,
  freeBeds: 386,
  reservedRooms: 5,
  reservedBeds: 14,
  blockedRooms: 10,
  blockedBeds: 20,
  occupancyPercent: 11.3,
  arrivalsToday: 3,
  departuresToday: 1,
};

export const MOCK_ARRIVALS: Arrival[] = [
  { id: "1", reservationNo: "19122/2025/A", room: "207", guest: "Kowalski Jan", arrival: "2025-02-13", departure: "2025-02-15", guests: 2, source: "Booking.com", roomStatus: "clean" },
  { id: "2", reservationNo: "19123/2025/A", room: "315", guest: "Nowak Anna", arrival: "2025-02-13", departure: "2025-02-16", guests: 1, source: "Telefon", roomStatus: "dirty" },
  { id: "3", reservationNo: "19124/2025/A", room: "102", guest: "Wiśniewski Piotr", arrival: "2025-02-13", departure: "2025-02-14", guests: 3, source: "Email", roomStatus: "clean" },
];

export const MOCK_DEPARTURES: Departure[] = [
  { id: "1", reservationNo: "19100/2025/A", room: "412", guest: "Zieliński Marek", arrival: "2025-02-11", departure: "2025-02-13", balance: 0, roomStatus: "occupied" },
  { id: "2", reservationNo: "19101/2025/A", room: "208", guest: "Lewandowska Ewa", arrival: "2025-02-10", departure: "2025-02-13", balance: 150.50, roomStatus: "occupied" },
];

export const MOCK_CASH: CashState = {
  openingBalance: 21379.09,
  closingBalance: 23409.09,
  currency: "PLN",
};

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
};

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { id: "new-reservation", label: "Nowa rezerwacja", icon: "CalendarPlus", enabled: true },
  { id: "reservation-list", label: "Lista rezerwacji", icon: "List", enabled: true },
  { id: "walk-in", label: "Walk-in", icon: "UserPlus", enabled: true },
  { id: "guests-in-hotel", label: "Goście w hotelu", icon: "Users", enabled: true },
  { id: "hotel-schedule", label: "Grafik hotelu", icon: "CalendarDays", enabled: true },
  { id: "invoice-register", label: "Rejestr faktur", icon: "FileText", enabled: true },
];
