LABELS = {
  // categories
  drawing: { en: "drawing", pt: "desenho" },
  painting: { en: "painting", pt: "pintura" },

  // objects
  bird: { en: "bird", pt: "pássaro" },
  bull: { en: "bull", pt: "touro" },
  cat: { en: "cat", pt: "gato" },
  cow: { en: "cow", pt: "vaca" },
  dog: { en: "dog", pt: "cachorro" },
  horse: { en: "horse", pt: "cavalo" },
  ox: { en: "ox", pt: "boi" },

  bush: { en: "bush", pt: "moita" },
  conifer: { en: "conifer", pt: "conífera" },
  flower: { en: "flower", pt: "flor" },
  fruit: { en: "fruit", pt: "fruta" },
  grass: { en: "grass", pt: "grama" },
  greenery: { en: "greenery", pt: "folhagem" },
  "palm tree": { en: "palm tree", pt: "palmeira" },
  shrub: { en: "shrub", pt: "arbusto" },
  tree: { en: "tree", pt: "árvore" },
  vegetation: { en: "vegetation", pt: "vegetação" },

  // counter
  available: { en: "Available Works", pt: "Obras Disponíveis" },
  found: { en: "Found Works", pt: "Obras Encontradas" },
};

function getLabel(l, lang) {
  if (l in LABELS && lang in LABELS[l] && LABELS[l][lang] != "") return LABELS[l][lang];
  else return l;
}
