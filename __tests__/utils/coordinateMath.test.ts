import { Coordinates, DegToRad, GetDistanceFromCoordinatesToMeters } from "@/app/_utils/coordinateMath";

describe ("DegToRad", () => {

  test("should return a number", () => {
    const result:number = DegToRad(1);
    expect(typeof result).toBe("number");
  });

  const degreesToRadiansTestFixtures:number[][] = [
    [0, 0],
    [45, 0.785398],
    [90, 1.5708],
    [-180, -3.14159],
    [-360, -6.28319],
    [-Infinity, -Infinity],
    [Infinity, Infinity],
  ];

  test.each(degreesToRadiansTestFixtures)(
    "passes for value %j with result %j", 
    (fixture, result) => expect(DegToRad(fixture)).toBeCloseTo(result, 2)
  );
});

describe ("GetDistanceFromCoordinatesToMeters", () => {

  const HachikoStatueCoordinates:Coordinates = {
    longitude: 139.700470,
    latitude: 35.659088,
  }

  const ShibuyaCrossingCoordinates:Coordinates = {
    longitude: 139.70055952748854,
    latitude: 35.659512848104605,
  }

  const TokyoTowerCoordinates:Coordinates = {
    longitude: 139.745438,
    latitude: 35.658581,
  }


  const CodeChrysalisCoordinates:Coordinates = {
    longitude: 139.72750044108224,
    latitude: 35.65803076021495,
  }

  const EiffelTowerCoordinates:Coordinates = {
    longitude: 48.858093,
    latitude: 2.294694,
  }

  const ZeroCoordinates: Coordinates = {
    longitude: 0,
    latitude: 0,
  }

  test("should return a number", () => {

    const testCoordinates1:Coordinates = {
      longitude: 50.0,
      latitude: 20.0
    };
    const testCoordinates2:Coordinates = {
      longitude: 139.84,
      latitude: 35.65
    };

    const result:number = GetDistanceFromCoordinatesToMeters(testCoordinates1, testCoordinates2);
    expect(typeof result).toBe('number');
  })

  const distanceCoordinatesTestFixtures = [
    [HachikoStatueCoordinates, HachikoStatueCoordinates, 0],
    [HachikoStatueCoordinates, ShibuyaCrossingCoordinates, 47.9283],
    [HachikoStatueCoordinates, TokyoTowerCoordinates, 4063.0774],
    [HachikoStatueCoordinates, CodeChrysalisCoordinates, 2444.9330],
    [HachikoStatueCoordinates, EiffelTowerCoordinates, 9934875.7002],
    [HachikoStatueCoordinates, ZeroCoordinates, 14265442.8789]
  ];

  test.each(distanceCoordinatesTestFixtures)(
    "passes for value %j and %j with result %j", 
    (coord1, coord2, result) => {
      expect(GetDistanceFromCoordinatesToMeters(coord1 as Coordinates, coord2 as Coordinates)).toBeCloseTo(result as number, 2);
    }
  );

});