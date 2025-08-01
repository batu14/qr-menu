import React, { useState, useEffect } from "react";

const CompanyBanner = () => {
  const [data, setData] = useState(null);

  const getData = () => {
    const formData = new FormData();
    formData.append("action", "get_data");
    fetch(`${import.meta.env.VITE_API_URL}Api/Landing.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data[0]);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="relative w-full h-20 bg-white border-b">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <div
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_API_URL + "Api/" + data?.image
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={
            data && data.image == null
              ? "w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm"
              : "w-12 h-12 rounded-lg  flex items-center justify-center shadow-sm"
          }
        >
          <span className="text-xl font-bold text-white">
            {data && data.image == null && (
              <div className="text-white text-4xl font-bold">
                {data.title.charAt(0)}
              </div>
            )}
          </span>
        </div>

        <div>
          <h1 className="text-gray-900 text-lg font-semibold">
            {data && data.title}
          </h1>
          {/* <p className="text-gray-500 text-sm">Restaurant & Cafe</p> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyBanner;
