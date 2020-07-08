// export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   var p = 0.017453292519943295; // Math.PI / 180
//   var c = Math.cos;
//   var a =
//     0.5 - c((lat2 - lat1) * p) / 2 + (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

//   return 12742 * Math.asin(Math.sqrt(a));
// }

// /** Converts numeric degrees to radians */
// if (typeof Number.prototype.toRad === 'undefined') {
//   Number.prototype.toRad = function () {
//     return (this * Math.PI) / 180;
//   };
// }

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const radiansToDegrees = (radians) => radians * (180 / Math.PI);

const centralSubtendedAngle = (locationX, locationY) => {
  const locationXLatRadians = degreesToRadians(locationX.latitude);
  const locationYLatRadians = degreesToRadians(locationY.latitude);
  return radiansToDegrees(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
        Math.cos(locationXLatRadians) *
          Math.cos(locationYLatRadians) *
          Math.cos(degreesToRadians(Math.abs(locationX.longitude - locationY.longitude)))
    )
  );
};
const earthRadius = 6371;

const greatCircleDistance = (angle) => 2 * Math.PI * earthRadius * (angle / 360);

export const getDistanceFromLatLonInKm = (locationX, locationY) =>
  greatCircleDistance(centralSubtendedAngle(locationX, locationY));
