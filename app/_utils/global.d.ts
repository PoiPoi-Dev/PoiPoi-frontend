interface PinData {
  pin: Pin[];
}

interface Pin {
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  description: string;
  img_url: string;
  is_main_attraction: boolean;
  tag: string[];
}
