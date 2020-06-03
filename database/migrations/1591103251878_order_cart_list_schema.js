'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderCartListSchema extends Schema {
  up () {
    this.create('order_cart_lists', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.string('name', 255).notNullable().unique()
      table.string('description', 255)
      table.float("price", 8, 2).notNullable()
      table.string('image', 255).notNullable()
      table.integer("quantity").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_cart_lists')
  }
}

module.exports = OrderCartListSchema
