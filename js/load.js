const OBJS_URL =    "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_processed.json";
const MENU_URL =    "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_preload.json";
const CLUSTER_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_clusters.json";

// const IMAGES_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/500";
const IMAGES_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";

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

  setupMenu();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}
