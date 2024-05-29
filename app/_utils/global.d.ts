export interface PinData {
  pin: Pin[];
}

export interface Pin {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  description: string;
  img_url: string;
  is_main_attraction: boolean;
  tags: string[];
}
