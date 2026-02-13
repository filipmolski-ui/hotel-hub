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
  availableRooms: number;
  availableBeds: number;
  yetToArrive: number;
  yetToDepart: number;
  occupancyPercent: number;
  arrivalsToday: number;
  departuresToday: number;
  // Pokoje (cleaning status)
  rooms: {
    total: { toClear: number; clean: number };
    occupied: { toClear: number; clean: number };
    free: { toClear: number; clean: number };
    reserved: { toClear: number; clean: number };
    blocked: { toClear: number; clean: number };
  };
  // Prognoza
  forecast: {
    today: number;
    days7: number;
    days30: number;
    end: number;
  };
  // Rezerwacje (7 days)
  reservations: {
    dates: string[];
    reservedRooms: number[];
    guests: number[];
    children: number[];
    arrivals: { rooms: number[]; guests: number[] };
    departures: { rooms: number[]; guests: number[] };
    staying: { rooms: number[]; guests: number[] };
  };
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
  availableRooms: 193,
  availableBeds: 386,
  yetToArrive: 1,
  yetToDepart: 0,
  occupancyPercent: 11.3,
  arrivalsToday: 3,
  departuresToday: 1,
  rooms: {
    total: { toClear: 5, clean: 214 },
    occupied: { toClear: 0, clean: 175 },
    free: { toClear: 5, clean: 39 },
    reserved: { toClear: 2, clean: 24 },
    blocked: { toClear: 3, clean: 7 },
  },
  forecast: {
    today: 11.4,
    days7: 14.2,
    days30: 21.2,
    end: 17.7,
  },
  reservations: {
    dates: ["Dzisiaj", "Jutro", "15.02.", "16.02.", "17.02.", "18.02.", "19.02."],
    reservedRooms: [26, 28, 45, 34, 23, 13, 58],
    guests: [78, 86, 120, 97, 66, 45, 148],
    children: [16, 17, 16, 17, 7, 4, 8],
    arrivals: { rooms: [1, 3, 6, 12, 2, 6, 45], guests: [3, 6, 18, 40, 7, 21, 103] },
    departures: { rooms: [1, 3, 4, 2, 6, 13, 16], guests: [3, 4, 10, 6, 28, 38, 42] },
    staying: { rooms: [25, 75, 22, 25, 17, 21, 7], guests: [68, 80, 50, 59, 24, 13, 45] },
  },
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
