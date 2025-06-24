function filterByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.valueAsNumber < 2) return ids;

  return new Set(Array.from(ids).filter(id => clusterData[clusterCountEl.value]["images"][id]["cluster"] == selectedCluster));
}

function byDistFromCluster(clusterIdx, clusterCount) {
  const byClusterDist = (a, b) => {
    const aDist = clusterData[clusterCount]["images"][a]["distances"][clusterIdx];
    const bDist = clusterData[clusterCount]["images"][b]["distances"][clusterIdx];
    return aDist - bDist;
  };
  return byClusterDist;
}

function sortByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.valueAsNumber < 2) return ids;

  return ids.toSorted(byDistFromCluster(selectedCluster, clusterCountEl.value));
}
