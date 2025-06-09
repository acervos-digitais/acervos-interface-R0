function getMinYear(ids) {
  return Math.min(...ids.map(id => imageData[id].year));
}

function getMaxYear(ids) {
  const nowYear = new Date().getFullYear();
  return Math.max(...ids.map(id => imageData[id].year > nowYear ? 0 : imageData[id].year));
}

function updateYearLimits(ids) {
  const yearMinEl = document.getElementById("order--year-min");
  const yearMaxEl = document.getElementById("order--year-max");

  const minImgYear = getMinYear(ids);
  const maxImgYear = getMaxYear(ids);

  yearMinEl.setAttribute("min", minImgYear);
  yearMinEl.setAttribute("max", maxImgYear);
  yearMinEl.setAttribute("value", minImgYear);

  yearMaxEl.setAttribute("min", minImgYear);
  yearMaxEl.setAttribute("max", maxImgYear);
  yearMaxEl.setAttribute("value", maxImgYear);
}

function filterByYear(ids) {
  const yearMinEl = document.getElementById("order--year-min");
  const yearMaxEl = document.getElementById("order--year-max");

  const fromYear = parseInt(yearMinEl.value);
  const toYear = parseInt(yearMaxEl.value);

  return ids.filter(id => imageData[id].year >= fromYear && imageData[id].year <= toYear);
}

function sortByYear(ids) {
  return filterByYear(ids).toSorted((a, b) => imageData[a].year - imageData[b].year);
}
