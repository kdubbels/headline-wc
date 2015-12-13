var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');


function formatText(html) {
	var dataStore = [];
	var $ = cheerio.load(html);
	$('h2.story-heading').each(function(i, element) {
	    var headline = $(element).text();
	    var trimmed = headline.trim();
	    var goodQuotes = trimmed.replace(/[\u2018\u2019]/g, "'");
	    var splitted = goodQuotes.split(" ");
	    for (var j = 0; j < splitted.length; j++) {
	        dataStore.push(splitted[j]);
	    }
	    return dataStore;
	});
	return dataStore;
}

function countWords(array) {
	var unique = _.uniq(array);

	var words = [];
	var count = [];

	for (var i = 0; i < unique.length; i++) {
	    words.push(unique[i]);
	    count.push(0);
	}

	for (var i = 0; i < array.length; i++) {
	    var position = words.indexOf(array[i]);
	    // console.log(position);
	    count[position] = count[position] + 1;
	}

	var zipped = _.object(words, count);
	return zipped;
}

var obj = {};

module.exports.scrapeHeadlines = function(req, res) {
	
	var callback = function(){
		var makeRequest = request({
		  uri: "http://www.nytimes.com",
		  method: "GET",
		  timeout: 10000,
		  followRedirect: true,
		  maxRedirects: 10
		}, function(error, response, html) {
			    if (!error && response.statusCode == 200) {
			    	var array = formatText(html);
			    	var wc = countWords(array);
			    	obj.data = wc;
			    	return obj;
			    }
		});
	}

callback();
return obj;

};
		/* use body */

		//PROCESS TEXT to look like : ["Donald","Jobs","Puts","Home"];


		


