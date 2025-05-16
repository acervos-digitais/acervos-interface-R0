const OBJS_URL = "./json/20250515_no-embeddings.json";
const MENU_URL = "./json/20250515_preload.json";
const IMAGES_URL = "https://digitais.acervos.me/imgs/herbario/500";
const CLUSTER_URL = "https://acervos-digitais-herbario-cluster-gradio.hf.space";

const imageDataP = fetchData(OBJS_URL);
const menuDataP = fetchData(MENU_URL);
const clusterClientP = getGradioClient(CLUSTER_URL);

let imageData = null;
let menuData = null;
let clusterData = null;

let clusterClient = null;

document.addEventListener("DOMContentLoaded", async () => {
  imageData = await imageDataP;
  menuData = await menuDataP;
  clusterClient = await clusterClientP;

  setupFilters();
  setupOrderCategories();
  setupColorPicker();
  setupClusterPicker();
  processMenu();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}
