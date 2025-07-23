const foods = [
  // Başlangıçlar
  {
    id: 1,
    title: "Humus",
    image: "https://www.unileverfoodsolutions.com.tr/dam/global-ufs/mcos/TURKEY/calcmenu/recipes/TR-recipes/2023/updates/humus/Humus-1260x839.jpg",
    price: 45,
    description: "Nohut ve tahinle yapılan klasik Orta Doğu mezesi",
    category: "Başlangıçlar",
    ingredients: ["nohut", "tahin", "zeytinyağı", "limon", "sarımsak"],
  },
  {
    id: 2,
    title: "Ezme",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1260&q=80",
    price: 35,
    description: "Acılı domatesli başlangıç",
    category: "Başlangıçlar",
    ingredients: ["domates", "biber", "soğan", "baharat"],
  },
  {
    id: 3,
    title: "Mozzarella Çubukları",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1260&q=80",
    price: 55,
    description: "Kızartılmış peynir çubukları",
    category: "Başlangıçlar",
    ingredients: ["mozzarella", "galeta unu", "yumurta", "yağ"],
  },
  {
    id: 4,
    title: "Patates Tabağı",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1260&q=80",
    price: 40,
    description: "El yapımı patates kızartması",
    category: "Başlangıçlar",
    ingredients: ["patates", "tuz", "baharat", "yağ"],
  },

  // Ana Yemekler
  {
    id: 5,
    title: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1260&q=80",
    price: 100,
    description: "Klasik etli burger",
    category: "Ana yemekler",
    ingredients: ["ekmek", "et", "domates", "marul", "soğan", "peynir"],
  },
  {
    id: 6,
    title: "Pizza Karışık",
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=508,quality=85/9247/uploads/urunresimleri/buyuk/karisik-pizza-ff82.jpg",
    price: 120,
    description: "Sucuk, mantar, zeytin ve biberli karışık pizza",
    category: "Ana yemekler",
    ingredients: ["hamur", "sucuk", "mantar", "zeytin", "kaşar", "biber"],
  },
  {
    id: 7,
    title: "Izgara Tavuk",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1260&q=80",
    price: 110,
    description: "Izgara tavuk göğsü yanında pilav ile",
    category: "Ana yemekler",
    ingredients: ["tavuk", "zeytinyağı", "baharat", "pilav"],
  },
  {
    id: 8,
    title: "Köfte Tabağı",
    image: "https://i.pinimg.com/736x/8e/0e/54/8e0e54721e1e63a220dda38b52b348a2.jpg",
    price: 95,
    description: "Dana etinden yapılmış köfteler",
    category: "Ana yemekler",
    ingredients: ["kıyma", "soğan", "baharat", "ekmek içi", "yumurta"],
  },

  // Salatalar
  {
    id: 9,
    title: "Çoban Salata",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1260&q=80",
    price: 50,
    description: "Domates, salatalık, biber ve soğanlı klasik salata",
    category: "Salatalar",
    ingredients: ["domates", "salatalık", "biber", "soğan", "limon", "zeytinyağı"],
  },
  {
    id: 10,
    title: "Sezar Salata",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1260&q=80",
    price: 85,
    description: "Tavuklu, krutonlu ve parmesanlı Sezar salatası",
    category: "Salatalar",
    ingredients: ["marul", "tavuk", "kruton", "parmesan", "sezar sos"],
  },
  {
    id: 11,
    title: "Ton Balıklı Salata",
    image: "https://images.unsplash.com/photo-1559054663-e8d23213f44d?auto=format&fit=crop&w=1260&q=80",
    price: 90,
    description: "Ton balığı, mısır ve yeşilliklerle zengin salata",
    category: "Salatalar",
    ingredients: ["ton balığı", "marul", "mısır", "zeytinyağı", "limon"],
  },

  // Tatlılar
  {
    id: 12,
    title: "Sufle",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1260&q=80",
    price: 65,
    description: "İçi akışkan çikolatalı sıcak tatlı",
    category: "Tatlılar",
    ingredients: ["çikolata", "yumurta", "şeker", "un", "tereyağı"],
  },
  {
    id: 13,
    title: "Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1260&q=80",
    price: 70,
    description: "Kahveli ve kremalı İtalyan tatlısı",
    category: "Tatlılar",
    ingredients: ["kedi dili", "mascarpone", "kahve", "kakao", "yumurta"],
  },
  {
    id: 14,
    title: "Profiterol",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=1260&q=80",
    price: 60,
    description: "İçi kremalı üzeri çikolata soslu tatlı",
    category: "Tatlılar",
    ingredients: ["un", "yumurta", "krema", "çikolata"],
  },

  // İçecekler
  {
    id: 15,
    title: "Kola",
    image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1260&q=80",
    price: 25,
    description: "330ml soğuk kola",
    category: "İçecekler",
    ingredients: ["gazlı içecek"],
  },
  {
    id: 16,
    title: "Ayran",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1260&q=80",
    price: 20,
    description: "Yoğurttan yapılmış geleneksel içecek",
    category: "İçecekler",
    ingredients: ["yoğurt", "su", "tuz"],
  },
  {
    id: 17,
    title: "Limonata",
    image: "https://images.unsplash.com/photo-1556679343-c1c4b8e4fdce?auto=format&fit=crop&w=1260&q=80",
    price: 30,
    description: "Taze limonla yapılan ferahlatıcı içecek",
    category: "İçecekler",
    ingredients: ["limon", "şeker", "su", "nane"],
  },
  {
    id: 18,
    title: "Türk Kahvesi",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1260&q=80",
    price: 35,
    description: "Geleneksel Türk kahvesi",
    category: "İçecekler",
    ingredients: ["kahve", "su", "isteğe bağlı şeker"],
  },
];

const categoriesData = [
  {
    id: 1,
    title: "Başlangıçlar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
  {
    id: 2,
    title: "Ana Yemekler",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
  {
    id: 3,
    title: "Salatalar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
  {
    id: 4,
    title: "Tatlılar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
  {
    id: 5,
    title: "İçecekler",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
];

export { foods, categoriesData };
