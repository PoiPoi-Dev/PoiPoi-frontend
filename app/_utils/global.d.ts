export interface PinData {
  pin: Pin[];
}

export interface HintData {
  hints: Hint[];
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

export interface Hint {
  poi_id: number;
  hint_id: number;
  user_id: number;
  content: string;
}

export interface MarkerContainerProps {
  pin: Pin;
  showPopup: number | undefined;
  setShowPopup: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | undefined>>
}
