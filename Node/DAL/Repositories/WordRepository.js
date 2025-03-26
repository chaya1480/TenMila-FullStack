const wordModel = require('../Models/WordModel')

class WordRepository {
    async getWordById(wordId) {
        return await wordModel.findOne({ "id": wordId });
    }

    async insertWords(wordsArray) {
        return await wordModel.insertMany(wordsArray);
    }
    
    async getLastInsertedWord() {
        return await wordModel.findOne().sort({ id: -1 }).exec();
    }  
}

let wordRepository = new WordRepository();

module.exports = wordRepository;
