import React from "react";
import { useSelector } from "react-redux";
const FoodCard = ({ image, title, description, price, ingredients }) => {
  const view = useSelector((state) => state.view.view);

  if (view === "list") {
    return (
      <div className="bg-white w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
        <div className="flex gap-4 p-4">
          {/* Resim */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-100">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                  {title}
                </h3>
                <div className="flex-shrink-0 bg-gray-50 px-3 py-1 rounded-lg">
                  <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                    {typeof price === "number" ? `${price.toFixed(2)}₺` : price}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {description}
              </p>
            </div>

            {/* İçindekiler */}
            {ingredients && ingredients.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    İçindekiler
                  </span>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {ingredients.slice(0, 4).map((ingredient, index) => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {ingredient}
                    </span>
                  ))}
                  {ingredients.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                      +{ingredients.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      {/* Resim Alanı */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* İçerik Alanı */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-lg font-semibold text-gray-900">
              {typeof price === "number" ? `${price.toFixed(2)}₺` : price}
            </span>
          </div>
        </div>

        {/* İçindekiler */}
        {ingredients && ingredients.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 line-clamp-2">
              <span className="font-medium">İçindekiler: </span>
              {ingredients.map((ingredient, index) => (
                <span key={ingredient}>
                  {ingredient}
                  {index < ingredients.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
