module.exports['swagger-generator'] = {
    disabled: true, //false 
    swaggerJsonPath: './assets/swagger/swagger.json',
    swagger: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Json',
            description: 'This is a generated swagger json for your sails project',
            termsOfService: 'http://example.com/terms',
            contact: {name: 'Theophilus Omoregbee', url: 'http://github.com/theo4u', email: 'theo4u@ymail.com'},
            license: {name: 'Apache 2.0', url: 'http://www.apache.org/licenses/LICENSE-2.0.html'},
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:1337/' }
        ],
        externalDocs: {url: 'https://theoomoregbee.github.io/'}
    },
    defaults: {
        responses: {
            '200': { description: 'The requested resource' },
            '400': { description: 'Bad request....' },
            '404': { description: 'Resource not found' },
            '500': { description: 'Internal server error' }
        }
    },
    // excludeDeprecatedPutBlueprintRoutes: true,
    // includeRoute: function(routeInfo) { return true; },
    // updateBlueprintActionTemplates: function(blueprintActionTemplates) {  },
    // postProcess: function(specifications) {  }
};