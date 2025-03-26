const WordRepository = require('../../DAL/Repositories/WordRepository');
const BaseService = require('./BaseService');
const IdError = require('../ERRORS/IdError');
const { readTextFile } = require('../../DAL/TextReader');
const { translateWords } = require('../translationService');

class WordService extends BaseService {
    constructor() {
        super(WordRepository);
    }

    async getWordById(wordId) {
        const result = await this.repository.getWordById(wordId);
        if (result) {
            return result;
        } else {
            throw new IdError('This id does not exist.');
        }
    }

    async getWords(indexToWords) {
        const arr = [];        
        for (let i = indexToWords; i < Number(indexToWords) + 10; i++) { 
            try {
                let result = await this.getWordById(i);
                if (result) {
                    arr.push(result);
                }
            } catch (err) {
                console.error(`Error fetching word with id ${i}:`, err.message);
                // throw new IdError(`Word with id ${i} does not exist.`);
            }
        }
        return arr;
    }

//     async processAndStoreWords(filePath, subscriptionKey, region) {
//     try {
//         const words = readTextFile(filePath);

//         const translatedWords = await translateWords(words, 'en', 'he');

//         const wordsToInsert = words.map((word, index) => ({
//             id: index + 1,
//             word: word,
//             translate: translatedWords[index]
//         }));

//         await this.repository.insertWords(wordsToInsert);
//         console.log('Words successfully inserted into MongoDB.');
//     } catch (error) {
//         console.error('Error processing words:', error);
//         throw new Error('Failed to process and store words.');
//     }
// }

async processAndStoreWords(filePath, subscriptionKey, region) {
    try {
        const words = readTextFile(filePath);
        const chunkSize = 100;

        const lastWord = await this.repository.getLastInsertedWord();
        let currentId = lastWord ? lastWord.id + 1 : 1;

        for (let i = 0; i < words.length; i += chunkSize) {
            const wordChunk = words.slice(i, i + chunkSize);
            const translatedWords = await translateWords(wordChunk, 'en', 'he', subscriptionKey, region);

            // בדיקה: אם מספר התרגומים לא תואם למספר המילים, יש בעיה
            if (!translatedWords || translatedWords.length !== wordChunk.length) {
                console.error(`Translation error: Expected ${wordChunk.length} translations, got ${translatedWords ? translatedWords.length : 0}.`);
                continue; // לדלג על הפעימה הזו אם תרגום לא הושלם כראוי
            }

            // סינון מילים שאין להן תרגום תקין
            const validWordsToInsert = wordChunk
                .map((word, index) => ({
                    id: currentId + index,
                    word: word,
                    translate: translatedWords[index] || null
                }))
                .filter(word => word.translate !== null); // רק מילים עם תרגום תקני

            // הכנסה למסד הנתונים רק אם יש מילים עם תרגום תקני
            if (validWordsToInsert.length > 0) {
                await this.repository.insertWords(validWordsToInsert);
                console.log(`Inserted batch ${Math.floor(i / chunkSize) + 1} into MongoDB.`);
            } else {
                console.log(`Skipping batch ${Math.floor(i / chunkSize) + 1} due to missing translations.`);
            }

            currentId += chunkSize;
        }

        console.log('All words successfully inserted into MongoDB.');
    } catch (error) {
        console.error('Error processing words:', error);
        throw new Error('Failed to process and store words.');
    }
}




}

const wordService = new WordService();
module.exports = wordService;
