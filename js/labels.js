LABELS = {
  // categories
  drawing: { en: "drawing", pt: "desenho" },
  painting: { en: "painting", pt: "pintura" },

  // objects
  bird: { en: "bird", pt: "pássaro" },
  dog: { en: "dog", pt: "cachorro" },
  horse: { en: "horse", pt: "cavalo" },
  ox: { en: "ox", pt: "boi" },

  bush: { en: "bush", pt: "moita" },
  crops: { en: "crops", pt: "plantação" },
  flower: { en: "flower", pt: "flor" },
  fruit: { en: "fruit", pt: "fruta" },
  grass: { en: "grass", pt: "grama" },
  greenery: { en: "greenery", pt: "folhagem" },
  shrub: { en: "shrub", pt: "arbusto" },
  tree: { en: "tree", pt: "árvore" },
  vegetation: { en: "vegetation", pt: "vegetação" },
  conifer: { en: "conifer", pt: "conífera" },
  "palm tree": { en: "palm tree", pt: "palmeira" },

  // counter
  available: { en: "Available Works", pt: "Obras Disponíveis" },
  found: { en: "Found Works", pt: "Obras Encontradas" },
};

function getLabel(l, lang) {
  if (l in LABELS && lang in LABELS[l] && LABELS[l][lang] != "") return LABELS[l][lang];
  else return l;
}
