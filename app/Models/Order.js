'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    user () {
        return this.belongs('App/Models/User')
    }
    orderCartLists() {
        return this.hasMany("App/Models/OrderCartList")    
    }
}

module.exports = Order
