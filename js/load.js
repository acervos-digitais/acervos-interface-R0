const OBJS_URL = "./json/20250515_no-embeddings.json";
const MENU_URL = "./json/20250515_preload.json";
const IMAGES_URL = "https://digitais.acervos.me/imgs/herbario/500";

const imageDataP = fetchData(OBJS_URL);
const menuDataP = fetchData(MENU_URL);

let imageData = null;
let menuData = null;
let clusterData = null;

document.addEventListener("DOMContentLoaded", async () => {
  imageData = await imageDataP;
  menuData = await menuDataP;

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
