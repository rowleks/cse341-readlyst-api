const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger-output.json')
const { google } = require('../config/auth')

router.use('/api-docs', swaggerUi.serve)
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    persistAuthorization: true,
    customSiteTitle: 'Readlyst API Docs',
    swaggerOptions: {
      oauth: {
        clientId: google.clientID,
        usePkceWithAuthorizationCodeGrant: true,
        redirectUrl: google.swaggerRedirectUrl,
      },
    },
  })
)
router.get('/api-docs/oauth2-redirect.html', (_, res) => {
  res.sendFile(
    require('path').join(
      __dirname,
      '../node_modules/swagger-ui-dist/oauth2-redirect.html'
    )
  )
})

module.exports = router
