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
  img.setAttribute("data--image-id", imageInfo.id);
  img.src = imgUrl;
  // imgObserver.observe(img);

  const a = document.createElement('a');
  a.classList.add('images--element');
  a.setAttribute("data--image-id", imageInfo.id);
  // a.addEventListener('click', () => populateOverlay(imageInfo.id, imgUrl));
  imagesContainer.appendChild(a);
  a.appendChild(img);
}
