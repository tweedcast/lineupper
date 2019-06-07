$('document').ready(function(){
   /* $('#logo').click(function(e) {
    if (e.shiftKey) {
        var win = window.open('https://lineupper.com/lineupper_admin/public/home', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    } 
});*/

$('#logo').on('dblclick', function(e){
    e.preventDefault();
    var win = window.open('https://lineupper.com/lineupper_admin/public/home', '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
});
    

  $.get('./race_data.php').done(function(data){
  var race_data = JSON.parse(data);
    if (window.Worker) {
                    var myWorker2 = new Worker('./javascript/worker2.js');
                    var myWorker3 = new Worker('./javascript/worker.js');
                    var myWorker = myWorker3;
                }

    var raceWeek = '11';
    var dkCup;
    var cuprace_logo;
    var cuprace_name;
    var dkXfin;
    var xfinrace_logo;
    var xfinrace_name;
    var dkTruck;
    var truckrace_logo;
    
    var truckrace_name;
    var fdCup;


    if (race_data[0]) {
      dkCup = race_data[0].salaries;
      cuprace_logo = race_data[0].img;
      cuprace_name = race_data[0].title;
      fdCup = race_data[0].fd_salaries;
      if (race_data[0].days_away < 5) {
        $('#cup').css('display', 'block');
      }
    }
    if (race_data[1]) {
      dkXfin = race_data[1].salaries;
      xfinrace_logo = race_data[1].img;
      xfinrace_name = race_data[1].title;
      if (race_data[1].days_away < 5) {
        $('#xfin').css('display', 'block');
      }
    }
    if (race_data[2]) {
      dkTruck = race_data[2].salaries;
      truckrace_logo = race_data[2].img;
      truckrace_name = race_data[2].title;
      if (race_data[2].days_away < 5) {
        $('#truck').css('display', 'block');
      }
    }
    

    //var fdXfin = '';
    //var fdTruck = '';
    //*********setting csv variables to set driver objects, setting series button CSS, and race logo
        var cupSalary = '';
        var xfinSalary = '';
        var truckSalary = '';
        var site = 'DK';
        var series = '';
        window.drivers = [];
        var cpt = [];
        window.lineupCount = [];
        var lineupCountPost = [];
        var driversTotal = [];
        var deSelected = [];
        var counter = 0;
        var opacity = 0;
        var transition = null;
        window.startShow = null;
        window.endShow = null;
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

    $('#sortButton').click(function(){
        myFunction();
    });

  window.ordinal_suffix_of=function(i) {
    if (i == '--') {
      return i;
    }
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
  }

  function Comparator(a, b) {
   if (a[1] < b[1]) return -1;
   if (a[1] > b[1]) return 1;
   return 0;
  }



  function switchMyLineups(button) {
    console.log(button);
   $('#notSaved').hide();
    var wreckit = '';
    switch (button) {
      case 'DKCUP':
        checkit = myDKCupLineups;
        wreckit = 'DraftKings Cup Lineups';
        var tempStore = checklocalStorage('myDKCupLineups');
        var number = 0;
        var tempNumber = 0;
        for (var a = 0; a < checkit.length; a++) {
          for (var b = 0; b < tempStore.length; b++) {
            for (var c = 0; c < checkit[a].length - 1; c++) {
              for (var d = 0; d < tempStore[b].length - 1; d++) {
                if (tempStore[b][d].name == checkit[a][c].name) {
                  number++;
                }
              }
            }
            if (number == checkit[a].length - 1) {
              tempNumber++;
            }
            number = 0;
          }
        }
        if (tempNumber !== checkit.length || tempNumber !== tempStore.length) {
          $('#notSaved').show();
        }
        break;
      case 'DKXFINITY':
        checkit = myDKXfinLineups;
        wreckit = 'DraftKings Xfinity Lineups';
        var tempStore = checklocalStorage('myDKXfinLineups');
        var number = 0;
        var tempNumber = 0;
        for (var a = 0; a < checkit.length; a++) {
          for (var b = 0; b < tempStore.length; b++) {
            for (var c = 0; c < checkit[a].length - 1; c++) {
              for (var d = 0; d < tempStore[b].length - 1; d++) {
                if (tempStore[b][d].name == checkit[a][c].name) {
                  number++;
                }
              }
            }
            if (number == checkit[a].length - 1) {
              tempNumber++;
            }
            number = 0;
          }
        }
        if (tempNumber !== checkit.length || tempNumber !== tempStore.length) {
          $('#notSaved').show();
        }
        break;
      case 'DKTRUCKS':
        checkit = myDKTruckLineups;
        wreckit = 'DraftKings Truck Lineups';
        var tempStore = checklocalStorage('myDKTruckLineups');
        var number = 0;
        var tempNumber = 0;
        for (var a = 0; a < checkit.length; a++) {
          for (var b = 0; b < tempStore.length; b++) {
            for (var c = 0; c < checkit[a].length - 1; c++) {
              for (var d = 0; d < tempStore[b].length - 1; d++) {
                if (tempStore[b][d].name == checkit[a][c].name) {
                  number++;
                }
              }
            }
            if (number == checkit[a].length - 1) {
              tempNumber++;
            }
            number = 0;
          }
        }
        if (tempNumber !== checkit.length || tempNumber !== tempStore.length) {
          $('#notSaved').show();
        }
        break;
      case 'FDCUP':
        checkit = myFDCupLineups;
        var tempStore = checklocalStorage('myFDCupLineups');
        var number = 0;
        var tempNumber = 0;
        for (var a = 0; a < checkit.length; a++) {
          for (var b = 0; b < tempStore.length; b++) {
            for (var c = 0; c < checkit[a].length - 1; c++) {
              for (var d = 0; d < tempStore[b].length - 1; d++) {
                if (tempStore[b][d].name == checkit[a][c].name) {
                  number++;
                }
              }
            }
            if (number == checkit[a].length - 1) {
              tempNumber++;
            }
            number = 0;
          }
        }
        if (tempNumber !== checkit.length || tempNumber !== tempStore.length) {
          $('#notSaved').show();
        }
        wreckit = 'FanDuel Cup Lineups';
        break;
    }
    /*checkit.sort(function(a, b){
      return b[b.length - 1] - a[a.length - 1];
    })*/

  $('#myLineupsBoxTitle').text(wreckit);
  updateLineupBox();
  }

  function siteSwitch(sites) {

    deSelected = [];
    tempCount = [];
        switch (sites) {
          case '#dk': site = 'DK'; myWorker = myWorker3;
            break;
          case '#fd': site = 'FD'; myWorker = myWorker2;
            break;
        }
        if(site == 'DK') {
          $('#xfin').attr('hidden', false);
          $('#truck').attr('hidden', false);
        } else if(site == 'FD') {
          $('#xfin').attr('hidden', true);
          $('#truck').attr('hidden', true);

        }
        $('#cup').click();

  }


  function logoSwitch(id, site) {
    drivers = [];
    deSelected = [];
    tempCount = [];
    $('#lineuplist').empty();
    $('.tableTop').css('display', 'none');
    $('.selected').empty();
    $('.unselected').empty();
    $('#sortButton').text('Salary');
          switch (site) {
              case 'DK': cupSalary = dkCup; xfinSalary = dkXfin; truckSalary = dkTruck;
                break;
              case 'FD': cupSalary = fdCup;
                break;
          }
          switch (id) {
              case '#cup': $('#raceLogo').attr('src', cuprace_logo); $('#raceTitle').text(cuprace_name); series = cupSalary; getPractice("practice.php", series); if (site == 'FD'){checkWhenClose = myFDCupLineups} else{checkWhenClose = myDKCupLineups};
                  break;
              case '#xfin': $('#raceLogo').attr('src', xfinrace_logo); $('#raceTitle').text(xfinrace_name); series = xfinSalary; getPractice("xfinpractice.php", series); checkWhenClose = myDKXfinLineups;
                  break;
              case '#truck': $('#raceLogo').attr('src', truckrace_logo); $('#raceTitle').text(truckrace_name); series = truckSalary; getPractice("truckpractice.php", series); checkWhenClose = myDKTruckLineups;
          }
          $('#raceTitle').css('margin-top', (parseInt($('#raceTitleBox').css('height'))-parseInt($('#raceTitle').css('height')))/2 + 'px');
          //console.log(parseInt($('#raceTitleBox').css('height')));
      }



  function seriesClick() {
          $('.logoButton').off('click');
          drivers = [];
           counter = 0;
           opacity = 0;
          $('#raceLogo').css('opacity', '0');
          $('#driverList').empty();
          var id = '#' + $(this)[0].id;
          var twin = '#' + $(this).siblings()[0].id;
          var twin2 = '#' + $(this).siblings()[1].id;
          //console.log($(this).siblings());
          $(id + ' img').addClass('buttonBorder');
          $(id).addClass('selectedSeries');
          $(twin + ' img').removeClass('buttonBorder');
          $(twin).removeClass('selectedSeries');
          $(twin2 + ' img').removeClass('buttonBorder');
          $(twin2).removeClass('selectedSeries');

          logoSwitch(id, site);

      }

      function siteClick() {
        $('.siteButton').off('click');
              drivers = [];
              var id = '#' + $(this)[0].id;
              var twin = '#' + $(this).siblings()[0].id;
              $(id).addClass('buttonBorder');
              $(twin).removeClass('buttonBorder');

              siteSwitch(id);

          }

      function myFunction() {
          var x = document.getElementById("Demo");
          if (x.className.indexOf("w3-show") == -1) {
              x.className += " w3-show";
          } else {
              x.className = x.className.replace(" w3-show", "");
          }
      }

   function buildList(list, clicked){
      var id = clicked.parents("tr")[0].id;
         if (clicked.prop('checked') === true) {
             list.push(driversTotal[id]);

              }
          if (clicked.prop('checked') === false) {
                  list.splice(list.indexOf(driversTotal[id]), 1);
                  }

              }

              //************driver object constructor
                     function Driver(name, salary, id, fppr, pract, pract2, qualify, practTimes){
                         this.name = name;
                         this.salary = salary;
                         this.id = id;
                         this.fppr = fppr;
                         this.pract = pract;
                         this.pract2 = pract2;
                         this.qualify = qualify;
                         this.practTimes = [];
                         this.practavg;
                         this.practAvg = function () {
                                var avg = 0;
                                for (var m = 0; m < this.practTimes.length; m++) {
                                  avg+= this.practTimes[m];
                                }
                                return (avg/this.practTimes.length).toFixed(2);
                              }

                     }

  //**************function for showing lineups based on pagination
  window.showLineups = function(start, end, lineup) {


    var seriesSwitch = '';
    var tempLineup = [];
    for(var xy = 0; xy < $('.logoButton').length; xy++){
      //console.log($('.logoButton')[x].getElementsByTagName('img')[0].classList.contains('buttonBorder'));
      if ($('.logoButton')[xy].getElementsByTagName('img')[0].classList.contains('buttonBorder')){
          if (site == 'DK') {
            switch ($('.logoButton')[xy].id) {
              case 'cup':
                seriesSwitch = myDKCupLineups;
                break;
              case 'xfin':
                seriesSwitch = myDKXfinLineups;
                break;
              case 'truck':
                seriesSwitch = myDKTruckLineups;
                break;
            }
          } else if (site == 'FD') {
            seriesSwitch = myFDCupLineups;
          }
        }
      }

              $('.tableTop').css('display', 'block');
               //console.log(lineup);
              //hudOpenCheck(lineup, lineupLock);

               if (lineup.length == 0 && lineupLock.length == 0) {
                         $('#loader').hide();
                         $('#lineuplist').empty();
                         $('.tableTop p').text('No lineups found!!');
                         hudDriverColor('', 'crimson', false, 'pointer', '');
                     } else {
                         hudDriverColor('white', '#260f54', false, 'pointer', 'purple');
                          $('.tableTop p').text("Total Lineups: " + lineup.length);

  //**************showing/hiding pagination buttons
              if (startShow == 0) {
               $('#left').css('display', 'none');
           } else {
               $('#left').css('display', 'inline-block');
           }
              if (end >= lineup.length) {
                  end = lineup.length;
                  $('#right').css('display', 'none');
              } else {
               $('#right').css('display', 'inline-block');
           }
  //************setting where lineups are sliced based on pagination
           lineupCountPost = lineup.slice(start, end);
              if (lineupCountPost != 0) {
           $('.pagination p').text((start + 1) + '-' + end);
              }
  //************emptying current lineup list
           $('#lineuplist').empty();
  //************setting top of table headers cause it's easier to erase everytime
           $('#lineuplist').append('<tr id="heading"><td>Total Projected Points</td></tr>');
           for (var i = 0; i < lineupCountPost[0].length-1; i++){
             $('#heading').append('<td>D</td>');
           }
  //*************writing new lineup list with vanilla javascript
           var tableElem = document.getElementById("lineuplist");
           tableElem = tableElem.getElementsByTagName('tbody')[0];

             for (var i = 0; i < lineupCountPost.length; i++){
                      //var t1 = performance.now();
                          var s = document.createElement("tr");
                          var id = 'a' + i;
                          s.setAttribute('id', id);
                          s.setAttribute('class', 'lineupRow');
                          var t = document.createElement("td");
                          var u = document.createTextNode(lineupCountPost[i][(lineupCountPost[i].length)-1]);
                          /*var uts = document.createElement("div");
                          uts.setAttribute('class', 'uk-vertical-align');
                          var ut = document.createElement("i");
                          ut.setAttribute('class', 'fas fa-check uk-vertical-align-middle');
                          ut.style.display = 'none';
                          uts.appendChild(ut);
                          t.appendChild(uts);*/
                          t.appendChild(u);
                          s.appendChild(t);
                 for (var j = 0; j <= (lineupCountPost[i].length-2); j++) {
                          var nom = 0;
                          var v = document.createElement("td");
                          var w = document.createTextNode(lineupCountPost[i][j].name);
                          var vw = document.createElement("p");
                          vw.setAttribute('class', 'startPos');
                          var vwx = document.createTextNode(ordinal_suffix_of(lineupCountPost[i][j].qualify));
                          var vwy = document.createTextNode('Pos. ');
                          vw.appendChild(vwy);
                          vw.appendChild(vwx);
                          v.appendChild(w);
                          v.appendChild(vw);
                          s.appendChild(v);
                          if (tempCount.length > 0){
                             for (var k = 0; k < tempCount.length; k++){
                                      if (tempCount[k] == lineupCountPost[i][j].name){
                                          v.style.backgroundColor = 'orangered';
                                      }
                                  }
                              }
                 }


                 /*for (var p = 0; p < seriesSwitch.length; p++) {
                   for (var y = 0; y < seriesSwitch[p].length; y++) {
                     for (var c = 0; c < s.children.length; c++) {
                     if (seriesSwitch[p][y] == s.children[c].innerText) {
                       nom++;
                     }
                   }
                 }
                 if (site == 'FD') {
                   if (nom == 6) {
                     s.style.backgroundColor = 'gold';
                   }
                 } else if (site == 'DK') {
                   if (nom == 7) {
                     s.style.backgroundColor = 'gold';
                   }
                 }
                  nom = 0;
               }*/


                 tableElem.appendChild(s);
                 $('#' + id).data('lineup', lineupCountPost[i]);
                 if (checkList(lineupCountPost[i], seriesSwitch) !== 'add') {
                   $('#' + id).css('background-color', 'gold');
                   /*var checkmark = "<i class='fas fa-check'></i>";
                   console.log($('#' + id + ' td').find('i'));
                   $('#' + id + ' td').find('i')[0].style.display = 'inline';*/
                 }

  //*************hiding load emblem and showing lineups
                 if (i == lineupCountPost.length - 1) {
                      $('#loader').hide();
                      $('#myDiv').show();
                 }
             }
  /*$('#lineuplist tr').click(function(){
    var data = $(this).data('lineup');
    $(this).css('background-color', 'gold');
    finalSelect.push(data);
    var id = data[0] + data[1] + data[2] + data[3] + data[4] + data[5];
    $('.lineupSelect').append('<div class="lineupSelected" id="' + id + '">' + data[6] + '</div');
    $(id).data('lineup', data);
    $(id).click(function(){
      showData(id);
    })
  })*/
  $('.lineupRow').click(function(){
    console.log($(this).data('lineup'));
    myLineup($(this));
  });
          }
       }

  function showData(id) {
    var data = $(id).data('lineup');
    $(id).after('<div class="showData"><p>' + data[0]['name'] + '</p><p>' + data[1]['name'] + '</p><p>' + data[2]['name'] + '</p><p>' + data[3]['name'] + '</p><p>' + data[4]['name'] + '</p><p>' + data[5]['name'] + '</p></div>');
  }



  window.sendDriver = function() {
      //***********hide current lineup list and show load emblem
              $('#myDiv').hide();
              $('#loader').css('display', 'block');
   //***********clear lineupCount for new load
              lineupCount = [];
           myWorker.postMessage([JSON.stringify(drivers), cpt]);
           //myWorker.postMessage(drivers);
           myWorker.onmessage = function(e){
               lineupCount = e.data;
               //spread = lineupCount;
               //lineupCount = lineupCount.slice(0, 750);
              /*for (var h = 0; h < lineupCount.length; h += Math.round(lineupCount.length / 150)) {
                 spread.push(lineupCount[h]);
               }*/
  //************showing table header, lineup count, and pagination buttons

  //************pagination variables and click handlers
                  startShow = 0;
                  endShow = startShow + 150;


               showLineups(startShow, endShow, lineupCount);
               if (lineupLock.length > 0) {
                  driverLockChange(tempCount, lineupCount);
              }


      }
  }

  function clearSetDrivers() {
    $('#driverList').empty();
    $('#driverList').append('<tr><th>Driver</th><th>Salary</th><th><input id ="all" type="checkbox" unchecked disabled></th></tr>');
    $('.logoButton').off('click');
    transition = setInterval(driverAppend, 0.5);

  }

  function sortDrivers(sort) {
    switch (sort){
      case 'Salary':
        driversTotal.sort(function(a, b){return b.salary - a.salary});
        clearSetDrivers();
        break;
      case 'FPPR':
        driversTotal.sort(function(a, b){return b.fppr - a.fppr});
        clearSetDrivers();
        break;
      case 'Practice Speed':
        driversTotal.sort(function(a, b){return b.practavg - a.practavg});
        //driversTotal.sort(function(a, b){if(b.pract2 == '--'){return b.pract - a.pract} else{return (b.pract + b.pract2) / 2 - (a.pract + a.pract2) / 2;}});
        clearSetDrivers();
        break;
      case 'Starting Position':
        driversTotal.sort(function(a, b){return a.qualify - b.qualify});
        clearSetDrivers();
        break;
      case 'Position Opportunity':
        driversTotal.sort(function(a, b){return b.diff - a.diff});
        clearSetDrivers();
        break;
      case 'Projected Points':
        driversTotal.sort(function(a, b){return b.projected - a.projected});
        clearSetDrivers();
        break;

    }

  }


  function driverAppend() {

      var k = counter;
       $('#driverList').append('<tr class="driverrowpick" id="' + k + '"><td><h1 class="drivername">' + driversTotal[k].name + '</h1><p class="driverfppr">FPPR: &nbsp</p><p class="driverfpprp">' + driversTotal[k].fppr + '</p><br><p class="driverfppr">Practice 1: &nbsp</p><p class="driverpract">' + driversTotal[k].pract + '</p><br><p class="driverfppr">Practice 2: &nbsp</p><p class="driverpract2">' + driversTotal[k].pract2 + '</p><br><p class="driverfppr">Starting: &nbsp</p><p class="driverqual">' + driversTotal[k].qualify + '</p></td><td class="driversalary">$' + driversTotal[k].salary + '<td><fieldset><legend>Select</legend><input id="' + driversTotal[k].id + '" type="checkbox" class="check" unchecked disabled></fieldset></td></td></tr>');
       //$('#' + k + ' .drivername').hover(function(){statBox(k, 'driversalary')}, function(){$('.stat').remove()});

      counter++;
      opacity+=(1/driversTotal.length);
      $('.driverrowpick').css('opacity', opacity);

           $('#raceLogo').css('opacity', opacity);

      if (counter == driversTotal.length) {
         clearInterval(transition);
         counter = 0;
          $('input').removeAttr('disabled');
          $('.logoButton').click(seriesClick);
          $('.siteButton').click(siteClick);

  //***********binding click event handlers to build lineup list

         $('#all').change(function(){
             if ($('#all').prop('checked')){
                $('.check').prop('checked', false);
                $('.check').change();
                $('.check').prop('checked', true);
                $('.check').change();
             } else {
               $('.check').prop('checked', false);
                $('.check').change();
             }
         });

  //*************building driver lineup from checkboxes
          deSelected = [];

         $('.check').change(function(){
           var clicked = $(this);
             buildList(drivers, clicked);
         });

         $('.cpt').click(function(e){
           var clicked = $(this);
           buildList(cpt, clicked);
         })

      }

  }




     function getDK(salary, practice, practice2, qualify) {
              driversTotal = [];
              drivers = [];

  //console.log(practice);
  //console.log(practice2);
              //console.log(salary);
              if (salary) {
         $.get( salary )
        .done(function( data ) {

          //***********variable getting driver info from csv file
              var driverList = $.csv.toArrays(data);


          //***********making driver objects

                 for (var i = 8; i < driverList.length; i++) {
                   driverTemp = new Driver(driverList[i][9].replace(/\./g,''), parseFloat(driverList[i][12]), parseFloat(driverList[i][10]), parseFloat(driverList[i][15]).toFixed(2));

                   for (var j = 0; j < practice.length; j++) {
                     if (driverTemp.name.toLowerCase() == practice[j]['name'].toLowerCase()){

                       driverTemp.pract = practice[j]['speed'];

                     }
                   }

                   if (driverTemp.pract == undefined) {
                     driverTemp.pract = '--';
                   }

                   for (var j = 0; j < practice2.length; j++) {
                     if (driverTemp.name.toLowerCase() == practice2[j]['name'].toLowerCase()){

                       driverTemp.pract2 = practice2[j]['speed'];

                     }
                   }

                   if (driverTemp.pract2 == undefined) {
                     driverTemp.pract2 = '--';
                   }

                   for (var j = 0; j < qualify.length; j++) {

                     if (driverTemp.name.toLowerCase() == qualify[j]['name'].toLowerCase()){

                       driverTemp.qualify = qualify[j]['position'];

                     }
                   }

                   if (driverTemp.qualify == undefined) {
                     driverTemp.qualify = '--';
                   }

                   if (driverTemp.pract !== '--' && driverTemp.pract2 !== '--') {
                     driverTemp.practavg = (driverTemp.pract + driverTemp.pract2)/2;
                   } else if (driverTemp.pract !== '--' && driverTemp.pract2 === '--') {
                     driverTemp.practavg = driverTemp.pract;
                   } else if (driverTemp.pract === '--' && driverTemp.pract2 !== '--') {
                     driverTemp.practavg = driverTemp.pract2;
                   } else if (driverTemp.pract === '--' && driverTemp.pract2 === '--') {
                     driverTemp.practavg = 0;
                   }








                   driversTotal.push(driverTemp);
                 }

          //***********setting driver list and checkboxes on page


             driversTotal.sort(function(a, b){

              //return (b.pract + b.pract2) / 2 - (a.pract + a.pract2) / 2;
              return b.practavg - a.practavg;
              //return parseFloat(a.practavg) - parseFloat(b.practavg);
             })

             for (var a = 0; a < driversTotal.length; a++) {
               var tempDiff = parseInt(driversTotal[a].qualify) - (a + 1);
               driversTotal[a]['diff'] = tempDiff;
             }

             /*driversTotal.sort(function(a, b) {
               return b.diff - a.diff;
             })*/

  for (var x = 0; x < driversTotal.length; x++) {
    var pos = x + 1;
    var points = 0;
    switch(pos){
      case 1:
        points+=46;
        break;
      case 2:
        points+=42;
        break;
      case 3:
        points+=41;
        break;
      case 4:
        points+=40;
        break;
      case 5:
        points+=39;
        break;
      case 6:
        points+=38;
        break;
      case 7:
        points+=37;
        break;
      case 8:
        points+=36;
        break;
      case 9:
        points+=35;
        break;
      case 10:
        points+=34;
        break;
      case 11:
        points+=33;
        break;
      case 12:
        points+=32;
        break;
      case 13:
        points+=31;
        break;
      case 14:
        points+=30;
        break;
      case 15:
        points+=29;
        break;
      case 16:
        points+=28;
        break;
      case 17:
        points+=27;
        break;
      case 18:
        points+=26;
        break;
      case 19:
        points+=25;
        break;
      case 20:
        points+=24;
        break;
      case 21:
        points+=23;
        break;
      case 22:
        points+=22;
        break;
      case 23:
        points+=21;
        break;
      case 24:
        points+=20;
        break;
      case 25:
        points+=19;
        break;
      case 26:
        points+=18;
        break;
      case 27:
        points+=17;
        break;
      case 28:
        points+=16;
        break;
      case 29:
        points+=15;
        break;
      case 30:
        points+=14;
        break;
      case 31:
        points+=13;
        break;
      case 32:
        points+=12;
        break;
      case 33:
        points+=11;
        break;
      case 34:
        points+=10;
        break;
      case 35:
        points+=9;
        break;
      case 36:
        points+=8;
        break;
      case 37:
        points+=7;
        break;
      case 38:
        points+=6;
        break;
      case 39:
        points+=5;
        break;
      case 40:
        points+=4;
        break;
    }
    var pointsProj = points + driversTotal[x].diff;
    //var posNeed = pos - pointsNeed;
    /*if (posNeed >= 1) {
      driversTotal[x]['finishNeed'] = posNeed;
      driversTotal[x]['lapsLed'] = 0;
      driversTotal[x]['fastLaps'] = 0;
    } else if (posNeed < 1) {
      driversTotal[x]['finishNeed'] = 1;
      pointsNeed = pointsNeed - (pos - 1);
      driversTotal[x]['lapsLed'] = (pointsNeed * 0.75) / 0.25;
      driversTotal[x]['fastLaps'] = (pointsNeed * 0.25) / 0.50;
    }*/

    driversTotal[x]['projected'] = pointsProj;

  }


  driversTotal.sort(function(a, b){
   // return ((b.pract + b.pract2) / 2) - ((a.pract + a.pract2) / 2);
   //return (b.pract + b.pract2) / 2 - (a.pract + a.pract2) / 2;
   return b.salary - a.salary;
  })

  //console.log(driversTotal);
              clearSetDrivers();



      });
  }
  //console.log(driversTotal);
  }

  function getFD(salary, practice, practice2, qualify) {
           driversTotal = [];
           drivers = [];

  //console.log(practice);
  //console.log(practice2);
           //console.log(salary);
  if (salary) {
      $.get( salary )
     .done(function( data ) {

       //***********variable getting driver info from csv file

           var driverList = $.csv.toArrays(data);

       //***********making driver objects

              for (var i = 1; i < driverList.length; i++) {
                driverTemp = new Driver(driverList[i][3].replace(/\./g,''), parseFloat(driverList[i][7]), driverList[i][0], parseFloat(driverList[i][5]).toFixed(2));

                for (var j = 0; j < practice.length; j++) {
                  if (driverTemp.name.toLowerCase() == practice[j]['name'].toLowerCase()){

                    driverTemp.pract = practice[j]['speed'];

                  }
                }

                if (driverTemp.pract == undefined) {
                  driverTemp.pract = '--';
                }

                for (var j = 0; j < practice2.length; j++) {
                  if (driverTemp.name.toLowerCase() == practice2[j]['name'].toLowerCase()){

                    driverTemp.pract2 = practice2[j]['speed'];

                  }
                }

                if (driverTemp.pract2 == undefined) {
                  driverTemp.pract2 = '--';
                }

                for (var j = 0; j < qualify.length; j++) {

                  if (driverTemp.name.toLowerCase() == qualify[j]['name'].toLowerCase()){

                    driverTemp.qualify = qualify[j]['position'];

                  }
                }

                if (driverTemp.qualify == undefined) {
                  driverTemp.qualify = '--';
                }

                if (driverTemp.pract !== '--' && driverTemp.pract2 !== '--') {
                  driverTemp.practavg = (driverTemp.pract + driverTemp.pract2)/2;
                } else if (driverTemp.pract !== '--' && driverTemp.pract2 === '--') {
                  driverTemp.practavg = driverTemp.pract;
                } else if (driverTemp.pract === '--' && driverTemp.pract2 !== '--') {
                  driverTemp.practavg = driverTemp.pract2;
                } else if (driverTemp.pract === '--' && driverTemp.pract2 === '--') {
                  driverTemp.practavg = 0;
                }




                driversTotal.push(driverTemp);
              }

       //***********setting driver list and checkboxes on page


          driversTotal.sort(function(a, b){
            //return ((b.pract + b.pract2) / 2) - ((a.pract + a.pract2) / 2);
           //return (b.pract + b.pract2) / 2 - (a.pract + a.pract2) / 2;
           return b.practavg - a.practavg;
             //return parseFloat(a.practavg) - parseFloat(b.practavg);
          })

          for (var a = 0; a < driversTotal.length; a++) {
            var tempDiff = parseInt(driversTotal[a].qualify) - (a + 1);
            driversTotal[a]['diff'] = tempDiff;
          }

          /*driversTotal.sort(function(a, b) {
            return b.diff - a.diff;
          })*/

  for (var x = 0; x < driversTotal.length; x++) {
  var pos = x + 1;
  var points = 0;
  switch(pos){
   case 1:
     points+=43;
     break;
   case 2:
     points+=40;
     break;
   case 3:
     points+=38;
     break;
   case 4:
     points+=37;
     break;
   case 5:
     points+=36;
     break;
   case 6:
     points+=35;
     break;
   case 7:
     points+=34;
     break;
   case 8:
     points+=33;
     break;
   case 9:
     points+=32;
     break;
   case 10:
     points+=31;
     break;
   case 11:
     points+=30;
     break;
   case 12:
     points+=29;
     break;
   case 13:
     points+=28;
     break;
   case 14:
     points+=27;
     break;
   case 15:
     points+=26;
     break;
   case 16:
     points+=25;
     break;
   case 17:
     points+=24;
     break;
   case 18:
     points+=23;
     break;
   case 19:
     points+=22;
     break;
   case 20:
     points+=21;
     break;
   case 21:
     points+=20;
     break;
   case 22:
     points+=19;
     break;
   case 23:
     points+=18;
     break;
   case 24:
     points+=17;
     break;
   case 25:
     points+=16;
     break;
   case 26:
     points+=15;
     break;
   case 27:
     points+=14;
     break;
   case 28:
     points+=13;
     break;
   case 29:
     points+=12;
     break;
   case 30:
     points+=11;
     break;
   case 31:
     points+=10;
     break;
   case 32:
     points+=9;
     break;
   case 33:
     points+=8;
     break;
   case 34:
     points+=7;
     break;
   case 35:
     points+=6;
     break;
   case 36:
     points+=5;
     break;
   case 37:
     points+=4;
     break;
   case 38:
     points+=3;
     break;
   case 39:
     points+=2;
     break;
   case 40:
     points+=1;
     break;
  }
  var pointsProj = points + (driversTotal[x].diff/2);
  //var posNeed = pos - pointsNeed;
  /*if (posNeed >= 1) {
   driversTotal[x]['finishNeed'] = posNeed;
   driversTotal[x]['lapsLed'] = 0;
   driversTotal[x]['fastLaps'] = 0;
  } else if (posNeed < 1) {
   driversTotal[x]['finishNeed'] = 1;
   pointsNeed = pointsNeed - (pos - 1);
   driversTotal[x]['lapsLed'] = (pointsNeed * 0.75) / 0.25;
   driversTotal[x]['fastLaps'] = (pointsNeed * 0.25) / 0.50;
  }*/

  driversTotal[x]['projected'] = pointsProj;

  }

  driversTotal.sort(function(a, b){
  // return ((b.pract + b.pract2) / 2) - ((a.pract + a.pract2) / 2);
  //return (b.pract + b.pract2) / 2 - (a.pract + a.pract2) / 2;
  return b.salary - a.salary;
  })

  //console.log(driversTotal);
           clearSetDrivers();



   });
  }
  //console.log(driversTotal);

  $('body').css('height', $('.driverbox').css('height'));
  }



  function getPractice(url, salary) {
    var totalResults = [];
    var practiceResults = [];
    var practiceResults2 = [];
    var qualifyResults = [];

            var oReq = new XMLHttpRequest(); //New request object
            oReq.open("get", url, false);
            oReq.onload = function() {
                totalResults = this.responseText;
                totalResults = JSON.parse(totalResults);
                practiceResults = totalResults[0];
                practiceResults2 = totalResults[1];
                qualifyResults = totalResults[2];
                if (site == 'DK') {
                getDK(salary, practiceResults, practiceResults2, qualifyResults);
              } else {
                getFD(salary, practiceResults, practiceResults2, qualifyResults);
              }
            }
            oReq.send();

  }



  function exportToCsv(filename, rows) {
    if (rows.length == 0) {
      alert('No Lineups');
      return;
    }
    var tempRow = [];
    for (var a = 0; a < rows.length; a++) {
      tempRow.push(rows[a]);
    }
      var processRow = function (row) {
          var finalVal = '';
          for (var j = 0; j < row.length - 1; j++) {
            if (row.length == 6) {
              var innerValue = row[j].id === null ? '' : (row[j].id + ':' + row[j].name).toString();
            } else {
              var innerValue = row[j].id === null ? '' : (row[j].name + '(' + row[j].id + ')').toString();
            }
              if (row[j] instanceof Date) {
                  innerValue = row[j].toLocaleString();
              };
              var result = innerValue.replace(/"/g, '""');
              if (result.search(/("|,|\n)/g) >= 0)
                  result = '"' + result + '"';
              if (j > 0)
                  finalVal += ',';
              finalVal += result;
          }
          return finalVal + '\n';
      };

      if (site == 'FD') {
        var csvFile = 'Driver,Driver,Driver,Driver,Driver\n';
      } else {
          var csvFile = 'D,D,D,D,D,D\n';
      }
      for (var i = 0; i < rows.length; i++) {
          csvFile += processRow(tempRow[i]);
      }

      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, filename);
      } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
              // Browsers that support HTML5 download attribute
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", filename);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          }
      }
  }

  function myLineup (lineup, switcher) {
    //console.log(lineup);
    var seriesSwitch = '';
    var tempLineup = [];
    if (switcher != undefined) {
      seriesSwitch = switcher;
    } else {
    for(var x = 0; x < $('.logoButton').length; x++){
      //console.log($('.logoButton')[x].getElementsByTagName('img')[0].classList.contains('buttonBorder'));
      if ($('.logoButton')[x].getElementsByTagName('img')[0].classList.contains('buttonBorder')){
          if (site == 'DK') {
            switch ($('.logoButton')[x].id) {
              case 'cup':
                seriesSwitch = myDKCupLineups;
                break;
              case 'xfin':
                seriesSwitch = myDKXfinLineups;
                break;
              case 'truck':
                seriesSwitch = myDKTruckLineups;
                break;
            }
          } else if (site == 'FD') {
            seriesSwitch = myFDCupLineups;
          }
        }
      }
    }

      if(Array.isArray(lineup)){
        tempLineup = lineup;
      } else {
      tempLineup = lineup.data('lineup');
    }

      //console.log(checkList(tempLineup, seriesSwitch));
  if (checkList(tempLineup, seriesSwitch) == 'add') {
    seriesSwitch.push(tempLineup);
    if (switcher == undefined) {
    lineup[0].style.backgroundColor = 'gold';
  }
  } else {
    seriesSwitch.splice(checkList(tempLineup, seriesSwitch), 1);
    if (switcher == undefined) {
    lineup[0].style.backgroundColor = '';
  }
  }
    //console.log(seriesSwitch);

    /*for (var a = 0; a < lineup[0].children.length; a++) {
      switch (site) {
        case 'DK':
          switch (seriesSwitch) {
            case 'cup':
              if (direct = '')
          }
      }
      lineup[0].children[a].innerText
    }*/
  //console.log(seriesSwitch);
  }

  function checkList(lineup, list) {

    var count = 0;
    var x = 0;
    for (x = 0; x < list.length; x++) {
      for (var y = 0; y < list[x].length - 1; y++) {
        for (var z = 0; z < lineup.length - 1; z++) {
          if (list[x][y].name == lineup[z].name) {
            count++;
          }
        }
      }
      if (count != lineup.length - 1) {
        count = 0;
      } else if (count == lineup.length - 1) {
        break;
      }
    }
    if (count == lineup.length - 1) {
      return x;
    } else {
      return 'add';
    }
  }

  function saveLineups() {
    localStorage.setItem('myDKCupLineups', JSON.stringify(myDKCupLineups));
    localStorage.setItem('myDKXfinLineups', JSON.stringify(myDKXfinLineups));
    localStorage.setItem('myDKTruckLineups', JSON.stringify(myDKTruckLineups));
    localStorage.setItem('myFDCupLineups', JSON.stringify(myFDCupLineups));

  }

  function updateLineupBox() {
    checkit = checkit.sort(Comparator);
     $('#myLineupsBox').empty();
     updateLineupNum(checkit);
     for (var a = 0; a < checkit.length; a++) {
       $('#myLineupsBox').append('<tr id="' + a + 'xy"></tr>');
       $('#' + a + 'xy').data('lineup', checkit[a]);
       //$('#' + a + 'xy').append('<td>' + checkit[a][checkit[a].length - 1] + '</td>');
       $('#' + a + 'xy').append('<td style="color: blue; font-weight: bold;">' + (a + 1) + '.</td>');
       for (var b = 0; b < checkit[a].length - 1; b++) {
         $('#' + a + 'xy').append('<td class="noselect" id="' + a + 'xy' + (b+1) + '">' + checkit[a][b].name + '</td>');
         
         $('#' + a + 'xy' + (b+1)).data('driver', checkit[a][b]);
         $('#' + a + 'xy' + (b+1)).click(function() {
              pivotDriver($(this));
              UIkit.modal('#pivot_modal').show();
          });
          /*$('#' + a + 'xy' + (b+1)).hover(function(){
              window.setTimeout(function(){
                  console.log('popup');
              }, 2000);
          });
         $('#' + a + 'xy' + (b+1)).click(function() {
           pivotDriver($(this));
         });*/
       }
       $('#' + a + 'xy').append('<td><button class="uk-button uk-button-default cutLineupButton" style="background-color: white" id="' + a + 'xyz" type="button"><i class="fa fa-trash" style="color: crimson" aria-hidden="true"></i></button></td>');
       $('#' + a + 'xyz').data('lineup', checkit[a]);
     }
     
     /*$('.noselect').append('<div id ="' + a + 'xyz" style="background-color:black; z-index: -1;">Click to see pivot drivers</div>');*/

     updateExposure(checkit);
  }

  function pivotDriver(driver) {
    var possibleList = [];
    var currentDriver = driver.data('driver');
    var pivotLineup = driver.parent().data('lineup');
    var totalSalary = 0;
    $('#current_table_lineup').empty();
    for (var a = 0; a < pivotLineup.length - 1; a++) {
      totalSalary += pivotLineup[a].salary;
      var tempText = 'style="background-color:lightsteelblue"';
      $('#current_table_lineup').append('<td>' + pivotLineup[a].name + '</td>');
       if(pivotLineup[a].name === currentDriver.name){
         $('#current_table_lineup').children()[a].style.backgroundColor = 'lightsteelblue';
       }
    };
    var salaryRoom = 50000 - (totalSalary - currentDriver.salary);
    console.log(salaryRoom);
   for (var b = 0; b < driversTotal.length; b++) {
     if (driversTotal[b].salary <= salaryRoom) {
       var axb = 0;
       for (var c = 0; c < pivotLineup.length - 1; c++) {
         if (pivotLineup[c].name === driversTotal[b].name){
           axb++;
         }
       }
       if (axb === 0){
         possibleList.push(driversTotal[b]);
       }
     }
   }
   $('#pivot_drivers').empty();
  $('#current_name').text(currentDriver.name);
  $('#current_table_salary').text(currentDriver.salary);
  $('#current_table_start').text(currentDriver.qualify);
  $('#current_table_pract').text((currentDriver.practavg).toFixed(2));
  $('#current_table_fppr').text(currentDriver.fppr);
  for (var x = 0; x < possibleList.length; x++) {
    $('#pivot_drivers').append('<tr id="pivot' + x + '"><td><button class="uk-button uk-button-danger uk-button-small swap_button"><i class="fas fa-exchange-alt"></i></button><td>' + possibleList[x].name + '</td><td>' + possibleList[x].salary + '</td><td>' + ordinal_suffix_of(possibleList[x].qualify) + '</td><td>' + possibleList[x].practavg.toFixed(2) + '</td><td>' + possibleList[x].fppr + '</td></tr>');
    $('.swap_button').click(function(){
      console.log();
      swapDriver(currentDriver, possibleList[parseInt($(this).parents()[1].id[$(this).parents()[1].id.length - 1])], pivotLineup);
    });
  //  $('#pivot' + x).data('driver', possibleList[x]);
  }

  }

  function swapDriver(current_driver, new_driver, lineup) {

    function checkRepeat() {
      for (var z = 0; z < checkit.length; z++) {
        var mno = 0;
        for (var y = 0; y < checkit[z].length - 1; y++) {
          for (var x = 0; x < changeLineup.length - 1; x++) {
            if (checkit[z][y].name === changeLineup[x].name) {
              mno++;
            }
          }
        }
        if (mno === changeLineup.length - 1) {
          return true;
        }
      }
    }

    for (var a = 0; a < checkit.length; a++) {
      var checkNow = 0;
      for (var b = 0; b < checkit[a].length - 1; b++) {
        for (var c = 0; c < lineup.length - 1; c++) {
          if (lineup[c].name === checkit[a][b].name) {
            checkNow++;
          }
        }
      }

      if (checkNow === lineup.length - 1) {
        var changeLineup = [];
        for (var d = 0; d < checkit[a].length; d++) {
          if (checkit[a][d].name === current_driver.name) {
            changeLineup.push(new_driver);
          } else {
            changeLineup.push(checkit[a][d]);
          }
        }
        changeLineup.sort(function(a, b){
          return b.salary - a.salary;
        });
        if (checkRepeat()) {
          $('#repeatAlert').show();
        } else {
          checkit.splice(a, 1, changeLineup);
          $('#notSaved').show();
          UIkit.modal('#pivot_modal').hide();
        }

      }
    }


  updateLineupBox();
  updateExposure(checkit);
  }

  function updateExposure(group) {
    var exposureList = {};
    $('#exposureTable').empty();
    for (var i = 0; i < group.length; i++) {
        for (var j = 0; j < group[i].length - 1; j++){
        if (!(group[i][j].name in exposureList)) {
          exposureList[group[i][j].name] = 1;
        } else {
          exposureList[group[i][j].name] += 1;
        }
      }
    }
    for (const key of Object.keys(exposureList)) {
        exposureList[key] = ((exposureList[key]/group.length)*100).toFixed(2) + '%';
    }
    for (const key in exposureList) {
      $('#exposureTable').append('<tr class="exposureRow" id="' + key.replace(/\s+/g, '') + '"></tr>');
      $('#' + key.replace(/\s+/g, '')).append('<td>' + key + '</td><td>' + exposureList[key] + '</td>');
    }
  }

  function highlightExposure(row, name) {
    for (var c = 0; c < $('.exposureRow').length; c++){
        $('.exposureRow')[c].style.backgroundColor = "";
    }
    for (var d = 0; d < $('#myLineupsBox tr td').length; d++){
      $('#myLineupsBox tr td')[d].style.backgroundColor = "";
    }

    if (row.style.backgroundColor == "") {
      row.style.backgroundColor = "lightsteelblue";
    } else{
      row.style.backgroundColor = "";
    }
    var myLineupRows = $('#myLineupsBox tr');
    for (var a = 0; a < myLineupRows.length; a++) {
      var myLineupRowsNode = myLineupRows[a].children;
      for (var b = 0; b < myLineupRowsNode.length; b++) {
        if (myLineupRowsNode[b].innerText == name) {
          if (myLineupRowsNode[b].style.backgroundColor == "") {
            myLineupRowsNode[b].style.backgroundColor = 'lightsteelblue';
          } else{
            myLineupRowsNode[b].style.backgroundColor = "";
          }
        }
      }
    }
  }

  function updateLineupNum(group) {
    if (group.length == 0) {
      $('#myLineupsNumber').html('<strong>NO</strong> Lineups Selected');
    } else{
      if (group.length == 1) {
        $('#myLineupsNumber').html('<strong>' + group.length + '</strong> Lineup Selected');
      } else{
        $('#myLineupsNumber').html('<strong>' + group.length + '</strong> Lineups Selected');
      }
    }

  }

 $.getScript("./javascript/hud.js");
  });
});
