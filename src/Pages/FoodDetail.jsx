import React, { useEffect, useState } from "react";
import { foods } from "../MockData/Datas";
import { useParams, Link } from "react-router";
import { MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";

const FoodDetail = () => {
  const [isFail, setIsFail] = useState(false);
  const { id } = useParams();
  const [food, setFood] = useState(null);

  const [translation, setTranslation] = useState();
  const langCode = useSelector((state) => state.lang.langCode);

  const getTranslation = () => {
    const formdata = new FormData();
    formdata.append("action", "getTranslation");
    formdata.append("langCode", langCode);
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setTranslation(data.data);
        }
      });
  };

  const getFood = () => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("action", "getFood");
    fetch(`${import.meta.env.VITE_API_URL}Api/Product.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setFood(data.data[0]);
          console.log(JSON.parse(data.data[0].vvalues));
        } else {
          setIsFail(true);
        }
      });
  };

  useEffect(() => {
    getFood();
    getTranslation();
  }, [langCode]);

  if (isFail) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Ürün bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-start justify-start">
        <Link
          to="/menu"
          className="w-full h-full flex  items-start justify-start p-6"
        >
          <MdArrowBackIos className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">Geri</span>
        </Link>
      </div>

      <div className="w-full h-full flex flex-col items-start justify-start">
        <div className="bg-white rounded-xl w-full overflow-hidden shadow-sm">
          {/* Resim */}
          <div className="aspect-[4/3]  sm:aspect-[16/9] overflow-hidden">
            <img
              src={food && import.meta.env.VITE_API_URL + "Api/" + food.image}
              alt={food && food.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* İçerik */}
          <div className="p-4 space-y-4">
            {/* Kategori ve Etiketler - Mobilde Dikey */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {food && food.category}
              </span>
            </div>

            {/* Başlık ve Fiyat - Mobilde Dikey */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl capitalize font-bold text-gray-900">
                {food && food.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {food && food.price}₺
                </div>
                <div className="text-sm text-gray-500 text-right">
                  ⏱️ {food && food.time}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {food && food.description}
              </p>
            </div>

            {/* Besin Değerleri - Mobilde 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food && JSON.parse(food.vvalues).calories}
                </div>
                <div className="text-xs text-gray-600">
                  {translation && translation.kalori
                    ? translation.kalori
                    : "Kalori"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food && JSON.parse(food.vvalues).protein}
                </div>
                <div className="text-xs text-gray-600">
                  {translation && translation.protein
                    ? translation.protein
                    : "Protein"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food && JSON.parse(food.vvalues).carbohydrate}
                </div>
                <div className="text-xs text-gray-600">
                  {translation && translation.karbonhidrat
                    ? translation.karbonhidrat
                    : "Karbonhidrat"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food && JSON.parse(food.vvalues).fat}
                </div>
                <div className="text-xs text-gray-600">
                  {translation && translation.yag ? translation.yag : "Yağ"}
                </div>
              </div>
            </div>

            {/* İçindekiler */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {translation && translation.vvalues
                  ? translation.vvalues
                  : "İçindekiler"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {food &&
                  food.ingredients
                    .replaceAll("[", "")
                    .replaceAll("]", "")
                    .replaceAll('"', "")
                    .split(",")
                    .map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-2 capitalize bg-white border border-gray-200 rounded-lg text-sm text-gray-700 text-center"
                      >
                        {ingredient}
                      </span>
                    ))}
              </div>
            </div>

            {/* Alerjen Uyarısı */}
            {food &&
              food.allergens
                .replaceAll("[", "")
                .replaceAll("]", "")
                .replaceAll('"', "")
                .split(",").length > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-1 text-sm">
                    ⚠️{" "}
                    {translation && translation.allergens
                      ? translation.allergens
                      : "Alerjen Uyarısı"}
                  </h4>
                  <p className="text-sm capitalize text-yellow-700">
                    {food &&
                      food.allergens
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll('"', "")
                        .split(",")
                        .join(", ")}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button - Mobil için */}
    </div>
  );
};

export default FoodDetail;
