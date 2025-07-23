import React, { useState } from "react";
import { Outlet } from "react-router";
import CategorySlider from "../Components/CategorySlider";
import { foods, categoriesData } from "../MockData/Datas";
import FoodCard from "../Components/FoodCard";
import Filter from "../Components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../Reducers/DataReducer";
import CompanyBanner from "../Components/CompanyBanner";
import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { setCategories } from "../Reducers/CategoryReducer";

const Menu = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.view);
  const categories = useSelector((state) => state.category.categories);


  const [filteredFoods, setFilteredFoods] = useState(foods);


  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const handleFilterClick = () => {
    setActiveFilters(activeFilters + 1);
  };

  useEffect(() => {
    if (categories) {
      setFilteredFoods(foods.filter((food) => food.category !== categories));
    }
  }, [categories]);

  return (
    <div className="w-full relative h-full flex flex-col items-start justify-start">
      <CompanyBanner />
      
      <Sidebar />
      <CategorySlider />
      <Filter
        view={view}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onFilterClick={handleFilterClick}
        searchValue={searchValue}
        activeFilters={activeFilters}
      />

      <div className={
        view == "grid" ? "w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4":
        "w-full h-full flex flex-col items-start justify-start space-y-4"
      }>
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="w-full h-full flex flex-col items-start justify-start"
          >
            <FoodCard
              image={food.image}
              title={food.title}
              description={food.description}
              price={food.price}
              ingredients={food.ingredients}
              id={food.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
