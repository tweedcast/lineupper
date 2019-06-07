<?php
require('initialize.php');

date_default_timezone_set("America/New_York");
$date = date('Y-m-d H:i:s');

$current_cup = [];
$current_xfin = [];
$current_truck = [];

$query = "SELECT * FROM race WHERE '{$date}' < race_date AND series='Monster Energy Cup Series' ORDER BY race_date DESC LIMIT 1";
$result = mysqli_query($db, $query);
$current_cup = mysqli_fetch_assoc($result);
if (mysqli_num_rows($result) > 0) {
$current_cup['days_away'] = (new DateTime($date))->diff(new DateTime($current_cup['race_date']))->d;
}

$query = "SELECT * FROM race WHERE '{$date}' < race_date AND series='Xfinity Series' ORDER BY race_date DESC LIMIT 1";
$result = mysqli_query($db, $query);
$current_xfin = mysqli_fetch_assoc($result);
if (mysqli_num_rows($result) > 0) {
$current_xfin['days_away'] = (new DateTime($date))->diff(new DateTime($current_xfin['race_date']))->d;
}

$query = "SELECT * FROM race WHERE '{$date}' < race_date AND series='Gander Outdoors Truck Series' ORDER BY race_date DESC LIMIT 1";
$result = mysqli_query($db, $query);
$current_truck = mysqli_fetch_assoc($result);
if (mysqli_num_rows($result) > 0) {
$current_truck['days_away'] = (new DateTime($date))->diff(new DateTime($current_truck['race_date']))->d;
}


echo json_encode([$current_cup, $current_xfin, $current_truck]);

 ?>
