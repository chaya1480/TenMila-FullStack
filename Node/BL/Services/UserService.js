const UserRepository = require('../../DAL/Repositories/UserRepository');
const BaseService = require('./BaseService');
const IdError = require('../ERRORS/IdError');
const ParamsError = require('../ERRORS/ParamsError');
const validUser = require('../Validators/UserValidator');
const validUserWords = require('../Validators/UserWordValidator');

class UserService extends BaseService {
    constructor() {
        super(UserRepository)
    }

    async isExist(username) {
        const user = await this.repository.getById(username);
        if (user)
            throw new IdError('This username already exists');
        return user;
    }

    async getById(username) {
        const user = await this.repository.getById(username);
        if (!user)
            throw new IdError('This username is not exists');
        return user;
    }
    async deleteUser(username) {
        const user = await this.repository.deleteUser(username);
        if (!user)
            throw new IdError('This username is not exists');
    }
    async getDailyWords(username) {
        const user = await this.getById(username);
        return user.dailyWords;
    }

    async updateDate(username) {
        const existingUser = await this.repository.getById(username);
        if (!existingUser) {
            throw new IdError('This username is not exists');
        }
        this.repository.updateDate(username)
    }

    async getLearnedWords(username) {
        const user = await this.getById(username);
        return user.learnedWords;
    }

    async register(newUser, level) {
        try {
            // const validNewUser = validUser(newUser);
            // if (validNewUser.error) {
            //     throw new ParamsError(validNewUser.error.details);
            // }
            const existingUser = await this.repository.getById(newUser.username);
            if (existingUser) {
                throw new IdError('This username already exists');
            }
            newUser.date =  new Date(new Date().setDate(new Date().getDate() - 1));
            if (level == 1)
                newUser.index = 0;
            else if (level == 2)
                newUser.index = 1500;
            else if (level == 3)
                newUser.index = 3500;

            const result = await this.repository.register(newUser);
            console.log(`User ${newUser.username} added successfully`);
            return result;

        } catch (error) {
            console.error('Error inserting user:', error);
            throw error;
        }
    }

    async updateDailyWords(username, newWords) {
        try {
            // const validNewWords = validUserWords(newWords);
            // if (validNewWords.error) {
            //     throw new ParamsError(validNewWords.error.details);
            // }
            const existingUser = await this.repository.getById(username);
            if (!existingUser) {
                throw new IdError('This username is not exists');
            }

            await this.repository.updateDailyWords(username, newWords)
            // const wordsToInsert = [];

            // for (const word of newWords) {
            //     if (!(word.word && word.translate)) {
            //         throw new ParamsError('new word', ['word', 'translate']);
            //     }
            //     wordsToInsert.push({ word: word.word, translate: word.translate });
            // }
        } catch (error) {
            console.error('Error inserting words:', error);
            throw error;
        }
    }
    async updateLearnedWords(username) {
        try {
            // const validNewUser = validUserWords(newWords);
            // if (validNewUser.error) {
            //     throw new ParamsError(validNewUser.error.details);
            // }
            const existingUser = await this.repository.getById(username);
            if (!existingUser) {
                throw new IdError('This username is not exists');
            }

            const wordsToInsert = await this.getDailyWords(username);
            await this.repository.updateLearnedWords(username, wordsToInsert)
            // const formattedWords = wordsToInsert.map(wordObj => {
            //     return {
            //         word: wordObj.word,
            //         translate: wordObj.translate
            //     };
            // });
            await this.repository.updateLearnedWords(username, wordsToInsert);
        } catch (error) {
            console.error('Error inserting words:', error);
            throw error;
        }
    }
}

let userService = new UserService();
module.exports = userService;