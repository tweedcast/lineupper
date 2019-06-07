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
       $('#' + a + 'xy' + (b+1)).dblclick(function() {
            pivotDriver($(this));
            UIkit.modal('#pivot_modal').show();
        });
       /*$('#' + a + 'xy' + (b+1)).click(function() {
         pivotDriver($(this));
       });*/
     }
     $('#' + a + 'xy').append('<td><button class="uk-button uk-button-default cutLineupButton" style="background-color: white" id="' + a + 'xyz" type="button"><i class="fa fa-trash" style="color: crimson" aria-hidden="true"></i></button></td>');
     $('#' + a + 'xyz').data('lineup', checkit[a]);
   }

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
$('#current_table_start').text(currentDriver.pos);
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
