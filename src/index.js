import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 */

const root = createRoot(document.getElementById('root'));
//root.render(<h1>Hello, world!</h1>);
root.render(<App />);
