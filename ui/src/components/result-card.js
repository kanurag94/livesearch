import React from 'react';

export default function ResultCard(props) {
  const { result } = props;
  if(result === undefined || result.message) {
      return <div>{result.message ? result.message: "Start typing something"}</div>
  }
  console.log(result)
  return (
    <li className="db w-100 pb4 fl">
        <div className="dib w-80 fl pl2">
          <h3 className="f5 mt0 mb2">{result._source.title}</h3>
          <div className="mb2">
              {result._source.text}
          </div>
        </div>
    </li>

  );
};