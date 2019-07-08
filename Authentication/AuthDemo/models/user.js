var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

//userschema'ya passport-local-mongoose paketi ile gelen
//metodları ekle
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);