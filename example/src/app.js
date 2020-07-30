// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import Md from './assets/text.md';
import 'highlight.js/styles/dracula.css';

console.log(<Md />);

function App() {
  return (
    <div className="app">
      <img src={require('./assets/logo.png').default} alt="logo" />
      <Md />
      <div dangerouslySetInnerHTML={{ __html: '<span>`<span>aaa</span>`</span>;' }}></div>
    </div>
  );
}

export default React.memo(App);
