// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import md from './assets/text.md';
import 'highlight.js/styles/dracula.css';

function App() {
  return (
    <div className="app">
      <div dangerouslySetInnerHTML={{ __html: md }} />
    </div>
  );
}

export default React.memo(App);
