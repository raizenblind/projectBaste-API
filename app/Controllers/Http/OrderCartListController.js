'use strict'

const Order = use('App/Models/Order')
const OrderCartList = use('App/Models/OrderCartList')

class OrderCartListController {
    async index({ auth }) {
        try {
            const user = await auth.getUser()
            const order = await user.orders().where('status', 'Pending').last()
            const cart = await order.orderCartLists().fetch()
            const list = {
                id: order.id,
                user_id: order.user_id,
                status: order.status,
                total_price: order.total_price,
                cart: cart
            }
            return list;
        }catch(err) {
            return "No Order List";
        }
        
        
    }

    async update ({auth, request ,params}) {
        try {
            const { status } = await request.all();
            const user = await auth.getUser()
            const cart = await OrderCartList.find(params.id)
            const order = await Order.find(cart.order_id)
            if(status == 'add'){
                await cart.merge({
                    quantity: cart.quantity + 1
                })
                await cart.save();
                await order.merge({
                    total_price: order.total_price + cart.price
                })
                await order.save()
            }
            else {
                if(cart.quantity == 1)
                {
                    return "Success";
                }
                await cart.merge({
                    quantity: cart.quantity - 1
                })
                await cart.save();
                await order.merge({
                    total_price: order.total_price - cart.price
                })
                await order.save()
            }
            
            
            
            return "Success";
        }catch(err){
            return err
        }
        
    }

    async destroy ({params}) {
        try {
            const cart = await OrderCartList.find(params.id)
            const order = await Order.find(cart.order_id)
            await order.merge({
                total_price: order.total_price - (cart.price * cart.quantity)
            })
            await order.save()
            await cart.delete();
            return cart;
        }catch(err){
            return err
        }
        
    }
}

module.exports = OrderCartListController
