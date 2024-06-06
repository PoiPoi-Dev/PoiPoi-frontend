export interface PinData {
  pin: Pin[];
}

export interface HintData {
  hints: Hint[];
}

export interface Pin {
  id: number;
  is_completed: boolean;
  title: string;
  description: string;
  img_url: string;
  exact_latitude: number;
  exact_longitude: number;
  search_latitude: number;
  search_longitude: number;
  search_radius: number;
  // is_main_attraction: boolean;
  // tags: string[];
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
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | undefined>>;
}
