function resetImages() {
  const imagesContainer = document.getElementById('images--container');
  imagesContainer.innerHTML = '';
}

function populateImageContainer(idObjIdxs, orderByYear=false) {
  resetImages();
  idObjIdxs.forEach(x => createImageElement(x));

  if (orderByYear) {
    populateImageYears();
  }
}

function createImageElement(imgIdObjIdxs) {
  const imagesContainer = document.getElementById('images--container');

  const img = document.createElement('img');
  const imgUrl = `${IMAGES_URL}/${imgIdObjIdxs.id}.jpg`;
  img.src = imgUrl;

  const imageYear = imageData[imgIdObjIdxs.id].year;
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('image--year');
  dateDiv.innerHTML = `${imageYear}`;

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.addEventListener('click', () => populateOverlay(imgIdObjIdxs));
  imagesContainer.appendChild(a);
  a.appendChild(img);
  a.appendChild(dateDiv);
}

function populateImageYears() {
  const imagesContainer = document.getElementById("images--container");
  const allImages = Array.from(imagesContainer.childNodes);

  let prevYear = 0;
  let sameYearCnt = 0;

  for (let idx = 0; idx < allImages.length; idx += 1) {
    const img = allImages[idx];
    const dateDiv = img.querySelectorAll(".image--year")[0];
    const thisYear = parseInt(dateDiv.innerHTML);

    const newNow = (thisYear != prevYear);
    const longNow = (thisYear == prevYear) && (sameYearCnt > 4) && (idx % 10 == 0);

    if (thisYear != 9999 && (longNow || newNow)) {
      dateDiv.classList.add("show");
    }

    sameYearCnt = (thisYear == prevYear) ? sameYearCnt + 1 : 0;
    prevYear = thisYear;
  }
}
