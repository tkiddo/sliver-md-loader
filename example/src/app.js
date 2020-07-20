// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import Md from './assets/text.md';
import 'highlight.js/styles/dracula.css';

function App() {
  return (
    <div className="app">
      <Md.body />
    </div>
  );
}

export default React.memo(App);
