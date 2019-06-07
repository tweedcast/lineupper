<?php
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.
?>
<!DOCTYPE html>

<html>
<head>
    <meta http-equiv=“Pragma” content=”no-cache”>
    <meta http-equiv=“Expires” content=”-1″>
    <meta http-equiv=“CACHE-CONTROL” content=”NO-CACHE”>
    <meta name="google-site-verification" content="AgyBOItDV56AqTWNas74ro2Cz5iG3UgDBC5x9iHOQX8" />
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125444414-2"></script>
    <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'UA-125444414-2');
    </script>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <!-- UIkit CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />

<!-- UIkit JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" type="text/css" href="main1.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <script src="https://use.fontawesome.com/376a533f9f.js"></script>
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>Lineupper Tool</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    

</head>
<body>
    <div class="w3-container w3-black" style="min-height: 100vh">
   <div class="hud w3-sidebar w3-bar-block">
        <div class="hudHeader">DriverLockSwap</div>
        <div class="hudButton">&#171;</div>
        <div style="width: 100%; background-color: darkgray; font-size: 20px">Selected</div>
        <div class="selected" ondrop="drop(event, this)" ondragover="allowDrop(event)"></div>
        <div style="width: 100%; background-color: darkgray; font-size: 20px">Not Selected</div>
        <div class="unselected" ondrop="drop(event, this)" ondragover="allowDrop(event)"></div>
    </div>
    <div class="w3-content driverbox w3-cell" style="padding: 10px;">
      <img id="logo" src="./images/lineupper.png">

        <div class='uk-flex uk-flex-around uk-flex-middle siteButtonBox'>
            <div id="dk" class="siteButton buttonBorder" style="float: left;">DraftKings</div>
            <div id="fd" class="siteButton" style="float: right;">FanDuel</div>
            <div class="hudOpen">&#187;</div>
        </div>
        <button class="uk-button uk-button-default uk-margin-small-right uk-button-small my_lineups" type="button" uk-toggle="target: #modal-example">My Lineups</button>

        <div>
            <strong><button id='button' class='uk-button uk-button-primary uk-button-small'>Calculate Lineups</button></strong>
        </div>
        <div style="display: inline; clear: both; float: left"><p class="sortByText">Sort By: </p>
        <div class="w3-dropdown-click sortBy">
          <button id="sortButton"  class="w3-button w3-black">Salary</button>
          <div id="Demo" class="w3-dropdown-content w3-bar-block w3-border">
            <a href="#" id="salarySort" class="w3-bar-item w3-button dropBox">Salary</a>
            <a href="#" id="fpprSort" class="w3-bar-item w3-button dropBox">FPPR</a>
            <a href="#" id="practiceSort" class="w3-bar-item w3-button dropBox">Practice Speed</a>
            <a href="#" id="positionSort" class="w3-bar-item w3-button dropBox">Starting Position</a>
            <a href="#" id="pdoSort" class="w3-bar-item w3-button dropBox">Position Opportunity</a>
            <a href="#" id="pdoSort" class="w3-bar-item w3-button dropBox">Projected Points</a>
          </div>
        </div>
        </div>

        <!--<span><p style="display: inline;">Total Lineups:</p><p style="display: inline;" id="count"></p></span>-->
        <div id="modal-example" bg-close="false" stack="true" class="uk-modal-full" uk-modal>
            <div class="uk-modal-dialog">
              <div class="uk-grid-collapse" uk-grid>
                <div class="uk-width-1-3@l" uk-height-viewport>
                <div class="uk-modal-header">
                  <button id='closeButton' class="uk-button uk-button-danger" type="button" onclick="UIkit.modal('#modal-example').hide();">X</button>
                  <h2 class="uk-modal-title">My Lineups</h2>
                      <button id='downloadButton' class="uk-button uk-button-default" type="button"><i class="fa fa-file-excel-o fa-lg" aria-hidden="true" style="color: crimson"></i> &nbspDownload</button>
                      <button id='saveButton' class="uk-button uk-button-default" type="button" onclick="UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Lineups Saved', status: 'success', pos: 'bottom-left', timeout: 5000})"><i class="fa fa-floppy-o fa-lg" aria-hidden="true" style="color: crimson"></i> &nbspSave Lineups</button>
                  <!--<div class="uk-margin uk-child-width-1-4@l" uk-grid>
                      <button class="uk-button uk-button-primary switchMyLineupsButton uk-margin-right uk-text-center uk-padding-remove"><p>DKCup</p></button>
                      <button class="uk-button uk-button-primary switchMyLineupsButton uk-margin-right uk-text-center uk-padding-remove"><p>DKXfinity</p></button>
                      <button class="uk-button uk-button-primary switchMyLineupsButton uk-margin-right uk-text-center uk-padding-remove"><p>DKTrucks</p></button>
                      <button class="uk-button uk-button-primary switchMyLineupsButton uk-margin-right uk-text-center uk-padding-remove">FDCup</button>
                  </div>-->
                  <div class="uk-alert-danger" id="notSaved" uk-alert><p>Lineups Not Saved!!</p></div>
                  <script>$('#notSaved').hide();</script>
                  <table class="uk-table uk-table-small uk-table-divider">
                    <tbody id="exposureTable">
                    </tbody>
                  </table>
                  </div>
              </div>
              <div class="uk-width-2-3@l" uk-height-viewport>

                <div class="uk-grid-collapse uk-text-center" uk-grid>
                    <div class='uk-width-1-1'>
                        <div class="uk-padding uk-width-1-1" uk-grid>
                          <div class="uk-width-1-5" id="myLineupsNumber"></div>
                          <div class="uk-width-4-5">
                          <h1 class="uk-card-title" id="myLineupsBoxTitle">DraftKings Cup Lineups</h1>
                        </div>
                          <table class="uk-table uk-table-striped" style="background-color: #e4e456; color: black;">
                            <tbody id="myLineupsBox"></tbody>
                          </table>
                        </div>
                    </div>
                </div>
              </div>
              </div>
            </div>

        </div>
        <div id="pivot_modal" bg-close="false" stack="true" class="uk-modal-full" uk-modal>
            <div class="uk-modal-dialog" style="height: 100%; overflow: auto">
              <div class="uk-modal-header">
                <button id='closeButton' class="uk-button uk-button-danger" type="button" onclick="UIkit.modal('#pivot_modal').hide();">X</button>
                <h2 class="uk-modal-title">Pivot Drivers</h2>
                </div>
                <div uk-grid class="uk-child-width-1-2@l"  style="background-color:ghostwhite">
                  <div id="current_driver">
                    <h3 id="current_name"></h3>
                    <table id="current_table">
                      <tr><td class="currentStat">Salary</td><td id="current_table_salary"></td></tr>
                      <tr><td class="currentStat">Starting Pos.</td><td id="current_table_start"></td></tr>
                      <tr><td class="currentStat">Practice</td><td id="current_table_pract"></td></tr>
                      <tr><td class="currentStat">FPPR</td><td id="current_table_fppr"></td></tr>
                    </table>
                    <table class="uk-table" style="background-color: #e4e456; color: black;">
                      <tr id="current_table_lineup"></tr>
                    </table>
                    <div id="repeatAlert" style="display:none;">
                      <p style="border: solid 2px #f0506e; display:inline-block;">Lineup already exists in My Lineups!!!</p>
                    </div>
                  </div>

                  <div>
                    <table class="uk-table uk-table-small uk-table-divider">
                      <thead><tr><th></th><th>Driver</th><th>Salary</th><th>Start</th><th>Practice</th><th>FPPR</th></tr></thead>
                      <tbody id="pivot_drivers">
                      </tbody>
                    </table>
                </div>
              </div>
            </div>
        </div>

