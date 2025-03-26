const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // learnedWords: [{
    //     word: { type: String, required: true },
    //     translate: { type: String, required: true }
    // }],
    learnedWords: [{ type: mongoose.Schema.Types.Mixed }],
    // dailyWords: [{
    //     word: { type: String, required: true },
    //     translate: { type: String, required: true }
    // }],
    dailyWords: [{ type: mongoose.Schema.Types.Mixed }],
    date: { type: Date, required: true },
    index: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
