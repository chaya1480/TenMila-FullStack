const express = require('express');
const IdError = require('../BL/ERRORS/IdError');
const ParamsError = require('../BL/ERRORS/ParamsError');
const UserService = require('../BL/Services/UserService');

const router = express.Router();
router.get('/', async (req, res, next) => {
    try {
        let result = await UserService.get(req.query);
        if (result.length > 0)
            res.send(result);
        else
            res.status(204).send();
    }
    catch (err) {
        next(err);
    }

})

router.get('/:userName', async (req, res, next) => {
    try {
        let UserByUserName = await UserService.getById(req.params.userName);
        res.send(UserByUserName);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.get('/isExist/:userName', async (req, res, next) => {
    try {
        let UserByUserName = await UserService.isExist(req.params.userName);
        res.send(UserByUserName);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.delete('/:userName', async (req, res, next) => {
    try {
        let UserByUserName = await UserService.deleteUser(req.params.userName);
        res.send(UserByUserName);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});


router.get('/date/:userName', async (req, res, next) => {
    try {
        let UserDate = await UserService.getById(req.params.userName);
        res.send(UserDate.date);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.get('/index/:userName', async (req, res, next) => {
    try {
        let UserByUserName = await UserService.getById(req.params.userName);
        res.send(UserByUserName.index.toString());
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});


router.get('/dailyWords/:userName', async (req, res, next) => {
    try {
        let wordsByUserName = await UserService.getDailyWords(req.params.userName);
        res.send(wordsByUserName);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.get('/learnedWords/:userName', async (req, res, next) => {
    try {
        let wordsByUserName = await UserService.getLearnedWords(req.params.userName);
        res.send(wordsByUserName);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }
});

router.post('/:level', async (req, res, next) => {
    try {
        console.log("Received data:", req.body); // הוספת בדיקה לנתונים שנשלחים
        let newUser = req.body;
        let level = req.params.level;
        let insertUser = await UserService.register(newUser, level);
        res.status(201).send(`User ${insertUser.username} added sucessfully`);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        if (err instanceof ParamsError)
            res.status(401).send(err.message);
        next(err);
    }

})

router.put('/dailyWords/:userName', async (req, res, next) => {
    try {
        let dailyWords = req.body;
        await UserService.updateDailyWords(req.params.userName, dailyWords);
        res.status(200).send(`The words ${JSON.stringify(dailyWords)} update sucessfully`);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        if (err instanceof ParamsError)
            res.status(401).send(err.message);
        next(err);
    }
})

router.put('/learnedWords/:userName', async (req, res, next) => {
    try {
        await UserService.updateLearnedWords(req.params.userName);
        res.status(201).send(`The words update sucessfully`);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        if (err instanceof ParamsError)
            res.status(401).send(err.message);
        next(err);
    }

})

router.put('/date/:userName', async (req, res, next) => {
    try {
        await UserService.updateDate(req.params.userName);
        res.status(201).send(`The date update sucessfully`);
    }
    catch (err) {
        if (err instanceof IdError)
            res.status(400).send(err.message);
        next(err);
    }

})

module.exports = router;