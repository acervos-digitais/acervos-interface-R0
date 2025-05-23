function resetImages() {
  const imagesContainer = document.getElementById('images--container');
  imagesContainer.innerHTML = '';
}

function populateImageContainer(validIds) {
  resetImages();
  for (const id of validIds) {
    createImageElement(imageData[id]);
  }
}

function createImageElement(imageInfo) {
  let imagesContainer = document.getElementById('images--container');

  const img = document.createElement('img');
  const imgUrl = `${IMAGES_URL}/${imageInfo.id}.jpg`;
  img.src = imgUrl;

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.addEventListener('click', () => populateOverlay(imageInfo));
  imagesContainer.appendChild(a);
  a.appendChild(img);
}
