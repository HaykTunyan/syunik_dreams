export const cities = [
  {
    id: "kapan",
    name: "Կապան",
    latinName: "Kapan",
    description: "Սյունիքի մարզկենտրոնը, որը գտնվում է Խուստուփ լեռան ստորոտին։",
    population: "~42,000",
    size: "36 կմ²",
    founding: "10-րդ դար",
    coords: [39.2075, 46.4058] as [number, number],
    image: "/images/kapan_city.png",
    attractions: [
      { id: "khustup", image: "/images/kapan_attraction_1.png" },
      { id: "vahanavank", image: "/images/kapan_attraction_2.png" },
      { id: "museum", image: "/images/kapan_attraction_3.png" },
    ]
  },
  {
    id: "goris",
    name: "Գորիս",
    latinName: "Goris",
    description: "Ճարտարապետական եզակի ոճ ունեցող քաղաք, հայտնի քարանձավներով։",
    population: "~20,000",
    size: "5.03 կմ²",
    founding: "1870 թ.",
    coords: [39.5126, 46.3382] as [number, number],
    image: "/images/goris_city.png",
    attractions: [
      { id: "tatev", image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Monasterio_de_Tatev%2C_Armenia%2C_2016-10-01%2C_DD_89-91_HDR.jpg" },
      { id: "rock_forest", image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Stone_Pyramids_in_Goris.jpg" },
      { id: "old_town", image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/2014_Prowincja_Sjunik%2C_Goris%2C_Widok_na_Stary_Goris_%28Kores%29_%2801%29.jpg" },
      { id: "khndzoresk", image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Swinging_Bridge_of_Khndzoresk.JPG" },
    ]
  },
  {
    id: "sisian",
    name: "Սիսիան",
    latinName: "Sisian",
    description: "Գտնվում է Որոտան գետի ափին, հարուստ պատմությամբ։",
    population: "~15,000",
    size: "9 կմ²",
    founding: "մ.թ.ա. 8 դ.",
    coords: [39.5181, 46.0306] as [number, number],
    image: "/images/sisian_city.png",
    attractions: [
      { id: "shaki", image: "/images/sisian/shaki-waterfall-sisian.png" },
      { id: "zorats", image: "/images/sisian/zaorats-karer.png" },
      { id: "church", image: "/images/sisian/st-hovhannes-church-sisian.png" },
    ]
  },
  {
    id: "agarak",
    name: "Ագարակ",
    latinName: "Agarak",
    description: "Սյունիքի հանքային քաղաք, հայտնի է մոլիբդեն և պղինձ հանքերով։",
    population: "~7,500",
    size: "2.5 կմ²",
    founding: "1950 թ.",
    coords: [38.880, 46.252] as [number, number],
    image: "/images/agarak_city.png",
    attractions: [
      { id: "araks", image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Aras_river_at_Nurduz_05.jpg" },
      { id: "copper", image: "https://www.ecolur.org/files/news/2011/09/092748124683.jpg" },
      { id: "stgeorge", image: "https://upload.wikimedia.org/wikipedia/commons/2/23/The_Surb_Gevorg_church_of_Lor_01.jpg" },
    ]
  },
  {
    id: "meghri",
    name: "Մեղրի",
    latinName: "Meghri",
    description: "Հայաստանի ամենահարավային քաղաքը՝ մեղմ կլիմայով։",
    population: "~4,500",
    size: "3 կմ²",
    founding: "906 թ.",
    coords: [38.9029, 46.2446] as [number, number],
    image: "/images/meghri_city.png",
    attractions: [
      { id: "fortress", image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Meghri_Fortress.jpg" },
      { id: "frescoes", image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/%D5%84%D5%A5%D5%B2%D6%80%D5%B8%D6%82_%D5%AB%D6%80%D5%B4%D5%B6%D5%A1%D5%B6%D5%AF%D5%A1%D6%80%D5%B6%D5%A5%D6%80.jpg" },
      { id: "arevik", image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Arevik_National_Park_and_Meghri_mountains_in_winter.jpg" },
    ]
  },
  {
    id: "qajaran",
    name: "Քաջարան",
    latinName: "Qajaran",
    description: "Արևելյան Սյունիքի արդյունաբերական քաղաք, հանքարդյունաբերությամբ հայտնի։",
    population: "~8,000",
    size: "4.1 կմ²",
    founding: "1958 թ.",
    coords: [39.1441, 46.2553] as [number, number],
    image: "/images/qajaran_city.png",
    attractions: [
      { id: "bear", image: "https://upload.wikimedia.org/wikipedia/commons/4/40/%D5%94%D5%A1%D5%BB%D5%A1%D6%80%D5%A1%D5%B6%D5%AB_%D5%A2%D5%A1%D5%AC%D5%AB%D5%B6.jpg" },
      { id: "voghji", image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Mountains_of_Syunik%2C_Voghji_river_16.jpg" },
      { id: "zangezur", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Zangezur_mountains_view%2C_Syunik%2C_Armenia_-_panoramio_%281%29.jpg" },
    ]
  },
];
