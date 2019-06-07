//console.log('ready');
//importScripts("subworkers.js");
onmessage = function(x) {
  //console.log('Message received from main script');

  //console.log('Posting message back to main script');
var tier2 = [];
var tier3 = [];
var tier4 = [];

var drivers = JSON.parse(x.data[0]);
drivers = drivers.sort(function(num, nom){return nom.salary - num.salary});
/*console.log(drivers);
for (var b = 0; b < drivers.length; b++){
  if (drivers[b].salary < 9500 && drivers[b].salary >= 7500) {
    tier2.push(drivers[b]);
  } else if(drivers[b].salary < 7500 && drivers[b].salary >= 5500) {
    tier3.push(drivers[b]);
  } else if(drivers[b].salary < 5500) {
    tier4.push(drivers[b]);
  }
}
var tier1 = x.data[1].sort(function(num, nom){return nom.salary - num.salary});;*/
//console.log(cpt);

//cpt = cpt.sort(function(num, nom){return nom.salary - num.salary});
   // console.log(drivers);
    var finalLineup = [];
     var lineupCount = [];
    var resultsList = [];


    var n = 0;
    var o = 1;
    var p = 2;
    var q = 3;
    var r = 4;

var fixIt = 0;
function getSet(b, c, d, e, f) {
    //console.log(a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f);

    while (b < drivers.length - 4) {
        c = b + 1;
        while (c < drivers.length - 3) {
            d = c + 1;
            while (d < drivers.length - 2) {
                e = d + 1;
                    while (e < drivers.length - 1) {
                        f = e + 1;
                       while (f < drivers.length) {
                        finalLineup = [];
                        finalLineup.push(drivers[b], drivers[c], drivers[d], drivers[e], drivers[f]);

                        var salaryTemp = finalLineup.map(function(driva){return driva.salary}).reduce(function getSum(total, num) {
                                return total + num;});
                        var fpprTemp = finalLineup.map(function(driva){return driva.projected}).reduce(function getSum(total, num) {
                                return total + num;});
                        fpprTemp = Math.round(fpprTemp);
                        if (isNaN(fpprTemp)) {
                          fpprTemp = '--';
                        }
                            if ( salaryTemp <= 50000) {


                                /*var fptsTemp = finalLineup.map(function(driva){return driva.fpts}).reduce(function getSum(total, num) {
                                return total + num;});*/

                                //finalLineup.push(fptsTemp);
                                finalLineup.push(fpprTemp);
                                lineupCount.push(finalLineup);
                                //resultsList.push(finalLineup);
                        }
                           f++;
                        }
                    //r++;
                    e++;
                }
               //q++;
               d++;
            }
          //p++;
          c++;

        }
       //o++;
       b++;
    }

   // console.log(lineupCount);
}
    getSet(n, o, p, q, r);
var lineupCountUnique = [];
    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    lineupCount.map(function(nom, index){
        var check = [];
        for (var j = 0; j <= 4; j++) {
          check.push(nom[j].name);
        }
        if (hasDuplicates(check) == false) {
          lineupCountUnique.push(nom);
        }
    })

    lineupCountUnique.sort(function (a, b){ return b[5] - a[5]});

    postMessage(lineupCountUnique);


}
