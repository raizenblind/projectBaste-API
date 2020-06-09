'use strict'


const ItemList = use('App/Models/ItemList')
const Helpers = use('Helpers')
const fs = require('fs')
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
         
        const { name, description, price, image, status} = await request.all();
        try {
            
            const itemList = new ItemList();
            itemList.fill({
                name,
                description,
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

    async update ({params, request}) {
        const { name, description, price, image, status} = await request.all();
        try {
            const itemList = await ItemList.find(params.id);
            itemList.merge({
                name,
                description,
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
