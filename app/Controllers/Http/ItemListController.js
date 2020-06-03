'use strict'


const ItemList = use('App/Models/ItemList')
class ItemListController {
    async index() {
        const item = await ItemList.all();
        return item;
    }

    async create({ request }) {
        const { Name, Description, Price, Image} = await request.all();
        const itemList = new ItemList();
        itemList.fill({
            Name,
            Description,
            Price,
            Image
        });
        await itemList.save();
        const item = await ItemList.all();
        return item;
    }

    async update ({params, request}) {
        const { Name, Description, Price, Image} = await request.all();
        const itemList = await ItemList.find(params.id);
        itemList.merge({
            Name,
            Description,
            Price,
            Image
        });

        await itemList.save();
        return itemList;
    }

    async destroy ({params}) {
        const itemList = await ItemList.find(params.id);
        await itemList.delete();
        return itemList;
    }
}

module.exports = ItemListController
