document.getElementById('play-game').addEventListener("click", function() { 
    window.open("../game/index.html", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=1500,height=1000");
    document.getElementById('play-game').setAttribute('disabled','disabled');
    document.getElementById('activity').setAttribute('disabled','disabled');
    var property=document.getElementById('play-game');
    property.style.backgroundColor="#808080";
    var property=document.getElementById('activity');
    property.style.backgroundColor="#808080";
});

document.getElementById('activity').addEventListener("click", function() { 
    window.open("../api/bored.html", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=1000,height=250");
    document.getElementById('play-game').setAttribute('disabled','disabled');
    document.getElementById('activity').setAttribute('disabled','disabled');
    var property=document.getElementById('play-game');
    property.style.backgroundColor="#808080";
    var property=document.getElementById('activity');
    property.style.backgroundColor="#808080";
});