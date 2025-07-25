import React from "react";
import InputComp from "../../../../../Components/InputComp";

const Values = ({ values, setValues }) => {

  
  return (
    <div className="flex flex-col gap-4 w-full">
      <InputComp
        label="Kalori"
        type="number"
        value={values?.calories || ""}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            calories: e.target.value,
          }))
        }
        placeholder="Kalori değerini giriniz"
      />
      <InputComp
        label="Protein"
        type="number"
        value={values?.protein || ""}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            protein: e.target.value,
          }))
        }
        placeholder="Protein değerini giriniz"
      />
      <InputComp
        label="Yağ"
        type="number"
        value={values?.fat || ""}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            fat: e.target.value,
          }))
        }
        placeholder="Yağ değerini giriniz"
      />
      <InputComp
        label="Karbonhidrat"
        type="number"
        value={values?.carbohydrate || ""}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            carbohydrate: e.target.value,
          }))
        }
        placeholder="Karbonhidrat değerini giriniz"
      />
    </div>
  );
};

export default Values;
