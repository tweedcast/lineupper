<?php

ini_set('error_reporting', E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE); // Show all errors minus STRICT, DEPRECATED and NOTICES
ini_set('display_errors', 0); // disable error display
ini_set('log_errors', 0); // disable error logging
require('initialize.php');
//$race_id = '5436dc7b-1e90-4f22-bf64-b487cc3f9a76';
//$race_id = '9eaa42c9-802e-409b-85f8-d9d6f03a6920';
$year = date("Y");
$raceID = $current_xfin['race_id'];
$send_drivers1 = [];
$send_drivers2 = [];
$send_practice = [];
function add_drivers($num, $raceID, $year){
//$req_url = "https://api.sportradar.us/nascar-ot3/mc/races/{$race_id}/starting_grid.json?api_key=" . $apiKey;
//$req_url = "http://api.sportradar.us/nascar-ot3/mc/races/{$race_id}/practices.json?api_key=" . $apiKey;
//$req_url = "https://www.nascar.com/cacher/2018/1/4709/practice1.json";
//$req_url = "https://www.nascar.com/cacher/2018/1/4706/practice1.json";
//$req_url = "https://www.nascar.com/cacher/2019/2/4812/practice{$num}.json";
$req_url = "https://www.nascar.com/cacher/{$year}/2/{$raceID}/practice{$num}.json";
  $response = curl_get($req_url);
  $response = json_decode($response, true);

  return $response;

}

$results1 = add_drivers(1, $raceID, $year);
$results2 = add_drivers(2, $raceID, $year);

foreach($results1 as $drivers) {
  $driver = array('name' => str_replace('.', '', $drivers['driver_name']), 'speed' => $drivers['best_lap_speed']);
  $send_drivers1[] = $driver;
}
foreach($results2 as $drivers) {
  $driver = array('name' => str_replace('.', '', $drivers['driver_name']), 'speed' => $drivers['best_lap_speed']);
  $send_drivers2[] = $driver;
}

/*function add_qualify(){
  $grid = [];
  $req_url = "http://api.sportradar.us/nascar-ot3/xf/races/9fd861f7-7ca5-4bd4-af73-c5e94e0feac1/starting_grid.json?api_key=ueh8z3u9w4v5x647uh86xpys";
    $response = curl_get($req_url);
    $response = json_decode($response, true);
    $response = $response['starting_grid'];
    //var_dump($response);
    for ($i = 0; $i < count($response); $i++) {
      $driver = array('name' => $response[$i]['driver']['full_name'], 'position' => $response[$i]['position']);
      $grid[] = $driver;
    }
    return $grid;
}*/

function add_qualify($raceID, $year){
  $grid = [];
  //$req_url = "https://www.nascar.com/cacher/2019/2/4812/qualification.json";
  $req_url = "https://www.nascar.com/cacher/{$year}/2/{$raceID}/qualification.json";
    $response = curl_get($req_url);
    $response = json_decode($response, true);
    //var_dump($response);
    //$response = $response['starting_grid'];
    //var_dump($response);
    for ($i = 0; $i < count($response); $i++) {
      $driver = array('name' => str_replace('.', '', $response[$i]['driver_name']), 'position' => $response[$i]['finishing_position']);

      $grid[] = $driver;
    }

    return $grid;
}

$send_practice[] = $send_drivers1;
$send_practice[] = $send_drivers2;
$send_practice[] = add_qualify($raceID, $year);
echo json_encode($send_practice);









 ?>
