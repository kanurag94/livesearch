import { fetchResults } from '../services/search-service';
import React, {useState } from 'react';
import ResultCard from './result-card';

export function ResultList() {
  const [data, setData] = useState([]);

  function handleChange(e) {
      const {target: {value}} = e;
      fetchResults({
          term: value,
          offset: 0,
      }).then(results => {
          setData(results)
      })
  }

  return (
    <div id="searchBox">
    <input type="text" className="input-reset grow-large b--black-20 pa2 mb2 db w-100" placeholder="Type something here ..." onChange={handleChange}/>
      <ul className="list pl0 cf">
        {data.length === 0?"Try searching `korea` or make a spelling mistake, if no results are returned please make sure the connection to backend is alive, visit https://ancient-forest-77427.herokuapp.com/search to wake the server": data.map((result) => (
          <ResultCard key={result._id} result={result} />
        ))}
      </ul>
    </div>
  );
}
