const liSDK = require('@livingdocs/node-sdk')
const liClient = new liSDK.Client({
  url: process.env.LI_API_HOST,
  accessToken: process.env.LI_TOKEN
})

exports.handler = async function http (req) {
  const documentId = req.pathParameters.id
  const publication = await liClient.getPublication({documentId})
  const design = await liClient.getProjectDesign()
  const livingdoc = liSDK.document.create({content: publication.content, design})

  const includes = liSDK.document.getIncludes(livingdoc)

  const html = liSDK.document.render(livingdoc)

  
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: html
  }
}
