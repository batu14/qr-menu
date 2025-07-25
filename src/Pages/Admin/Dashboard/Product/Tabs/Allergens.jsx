  import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Message from "../../../../../Components/Message";

const Allergens = ({ product, setProduct }) => {
  const [allergen, setAllergen] = useState("");

  const handleAddAllergen = (e) => {
    if (e.key === "Enter") {
      if (allergen.trim() === "") return;
      setProduct((prev) => ({
        ...prev,
        allergens: [...prev.allergens, allergen],
      }));
      setAllergen("");
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <input
        className="w-full rounded-md border bg-white px-4 py-2 text-sm transition-colors duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
        type="text"
        placeholder="Alerjenleri giriniz"
          value={allergen}
        onChange={(e) => {
          setAllergen(e.target.value);
        }}
        onKeyDown={(e) => {
          handleAddAllergen(e);
        }}
      />
      <div className="w-full flex items-center justify-start">  
        <Message variant="info" text="Alerjenleri yazıp enter tuşuna basınız" />
      </div>
      <div className="w-full h-96 overflow-y-scroll">
        {product.allergens.map(
          (ingredient, index) => (
            console.log(product.allergens),
            (
              <div
                key={index}
                className="flex hover:bg-slate-200 items-center justify-between p-2 gap-2"
              >
                <span className="flex items-center justify-center gap-2">
                  <p className="text-sm font-bold">Alerjen Adı:</p>
                  <p className="text-sm">{ingredient}</p>
                </span>
                <button
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      allergens: prev.allergens.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                >
                  <RxCross1 />
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Allergens;