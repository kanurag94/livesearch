import React from 'react';

export default function ResultCard(props) {
  const { result } = props;
  if(result === undefined || result.message) {
      return <div>{result.message ? result.message: "Error retrieving data"}</div>
  }
  console.log(result)
  return (
    <li className="w-100 pa2 ma2 fl ba grow">
        <div className="dib w-80 fl pa2">
          <h3 className="f5 mt0 mb2">{result._source.title}</h3>
          <div className="mb2">
              {result._source.text}
          </div>
        </div>
    </li>

  );
};