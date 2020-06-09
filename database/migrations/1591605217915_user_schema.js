'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('firstname', 255).notNullable()
      table.string('middlename', 255)
      table.string('lastname', 255).notNullable()
      table.date('birthday',).notNullable()
      table.integer('age').notNullable()
      table.float('wallet', 16, 2).defaultTo('0.00')
      // alter table
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserSchema
