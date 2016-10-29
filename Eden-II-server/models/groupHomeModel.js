var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');


var groupHomeSchema = new Schema({
	'name' : String,
	'address' : String,
	'phone' : Number,
	'caretakers' : Array,
	'participants' : Array
});

//groupHomeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('groupHome', groupHomeSchema);
