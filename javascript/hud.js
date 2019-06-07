var tempCount = [];
var driverCut = [];



//***********binding click events for opening and closing hud with animation
$('.hudOpen').click(function(){

    var hudWidth = -330;
    var hudSlide = setInterval(function(){
        hudWidth += 15;
        var temp = hudWidth + 'px';
        $('.hud').css('left', temp);
        if (hudWidth === 0) {
            clearInterval(hudSlide);
        }

    }, 20);

});

$('.hudButton').click(function(){
    var hudWidth = 0;
    var hudSlide = setInterval(function(){
        hudWidth -= 15;
        var temp = hudWidth + 'px';
        $('.hud').css('left', temp);
        if (hudWidth <= -350) {
            clearInterval(hudSlide);
        }

    }, 20);
   //$('.check').removeAttr('checked');
});

$('.selected').on('click', '.driverSelectButton', function(){
     var name = this.parentNode.childNodes[1].textContent;
    console.log(this.firstElementChild);
    if (this.childNodes[0].className == 'fas fa-lock') {
        lockDriverSort(lineupCount, name, 'unlock');
        this.innerHTML = '<i class="fas fa-unlock-alt"></i>';
        this.style.backgroundColor = 'white';
    } else {
        lockDriverSort(lineupCount, name, 'lock');
        this.innerHTML = '<i class="fas fa-lock"></i>';
        this.style.backgroundColor = 'red';
        this.firstElementChild.style.color = 'white';
    }

});



function hudDrivers(y, z) {

    for (var k = 0; k < y.length; k++) {
        $('.selected').append('<div class="driverSelect" id="' + y[k].id + k + '" draggable="true" ondragstart="drag(event)"><p class="hudPos">' + ordinal_suffix_of(y[k].qualify) + '</p><p>' + y[k].name + '</p><button class="driverSelectButton"><i class="fas fa-unlock-alt"></i></button></div>');


    }
    for (var m = 0; m < z.length; m++) {
        $('.unselected').append('<div class="driverSelect" id="' + z[m].id + m + '" draggable="true" ondragstart="drag(event)"><p class="hudPos">' + ordinal_suffix_of(z[m].qualify) + '</p><p>' + z[m].name + '</p></div>');
    }

}



function lockDriverSort(num, nom, direct) {
    if (direct == 'lock') {
        tempCount.push(nom);
        //console.log(tempCount);
        driverLockChange(tempCount, lineupCount);
    } else if (direct == 'unlock') {
        tempCount.splice(tempCount.indexOf(nom), 1);
        //console.log(tempCount);
        driverLockChange(tempCount, lineupCount);
    }

}


function driverLockChange(lock, list) {
    lineupLock = [];

      for (var i = 0; i < list.length; i++){
          var temp = 0;
          for (var j = 0; j < list[i].length; j++){
              for (var k = 0; k < lock.length; k++){
                  if (lock[k] == list[i][j].name) {
                      temp++;
                  }

              }

          }
          if (temp == lock.length){
                  lineupLock.push(list[i]);
              }

      }
    showLineups(startShow, endShow, lineupLock);
}



function hudDriverColor (fontColor, color, disable, pointer, border) {
    var buttonBack = document.getElementsByClassName('selected')[0].children;
     for (var i = 0; i < buttonBack.length; i++) {
         buttonBack[i].style.backgroundColor = color;
         buttonBack[i].style.color = fontColor;
         buttonBack[i].style.borderColor = border;
         buttonBack[i].lastElementChild.style.cursor = pointer;
        buttonBack[i].lastElementChild.disabled = disable;
     }


}




window.allowDrop = function(ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
    else
        ev.dataTransfer.dropEffect = "all"; // drop it like it's hot
};

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    el.appendChild(document.getElementById(data));
    //console.log(document.getElementById(data).children.length);
    console.log(el.className);
    if (el.className == 'selected' && document.getElementById(data).children.length < 3) {
        var button = document.createElement('button');
        button.className = 'driverSelectButton';
        document.getElementById(data).appendChild(button);
        var lock = document.createElement('i');
        lock.className = 'fas fa-unlock-alt';
        button.appendChild(lock);
        var addDriver = (function() {
            var temp = {};
            for (var l = 0; l < driversTotal.length; l++){
                if (document.getElementById(data).getElementsByTagName('p')[1].innerText == driversTotal[l].name) {
                    temp = driversTotal[l];
                    break;
                }

            }
            return temp;
        })();

        drivers.push(addDriver);
        sendDriver();



    } else if (el.className == 'unselected') {
        //console.log(document.getElementById(data));
        document.getElementById(data).removeAttribute('style');
        console.log(document.getElementById(data).children[2]);
        document.getElementById(data).children[2].remove();
        var cutDriver = (function() {
            var temp = {};
            for (var l = 0; l < drivers.length; l++){
                if (document.getElementById(data).getElementsByTagName('p')[1].innerText == drivers[l].name) {
                    temp = l;
                    break;
                }

            }
            return temp;
        })();

        drivers.splice(cutDriver, 1);
        sendDriver();

    }

}
