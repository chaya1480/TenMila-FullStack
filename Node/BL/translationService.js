const axios = require('axios');

const subscriptionKey = '6Sk5e3OJWFYKy7xiXLrqcBe12ER19tzuUKAKM1Mo9y8SIRURpDIyJQQJ99BCAC5RqLJXJ3w3AAAbACOGbkUa';
const endpoint = 'https://api.cognitive.microsofttranslator.com/translate';
const location = 'westeurope'; 

// async function translateWords(words, fromLang = 'en', toLang = 'he') {
//     try {
//         let batchSize = 100;
//         let translations = [];

//         for (let i = 0; i < words.length; i += batchSize) {
//             const batch = words.slice(i, i + batchSize);

//             const response = await axios.post(
//                 `${endpoint}?api-version=3.0&from=${fromLang}&to=${toLang}`,
//                 batch.map(word => ({ Text: word })),
//                 {
//                     headers: {
//                         'Ocp-Apim-Subscription-Key': subscriptionKey,
//                         'Ocp-Apim-Subscription-Region': location,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             // הוספת התרגומים לרשימה הכללית
//             translations.push(...response.data.map(entry => entry.translations[0]?.text || ''));
//         }

//         return translations;
//     } catch (error) {
//         console.error('Translation error:', error);
//         throw new Error('Failed to translate words');
//     }
// }


// async function translateWords(words, fromLang = 'en', toLang = 'he') {
//     try {
//         const response = await axios.post(
//             `${endpoint}?api-version=3.0&from=${fromLang}&to=${toLang}`,
//             words.map(word => ({ Text: word })),
//             {
//                 headers: {
//                     'Ocp-Apim-Subscription-Key': subscriptionKey,
//                     'Ocp-Apim-Subscription-Region': location,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         return response.data.map(entry => entry.translations[0].text);
//     } catch (error) {
//         console.error('Translation error:', error);
//         throw new Error('Failed to translate words');
//     }
// }

async function translateWords(words, fromLang = 'en', toLang = 'he', subscriptionKey, region) {
    try {
        const response = await axios.post(
            `${endpoint}?api-version=3.0&from=${fromLang}&to=${toLang}`,
            words.map(word => ({ Text: word })),
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Ocp-Apim-Subscription-Region': region,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data || response.data.length !== words.length) {
            console.error('Unexpected translation response:', response.data);
            return []; // במקרה של תרגום לא תקין, מחזירים מערך ריק
        }

        // מחזירים את התרגומים או null אם לא תורגם
        return response.data.map(entry => entry.translations[0]?.text || null);
    } catch (error) {
        console.error('Translation error:', error.response?.data || error.message);
        return words.map(() => null); // במקרה של שגיאה, מחזירים null במקום מילים ריקות
    }
}

module.exports = { translateWords };
