const UserModel = require('../Models/UserModel')

class UserRepository {

    async get() {
        return await UserModel.find();
    }

    async getById(username) {
        const user = await UserModel.findOne({ "username": username });
        return user;
    }

    async register(newUser) {
        const newusername = new UserModel(newUser);
        await newusername.save();
        return newusername;
    }

    async updateDailyWords(username, newWords) {
        await UserModel.updateOne(
            { "username": username },
            { $set: { dailyWords: newWords } }
        );
        await this.updateIndex(username);
        return newWords;
    }

    async updateLearnedWords(username, newWords) {
        await UserModel.updateOne(
            { "username": username },
            { $push: { learnedWords: newWords } }
        );
        return newWords;
    }

    async updateIndex(username) {
        await UserModel.updateOne(
            { "username": username },
            { $inc: { index: 10 } }
        );
    }

    async updateDate(username) {
        await UserModel.updateOne(
            { "username": username },
            { $set: { date: new Date()}}
        );
    }

    async deleteUser(userName) {
        await UserModel.deleteOne({ "username": userName });
    }

}
let userRepository = new UserRepository();
module.exports = userRepository;