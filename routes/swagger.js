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
        clientSecret: google.clientSecret,
        usePkceWithAuthorizationCodeGrant: true,
        redirectUrl: google.swaggerRedirectUrl,
      },
    },
  })
)

module.exports = router
