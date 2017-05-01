module.exports.connect = function connect() {
	return require("mysql").createConnection(require("./Config"));
};

module.exports.reply = function reply(res, isError, msg, data = {}) {
	data.error = isError;
	data.msg = msg;
	res.send(JSON.stringify(data));
};

module.exports.check = function check(data, res, val) {
	if(!Array.isArray(val)) {
		val = [val];
	}
	for(let e of val) {
		if(!data.hasOwnProperty(e)) {
			reply(res, true, `${e.toUpperCase()}_NOT_SET`);
			return false;
		}
	}
	return true;
};

