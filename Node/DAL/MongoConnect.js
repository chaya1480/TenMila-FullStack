const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb+srv://chaya:1480@chaya.yzbrj.mongodb.net/TenMila?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000 // 20 שניות
        });
        console.log("!!!!!ההההדות ,אבא");
    } catch (err) {
        console.error("❌ שגיאת חיבור ל-MongoDB:", err);
    }
}

main();

module.exports = mongoose;
