import React from "react";
import { foods } from "../MockData/Datas";
import { useParams, Link } from "react-router";
import { MdArrowBackIos } from "react-icons/md";

const FoodDetail = () => {
  // Mock data - gerçek uygulamada URL'den veya state'den gelecek
  const { id } = useParams();
  const food = foods.find((food) => food.id === parseInt(id));

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-start justify-start">
        <Link to="/menu" className="w-full h-full flex  items-start justify-start p-6">
          <MdArrowBackIos className="w-6 h-6 text-gray-500" />
          <span className="text-gray-500">Geri</span>
        </Link>
      </div>


      <div className="w-full h-full flex flex-col items-start justify-start">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Resim */}
          <div className="aspect-[4/3]  sm:aspect-[16/9] overflow-hidden">
            <img
              src={food.image}
              alt={food.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* İçerik */}
          <div className="p-4 space-y-4">
            {/* Kategori ve Etiketler - Mobilde Dikey */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {food.category}
              </span>
              <div className="flex flex-wrap gap-1">
                {food.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-900 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Başlık ve Fiyat - Mobilde Dikey */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {food.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {food.price}₺
                </div>
                <div className="text-sm text-gray-500 text-right">
                  ⏱️ {food.preparationTime}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {food.description}
              </p>
            </div>

            {/* Besin Değerleri - Mobilde 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food.calories}
                </div>
                <div className="text-xs text-gray-600">Kalori</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food.nutritionalInfo.protein}
                </div>
                <div className="text-xs text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food.nutritionalInfo.carbs}
                </div>
                <div className="text-xs text-gray-600">Karbonhidrat</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">
                  {food.nutritionalInfo.fat}
                </div>
                <div className="text-xs text-gray-600">Yağ</div>
              </div>
            </div>

            {/* İçindekiler */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                İçindekiler
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {food.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-2 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 text-center"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Alerjen Uyarısı */}
            {food.allergens.length > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-1 text-sm">
                  ⚠️ Alerjen Uyarısı
                </h4>
                <p className="text-sm text-yellow-700">
                  {food.allergens.join(", ")}
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
