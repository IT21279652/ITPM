const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    province : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const Location = mongoose.model("Location", locationSchema)

module.exports = Location;