export interface PinData {
  pin: Pin[];
}

export interface HintData {
  hints: Hint[];
}

export interface Pin {
  poi_id: number;
  is_completed?: boolean;
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

export interface User {
  email: string;
  displayName: string;
  password: string;
}

export interface Poi {
  poi_id: number;
  title: string;
  description: string;
  img_url: string;
  creator_id: number;
  poi_latitude: number;
  poi_longitude: number;
  collection_radius: number;
  search_latitude: number;
  search_longitude: number;
  search_radius: number;
}

export interface User {
  email: string;
  password: string;
}

export interface Poi {
  poi_id: number;
  title: string;
  description: string;
  img_url: string;
  creator_id: number;
  poi_latitude: number;
  poi_longitude: number;
  collection_radius: number;
  search_latitude: number;
  search_longitude: number;
  search_radius: number;
}

export interface User {
  email: string;
  password: string;
}
