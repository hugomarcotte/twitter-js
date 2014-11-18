var express = require('express');
var router = express.Router();
var store = require('../store');

/* GET home page. */
router.get('/', function(req, res) {
	var tweets = store.list();
	res.render('index', {
		title: 'Twitter.js Awesome stuff',
		tweets: tweets,
		show_form: true
	});
});

 
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = store.find({name: name});
 
  res.render('index', {
  	title: 'Twitter.js - Posts by '+name,
  	tweets: list,
  	show_form: true,
  	username: name
  });
});

router.get('/users/:name/tweets/:id', function(req, res) {
	var name = req.params.name;
	var tweetId = Number(req.params.id);
	var list = store.find({id: tweetId});

	res.render('index', { title: 'Twitters.js - A single tweet by '+name, tweets: list })
})

module.exports = router;
