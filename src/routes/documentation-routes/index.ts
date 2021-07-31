import express from 'express'
const DocumentationRouter = express.Router()
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../documentation/testing.json');
DocumentationRouter.use('*/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default DocumentationRouter