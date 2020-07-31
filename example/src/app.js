// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import Md from './assets/t.md';
import 'highlight.js/styles/dracula.css';

function App() {
  return (
    <div className="app">
      <img src={require('./assets/logo.png').default} alt="logo" />
      <Md />
      <div
        dangerouslySetInnerHTML={{
          __html: `<span class="hljs-keyword">const</span> a = <span class="hljs-string">\`<span class="hljs-subst">\$\{(
            <span class="hljs-number">1</span>
          )}</span>\`</span>;`
        }}
      ></div>
    </div>
  );
}

const str =
  'const markdown = <section className="markdown" ><pre><code className="language-js" dangerouslySetInnerHTML={{ __html:`<span class="hljs-keyword">const</span> a = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-number">1</span>}</span>`</span>;^`}} /></pre></section>';
const a = str.replace(/>`</g, '>\\`<');
console.log(a);

export default React.memo(App);
