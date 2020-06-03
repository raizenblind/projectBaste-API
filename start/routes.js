'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')
  
  Route.get('item/get', 'ItemListController.index')
  Route.post('item/add', 'ItemListController.create')
  Route.patch('item/:id', 'ItemListController.update')
  Route.delete('item/:id', 'ItemListController.destroy')


  Route.get('order/get', 'OrderController.index')
  Route.post('order/add', 'OrderController.create').middleware('auth')
  Route.patch('order/:id', 'OrderController.update').middleware('auth')

  Route.get('cart/get', 'OrderCartListController.index').middleware('auth')
  Route.patch('cart/:id', 'OrderCartListController.update').middleware('auth')
  Route.delete('cart/:id', 'OrderCartListController.destroy').middleware('auth')
}).prefix('api')


