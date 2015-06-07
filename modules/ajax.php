<?php
if (!isset($_REQUEST["q"]) || $_REQUEST["q"]=="") {
	die();
}
$q=$_REQUEST["q"];
switch ($_REQUEST["engine"]) {
	case "google":
		$json=file_get_contents('https://ajax.googleapis.com/ajax/services/search/web?v=1.0&rsz=8&q='.urlencode($q));
		echo $json;
		break;
	case "4chan":
		$json=file_get_contents('https://a.4cdn.org/'.$q.'/catalog.json');
		$buffer=json_decode($json);
		$buffer["board"]=$q;
		$json=json_encode($buffer);
		echo $json;
		break;
	default:
		die();
		break;
}




?>