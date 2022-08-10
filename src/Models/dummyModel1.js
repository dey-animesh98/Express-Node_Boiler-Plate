const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const dummySchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Dummy', dummySchema) 