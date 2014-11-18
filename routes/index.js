var express = require('express');
var router = express.Router();
var store = require('../store');
var User = require('../models').User;
var Tweet = require('../models').Tweet;


/* GET home page. */
router.get('/', function(req, res) {

	// Get all tweets

	// Find how to get users and display name
	Tweet.findAll( {include: [ User ] }).complete(function(err, tweets){

console.log(tweets[0].User.name);

		res.render('index', {
			title: 'Twitter.js Awesome stuff',
			tweets: tweets,
			show_form: true
		});

	});


});


router.get('/users/:name', function(req, res) {

	var name = req.params.name;

	// Get user by name
	User.find({ where : { name: name } })
	.complete(function(err, user){

		// Get all tweets for user
		Tweet.findAll({ where: { UserId: user.id }, include: [ User ] })
		.complete(function(err, tweets){

			// On success render view passing user name and tweets
			res.render('index', {
				title: 'Twitter.js - Posts by '+ user.name,
				tweets: tweets,
				show_form: true,
				username: user.name
			});

		});
		// .catch(function(err){
		// 	console.log("Error getting tweets for user: " + err);
		// });

	})
	// .error(function(err){
	// 	console.log("Error getting user by name: " + err);
	// });

});

router.get('/tweets/:id', function(req, res) {

	// find tweet by ID
	var tweetId = Number(req.params.id);

	Tweet.findAll({ where: { id: tweetId }, include: [ User ] })
	.complete(function(err, tweets){
		res.render('index', { title: 'Twitters.js - A single tweet by ', tweets: tweets })
	});
	// .catch(function(err){
	// 	console.log("Error getting tweet by ID: " + err);
	// });



})

module.exports = router;
