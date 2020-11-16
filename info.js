var unirest = require("unirest");

var req = unirest("GET", "https://us-restaurant-menus.p.rapidapi.com/restaurants/state/WA");

req.query({
	"page": "1"
});

req.headers({
	"x-rapidapi-key": "cb4abace9fmsh4cbbba9df1c4cdcp1f8e64jsn1129936c4ebe",
	"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
	"useQueryString": true
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

//In terminal add - node info.js