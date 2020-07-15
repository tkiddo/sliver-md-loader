const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

const DEFAULT_MARKDOWN_OPTIONS = {
  html: true,
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
      wrapper: 'section',
      markdown: { ...DEFAULT_MARKDOWN_OPTIONS }
    };
    this.options = { ...defaultOptions, ..._options };
    this.markdown = new MarkdownIt(this.options.markdown);
  }

  parse(source) {
    const html = this.markdown.render(source);
    const { wrapper } = this.options;
    return `<${wrapper}>${html}</${wrapper}>`;
  }
}

module.exports = Parser;
