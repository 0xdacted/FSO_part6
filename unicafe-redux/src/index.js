import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

const App = () => {
  const [counts, setCounts] = useState(store.getState());

  store.subscribe(() => {
    setCounts(store.getState());
  });

  const handleGoodClick = () => {
    store.dispatch({ type: 'GOOD' });
  };

  const handleOkClick = () => {
    store.dispatch({ type: 'OK' });
  };

  const handleBadClick = () => {
    store.dispatch({ type: 'BAD' });
  };

  const handleResetClick = () => {
    store.dispatch({ type: 'ZERO' });
  };

  return (
    <div>
      <div>
        <h2>Feedback</h2>
        <button onClick={handleGoodClick}>Good</button>
        <button onClick={handleOkClick}>Ok</button>
        <button onClick={handleBadClick}>Bad</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <div>
        <h2>Statistics</h2>
        <p>Good: {counts[0]}</p>
        <p>Ok: {counts[1]}</p>
        <p>Bad: {counts[2]}</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
