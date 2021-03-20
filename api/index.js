const liSDK = require('@livingdocs/node-sdk')
const liClient = new liSDK.Client({
  url: process.env.LI_API_HOST,
  accessToken: process.env.LI_TOKEN
})

exports.handler = async function http (req) {
  
  const [menu] = await liClient.getMenus({handle: 'documentation'})

  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,
    body: JSON.stringify({
      menu
    })
  }
}
