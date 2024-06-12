export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function DegToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

//Using the Haversine Formula
export function GetDistanceFromCoordinatesToMeters(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const earthRadius = 6371000; //meters
  const distanceLatitude = DegToRad(coord2.latitude - coord1.latitude);
  const distanceLongitude = DegToRad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(distanceLatitude / 2) ** 2 +
    Math.cos(DegToRad(coord1.latitude)) *
      Math.cos(DegToRad(coord2.latitude)) *
      Math.sin(distanceLongitude / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

export function ConvertGeolocationPositionToCoordinates(position:GeolocationPosition):Coordinates {
  const coordinates:Coordinates = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
  }
  return coordinates;
}

