interface Point {
  x: number;
  y: number;
}
export const bigAreaPoints = (points: Point[], centroid: Point): number[][] => {
  points.sort((a, b) => {
    const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
    const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
    return angleA - angleB;
  });

  return points.map(({ x, y }) => [x, y]);
};
