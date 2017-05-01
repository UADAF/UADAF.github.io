module.exports = (res, post) => {
	const utils = require("./Utils");
	if (!utils.check(post, res, 'task', 'name')) {
		return;
	}
	const name = post.name;
	const base = utils.connect();
	switch (post.task) {
		case "login": {
			base.query("SELECT `story` FROM `ithappends` WHERE `user` = ?", [name], (err, results, fields) => {
				if (err) throw err;
				let story = -1;
				if (results.length === 0) {
					story = 1;
					base.query("INSERT INTO `ithappends` (`user`, `story`) VALUES (?, 1)", [name]);
				} else {
					story = results[0].story;
				}
				res.send(JSON.stringify({
					isLogged: true,
					user: name,
					msg: `Success! Page: ${story}`,
					color: "green",
					story: story
				}));
			});
			break;
		}
		case "setStory": {
			if (utils.check(post, res, 'story')) {
				base.query("UPDATE `ithappends` SET `story`= ? WHERE `user` = ?", [post.story, name])
			}

		}
	}
	base.end();
};