<table id="driverList" class="w3-table" style="color: black; min-height: 100vh">

</table>
    </div>
    <div class="w3-container w3-white w3-cell lineupBox">
      <div class='uk-child-width-1-3@m' style="border-bottom: solid 2px black" uk-grid>
          <div id="cup" class="logoButton selectedSeries uk-flex" style="">
              <img id="cupLogo" src="images/Monster_Energy_NASCAR_Cup_Series_logo.svg.png" class='buttonBorder uk-flex-center uk-margin-auto'>
          </div>
          <div id="xfin" class="logoButton uk-flex" style="">
              <img id="xfinLogo" src="images/NASCAR_Xfinity_Series_logo_2018.png" class="uk-flex-center uk-margin-auto">
          </div>
          <div id="truck" class="logoButton uk-flex" style="">
              <img id="truckLogo" src="images/nascar_truck_series.ashx" class="uk-flex-center uk-margin-auto">
          </div>

      </div>
        <div style="overflow: auto; margin-bottom: 10px;" id='raceTitleBox'>
            <div class="racename">
                <h1 id="raceTitle"></h1>
                <!--<p style="font-size: 15px;"><strong>Use: </strong>The Lineup Tool is designed to allow you to find out how many different combinations of lineups can be made from your driver picks. Select at least 8 drivers from our Line Up Tool and click Calculate Lineups.</p>
                <p><strong>Note: </strong>The lineups will show below and will be sorted by total projected points, based off fantasy points per race. If no lineups appear select more drivers, and keep in mind the $50,000 DraftKings salary cap, so all the drivers you have selected may be too expensive to fit under the salary cap.</p>
                <p style="font-size: 15px;"><strong>Exporting: </strong>Click Download to download all lineups into a CSV file that can be uploaded to directly to the DraftKings website. </p>-->
            </div>
            <div class="racelogo"><img id="raceLogo" src=""></div>
        </div>

        <div class="tableTop"><p></p><div class="pagination"><button id="left">&#xab;</button><p>1-150</p><button id="right">&#xbb;</button></div><button id='download' class='uk-button uk-button-small'>Download</button></div>
        <div id="loader" style="display:none;"><img style="max-width: 50px; height: auto;  display: block; margin-left: auto; margin-right: auto; padding-top: 20px" src="./images/tcicon.png"></div>
        <div style="display:none;" id="myDiv">
          <div class="w3-container w3-cell" style="width: 70%; padding: 0px">
            <table id="lineuplist" class="w3-table w3-striped w3-centered w3-hoverable">
              <tbody id="lineuplistbody"></tbody>
            </table>
          </div>
        </div>
      </div>
      <footer><p>	Lineupper is not owned, affiliated or sanctioned by NASCAR (National Association for Stock Car Auto Racing). The NASCAR logo and driver images are owned and copyright of NASCAR, respective NASCAR teams and owners. DraftKings name and logo used for promotion and identity of the DraftKings brand.FanDuel name and logo used for promotion and identity of the FanDuel brand.</p></footer>
    </div>
 <script src="./javascript/jquery.csv.js"></script>
<script src="./javascript/functions.js"></script>




</body>
</html>
