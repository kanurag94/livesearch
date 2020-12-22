import React from 'react';
import { ResultList } from '../components/result-list';

export default function ListView() {
  return (
    <div>
      <header className="fw6 f2-ns center pv4 bg-washed-green dark-green mb3" align="center">Live Search</header>
      <ResultList />
    </div>
  );
}
