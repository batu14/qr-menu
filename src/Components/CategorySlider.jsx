import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Categoryİtem from "./Categoryİtem";
import {categoriesData} from '../MockData/Datas'
import { useDispatch } from 'react-redux'
import { setCategories } from '../Reducers/CategoryReducer' 



const CategorySlider = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]?.id);
  const dispatch = useDispatch()
  const handleCategoryClick = (categoryId,categoryTitle) => {
    setActiveCategory(categoryId);
    dispatch(setCategories(categoryTitle))
  };

  return (
    <div className="w-full bg-gray-50/50 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="relative category-slider">
          {/* Sol gradient gölge */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50/50 to-transparent z-10" />
          
          <div className="px-4">
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
                bulletActiveClass: "swiper-pagination-bullet-active !bg-gray-800",
                bulletClass:
                  "swiper-pagination-bullet !bg-gray-300 !w-6 !h-1 !rounded-none",
              }}
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 28,
                },
              }}
              className="!pb-6"
            >
              {categoriesData.map((category) => (
                <SwiperSlide key={category.id} className="py-1">
                  <Categoryİtem

                    image={category.image}
                    title={category.title}
                    isActive={activeCategory === category.id}
                    onClick={() => handleCategoryClick(category.id,category.title)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Sağ gradient gölge */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50/50 to-transparent z-10" />
        </div>
      </div>

      
    </div>
  );
};

export default CategorySlider;
