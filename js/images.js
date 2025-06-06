function resetImages() {
  const imagesContainer = document.getElementById('images--container');
  imagesContainer.innerHTML = '';
}

function populateImageContainer(idObjIdxs) {
  resetImages();
  idObjIdxs.forEach(x => createImageElement(x));
}

function createImageElement(imgIdObjIdxs) {
  let imagesContainer = document.getElementById('images--container');

  const img = document.createElement('img');
  const imgUrl = `${IMAGES_URL}/${imgIdObjIdxs.id}.jpg`;
  img.src = imgUrl;

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.addEventListener('click', () => populateOverlay(imgIdObjIdxs));
  imagesContainer.appendChild(a);
  a.appendChild(img);
}
