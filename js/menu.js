function populateCheckboxes(pel, labels) {
  for (let label of labels) {
    const labelSlug = label.replace(" ", "-").toLowerCase();

    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add("checkbox--item");

    const inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = `${labelSlug}--checkbox`;
    inputEl.value = `${label}`;
    inputEl.addEventListener('change', processMenu);

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", inputEl.id);
    labelEl.innerHTML = `${getLabel(label, "pt")}`;

    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(labelEl);

    pel.appendChild(wrapperEl);
  }
}

function setupFilters() {
  const key2el = {
    "museums": document.getElementById("labels--collections"),
    "categories": document.getElementById("labels--categories"),
    "objects": document.getElementById("labels--objects")
  };

  Object.keys(key2el).forEach(k => populateCheckboxes(key2el[k], Object.keys(menuData[k])));
}

function getSelectedIds(pel, data) {
  const selectedVals = Array.from(pel.querySelectorAll("input")).filter(el => el.checked).map(el => el.value);

  if (selectedVals.length == 0) {
    return new Set(Object.keys(imageData));
  }

  return selectedVals.reduce((acc, val) => acc.union(new Set(data[val])), new Set());
}

function getSelectedObjects() {
  const objInputEls = document.getElementById("labels--objects").querySelectorAll("input");
  const selectedObjects = Array.from(objInputEls).filter(el => el.checked).map(el => el.value);

  if (selectedObjects.length == 0) {
    return Array.from(objInputEls).map(el => el.value);
  } else {
    return selectedObjects;
  }
}

function getObjectIndexes(orderedIds) {
  const selectedObjects = getSelectedObjects();

  const idObjIdxs = orderedIds.map(id => {
    const objIdxs = [];
    imageData[id].objects.forEach((obj, idx) => {
      if (selectedObjects.includes(obj["label"])) objIdxs.push(idx);
    });
    return { id, objIdxs };
  });

  return idObjIdxs;
}

function filterBySearch(inIds) {
  const searchInputEl = document.getElementById("menu--search");
  const words = searchInputEl.value.toLowerCase().trim().split(",");

  if (words.length < 1 || searchInputEl.value == "") return inIds;

  const outIds = Array.from(inIds).filter(id => {
    for (const w of words) {
      if (imageData[id].captions.gemma3.en.all.includes(w.trim())) return true;
      if (imageData[id].captions.gemma3.pt.all.includes(w.trim())) return true;
    }
    return false;
  });
  return new Set(outIds);
}

function processFilters() {
  const key2el = {
    "museums": document.getElementById("labels--collections"),
    "categories": document.getElementById("labels--categories"),
    "objects": document.getElementById("labels--objects")
  };

  const selIds = Object.keys(key2el).map(k => getSelectedIds(key2el[k], menuData[k]));
  const validIds = selIds.reduce((acc, val) => acc.intersection(val), new Set(Object.keys(imageData)));
  const clusterIds = filterByCluster(validIds);

  return Array.from(clusterIds);
}

function processOrder(validIds) {
  const orderCategoriesEl = document.getElementById("order--categories");

  if (orderCategoriesEl.value == "color") {
    return sortByColor(validIds);
  } else if (orderCategoriesEl.value == "year") {
    return sortByYear(validIds);
  } else {
    return sortByCluster(validIds);
  }
}

function processMenu(runUpdateYearLimits=true) {
  const orderCategoriesEl = document.getElementById("order--categories");
  const orderByYear = orderCategoriesEl.value == "year";
  const totalIds = Object.keys(imageData).length;

  const validIds = processFilters();

  if (runUpdateYearLimits) updateYearLimits(validIds);

  const orderedIds = processOrder(validIds);
  const idObjIdxs = getObjectIndexes(orderedIds);

  const counterLabelEl = document.getElementById("object-counter--label");
  const counterValueEl = document.getElementById("object-counter--value");

  counterLabelEl.innerHTML = (orderedIds.length < totalIds) ? getLabel("found", "pt") : getLabel("available", "pt");
  counterValueEl.innerHTML = `${orderedIds.length}`;

  populateImageContainer(idObjIdxs, orderByYear);
}

function setupWordSearch() {
  const searchInputEl = document.getElementById("menu--search");

  const processDelayMillis = 250;
  let timeOutId = -1;

  searchInputEl.addEventListener("input", () => {
    if (timeOutId != -1) clearTimeout(timeOutId);
    timeOutId = setTimeout(processMenu, processDelayMillis);
  });

  searchInputEl.addEventListener("focusout", () => {
    processMenu();
  });
}

function setupOrderCategories() {
  const orderCategoriesEl = document.getElementById("order--categories");
  const colorSelectionEl = document.getElementById("color--selection");
  const yearMinEl = document.getElementById("order--year-min");
  const yearMaxEl = document.getElementById("order--year-max");

  orderCategoriesEl.addEventListener("change", (ev) => {
    if (ev.target.value == "color") {
      colorSelectionEl.classList.remove("order--subcategory--hidden");
    } else {
      colorSelectionEl.classList.add("order--subcategory--hidden");
    }

    if (ev.target.value == "year") {
      yearMinEl.classList.remove("order--subcategory--hidden");
      yearMaxEl.classList.remove("order--subcategory--hidden");
    } else {
      yearMinEl.classList.add("order--subcategory--hidden");
      yearMaxEl.classList.add("order--subcategory--hidden");
    }

    processMenu();
  });
}

function setupColorPicker() {
  const colorSelectionEl = document.getElementById("color--selection");
  colorSelectionEl.addEventListener("change", processMenu);
}

function setupClusterPicker() {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterCategoriesEl = document.getElementById("cluster--categories");
  const clusterNoteEl = document.getElementById("cluster--error-note");

  clusterCountEl.addEventListener("focusout", () => {
    const numClusters = clusterCountEl.valueAsNumber;
    if (numClusters < 2) {
      clusterCategoriesEl.classList.add("hidden");
      clusterNoteEl.classList.add("hidden");
    } else {
      clusterCategoriesEl.classList.remove("hidden");
      clusterNoteEl.classList.remove("hidden");

      clusterCategoriesEl.innerHTML = "";
      for (let idx = 0; idx < numClusters; idx++) {
        const optionEl = document.createElement("option");
        optionEl.value = idx;
        optionEl.innerHTML = `Grupo ${idx}`;
        clusterCategoriesEl.appendChild(optionEl);
      }
    }
    processMenu();
    updateClusterDescription();
  });

  clusterCategoriesEl.addEventListener("change", () => {
    processMenu();
    updateClusterDescription();
  });
}

function setupYearPicker() {
  const yearMinEl = document.getElementById("order--year-min");
  const yearMaxEl = document.getElementById("order--year-max");
  yearMinEl.addEventListener("focusout", () => processMenu(false));
  yearMaxEl.addEventListener("focusout", () => processMenu(false));
}

async function setupMosaicGen() {
  const mosaicButtonEl = document.getElementById("menu--create-mosaic-button");

  const gradioClient = await getGradioClient("acervos-digitais/herbario-mosaic-gradio");

  mosaicButtonEl.addEventListener("click", async () => {
    const idObjIdxs = getObjectIndexes(processOrder(processFilters())).filter(x => x.objIdxs.length > 0);

    const result = await gradioClient.predict("/predict", {
      idObjIdxs_all: idObjIdxs,
    });

    populateMosaicOverlay(result.data[0].url);
  });
}

function setupMenu() {
  setupFilters();
  setupOrderCategories();
  setupColorPicker();
  setupClusterPicker();
  setupYearPicker();
  setupMosaicGen();
  processMenu();
}
