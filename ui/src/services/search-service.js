/**
 * Performs a GET request to the backend API
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
function _fetcher(url, params) {
  const query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  const suffix = query ? `?${query}` : '';
  return fetch(`http://localhost:3000${url}${suffix}`).then((r) => {
      if(r.ok) return r.json()
      else {
        console.log(r.err)
        return [{message: "No results"}];
      }
  }
  );
}


/**
 * Performs a GET request to fetch a list of search results.
 *
 * @param params equivalent with the parameters of GET /search call
 * @returns {Promise<*>}
 */
export function fetchResults(params) {
  return _fetcher('/search', params);
}