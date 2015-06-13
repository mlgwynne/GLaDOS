<?php
if (!isset($_REQUEST["q"]) || $_REQUEST["q"]=="") {
	die();
}
$r=$_REQUEST;

switch ($r["engine"]) {
	case "google":
		$json=file_get_contents('https://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q='.urlencode($r["q"]));
		echo $json;
		break;
	case "4chan":
		$json=file_get_contents('https://a.4cdn.org/'.$r["q"].'/catalog.json');
		$buffer=json_decode($json);
		$buffer["board"]=$r["q"];
		$json=json_encode($buffer);
		echo $json;
		break;
	case "reddit":
		$json=file_get_contents('http://www.reddit.com/r/'.urlencode($r["q"]).'.json?limit='.urlencode($r["limit"]));
		echo $json;
		break;
	default:
		die();
		break;
}
?>