'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 255).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 80).notNullable()
      table.string('firstname', 255).notNullable()
      table.string('middlename', 255)
      table.string('lastname', 255).notNullable()
      table.string('gender', 10)
      table.longtext("picture")
      table.date('birthday')
      table.integer('age')
      table.float('wallet', 16, 2).defaultTo('0.00')
      table.string('user_type', 10).defaultTo('user')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
