function filterByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterFilterEl = document.getElementById("cluster--filter");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.valueAsNumber < 2 || !clusterFilterEl.checked) return ids;

  return new Set(Array.from(ids).filter(id => clusterData[clusterCountEl.value][id]["cluster"] == selectedCluster));
}

function byDistFromCluster(clusterIdx, clusterCount) {
  const byClusterDist = (a, b) => {
    const aDist = clusterData[clusterCount][a]["distances"][clusterIdx];
    const bDist = clusterData[clusterCount][b]["distances"][clusterIdx];
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
