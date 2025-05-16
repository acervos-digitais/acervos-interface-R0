function filterByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterFilterEl = document.getElementById("cluster--filter");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.valueAsNumber < 2 || !clusterFilterEl.checked) return ids;

  return new Set(Array.from(ids).filter(id => clusterData[id]["cluster"] == selectedCluster));
}

function byDistFromCluster(clusterIdx) {
  const byClusterDist = (a, b) => {
    const aDist = clusterData[a]["distances"][clusterIdx];
    const bDist = clusterData[b]["distances"][clusterIdx];
    return aDist - bDist;
  };
  return byClusterDist;
}

function sortByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.valueAsNumber < 2) return ids;

  return ids.toSorted(byDistFromCluster(selectedCluster));
}
