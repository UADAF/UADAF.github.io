<?php
require "BaseConnector.php";

$base = connect();

if(checkIsSet('task')) {
	switch ($_POST['task']) {
		case("ADD"): {
			add();
			break;
		}
		case("GET"): {
			get();
			break;
		}
		case("VALIDATE"): {
			if(checkIsSet('key')) {
				rep(false, "validated", ['isValid' => isKeyValid($_POST['key'])]);
			}
			break;
		}
		default: {
			rep(true, "Invalid task");
		}
	}
}


function add() {
	if(checkIsSet(['addby', 'author', 'quote', 'key'])) {
		global $base;
		$adder = $_POST['addby'];
		$author = $_POST['author'];
		$quote = $_POST['quote'];
		$key = $_POST['key'];
		if(isKeyValid($key)) {
			if($base->query("INSERT INTO `quoter`(`adder`, `author`, `quote`) VALUES ('$adder','$author','$quote')")) {
				rep(false, "Added quote");
			} else {
				rep(true, "Failed, $base->error");
			}
		} else {
			rep(true, "Invalid key");
		}
	}
}

function get() {
	if(checkIsSet('mode')) {
		global $base;
		switch ($_POST['mode']) {
			case("pos"): {
				if(checkIsSet('pos')) {
					$id = $_POST['pos'];
					$res = $base->query("SELECT `adder`, `author`, `quote` FROM `quoter` WHERE `id` = '$id'");
					if ($res) {
						$res = $res->fetch_assoc();
						rep(false, 'success', ['adder' => $res['adder'], 'author' => $res['author'], 'quote' => $res['quote']]);
					} else {
						rep(true, $base->error);
					}
				}
				break;
			}
			case("total"): {
				$res = $base->query("SELECT COUNT(`id`) FROM `quoter`");
				if($res) {
					$res = $res->fetch_array();
					rep(false, "success", ['count' => $res[0]]);
				} else {
					rep(true, $base->error);
				}
				break;
			}
			case("fromto"): {
				if(checkIsSet(['from', 'to'])) {
					$from = $_POST['from'];
					$to = $_POST['to'];
					$res = $base->query("SELECT `adder`, `author`, `quote` FROM `quoter` WHERE `id` >= '$from' AND `id` <= '$to'");
					if($res) {
						rep(false, "success", ["quotes" => $res->fetch_all(MYSQLI_ASSOC)]);
					} else {
						rep(true, $base->error);
					}
				}
				break;
			}
			default: {
				rep(true, "Invalid mode");
			}
		}
	}
}

function isKeyValid($key) {
	return md5($key) === "e43a6fc824c762e8ffb412b3d2abdadc";
}

function checkIsSet($keys) {
	if(is_array($keys)) {
		foreach ($keys as $key) {
			if(!checkIsSet($key)) {
				return false;
			}
		}
	} else {
		if (!isset($_POST[$keys])) {
			rep(true, "$keys not set");
			return false;
		}
	}
	return true;
}

function rep($isError, $msg, $custom = []) {
	$json = new stdClass();
	$json->error = $isError;
	$json->msg = $msg;
	foreach ($custom as $key => $val) {
		$json->$key = $val;
	}
	echo json_encode($json);
}



