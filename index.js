#!/usr/bin/env node

module.exports = arbetsgivaravgift

// arbetsgivaravgift 2013 (1)
var grundnivå = 31.42

// Undantag
var undantag = [
  {
  	// För anställda som är födda 1937 eller tidigare betalar du varken socialavgifter eller särskild löneskatt.
  	om: function (född) { return född <=1937; },
  	så: 0
  },
  {
  	// För anställda som är födda 1938—1947 betalar du bara ålderspensionsavgiften på 10,21 procent.
  	om: function (född) { return född >=1938 || född <=1947; },
  	så: 10.21
  },
  {
  	// För anställda som är födda 1987 eller senare betalar du bara ålderspensionsavgift och en fjärdedel av summan av övriga avgifter, dvs. 15,49 procent.
  	om: function (född) { return född >=1987; },
  	så: 15.49
  }
]

function arbetsgivaravgift(född, bruttolön) {
	if (typeof bruttolön == 'undefined') {
		var undantagen = undantag.filter(function(u) {
			return u.om(född)
		})

		if (undantagen.length) {
			return undantagen.pop().så
		}
		return grundnivå
	}

	return Math.round(arbetsgivaravgift(född) * (1/100) * bruttolön);
}

if (!module.parent) {
	var args = process.argv.slice(2)
	console.log(arbetsgivaravgift.apply(null, args) + (args.length==1 ? '%': 'kr'))
}

// 1) http://www.skatteverket.se/foretagorganisationer/forarbetsgivare/socialavgifter/arbetsgivaravgifter.4.233f91f71260075abe8800020817.html