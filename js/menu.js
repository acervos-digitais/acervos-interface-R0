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

function populateMenu() {
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

  return Array.from(validIds);
}

function processOrder(validIds) {
  const orderCategoriesEl = document.getElementById("order--categories");

  if (orderCategoriesEl.value == "color") {
    return sortByColor(validIds);
  } else {
    return validIds;
  }
}

function processMenu() {
  const validIds = processFilters();
  const orderedIds = processOrder(validIds);
  populateImageContainer(orderedIds);
}

function setupOrderCategories() {
  const orderCategoriesEl = document.getElementById("order--categories");
  const colorSelectionEl = document.getElementById("color--selection");

  orderCategoriesEl.addEventListener("change", (ev) => {
    if (ev.target.value == "color") {
      colorSelectionEl.classList.remove("order--subcategory--hidden");
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
