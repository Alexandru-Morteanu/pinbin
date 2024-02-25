// KMeans.tsx
import { FC, useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type Cluster = {
  centroid: Point;
  points: Point[];
};

const calculateDistance = (point1: Point, point2: Point): number => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const assignPointsToClusters = (
  points: Point[],
  clusters: Cluster[]
): Cluster[] => {
  const updatedClusters = Array.from({ length: clusters.length }, () => ({
    centroid: { x: 0, y: 0 },
    points: [] as Point[],
  }));

  points.forEach((point) => {
    let minDistance = Number.MAX_VALUE;
    let closestClusterIndex = -1;

    clusters.forEach((cluster, index) => {
      const distance = calculateDistance(point, cluster.centroid);

      if (distance < minDistance) {
        minDistance = distance;
        closestClusterIndex = index;
      }
    });

    if (closestClusterIndex !== -1) {
      updatedClusters[closestClusterIndex].points.push(point);
    }
  });

  updatedClusters.forEach((updatedCluster, index) => {
    if (updatedCluster.points.length > 0) {
      const totalX = updatedCluster.points.reduce(
        (sum, point) => sum + point.x,
        0
      );
      const totalY = updatedCluster.points.reduce(
        (sum, point) => sum + point.y,
        0
      );
      updatedCluster.centroid = {
        x: totalX / updatedCluster.points.length,
        y: totalY / updatedCluster.points.length,
      };
    } else {
      // If a cluster has no points, keep the centroid unchanged
      updatedCluster.centroid = clusters[index].centroid;
    }
  });

  return updatedClusters;
};

const calculateNewCentroids = (clusters: Cluster[]): Point[] => {
  return clusters.map((cluster) => {
    const totalX = cluster.points.reduce((sum, point) => sum + point.x, 0);
    const totalY = cluster.points.reduce((sum, point) => sum + point.y, 0);
    const newCentroid: Point = {
      x: totalX / cluster.points.length,
      y: totalY / cluster.points.length,
    };
    return newCentroid;
  });
};
const runKMeans = (
  k: number,
  initialPoints: Point[],
  maxIterations = 100,
  convergenceThreshold = 1e-4
): Cluster[] => {
  let clusters: Cluster[] = Array.from({ length: k }, (_, index) => ({
    centroid: initialPoints[index % initialPoints.length],
    points: [],
  }));

  let iterations = 0;

  while (iterations < maxIterations) {
    const updatedClusters = assignPointsToClusters(initialPoints, clusters);

    const newCentroids = calculateNewCentroids(updatedClusters);

    // Check for convergence based on centroid movement
    const hasConverged = clusters.every(
      (cluster, index) =>
        calculateDistance(cluster.centroid, newCentroids[index]) <
        convergenceThreshold
    );

    if (hasConverged) {
      break;
    }

    // Update clusters with new centroids
    clusters = newCentroids.map((centroid, index) => ({
      centroid,
      points: updatedClusters[index]?.points || ([] as Point[]),
    }));

    iterations++;
  }

  return clusters;
};

export default runKMeans;
