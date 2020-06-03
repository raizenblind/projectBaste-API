'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemListSchema extends Schema {
  up () {
    this.create('item_lists', (table) => {
      table.increments()
      table.string('Name', 255).notNullable().unique()
      table.string('Description', 255)
      table.float("Price", 8, 2).notNullable()
      table.string('Image', 255).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_lists')
  }
}

module.exports = ItemListSchema
