import { fetchResults } from '../services/search-service';
import React, { useRef, useState } from 'react';
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
    <>
    <input type="text" placeholder="Type something here ..." onChange={handleChange}/>
      <ul className="list pl0 cf">
        {data.length === 0?"No results": data.map((result) => (
          <ResultCard key={result._id} result={result} />
        ))}
      </ul>
    </>
  );
}
