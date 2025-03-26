const express = require('express');
const IdError = require('../BL/ERRORS/IdError');
const wordService = require('../BL/Services/WordService');
const WordModel = require('../DAL/Models/WordModel');
const { required } = require('joi');

const router = express.Router();

router.get('/:wordId', async (req, res, next) => {
    try {
        let wordWithId = await wordService.getWordById(req.params.wordId);
        res.send(wordWithId);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.get('/words/:indexToWords', async (req, res, next) => {
    try {
        let words = await wordService.getWords(req.params.indexToWords);
        res.send(words);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.get('/translated-words', async (req, res) => {
    try {
        const words = await WordModel.find();
        res.json({ words });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching words from database' });
    }
});

module.exports = router;

