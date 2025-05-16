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
    labelEl.innerHTML = `${label}`;

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
  } else {
    return sortByCluster(validIds);
  }
}

function processMenu() {
  const validIds = processFilters();
  const orderedIds = processOrder(validIds);
  populateImageContainer(orderedIds);
}

function resetOrderCategories() {
  const orderCategoriesEl = document.getElementById("order--categories");
  orderCategoriesEl.selectedIndex = 0;
  orderCategoriesEl.dispatchEvent(new Event('change'));
}

function setupOrderCategories() {
  const orderCategoriesEl = document.getElementById("order--categories");
  const colorSelectionEl = document.getElementById("color--selection");
  const clusterFilterEl = document.getElementById("cluster--filter");

  orderCategoriesEl.addEventListener("change", (ev) => {
    if (ev.target.value == "color") {
      colorSelectionEl.classList.remove("order--subcategory--hidden");
      clusterFilterEl.checked = true;
    } else {
      colorSelectionEl.classList.add("order--subcategory--hidden");
    }
    processMenu();
  });
}

function setupColorPicker() {
  const colorSelectionEl = document.getElementById("color--selection");
  colorSelectionEl.addEventListener("change", processMenu);
}

function processClusterResponse(res) {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterCategoriesEl = document.getElementById("cluster--categories");

  clusterData = res.data[0];

  clusterCategoriesEl.innerHTML = "";
  for (let idx = 0; idx < clusterCountEl.value; idx++) {
    const optionEl = document.createElement("option");
    optionEl.value = idx;
    optionEl.innerHTML = `Cluster ${idx}`;
    clusterCategoriesEl.appendChild(optionEl);
  }

  clusterCategoriesEl.classList.remove("dropdown--cluster--hidden");
  document.getElementById("menu--container").style.pointerEvents = "auto";
  processMenu();
}

function setupClusterPicker() {
  const clusterCountEl = document.getElementById("cluster--count");
  const clusterOrderEl = document.getElementById("cluster--order");
  const clusterFilterEl = document.getElementById("cluster--filter");
  const clusterCategoriesEl = document.getElementById("cluster--categories");

  clusterCountEl.addEventListener("focusout", () => {
    const numClusters = clusterCountEl.value;
    if (numClusters < 2) {
      clusterCategoriesEl.classList.add("dropdown--cluster--hidden");
      processMenu();
    } else {
      console.log("Backend");
      document.getElementById("menu--container").style.pointerEvents = "none";
      clusterClient.predict("/predict", { n_clusters: numClusters }).then(processClusterResponse);
    }
  });

  clusterCategoriesEl.addEventListener("change", processMenu);
  clusterFilterEl.addEventListener("change", processMenu);

  clusterOrderEl.addEventListener("change", () => {
    if (clusterOrderEl.checked) {
      resetOrderCategories();
    }
  });
}
