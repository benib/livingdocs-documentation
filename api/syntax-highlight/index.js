const syntaxHighlight = require('../../lib/syntax-highlight.js')
exports.handler = async function http(req) {
  try {
    const body = JSON.parse(req.body)
    const params = body.params

    const res = syntaxHighlight(params)

    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: JSON.stringify(res)
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