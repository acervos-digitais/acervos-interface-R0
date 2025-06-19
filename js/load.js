const OBJS_URL = "https://media.githubusercontent.com/media/acervos-digitais/herbario-data/main/json/20250619_processed.json";
const MENU_URL = "https://media.githubusercontent.com/media/acervos-digitais/herbario-data/main/json/20250619_preload.json";
const CLUSTER_URL = "https://media.githubusercontent.com/media/acervos-digitais/herbario-data/main/json/20250619_clusters.json";

const IMAGES_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/500";

const imageDataP = fetchData(OBJS_URL);
const menuDataP = fetchData(MENU_URL);
const clusterDataP = fetchData(CLUSTER_URL);

let imageData = null;
let menuData = null;
let clusterData = null;

document.addEventListener("DOMContentLoaded", async () => {
  imageData = await imageDataP;
  menuData = await menuDataP;
  clusterData = await clusterDataP;

  // Modo barato de detectar home
  if (typeof setupFilters !== "undefined") {
    setupFilters();
    setupOrderCategories();
    setupColorPicker();
    setupClusterPicker();
    setupYearPicker();
    processMenu();
  }
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}
