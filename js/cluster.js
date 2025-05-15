/* Expected clusterData format
const clusterData = {
  "1234": {
    "cluster": 1,
    "distances": [...]
  },
  "3232": {
    "cluster": 1,
    "distances": [...]
  },
  "5678" {
    "cluster": 1,
    "distances": [...]
  }
}
*/

function filterByCluster(ids) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterFilterEl = document.getElementById("cluster--filter");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.value < 2 || !clusterFilterEl.checked) return ids;

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
  const clusterOrderEl = document.getElementById("cluster--order");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const selectedCluster = clusterCategoriesEl.selectedIndex;

  if (!clusterData || clusterCountEl.value < 2 || !clusterOrderEl.checked) return ids;

  return ids.toSorted(byDistFromCluster(selectedCluster));
}
