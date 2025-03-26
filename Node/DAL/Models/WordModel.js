const mongoose  = require("mongoose");

const WordSchema = new mongoose.Schema({
    id:{type:Number,unique: true, unique: true },
    word:{type: String, required :true},
    translate:{type: String, required :true},
});

module.exports= mongoose.model('Word', WordSchema);
