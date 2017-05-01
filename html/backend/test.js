module.exports = (res, post) => {
	const cfg = require("./Config");
	res.send(cfg.baseName);
};