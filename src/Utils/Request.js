export const request = async (url, method, action, data) => {
  const formdata = new FormData();
  formdata.append("action", action);
  formdata.append("token", localStorage.getItem("token"));
  formdata.append("lang", localStorage.getItem("adminLang"));

  if (data) {
    data.map((item) => {
      formdata.append(item.name, item.value);
    });
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: formdata,
    });

    const result = await response.json(); // <-- JSON parse
    console.log(result); // işlenmiş veri

    return result; // dışarıya döndür
  } catch (error) {
    console.error("İstek hatası:", error);
    return null;
  }
};
