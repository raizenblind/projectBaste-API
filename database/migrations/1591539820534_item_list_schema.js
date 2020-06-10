'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemListSchema extends Schema {
  up () {
    this.create('item_lists', (table) => {
      table.increments()
      table.string('name', 255).notNullable().unique()
      table.string('description', 255)
      table.string('type', 60)
      table.float("price", 16, 2).notNullable()
      table.longtext('image').notNullable()
      table.boolean('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_lists')
  }
}

module.exports = ItemListSchema
