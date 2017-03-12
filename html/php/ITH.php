<?php
require "BaseConnector.php";
if(!isset($_POST['task'])) {
	echo "TASK_NOT_SET";
}
$task = $_POST['task'];
if(!isset($_POST['name'])) {
	echo "NAME_NOT_SET";
}
$name = $_POST['name'];
$base = connect();
switch ($task) {
	case "login": {
		$story = $base->query("SELECT `story` FROM `ithappends` WHERE `user` = '$name'") or die("{error: $base->error}");
		if($story->num_rows === 0) {
			$story = 1;
			$base->query("INSERT INTO `ithappends` (`user`, `story`) VALUES ('$name', 1)", MYSQLI_ASYNC);
		} else {
			$story = $story->fetch_array()[0];
		}

		$json = new stdClass();
		$json->isLogged = true;
		$json->user = $name;
		$json->msg = "Success! Page: $story";
		$json->color = "green";
		$json->story = $story;
		echo json_encode($json);
		$base->close();
		break;
	}
	case "setStory": {
		if(!isset($_POST['story'])) {
			echo "STORY_NOT_SET";
		}
		$story = $_POST['story'];
		$base->query("UPDATE `ithappends` SET `story`='$story' WHERE `user` = '$name'");
	}
}