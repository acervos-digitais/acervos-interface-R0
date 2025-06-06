let originalImage;

document.addEventListener("DOMContentLoaded", async () => {
  const uploadEl = document.getElementById("menu--image-upload");
  const uploadButtEl = document.getElementById("menu--image-upload-button");
  const searchButtEl = document.getElementById("menu--image-search-button");

  const imgCanvasEl = document.getElementById("menu--crop-image");
  const imgCanvasCtx = imgCanvasEl.getContext("2d");

  const gradioClient = await getGradioClient("acervos-digitais/herbario-embeddings-gradio");

  uploadButtEl.addEventListener("click", () => {
    uploadEl.click();
  });

  uploadEl.addEventListener("change", () => {
    const mReader = new FileReader();
    originalImage = new Image();

    mReader.addEventListener("load", () => {
      originalImage.src = mReader.result;
    });

    originalImage.addEventListener("load", () => {
      const canvasWidth = imgCanvasEl.clientWidth;
      const canvasHeight = originalImage.height * canvasWidth / originalImage.width;

      imgCanvasEl.width = canvasWidth;
      imgCanvasEl.height = canvasHeight;

      imgCanvasEl.style.height = `${canvasHeight}px`;

      imgCanvasCtx.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
    });

    mReader.readAsDataURL(uploadEl.files[0]);
  });

  imgCanvasEl.addEventListener("click", () => {
    // TODO: crop popup
  });

  searchButtEl.addEventListener("click", () => {
    imgCanvasEl.toBlob(async (canvasBlob) => {
      const response = await gradioClient.predict("/predict_1", {
        img: canvasBlob,
      });
      const result = response.data[0];

      // FOR TESTING
      // const result = SEARCH_RESULT;

      const idObjIdxs = result.map(x => {
        return {
          id: x.split("_")[0],
          objIdxs: [ parseInt(x.split("_")[1]) ]
        };
      });

      populateImageContainer(idObjIdxs);
    });
  });
});
