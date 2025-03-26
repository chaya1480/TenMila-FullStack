require('./DAL/MongoConnect')
const wordService = require('./BL/Services/WordService');

const express = require('express');

const port = 3000;

const app = express();

//Here was an API key to connect to Microsoft

const UserRoute = require('./Routes/UserRoute')
const WordRoute = require('./Routes/WordRoute')

// wordService.processAndStoreWords('DAL/wordList.txt', microsoftTranslatorKey, microsoftRegion)
//     .catch(err => console.error('Error processing words:', err));

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/TenMila/User', UserRoute);
app.use('/TenMila/Word', WordRoute);

app.get('/', (req, res) => {
    res.send('wellcome to our site!lets learn toogether!!!')
})

app.listen(port, () => {console.log(`running at http://localhost:${port}`) });