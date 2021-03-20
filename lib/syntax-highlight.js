const prettier = require('prettier')
const prism = require('prismjs')

const fs = require('fs')
const stylePath = require.resolve('prismjs/themes/prism.css')
const style = fs.readFileSync(stylePath, {encoding: 'utf-8'})

module.exports = function syntaxHighlight(params) {
  const code = prettier.format(params.code, {
    printWidth: 60,
    parser: 'babel'
  })

  const highlighted = prism.highlight(code, prism.languages.javascript, 'javascript')

  return {
    html: highlighted,
    dependencies: {
      css: [{
        code: style
      }]
    }
  }
}