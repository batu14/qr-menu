const foods = [
  // Başlangıçlar
  {
    id: 1,
    title: "Humus",
    image: "https://www.unileverfoodsolutions.com.tr/dam/global-ufs/mcos/TURKEY/calcmenu/recipes/TR-recipes/2023/updates/humus/Humus-1260x839.jpg",
    price: 45,
    description: "Nohut ve tahinle yapılan klasik Orta Doğu mezesi",
    category: "Başlangıçlar",
    preparationTime: "10-15 dakika",
    calories: 200,
    ingredients: ["nohut", "tahin", "zeytinyağı", "limon", "sarımsak"],
    nutritionalInfo: {
      protein: "7g",
      carbs: "15g",
      fat: "12g",
      fiber: "4g",
    },
    allergens: ["Susam"],
    tags: ["Vegan", "Meze", "Glutensiz"],
  },
  {
    id: 2,
    title: "Ezme",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1260&q=80",
    price: 35,
    description: "Acılı domatesli başlangıç",
    category: "Başlangıçlar",
    preparationTime: "5-10 dakika",
    calories: 80,
    ingredients: ["domates", "biber", "soğan", "baharat"],
    nutritionalInfo: {
      protein: "1g",
      carbs: "6g",
      fat: "4g",
      fiber: "2g",
    },
    allergens: [],
    tags: ["Acılı", "Vegan", "Meze"],
  },
  {
    id: 3,
    title: "Mozzarella Çubukları",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1260&q=80",
    price: 55,
    description: "Kızartılmış peynir çubukları",
    category: "Başlangıçlar",
    preparationTime: "15-20 dakika",
    calories: 300,
    ingredients: ["mozzarella", "galeta unu", "yumurta", "yağ"],
    nutritionalInfo: {
      protein: "12g",
      carbs: "18g",
      fat: "20g",
      fiber: "1g",
    },
    allergens: ["Süt ürünleri", "Yumurta", "Gluten"],
    tags: ["Atıştırmalık", "Çocuklar İçin Uygun"],
  },
  {
    id: 4,
    title: "Patates Tabağı",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1260&q=80",
    price: 40,
    description: "El yapımı patates kızartması",
    category: "Başlangıçlar",
    preparationTime: "10-15 dakika",
    calories: 320,
    ingredients: ["patates", "tuz", "baharat", "yağ"],
    nutritionalInfo: {
      protein: "3g",
      carbs: "35g",
      fat: "18g",
      fiber: "4g",
    },
    allergens: [],
    tags: ["Vegan", "Atıştırmalık", "Glutensiz"],
  },

  // Ana yemekler
  {
    id: 5,
    title: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1260&q=80",
    price: 100,
    description: "Klasik etli burger",
    category: "Ana yemekler",
    preparationTime: "20-25 dakika",
    calories: 650,
    ingredients: ["ekmek", "et", "domates", "marul", "soğan", "peynir"],
    nutritionalInfo: {
      protein: "30g",
      carbs: "40g",
      fat: "35g",
      fiber: "3g",
    },
    allergens: ["Gluten", "Süt ürünleri"],
    tags: ["Popüler", "Fast Food", "Doyurucu"],
  },
  {
    id: 6,
    title: "Pizza Karışık",
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=508,quality=85/9247/uploads/urunresimleri/buyuk/karisik-pizza-ff82.jpg",
    price: 120,
    description: "Sucuk, mantar, zeytin ve biberli karışık pizza",
    category: "Ana yemekler",
    preparationTime: "25-30 dakika",
    calories: 700,
    ingredients: ["hamur", "sucuk", "mantar", "zeytin", "kaşar", "biber"],
    nutritionalInfo: {
      protein: "28g",
      carbs: "60g",
      fat: "35g",
      fiber: "5g",
    },
    allergens: ["Gluten", "Süt ürünleri"],
    tags: ["Paylaşılabilir", "Bol Malzeme", "Pizza"],
  },
  {
    id: 7,
    title: "Izgara Tavuk",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1260&q=80",
    price: 110,
    description: "Izgara tavuk göğsü yanında pilav ile",
    category: "Ana yemekler",
    preparationTime: "20-25 dakika",
    calories: 550,
    ingredients: ["tavuk", "zeytinyağı", "baharat", "pilav"],
    nutritionalInfo: {
      protein: "40g",
      carbs: "20g",
      fat: "20g",
      fiber: "2g",
    },
    allergens: [],
    tags: ["Fit Menü", "Protein Açısından Zengin"],
  },
  {
    id: 8,
    title: "Köfte Tabağı",
    image: "https://i.pinimg.com/736x/8e/0e/54/8e0e54721e1e63a220dda38b52b348a2.jpg",
    price: 95,
    description: "Dana etinden yapılmış köfteler",
    category: "Ana yemekler",
    preparationTime: "15-20 dakika",
    calories: 600,
    ingredients: ["kıyma", "soğan", "baharat", "ekmek içi", "yumurta"],
    nutritionalInfo: {
      protein: "35g",
      carbs: "18g",
      fat: "28g",
      fiber: "2g",
    },
    allergens: ["Gluten", "Yumurta"],
    tags: ["Geleneksel", "Ev Usulü", "Doyurucu"],
  },

  // Devamını istiyorsan, Salatalar, Tatlılar ve İçecekler kısmını da bu detayda dönüştürebilirim.
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
