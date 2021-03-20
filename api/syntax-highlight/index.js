const prettier = require('prettier')
const prism = require('prismjs')

const fs = require('fs')

const stylePath = require.resolve('prismjs/themes/prism.css')
const style = fs.readFileSync(stylePath, {encoding: 'utf-8'})

exports.handler = async function http(req) {
  try {
    const body = JSON.parse(req.body)
    const params = body.params
    
    const code = prettier.format(params.code, {
      printWidth: 60,
      parser: 'babel'
    })


    const highlighted = prism.highlight(code, prism.languages.javascript, 'javascript')

    const resBody = `<style>${style}</style>${highlighted}`

    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: resBody
    }
  } catch (err) {
    console.error(err)
    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: 'error'
    }
  }
}