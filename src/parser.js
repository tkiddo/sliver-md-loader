const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const babelCore = require('@babel/core');
require('@babel/preset-react');
const frontmatter = require('front-matter');

const stringify = (src) =>
  JSON.stringify(src)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

const DEFAULT_MARKDOWN_OPTIONS = {
  html: true,
  xhtmlOut: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        // ignore
      }
    }
    return ''; // use external default escaping
  }
};
class Parser {
  constructor(_options) {
    const defaultOptions = {
      mode: 'html',
      rootElement: 'section',
      rootClass: 'markdown',
      markdown: { ...DEFAULT_MARKDOWN_OPTIONS }
    };
    const markdownOptions = { ...DEFAULT_MARKDOWN_OPTIONS, ..._options.markdown };
    this.options = { ...defaultOptions, ..._options, markdown: markdownOptions };
    this.markdown = new MarkdownIt(this.options.markdown);
    this.exports = '';
    this.prependOutput = '';
  }

  addPrependCode(code) {
    this.prependOutput = this.prependOutput.concat(`${code}\n`);
  }

  addProperty(key, value) {
    this.exports += `${key}:${value},`;
  }

  parse(source) {
    const fm = frontmatter(source);
    const html = this.markdown.render(fm.body);
    const { rootElement, mode, rootClass } = this.options;

    const body = `<${rootElement} ${
      mode === 'react' ? 'className' : 'class'
    }="${rootClass}" >${html}</${rootElement}>`;

    if (mode === 'html') {
      this.exports = stringify(body);
    } else if (mode === 'react') {
      this.addPrependCode("const React = require('react')");

      const template = body
        .replace(
          /<code(\s[^>]+)>(.+?)<\/code>/gs,
          '<code$1 dangerouslySetInnerHTML={{ __html: `$2`}} />'
        )
        .replace(/<code>(.+?)<\/code>/gs, '<code dangerouslySetInnerHTML={{ __html: `$1`}} />')
        .replace(/<(code|pre)([^\s>]*)\sclass=([^>]+)>/g, '<$1$2 className=$3>');

      const compiled = babelCore.transformSync(`const markdown = ${template}`, {
        presets: ['@babel/preset-react']
      });

      const reactComponent = `
      function (props) {
        Object.keys(props).forEach(function (key) {
          this[key] = props[key]
        })
        ${compiled.code}
        return markdown
      }`;

      this.exports = reactComponent;
    } else {
      throw new Error('unexpected mode! avaliable mode: react or html');
    }

    return `${this.prependOutput}\nmodule.exports = ${this.exports}`;
  }
}

module.exports = Parser;
