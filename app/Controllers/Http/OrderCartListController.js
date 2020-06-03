'use strict'

const Order = use('App/Models/Order')
const OrderCartList = use('App/Models/OrderCartList')

class OrderCartListController {
    async index({ auth }) {
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
        
    }

    async update ({auth, request ,params}) {
        const { status } = await request.all();
        const user = await auth.getUser()
        const cart = await OrderCartList.find(params.id)
        const order = await Order.find(cart.order_id)
        if(status == 'add'){
            await cart.merge({
                quantity: cart.quantity + 1
            })
            
            await order.merge({
                total_price: order.total_price + cart.price
            })
        }
        else {
            await cart.merge({
                quantity: cart.quantity - 1
            })

            await order.merge({
                total_price: order.total_price - cart.price
            })
            await order.save()
        }
        
        await order.save()
        await cart.save();
        return "Success";
    }

    async destroy ({params}) {
        const cart = await OrderCartList.find(params.id)
        const order = await Order.find(cart.order_id)
        await order.merge({
            total_price: order.total_price - cart.price
        })
        await order.save()
        await cart.delete();
        return cart;
    }
}

module.exports = OrderCartListController
