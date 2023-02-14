document.getElementById('play-game').addEventListener("click", function() { 
    window.open("http://www.google.com/", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=500,height=500");
    document.getElementById('play-game').setAttribute('disabled','disabled');
    document.getElementById('activity').setAttribute('disabled','disabled');
    var property=document.getElementById('play-game');
    property.style.backgroundColor="#808080";
    var property=document.getElementById('activity');
    property.style.backgroundColor="#808080";
});

document.getElementById('activity').addEventListener("click", function() { 
    window.open("http://www.youtube.com/", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=500,height=500");
    document.getElementById('play-game').setAttribute('disabled','disabled');
    document.getElementById('activity').setAttribute('disabled','disabled');
    var property=document.getElementById('play-game');
    property.style.backgroundColor="#808080";
    var property=document.getElementById('activity');
    property.style.backgroundColor="#808080";
});