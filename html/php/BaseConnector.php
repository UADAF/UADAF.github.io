<?php
require "Config.php";

function connect() {
	global $baseHost, $baseLogin, $basePass, $baseName;
	$base = new mysqli($baseHost, $baseLogin, $basePass, $baseName);
	$base->set_charset("utf8");
	if ($base->connect_errno) {
		die("Unable to connect to database" . $base->error);
	}
	return $base;
}