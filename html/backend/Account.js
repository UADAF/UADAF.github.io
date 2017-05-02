module.exports = (res, post) => {
	const utils = require("./Utils");
	if (!utils.check(post, res, 'task')) {
		return;
	}
	const base = utils.connect();
	switch(post.task) {
		case "reg": {
			if(!utils.check(post, res, ["username", "wf_username", "email", "password"])){
				return;
			}
			base.query("SELECT EXISTS(SELECT 1 FROM `users` WHERE username = ? OR wf_username = ? OR email = ?) AS 'exists'", [post.username, post.wf_username, post.email], (e,r,f) => {
				if(r != undefined && r[0].exists == 0) {
					//Регаем
					base.query("INSERT INTO `users`(`username`, `wf_username`, `email`, `password`) VALUES (?, ?, ?, ?)", [post.username, post.wf_username, post.email, post.password], (ee,rr, ff) => {
						if(ee != undefined) {
							utils.reply(res, true, ee);
						}else{
							utils.reply(res, false, "success");
						}
						base.end();
					});
				}else{
					utils.reply(res, true, "User "+post.username+" exists");
					base.end();
				}
			});
		}
	}
};