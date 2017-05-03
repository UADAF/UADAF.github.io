const nacl = require("tweetnacl");
const naclUtils = require("tweetnacl-util");
const utils = require("./Utils");
module.exports = (res, post) => {
	if (!utils.check(post, res, 'task')) {
		return;
	}
	const base = utils.connect();
	switch (post.task) {
		case "reg": {
			if (!utils.check(post, res, ["username", "wf_username", "email", "password"])) {
				return;
			}

			base.query("SELECT EXISTS(SELECT 1 FROM `users` WHERE username = ? OR wf_username = ? OR email = ?) AS 'exists'", [post.username, post.wf_username, post.email], (e, r) => {
				if (r != undefined && r[0].exists == 0) {
					let salt = nacl.randomBytes(32);
					let hash = hashPass(post.password, salt);
					base.query("INSERT INTO `users`(`username`, `wf_username`, `email`, `password`, `salt`) VALUES (?, ?, ?, ?, ?)", [post.username, post.wf_username, post.email, naclUtils.encodeBase64(hash), naclUtils.encodeBase64(salt)], (ee, rr) => {
						if (ee) {
							utils.reply(res, true, ee);
						} else {
							utils.reply(res, false, "success");
						}
					});
				} else {
					utils.reply(res, true, "User " + post.username + " exists");
				}
				base.end();
			});
			break;
		}
		case "login": {
			if (!utils.check(post, res, ['name', 'password'])) {
				return;
			}
			let name = post.name;
			base.query("SELECT `password`, `salt`, `username`, `wf_username`, `uuid` FROM `users` WHERE username = ? OR wf_username = ? OR email = ? LIMIT 1", [name, name, name], (e, r) => {
				if (e) {
					utils.reply(res, true, e);
				} else if (r.length) {
					let data = r[0];
					let hash = naclUtils.encodeBase64(hashPass(post.password, naclUtils.decodeBase64(data.salt)));
					if (data.password === hash) {
						let token = generateToken(data.uuid, base, res);
						utils.reply(res, false, "success", {
							success: true,
							data: {
								token: token,
								username: data.username,
								wfname: data.wf_username,
								id: data.uuid
							}
						});
						base.end();
					} else {
						utils.reply(res, false, "wrongpass", {success: false});
					}
				} else {
					utils.reply(res, false, "not found", {success: false});
				}
			});
			break;
		}
		case "get": {
			const dangerousProps = ['`password`', '`salt`'];
			if (!utils.check(post, res, ['token', 'fields'])) {
				return;
			}

			if (typeof post.fields === 'string') {
				post.fields = JSON.parse(post.fields).map(e => `\`${e}\``); //Manual escaping due to mysql lib bug
			}
			for(let e of dangerousProps) {
				if(post.fields.indexOf(e) > -1) {
					utils.reply(res, true, 'Dangerous prop used! Get forbidden!');
					return;
				}
			}
			post.fields.push('issued_at');
			base.query(`SELECT ${post.fields} FROM \`tokens\` INNER JOIN \`users\` ON tokens.user_id = users.uuid WHERE tokens.token = ? LIMIT 1`, [post.token], (e, r, f) => {
				if (e) {
					utils.reply(res, true, e);
				} else {
					if (r.length) {
						let data = r[0];
						if(validateTokenTimestamp(post.token, data.issued_at, base, res)) {
							delete data.issued_at;
							utils.reply(res, false, 'success', {success: true, data: data});
						}
					} else {
						utils.reply(res, false, 'invalidtoken', {success: false});
					}
				}
				base.end();
			});
			break;
		}
	}
};

function validateTokenTimestamp(token, timestamp, base, res) {
	if(new Date(timestamp).getTime() + 86400 < Date.now()) { //One day later
		utils.reply(res, false, 'tokenexpired', {success: false});
		base.query("DELETE FROM `tokens` WHERE `token` = ?", [token], (e, r) => {
			if(e) {
				console.log(e);
			}
		});
		return false;
	}
	return true;
}

function generateToken(usedId, base, res) {
	let token = naclUtils.encodeBase64(nacl.randomBytes(32));
	base.query("INSERT INTO `tokens` (`token`, `user_id`) VALUES (?, ?)", [token, usedId], (e, r) => {
		if (e) {
			console.log(e);
		}
	});
	return token;
}

function hashPass(pass, salt) {
	let decoded = naclUtils.decodeUTF8(pass);
	let salted = new Uint8Array(decoded.length + salt.length);
	salted.set(decoded);
	salted.set(salt, decoded.length);
	return nacl.hash(salted);
}