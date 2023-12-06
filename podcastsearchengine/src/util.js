export const doSearch = (query) => {
  const searchUrl = "";

  return fetch(searchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to search");
    }
    return response.json;
  });
};
