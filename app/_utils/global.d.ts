export interface PinData {
  pin: Pin[];
}

export interface Pin {
  id: number;
  collect: boolean;
  latitude: number;
  longitude: number;
  radius: number;
  title: string;
  description: string;
  img_url: string;
  is_main_attraction: boolean;
  tags: string[];
}

export interface MarkerContainerProps {
  pin: Pin;
  showPopup: number | undefined;
  setShowPopup: React.Dispatch<React.SetStateAction<number | undefined>>;
}
