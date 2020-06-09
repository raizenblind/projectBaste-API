'use strict'

const User = use('App/Models/User');

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
            await User.create({
                email,
                password,
                username: email,
                firstname,
                middlename,
                lastname,
                gender,
                picture,
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
        try {
            const { email, firstname, 
                middlename, lastname, gender, picture, birthday, age } = request.all();
            const token = await auth.getUser()
            const user = await User.find(token.id)
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

    async send({ request, params }) {
        try {const { wallet } = await request.all()
            const user = await User.find(params.id)
            await user.merge({
                wallet: user.wallet + wallet
            });
            user.save()
            // this.login(...arguments)
            return user;
        }catch(err){
            return err
        }
    }
}

module.exports = UserController
