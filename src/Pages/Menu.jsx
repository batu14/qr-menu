import React, { useState } from "react";
import { Outlet } from "react-router";
import CategorySlider from "../Components/CategorySlider";

import FoodCard from "../Components/FoodCard";
import Filter from "../Components/Filter";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../Reducers/DataReducer";
import CompanyBanner from "../Components/CompanyBanner";
import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { setCategories } from "../Reducers/CategoryReducer";
import { setSearchValue } from "../Reducers/FilterReducer";
const Menu = () => {
  
  const [activeFilters, setActiveFilters] = useState(0);
  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.view);
  const categories = useSelector((state) => state.category.categories);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const [filteredFoods, setFilteredFoods] = useState();
  const [foods, setFoods] = useState();


  const langCode = useSelector((state) => state.lang.langCode);



  const getFoods =()=>{
    const formData = new FormData();
    formData.append("action", "get_data");
    formData.append("langCode", langCode);
    fetch(`${import.meta.env.VITE_API_URL}Api/Product.php`, {
      method: "POST",
      body: formData,
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status == 200){
        setFoods(data.data)
        setFilteredFoods(data.data)
      }else{
        setFoods([])
        setFilteredFoods([])
      }
    })
  }
  
  useEffect(()=>{
    getFoods();
    // getTranslation();
  },[langCode])

  const handleViewChange = (newView) => {
    dispatch(setView(newView));
  };
  const handleSearch = (value) => {
    dispatch(setSearchValue(value));
  };
  const handleFilterClick = () => {
    setActiveFilters(activeFilters + 1);
  };

  useEffect(() => {
    if (categories) {
      setFilteredFoods(foods.filter((food) => food.category === categories));
    }
    
    console.log(categories)
  }, [categories]);

  useEffect(() => {
    foods && setFilteredFoods(foods.filter((food) => food.title.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue]);

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
        {filteredFoods && filteredFoods.map((food) => (
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
