document.getElementById('play-game').addEventListener("click", function() { 
    document.getElementById('play-game').textContent = 'hello';
    window.open("http://www.google.com/", "mywindow","location=1,toolbar=1,menubar=1,resizable=1,width=500,height=500");
});