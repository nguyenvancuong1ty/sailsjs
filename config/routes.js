/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  '/contact': { view: 'pages/contact'},

  'GET /api/v1/users' :  { controller: 'Users', action: 'find' },

  'POST /api/v1/send-email' :  { controller: 'Users', action: 'sendEmail' },

  'GET /api/v1/users/:page/:limit' :  { controller: 'Users', action: 'pagination' },


  'POST /api/v1/users' :  { controller: 'Users', action: 'store' },

  'PUT /api/v1/users/:id' :  { controller: 'Users', action: 'update' },

  'DELETE /api/v1/users/:id' :  { controller: 'Users', action: 'delete'},

  'DELETE /api/v1/users' :  { controller: 'Users', action: 'deleteMulti'},

  'POST /api/v1/vote' :  { controller: 'Vote', action: 'vote' },

  'POST /api/v1/vote/delete' :  { controller: 'Vote', action: 'delete' },


  'POST /api/v1/login' :  { controller: 'Users', action: 'login' },

  'GET /api/v1/users/:username' :  { controller: 'Users', action: 'findByName' },

  'GET /api/v1/voucher' :  { controller: 'voucher', action: 'find' },



  '/v1/api-docs': {
		view: 'swagger',
		locals: {
			layout: false
		}
	}, 



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
