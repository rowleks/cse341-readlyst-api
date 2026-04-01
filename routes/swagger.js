const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger-output.json')
const swaggerUiDist = require('swagger-ui-dist')
const { google } = require('../config/auth')

router.use('/api-docs', swaggerUi.serve)
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    persistAuthorization: true,
    customSiteTitle: 'Readlyst API Docs',
    swaggerOptions: {
      oauth2RedirectUrl: google.swaggerRedirectUrl,
      oauth: {
        clientId: google.clientID,
        usePkceWithAuthorizationCodeGrant: true,
      },
    },
    initOAuth: {
      clientId: google.clientID,
      usePkceWithAuthorizationCodeGrant: true,
      scopes: 'openid email profile',
    },
  })
)

router.get('/api-docs/oauth2-redirect.html', (_, res) => {
  res.sendFile(`${swaggerUiDist.getAbsoluteFSPath()}/oauth2-redirect.html`)
})

module.exports = router
