$.get('./initialize.php').done(function(data){
var race_data = JSON.parse(data);
  if (window.Worker) {
                  var myWorker2 = new Worker('./javascript/worker2.js');
                  var myWorker3 = new Worker('./javascript/worker.js');
                  var myWorker = myWorker3;
              }

  var raceWeek = '11';
  var dkCup = race_data[0].salaries;
  var dkXfin = '';
  var dkTruck = '2019dktruckskansas.csv';
  var fdCup = '2019fdcupkansas.csv';
  var fdXfin = '';
  var fdTruck = '';
  var cuprace_logo = 'da400.png';
  var xfinrace_logo = '';
  var truckrace_logo = 'da250.png';
  var cuprace_name = "Digital Ally 400 at Kansas Speedway ";
  var xfinrace_name = '';
  var truckrace_name = 'Digital Ally 250 at Kansas Speedway';
  //*********setting csv variables to set driver objects, setting series button CSS, and race logo
      var cupSalary = '';
      var xfinSalary = '';
      var truckSalary = '';
      var site = 'DK';
      var series = '';
      var drivers = [];
      var cpt = [];
      var lineupCount = [];
      var lineupCountPost = [];
      var driversTotal = [];
      var deSelected = [];
      var counter = 0;
      var opacity = 0;
      var transition = null;
      var startShow = null;
      var endShow = null;
      var lineupLock = [];
      var spread = [];
      var finalSelect = [];
      var lineupSort = 'salary';
      var checkit = [];
      var checkWhenClose = [];
      if (checklocalStorage('myRaceWeek') != raceWeek) {
        localStorage.removeItem('myDKCupLineups');
        localStorage.removeItem('myDKXfinLineups');
        localStorage.removeItem('myDKTruckLineups');
        localStorage.removeItem('myFDCupLineups');
        localStorage.setItem('myRaceWeek', raceWeek);
      }
      var myDKCupLineups = checklocalStorage('myDKCupLineups');
      var myDKXfinLineups = checklocalStorage('myDKXfinLineups');
      var myDKTruckLineups = checklocalStorage('myDKTruckLineups');
      var myFDCupLineups = checklocalStorage('myFDCupLineups');

      function checklocalStorage(check) {
        if (localStorage.getItem(check) != null) {
         return JSON.parse(localStorage.getItem(check));
            } else {
              return [];
            }
      }

  logoSwitch('#cup', site);
  $('.logoButton').click(seriesClick);
  //$('.siteButton').click(siteClick);


  $('#button').click(function() {
      deSelected = [];
      lineupLock = [];
      tempCount = [];
      $('.tableTop').css('display', 'none');
             for (p = 0; p < $('.check').length; p++){
                 //console.log($('.check')[p].checked);
                 if ($('.check')[p].checked == false){
                     for (q = 0; q < driversTotal.length; q++){
                         if ($('.check')[p].id == driversTotal[q].id) {
                             deSelected.push(driversTotal[q]);
                             break;
                         }
                     }
                 }
             }

              $('.selected').empty();
              $('.unselected').empty();

                  hudDrivers(drivers, deSelected);
                  sendDriver();
      });

  $('#left').click(function(){

    startShow -= 150;
    endShow = startShow + 150;
    if (startShow <= 1) {
      startShow = 0;
      endShow = startShow + 150;
    }
     if (lineupLock.length > 0) {
          driverLockChange(tempCount, lineupCount);
      } else {
          showLineups(startShow, endShow, lineupCount);
      }
  });

  $('#right').click(function(){
    startShow += 150;
    endShow = startShow + 150;
    if (endShow >= lineupCount.length) {
      endShow = lineupCount.length;
    }
    if (lineupLock.length > 0) {
          driverLockChange(tempCount, lineupCount);
      } else {
          showLineups(startShow, endShow, lineupCount);
      }
  });

  $('.dropBox').click(function(){
    $('#sortButton').text($(this)[0].text);
    //console.log($(this)[0].text);
    sortDrivers($(this)[0].text);
    var x = document.getElementById("Demo");
    x.className = x.className.replace(" w3-show", "");

  })

  $('.my_lineups').click(function(){
    var tempSite = '';
    for(var x = 0; x < $('.logoButton').length; x++){
      //console.log($('.logoButton')[x].getElementsByTagName('img')[0].classList.contains('buttonBorder'));
      if ($('.logoButton')[x].getElementsByTagName('img')[0].classList.contains('buttonBorder')){
          if (site == 'DK') {
            switch ($('.logoButton')[x].id) {
              case 'cup':
                tempSite = 'DKCUP';
                break;
              case 'xfin':
                tempSite = 'DKXFINITY';
                break;
              case 'truck':
                tempSite = 'DKTRUCKS';
                break;
            }
          } else if (site == 'FD') {
            tempSite = 'FDCUP';
          }
        }
      }
    switchMyLineups(tempSite);
  });

  $('#saveButton').click(function(){saveLineups(); $('#notSaved').hide();});
  $('#downloadButton').click(function(){exportToCsv('lineups.csv', checkit);});
  $('.switchMyLineupsButton').click(function(){switchMyLineups($(this)[0].innerText);});
  $('#closeButton').click(function(){var tempBody = $('.lineupRow'); for (var a = 0; a < tempBody.length; a++){if (checkList($('#' + tempBody[a].id).data('lineup'), checkWhenClose) !== 'add'){tempBody[a].style.backgroundColor = 'gold';} else {tempBody[a].style.backgroundColor = '';}}});
  $('#myLineupsBox').on('click', 'button', function(){
  myLineup($(this), checkit);
  $(this).parents()[1].remove();
  var checkBackName = '';
  for (var a = 0; a < $('#exposureTable tr').length; a++) {
    if ($('#exposureTable tr')[a].style.backgroundColor != "") {
      checkBackName = $('#exposureTable tr')[a].children[0].innerText;
    }
  }
  updateLineupNum(checkit);
  updateLineupBox();
  updateExposure(checkit);
  var checkBackRow = null;
  for (var a = 0; a < $('#exposureTable tr').length; a++) {
    if ($('#exposureTable tr')[a].children[0].innerText == checkBackName) {
      checkBackRow = $('#exposureTable tr')[a];
    }
  }
  highlightExposure(checkBackRow, checkBackName);
  $('#notSaved').show();
  });

  $('#exposureTable').on('click', 'tr', function(){
    console.log($(this));
    highlightExposure($(this)[0], $(this)[0].children[0].innerText);
    //$(this)[0].style.backgroundColor = 'lightslategray';
    console.log();
  });
  //*************downloading lineups to csv file
  $('#download').click(function() {
   exportToCsv('lineups.csv', lineupCountPost);
         });
});
