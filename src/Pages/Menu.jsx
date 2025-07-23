import React, { useState } from "react";
import { Outlet } from "react-router";
import CategorySlider from "../Components/CategorySlider";
import { foods, categoriesData } from "../MockData/Datas";
import FoodCard from "../Components/FoodCard";
import Filter from "../Components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../Reducers/DataReducer";
const Menu = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.view);
  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };
  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const handleFilterClick = () => {
    setActiveFilters(activeFilters + 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
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
        view == "grid" ? "w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6":
        "w-full h-full flex flex-col items-start justify-start space-y-4"
      }>
        {foods.map((food) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
