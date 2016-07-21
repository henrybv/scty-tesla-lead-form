// grab the mongoose module

var mongoose = require('mongoose');

// define User schema, model & export it

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true // for Salesforce lead, unique tel number.
    },
    address: {
    	type: String,
    	required: true
    },
    reason: {
        type: String,
        enum: ['1','2','3','4','5'],
        required: true
    },
    other: {
        type: String
    },
    referrer: {
    	type: String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};
