# sliver-md-loader

> a webpack loader to parse markdown file to html or reactComponent

- [Install](#install)

- [Usage](#usage)

  - [To Html](#To-Html)

  - [To React Component](#To-React-Component)

- [Highlight Your Code Block](#hight-your-code-block)

- [Options](#options)

- [References](#References)

## Install

```
yarn add sliver-md-loader --dev

or

npm install sliver-md-loader --save-dev
```

## Usage

Now you have a file example.md:

````markdown
#### 示例

**这是一个示例**

```html
<!DOCTYPE html>
<title>Title</title>

<style>
  body {
    width: 500px;
  }
</style>

<script type="application/javascript">
  function $init() {
    return true;
  }
</script>

<body>
  <p checked class="title" id="title">Title</p>
  <!-- here goes the rest of the page -->
</body>
```

其他内容。。。
````

### To Html

config your `webpack`:

```js
//webpack.config.js

module.exports = {
  //...
  module: {
    rule: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'sliver-md-loader',
            options: {
              mode: 'html'
            }
          }
        ]
      }
    ]
  }
};
```

then you can import `markdown` file in your project, just like this:

```js
//index.js
import md from 'path/to/md-file';

const ele = document.createElement('div');
ele.innerHTML = md;
```

### To React Component

> To use react ,you have to install `@babe/core` and `@babel/preset-react` first. Get more information about [Babel](https://babeljs.io/)

change the mode option for sliver-md-loader:

```js
//webpack.config.js

module.exports = {
  //...
  module: {
    rule: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'sliver-md-loader',
            options: {
              mode: 'react'
            }
          }
        ]
      }
    ]
  }
};
```

and :

```js
//app.js
import React from 'react';
import './app.scss';
import Md from './assets/text.md';
import 'highlight.js/styles/dracula.css';

function App() {
  return (
    <div className="app">
      <Md />
    </div>
  );
}

export default React.memo(App);
```

## HighLight Your Code Block

Syntax highlighting was built-in , but you should import `css` theme file first to enable it. See more information about [hightlight.js](https://highlightjs.org/)

```js
import 'highlight.js/styles/dracula.css';
```

## Options

- `mode:string`

> default: 'html'

Choose 'react' or 'html' to get the right result for your project.

- `rootElement:string`

> default:'section'

The html element which wrappered the result

- `rootClass:string`

> default:'markdown'

The class name of `rootElement`

- `markdown:object`

[Markdown-It](https://github.com/markdown-it/markdown-it) options ：

```js
// full options list (defaults)
var md = require('markdown-it')({
  html: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) {
    return '';
  }
});
```

## References

- [markdown-it](https://github.com/markdown-it/markdown-it)

- [frontmatter-markdown-loader](https://github.com/hmsk/frontmatter-markdown-loader)
