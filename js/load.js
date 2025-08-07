const OBJS_URL =    "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_processed.json";
const CLUSTER_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_clusters.json";

// const IMAGES_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/500";
const IMAGES_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";

const imageDataP = fetchData(OBJS_URL);
const clusterDataP = fetchData(CLUSTER_URL);

let imageData = null;
let clusterData = null;
let menuData = null;

document.addEventListener("DOMContentLoaded", async () => {
  imageData = await imageDataP;
  clusterData = await clusterDataP;
  menuData = createMenuData(imageData);

  setupMenu();
});

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}

function createMenuData(imageData) {
  const menuData = {
    categories: {},
    museums: {},
    objects: {},
  };

  for (const id of Object.keys(imageData)) {
    const item = imageData[id];
    const col = item.museum;

    if (!(col in menuData.museums)) {
      menuData.museums[col] = [];
    }
    menuData.museums[col].push(id);

    for (const cat of item.categories) {
      if (!(cat in menuData.categories)) {
        menuData.categories[cat] = [];
      }
      menuData.categories[cat].push(id);
    }

    for (const obj of item.objects) {
      if (!(obj.label in menuData.objects)) {
        menuData.objects[obj.label] = [];
      }
      menuData.objects[obj.label].push(id);
    }
  }

  return menuData;
}
