const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({

    userName:{
        type: String,
        required:true
    },
    stars:{
        type: String,
        required:true
    },

    description : {
          type : String,
          required: true
    },
    
     date : {
         type : String,
         required : true
     }
})

const Feedback = mongoose.model("Feedback",FeedbackSchema);

module.exports = Feedback;