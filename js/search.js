let originalImage;

const mouseDown = { x: -1, y: -1 };
const mouseNow = { x: -1, y: -1 };
const boxOffset = { x: -1, y: -1 };

const constrain = (v, min, max) => Math.max(min, Math.min(v, max));
const clip = (v, max) => Math.max(0, Math.min(v, max));

async function setupMenu() {
  const uploadEl = document.getElementById("menu--image-upload");
  const uploadButtEl = document.getElementById("menu--image-upload-button");
  const searchButtEl = document.getElementById("menu--image-search-button");
  const resetButtEl = document.getElementById("menu--image-reset-button");

  const imgCanvasEl = document.getElementById("menu--crop-image");
  const imgCanvasCtx = imgCanvasEl.getContext("2d");

  const boxEl = document.getElementById("crop-image--box");

  const gradioClient = await getGradioClient("acervos-digitais/herbario-embeddings-gradio");

  boxEl.style.opacity = 0;
  boxEl.style.pointerEvents = "none";
  resetButtEl.style.display = "none";

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
      imgCanvasEl.style.pointerEvents = "initial";

      imgCanvasCtx.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
    });

    mReader.readAsDataURL(uploadEl.files[0]);
    uploadEl.value = "";
  });

  imgCanvasEl.addEventListener("mousedown", (ev) => {
    mouseDown.x = clip(ev.offsetX, imgCanvasEl.clientWidth);
    mouseDown.y = clip(ev.offsetY, imgCanvasEl.clientHeight);

    boxOffset.x = imgCanvasEl.offsetLeft;
    boxOffset.y = imgCanvasEl.offsetTop;

    boxEl.style.opacity = 1;
    boxEl.style.left = `${mouseDown.x + boxOffset.x}px`;
    boxEl.style.top = `${mouseDown.y + boxOffset.y}px`;
    boxEl.style.width = `0px`;
    boxEl.style.height = `0px`;
  });

  imgCanvasEl.addEventListener("mousemove", (ev) => {
    if (mouseDown.x < 0 || mouseDown.y < 0) return;

    mouseNow.x = clip(ev.offsetX, imgCanvasEl.clientWidth);
    mouseNow.y = clip(ev.offsetY, imgCanvasEl.clientHeight);

    boxEl.style.left = `${Math.min(mouseDown.x, mouseNow.x) + boxOffset.x}px`;
    boxEl.style.top = `${Math.min(mouseDown.y, mouseNow.y) + boxOffset.y}px`;
    boxEl.style.width = `${Math.abs(mouseDown.x - mouseNow.x)}px`;
    boxEl.style.height = `${Math.abs(mouseDown.y - mouseNow.y)}px`;
  });

  imgCanvasEl.addEventListener("mouseup", () => {
    if (mouseDown.x < 0 || mouseDown.y < 0) return;

    const x0 = Math.min(mouseDown.x, mouseNow.x);
    const y0 = Math.min(mouseDown.y, mouseNow.y);
    const x1 = Math.max(mouseDown.x, mouseNow.x);
    const y1 = Math.max(mouseDown.y, mouseNow.y);
    const w = x1 - x0;
    const h = y1 - y0;

    const canvasWidth = imgCanvasEl.clientWidth;
    const canvasHeight = imgCanvasEl.clientHeight;
    const newCanvasHeight = h * canvasWidth / w;

    const sx = x0 / canvasWidth * originalImage.width;
    const sy = y0 / canvasHeight * originalImage.height;
    const sw = w / canvasWidth * originalImage.width;
    const sh = h / canvasHeight * originalImage.height;

    imgCanvasEl.height = newCanvasHeight;
    imgCanvasEl.style.height = `${newCanvasHeight}px`;
    imgCanvasEl.style.pointerEvents = "none";

    imgCanvasCtx.drawImage(originalImage, sx, sy, sw, sh, 0, 0, canvasWidth, newCanvasHeight);

    mouseDown.x = -1;
    mouseDown.y = -1;
    boxEl.style.opacity = 0;
    resetButtEl.style.display = "initial";
  });

  imgCanvasEl.addEventListener("mouseleave", () => {
    mouseDown.x = -1;
    mouseDown.y = -1;
    boxEl.style.opacity = 0;
  });

  resetButtEl.addEventListener("click", () => {
    originalImage.dispatchEvent(new Event("load"));
    resetButtEl.style.display = "none";
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
}
