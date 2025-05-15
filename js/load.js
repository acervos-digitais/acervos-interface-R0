const OBJS_URL = "./json/20250422_full.json";
const MENU_URL = "./json/20250422_preload.json";
const IMAGES_URL = "https://digitais.acervos.me/imgs/herbario/500";

const imageDataP = fetchData(OBJS_URL);
const menuDataP = fetchData(MENU_URL);

let imageData = null;
let menuData = null;

document.addEventListener("DOMContentLoaded", async () => {
  imageData = await imageDataP;
  menuData = await menuDataP;

  populateMenu();
  setupOrderCategories();
  setupColorPicker();
  processMenu();
  // setupClusterPicker();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}
