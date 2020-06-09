'use strict'

const Order = use('App/Models/Order')
const OrderCartList = use('App/Models/OrderCartList')
class OrderController {
    async index({ auth, response }) {
        try {
            const user = await auth.getUser()
            const order = await user.orders().where('status', 'Pending').last()
            let list = {}
            if(!order){
                return list;
            }
            const cart = await order.orderCartLists().fetch()
            list = {
                id: order.id,
                user_id: order.user_id,
                status: order.status,
                total_price: order.total_price,
                cart: cart
            }
            return list;
        }catch(err){
            return err
        }
        
        
    }

    async create({ auth, request }) {
        try {
            const user = await auth.getUser()
            const { name, description, price, image} = await request.all();
            let userOrder = await user.orders().where('status', 'Pending').last()
            
            if(!userOrder){
                const order = new Order()
                await order.fill({
                    status: 'Pending',
                    total_price: price
                })
                await user.orders().save(order)
            }else{
                const order = await Order.find(userOrder.id)
                await order.merge({
                    total_price: price + userOrder.total_price
                })
                await order.save()
            }

            userOrder = await user.orders().where('status', 'Pending').last()
            const orderCart = await userOrder.orderCartLists().where('name', name).last()

            if(!orderCart){
                const orderCartList = new OrderCartList()
                await orderCartList.fill({
                    name,
                    description,
                    price,
                    image,
                    quantity: 1
                })
                await userOrder.orderCartLists().save(orderCartList)
            }else{
                const orderCartList = await OrderCartList.find(orderCart.id)
                console.log(orderCartList)
                await orderCartList.merge({
                    quantity: orderCart.quantity + 1
                })
                await orderCartList.save()
            }
            
            const cart = await userOrder.orderCartLists().fetch()
            
            const list = {
                id: userOrder.id,
                user_id: userOrder.user_id,
                status: userOrder.status,
                total_price: userOrder.total_price,
                cart: cart
            }
        return list;
        }
        catch(err) {
            return err
        }
        
        
    }

    async update ({auth, params}) {
        try {
            const user = await auth.getUser()
            let order = await Order.find(params.id)
            await order.merge({
                status: "Paid"
            })

            await order.save();
            return "Success";
        }catch(err){
            return err
        }
        
    }
}

module.exports = OrderController
