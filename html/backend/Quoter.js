const utils = require("./Utils");
module.exports = (res, post) => {
	if (!utils.check(post, res, 'task')) {
		return;
	}
	switch (post.task) {
		case("ADD"): {
			add(res, post);
			break;
		}
		case("GET"): {
			get(res, post);
			break;
		}
		case("VALIDATE"): {
			if (utils.check(post, res, 'key')) {
				utils.reply(res, false, "validated", {'isValid': isKeyValid(post.key)});
			}
			break;
		}
		default: {
			utils.reply(res, true, "Invalid task");
		}
	}
};

function add(res, post) {
	if (utils.check(post, res, ['addby', 'author', 'quote', 'key'])) {
		if (isKeyValid(post.key)) {
			const base = utils.connect();
			base.query("INSERT INTO `quoter`(`adder`, `author`, `quote`) VALUES (?,?,?)", [post.addby, post.author, post.quote], (err) => {
				if (err) {
					utils.reply(res, true, err.message);
				} else {
					utils.reply(res, false, 'Added quote');
				}
			});
			base.end();
		} else {
			utils.reply(res, true, "Invalid key");
		}
	}
}

function get(res, post) {
	if (utils.check(post, res, 'mode')) {
		const base = utils.connect();
		switch (post.mode) {
			case("pos"): {
				if (utils.check(post, res, 'pos')) {
					base.query("SELECT `adder`, `author`, `quote` FROM `quoter` WHERE `id` = ?", [post.pos], (err, response) => {
						if (err) {
							utils.reply(res, true, err.message);
						} else {
							response = response[0];
							utils.reply(res, false, 'success', {
								adder: response.adder,
								author: response.author,
								quote: response.quote
							});
						}
					});

				}
				break;
			}
			case("total"): {
				base.query("SELECT COUNT(`id`) AS count FROM `quoter`", (err, response) => {
					if (err) {
						utils.reply(res, true, err.message);
					} else {
						utils.reply(res, false, 'success', {count: response[0].count});
					}
				});
				break;
			}
			case("fromto"): {
				if (utils.check(post, res, ['from', 'to'])) {
					base.query("SELECT `adder`, `author`, `quote` FROM `quoter` WHERE `id` >= ? AND `id` <= ?", [post.from, post.to], (err, response) => {
						if (err) {
							utils.reply(res, true, err.message);
						} else {
							utils.reply(res, false, 'success', {quotes: response});
						}
					});
				}
				break;
			}
			default: {
				utils.reply(res, true, "Invalid mode");
			}
		}
	}
}

function isKeyValid(key) {
	return key === 'key';
}