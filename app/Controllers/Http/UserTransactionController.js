'use strict'

const Order = use('App/Models/Order')
const User = use('App/Models/User');
class UserTransactionController {
    async get() {
        try {
            const user = await User.query()
            .has('orders').with('orders', (builder) => {
                builder.with('orderCartLists')
              }).fetch()

            return user;
        }catch(err){
            console.log(err)
            return err
        }
        
    }

    async getByUserID({ request, auth }) {
        try {
            const user = await auth.getUser()
            const order = await user.orders().with('orderCartLists').fetch()
              
            return order;
        }catch(err){
            console.log(err)
            return err
        }
        
    }
}

module.exports = UserTransactionController
