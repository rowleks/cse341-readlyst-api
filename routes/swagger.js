require('dotenv').config()
const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/swagger-output.json')

router.use('/api-docs', swaggerUi.serve)
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    persistAuthorization: true,
    customSiteTitle: 'Readlyst API Docs',
    swaggerOptions: {
      oauth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        usePkceWithAuthorizationCodeGrant: true,
        redirectUrl: process.env.SWAGGER_OAUTH_REDIRECT_URL,
      },
    },
  })
)

module.exports = router
