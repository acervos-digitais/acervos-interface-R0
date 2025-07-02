LABELS = {
  // categories
  drawing: { en: "drawing", pt: "desenho" },
  painting: { en: "painting", pt: "pintura" },

  // objects
  bush: { en: "bush", pt: "moita" },
  "coniferous tree": { en: "coniferous tree", pt: "árvore conífera" },
  flower: { en: "flower", pt: "flor" },
  grass: { en: "grass", pt: "grama" },
  greenery: { en: "greenery", pt: "folhagem" },
  "palm tree": { en: "palm tree", pt: "palmeira" },
  shrub: { en: "shrub", pt: "arbusto" },
  tree: { en: "tree", pt: "árvore" },
  vegetation: { en: "vegetation", pt: "vegetação" },
};

function getLabel(l, lang) {
  if (l in LABELS && lang in LABELS[l] && LABELS[l][lang] != "") return LABELS[l][lang];
  else return l;
}
