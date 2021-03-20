const liSDK = require('@livingdocs/node-sdk')
const liClient = new liSDK.Client({
  url: process.env.LI_API_HOST,
  accessToken: process.env.LI_TOKEN
})

const syntaxHighlight = require('@architect/shared/syntax-highlight.js')

exports.handler = async function http (req) {
  const documentId = req.pathParameters.id
  const publication = await liClient.getPublication({documentId})
  const design = await liClient.getProjectDesign()
  const livingdoc = liSDK.document.create({content: publication.content, design})

  const includes = liSDK.document.getIncludes(livingdoc)

  for (const codeInclude of includes['syntax-highlight']) {
    const content = codeInclude.getContent()
    const params = content.params
    const res = syntaxHighlight(params)
    codeInclude.resolve({
      value: res,
    })
    if (res.dependencies && res.dependencies.css) {
      for (const dep of res.dependencies.css) {
        livingdoc.addCssDependency(dep)
      }
    }
  }

  const dependencies = livingdoc.dependencies

  const html = `
    <!doctype html>
    <html lang="de">
      <head>
        <meta charset="utf-8">
        ${dependencies.printJs()}
        ${dependencies.printCss()}
      </head>
      <body>
        ${liSDK.document.render(livingdoc)}
      </body>
    </html>
  `

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: html
  }
}
