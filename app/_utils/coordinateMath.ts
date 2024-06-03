export interface Coordinates {
  latitude: number;
  longitude: number;
}

const METERSTODEGREES: number = 111139;
function DegToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
export function GetDistanceFromCoordinatesToMeters(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  // const earthRadius = 6371000; //meters
  // const distanceLatitude = DegToRad(coord2.latitude - coord1.latitude);
  // const distanceLongitude = DegToRad(coord2.longitude - coord1.longitude);
  // const a =
  //   Math.sin(distanceLatitude / 2) ** 2 +
  //   Math.cos(DegToRad(coord1.latitude)) *
  //     Math.cos(DegToRad(coord2.latitude)) *
  //     Math.sin(distanceLongitude / 2 ** 2);
  // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // const distance = earthRadius * c;
  // return distance;
  const degDistance = Math.sqrt(
    (coord2.latitude - coord1.latitude) ** 2 +
      (coord2.longitude - coord1.longitude) ** 2
  );
  return DegreesToMeters(degDistance);
}

export function DegreesToMeters(degrees: number): number {
  return degrees / METERSTODEGREES;
}
