'use strict'

const User = use('App/Models/User');
const Drive = use('Drive')
const moment = require("moment");
class UserController {
    async login({ request, auth }) {
        try {
            const { email, password } = request.all();
            const token = await auth.attempt(email, password);
            return token;
        }catch(err){
            return err
        }
        
    }

    async register({ request }) {
        try {
            const { email, password, firstname, 
                middlename, lastname, gender, picture, birthday, age } = request.all();
            const img = Buffer.from(picture.replace('data:image/png;base64,', ''), 'base64')
            await Drive.put(`Assets/Users/${firstname}-${lastname}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`, img)

            await User.create({
                email,
                password,
                username: email,
                firstname,
                middlename,
                lastname,
                gender,
                picture: `Assets/Users/${firstname}-${lastname}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`,
                birthday,
                age
            });
            // this.login(...arguments)
            return "Successful registration";
        }catch(err){
            return err
        }
        
    }
    async get({ auth }) {
        const user = await auth.getUser()
        return user
    }
    async update({ auth, request }) {
        const { email, firstname, 
            middlename, lastname, gender, picture, birthday, age } = request.all();
        try {
            const token = await auth.getUser()
            const user = await User.find(token.id)
            const img = Buffer.from(picture.replace('data:image/png;base64,', ''), 'base64')
            if(picture.includes("data:image/png;base64,"))
            {
                await Drive.put(`Assets/Users/${firstname}-${lastname}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`, img)
                await user.merge({
                    email,
                    username: email,
                    firstname,
                    middlename,
                    lastname,
                    gender,
                    picture: `Assets/Users/${firstname}-${lastname}-${moment(new Date()).format("DD-MM-YYYY-hh-mm-a")}.png`,
                    birthday,
                    age
                });
                user.save()
                return user;
            }

            await user.merge({
                email,
                username: email,
                firstname,
                middlename,
                lastname,
                gender,
                picture,
                birthday,
                age
            });
            user.save()
            // this.login(...arguments)
            return user;
        }catch(err){
            return err
        }
        
    }

    async send({ request }) {
        try {
            const { email, wallet } = await request.all()
            const user = await User.findBy('email',email);
            if(!user)
            {
                return "Not exist";
            }
            await user.merge({
                wallet: user.wallet + wallet
            });
            user.save()
            return user;
        }catch(err){
            return err
        }
    }
}

module.exports = UserController
