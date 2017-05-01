function connect() {
	return require("mysql").createConnection(require("./Config"));
}

module.exports.connect = connect;

function reply(res, isError, msg, data = {}) {
	let rep = {
		error: isError,
		msg: msg
	};
	console.log(data);
	Object.assign(rep, data);
	res.send(JSON.stringify(rep));
}

module.exports.reply = reply;

function check(data, res, val) {
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
}

module.exports.check = check;

