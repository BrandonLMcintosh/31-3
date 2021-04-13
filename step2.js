const fs = require("fs");
const validURL = require("valid-url");
const axios = require("axios");

const path = process.argv[2];
const cat = (path) => {
	fs.readFile(path, "utf8", function (err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(data);
	});
};

const webCat = async (url) => {
	const res = await axios.get(url);
	console.log(res);
};

if (validURL.isWebUri(path)) {
	webCat(path);
} else {
	cat(path);
}
