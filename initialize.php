<?php
$apiKey = '9w23mkmtn5qw6gpudx69tzqs';

function curl_get($url){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_VERBOSE, 1);
  $response2 = curl_exec($ch);
  if ($response2 === false) $response2 = curl_error($ch);
  return $response2;
  curl_close($ch);
}



  define("DB_SERVER", "localhost");
  define("DB_USER", "lineuppe_harley");
  define("DB_PASS", "Binster133");
  define("DB_NAME", "lineuppe_lineupper_admin");



    function db_connect() {
      $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
      confirm_db_connect();
      return $connection;
    }

    function db_disconnect($connection) {
      if(isset($connection)) {
        mysqli_close($connection);
      }
    }

    function confirm_db_connect() {
      if(mysqli_connect_errno()) {
        $msg = "Database connection failed: ";
        $msg .= mysqli_connect_error();
        $msg .= " (" . mysqli_connect_errno() . ")";
        exit($msg);
      }
    }

    function confirm_result_set($result_set) {
      if (!$result_set) {
        exit("Database query failed.");
      }
    }

$db = db_connect();

// This guide demonstrates the five fundamental steps
// of database interaction using PHP.


// 2. Perform database query
/*$query = "SELECT * FROM subjects";
$result_set = mysqli_query($connection, $query);

if(!$result_set) {
  exit("Database query failed.");
}
// 3. Use returned data (if any)
while($subject = mysqli_fetch_assoc($result_set)) {
  echo $subject["menu_name"] . "<br />"
}
// 4. Release returned data
mysqli_free_result($result_set);
// 5. Close database connection
mysqli_close($connection);*/
date_default_timezone_set("America/New_York");

$query = "SELECT * FROM race WHERE {date('Y-m-d H:i:s')} < race_date AND series='Monster Energy Cup Series' ORDER BY race_date DESC";
$result = mysqli_query($db, $query);
if ($result) {
  $current_cup = mysqli_fetch_assoc($result);
}

$query = "SELECT * FROM race WHERE {date('Y-m-d H:i:s')} < race_date AND series='Xfinity Series' ORDER BY race_date DESC";
$result = mysqli_query($db, $query);
if ($result) {
  $current_xfin = mysqli_fetch_assoc($result);
}

$query = "SELECT * FROM race WHERE {date('Y-m-d H:i:s')} < race_date AND series='Gander Outdoors Truck Series' ORDER BY race_date DESC";
$result = mysqli_query($db, $query);
if ($result) {
  $current_truck = mysqli_fetch_assoc($result);
}

?>
