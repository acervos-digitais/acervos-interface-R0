function sortByColor(ids) {
  const colorPickerEl = document.getElementById("color--selection");
  const rgbSelected = hexToRgb(colorPickerEl.value);

  const id2colors = ids.map((id) => ({
    id: id,
    colors: imageData[id]["color_palette"],
  }));

  return id2colors.toSorted(byDistFrom(rgbSelected)).map((o) => o.id);
}

// Dada uma cor em R,G,B, gera a função para ser usada em toSorted()
function byDistFrom(rgb) {
  const byRgbDist = (a, b) => {
    const aMin = Math.min(...a.colors.map((c) => rgbDist(c, rgb)));
    const bMin = Math.min(...b.colors.map((c) => rgbDist(c, rgb)));
    return aMin - bMin;
  };
  return byRgbDist;
}

// Conversão do formato hex (0x0123AB) para lista RGB ([12, 123, 222])
function hexToRgb(hex) {
  return [
    ("0x" + hex[1] + hex[2]) | 0,
    ("0x" + hex[3] + hex[4]) | 0,
    ("0x" + hex[5] + hex[6]) | 0,
  ];
}

// Distancia entre duas cores, usando um fator para afastar cores cinzas/pretas/brancas
function rgbDist(c0, c1) {
  const c0Range = Math.max(...c0) - Math.min(...c0);
  const c1Range = Math.max(...c1) - Math.min(...c1);
  greyFactor = c0Range < c1Range && c0Range < 20 ? 255 - c0Range / 1 : 0;
  return c0.reduce((s, _, i) => s + Math.abs(c0[i] - c1[i]), greyFactor);
}
