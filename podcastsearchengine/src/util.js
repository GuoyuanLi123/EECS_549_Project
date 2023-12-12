export const doSearch = async (query) => {
  const baseUrl = "http://localhost:8000";
  let searchUrl = baseUrl;
  searchUrl = searchUrl.concat("/");
  searchUrl = searchUrl.concat("search");
  searchUrl = searchUrl.concat("/");
  searchUrl = searchUrl.concat(query.get("query"));
  searchUrl = searchUrl.concat("/");
  searchUrl = searchUrl.concat(query.get("episodeName"));
  searchUrl = searchUrl.concat("/");
  searchUrl = searchUrl.concat(query.get("showName"));
  searchUrl = searchUrl.concat("/");
  searchUrl = searchUrl.concat(query.get("publiher"));
  const response = await fetch(searchUrl);
  if (response.status < 200 || response.status >= 300) {
    throw Error("Fail to search");
  }
  return response.json();
};


