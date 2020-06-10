'use strict'


const ItemList = use('App/Models/ItemList')
const Drive = use('Drive')
const moment = require("moment");
class ItemListController {
    async index() {
        try {
            const item = await ItemList.all();
            return item;
        }catch(err){
            return err
        }
        
    }

    async create({ request }) {
         
        const { name, description, type, price, image, status} = await request.all();
        try {
            const img = Buffer.from(image.replace('data:image/png;base64,', ''), 'base64')
            await Drive.put(`Assets/Products/${name}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`, img)
            await ItemList.create({
                name,
                description,
                type,
                price,
                image: `Assets/Products/${name}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`,
                status
            });
            const item = await ItemList.all();
            return item;
        }
        catch(err) {
            return err;
        }

    }

    async update ({params, request}) {
        const { name, description, type, price, image, status} = await request.all();
        const img = Buffer.from(image.replace('data:image/png;base64,', ''), 'base64')

        try {

            if(image.includes("data:image/png;base64,"))
            {
                await Drive.put(`Assets/Products/${name}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`, img)
                const itemList = await ItemList.find(params.id);
                await itemList.merge({
                    name,
                    description,
                    type,
                    price,
                    image: `Assets/Products/${name}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`,
                    status
                });
    
                await itemList.save();
                const item = await ItemList.all();
                return item;
            }

            const itemList = await ItemList.find(params.id);
            itemList.merge({
                name,
                description,
                type,
                price,
                image,
                status
            });

            await itemList.save();
            const item = await ItemList.all();
            return item;
        }
        catch(err) {
            return err;
        }
        
    }

    async destroy ({params}) {
        try {
            const itemList = await ItemList.find(params.id);
            await itemList.delete();
            const item = await ItemList.all();
            return item;
        }catch(err){
            return err
        }
        
    }
}

module.exports = ItemListController
