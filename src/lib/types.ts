export type Facility =
  | 'wifi'
  | 'pool'
  | 'parking'
  | 'gym'
  | 'kitchen'
  | 'ac'
  | 'food'
  | 'water'
  | 'power'
  | 'cctv'
  | 'cleaning'
  | 'laundry'
  | 'fridge'
  | 'study'
  | 'purifier'
  | 'lift'
  | 'visitors';

export interface RoomOption {
  type: string;
  sharing: number;
  price: number;
}

export interface FoodMenuItem {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Rate {
  day: number;
  twoDays: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface RateCard {
  ac: Rate;
  nonAc: Rate;
}

export interface Hostel {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number; // Represents the starting price for display on cards
  rating: number;
  reviews: number;
  images: string[];
  facilities: Facility[];
  roomOptions?: RoomOption[];
  foodMenu?: FoodMenuItem[];
  securityDeposit?: number;
  securityInfo?: string[];
  fullAddress?: string;
  rateCard?: RateCard;
  inclusions?: string[];
  paymentOptions?: string[];
}
