const fs = require("fs");
const validURL = require("valid-url");
const axios = require("axios");

const cat = (path) => {
	try {
		const data = fs.readFileSync(path, "utf8");
		return data;
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const webCat = async (url) => {
	const res = await axios.get(url);
	return res;
};

const content = (path) => {
	if (validURL.isWebUri(path)) return webCat(path);
	return cat(path);
};

const write = async () => {
	if (process.argv[2] == "--out") {
		const newFile = process.argv[3];
		const path = process.argv[4];
		try {
			console.log("writing file...");
			fs.writeFileSync(newFile, content(path), "utf8");
		} catch (error) {
			console.log("error in writing file:");
			console.log(error);
		}
	} else {
		const path = process.argv[2];
		console.log(content(path));
	}
};

write();
