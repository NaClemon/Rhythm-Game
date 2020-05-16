var canvas = document.getElementById("mycanvas");
var cnt = canvas.getContext("2d");
var mainscreen = document.getElementById("main");
var choosescreen = document.getElementById("musicchoice");
var gamescreen = document.getElementById("game");
var resultscreen = document.getElementById("result");
var anim = document.getElementById("anim");
resultscreen.style.visibility = "hidden";
choosescreen.style.visibility = "hidden";
gamescreen.style.visibility = "hidden";
var allresult = resultscreen.children;

var mus1 = document.getElementById("mus1");
var mus2 = document.getElementById("mus2");
var song1 = new Audio("Shots.mp3");
var song2 = new Audio("Trouble.mp3");
var count = 1;
var prelisten;
var gameid;
var gamenote;
var i = 0;
var subi = 0;
var everything = [];

var noteV = 3;
var noteY = 0;
var noteloc = Math.floor(Math.random() * 4);

function start(){
    if(choosescreen.style.visibility === "hidden"){
        mainscreen.style.visibility = "hidden";
        choosescreen.style.visibility = "visible";
        anim.style.webkitAnimationPlayState = "paused";
    }
    else{
        choosescreen.style.visibility = "hidden";
    }
    mus2.disabled = true;
    song1.play();
    prelisten = setInterval(songloop, 5);
    function songloop(){
        var time = song1.currentTime;
        if(time > 40){
            song1.currentTime = 0;
        }
    }
}

function nextsong(){
    song1.pause();
    song2.play();
    song1.currentTime = 0;
    song2.currentTime = 0;
    var pos = 0;
    var scalepos = 0;
    if(count == 1){
        var id = setInterval(frame, 5);
        function frame(){
            if(pos==220)
                clearInterval(id);
            else{
                pos+=4;
                scalepos += 0.0054;
                mus1.style.transform = "translate3d(" + (-120-pos) + "px, 70px, 0px) scale3d(" + (1-scalepos) + ", " +(1-scalepos) + ", " + (1-scalepos) + ")";
                mus2.style.transform = "translate3d(" + (100-pos) + "px, 70px, 0px) scale3d(" + (0.7+scalepos) + ", " +(0.7+scalepos) + ", " + (0.7+scalepos) + ")";
            }
        }
        mus2.disabled = false;
        mus1.disabled = true;
        clearInterval(prelisten);
        prelisten = setInterval(songloop, 5);
        function songloop(){
            var time = song2.currentTime;
            if(time > 40){
                song2.currentTime = 0;
            }
        }
        count = 0;
    }
    else
        return false;
}
function previoussong(){
    song2.pause();
    song1.play();
    song1.currentTime = 0;
    song2.currentTime = 0;
    var pos = 0;
    var scalepos = 0;
    if(count == 0){
        var id = setInterval(frame, 5);
        function frame(){
            if(pos==220)
                clearInterval(id);
            else{
                pos+=4;
                scalepos += 0.0054;
                mus2.style.transform = "translate3d(" + (-120+pos) + "px, 70px, 0px) scale3d(" + (1-scalepos) + ", " +(1-scalepos) + ", " + (1-scalepos) + ")";
                mus1.style.transform = "translate3d(" + (-340+pos) + "px, 70px, 0px) scale3d(" + (0.7+scalepos) + ", " +(0.7+scalepos) + ", " + (0.7+scalepos) + ")";
            }
        }
        mus2.disabled = true;
        mus1.disabled = false;
        clearInterval(prelisten);
        prelisten = setInterval(songloop, 5);
        function songloop(){
            var time = song1.currentTime;
            if(time > 40){
                song1.currentTime = 0;
            }
        }
        count = 1;
    }
    else
        return false;
}

function startgame(num){
    clearInterval(prelisten);
    var volumes;
    var gamesong;
    song1.pause();
    song2.pause();
    song1.currentTime = 78;
    song2.currentTime = 63.2;
    if(gamescreen.style.visibility == "hidden"){
        choosescreen.style.visibility = "hidden";
        gamescreen.style.visibility = "visible";
    }
    else{
        gamescreen.style.visibility = "hidden";
    }
    if(num == 1){
        song1.volume = 0.1;
        song1.play();
        volumes = setInterval(bigvol, 30);
        function bigvol(){
            song1.volume += 0.01;
            if(song1.volume >= 0.9)
                clearInterval(volumes);
        }
        gamesong = setInterval(gameduration, 10);
        gamenote = setInterval(randomnum, 100);
        function gameduration(){
            var time = song1.currentTime;
            if(time > 218){
                song1.volume -= 0.001;
                if(time > 223){
                    song1.pause();
                    song1.currentTime = 0;
                    song1.volume = 1;
                    gameresult();
                    initresult();
                    clearInterval(gamesong);
                    clearInterval(gamenote);
                }
            }
        }
    }
    else if(num == 2){
        song2.volume = 0.1;
        song2.play();
        volumes = setInterval(bigvol, 30);
        function bigvol(){
            song2.volume += 0.01;
            if(song2.volume >= 0.9)
                clearInterval(volumes);
        }
        gamesong = setInterval(gameduration, 10);
        gamenote = setInterval(randomnum, 100);
        function gameduration(){
            var time = song2.currentTime;
            if(time > 180){
                song2.volume -= 0.001;
                if(time > 187){
                    song2.pause();
                    song2.currentTime = 0;
                    song2.volume = 1;
                    gameresult();
                    initresult();
                    clearInterval(gamesong);
                    clearInterval(gamenote);
                }
            }
        }
    }
    init();
}
function randomnum(){
    noteloc = Math.floor(Math.random() * 4);
    everything[i] = noteloc;
    i++;
}

function init(){
    var gradient = cnt.createLinearGradient(0, 500, 0, 620);
    
    know_key(gradient, "red", 212, "A", 263);
    know_key(gradient, "orange", 367, "S", 418);
    know_key(gradient, "blue", 522, "D", 573);
    know_key(gradient, "green", 677, "F", 728);
    
    gameid = setInterval(draw, 5);
}

function know_key(gradient, gracolor, x, alpha, alphax){
    cnt.beginPath();
    gradient.addColorStop(0, gracolor);
    gradient.addColorStop(1, "white");
    cnt.rect(x, 520, 135, 56);
    cnt.fillStyle = gradient;
    cnt.fill();
    cnt.closePath();
    cnt.font = "bold 50px Courier New";
    cnt.fillStyle = "white";
    cnt.fillText(alpha, alphax, 565);
}

function draw(){
    noteY += noteV;
    if(noteY >= 504){
        noteY = 0;
        judgetext.innerHTML = "MISS";
        setTimeout(disappear, 300);
        combotext.innerHTML = "";
        combo = 0;
        misssum += 1;
        subi++;
    }
    cnt.clearRect(210, 0, 1024, 520);
    roundedRect(212+(155*everything[subi]), noteY);
}

function roundedRect(x, y){
    var gradient = cnt.createRadialGradient((2*x+135)/2, (2*y+16)/2, 0, (2*x+135)/2, (2*y+16)/2, 70);
    gradient.addColorStop(0, "#ffff1a");
    gradient.addColorStop(1, "white");
    cnt.beginPath();
    cnt.moveTo(x, y);
    cnt.lineTo(x+131, y);
    cnt.quadraticCurveTo(x+135, y, x+135, y+4);
    cnt.lineTo(x+135, y+12);
    cnt.quadraticCurveTo(x+135, y+16, x+131, y+16);
    cnt.lineTo(x+4, y+16);
    cnt.quadraticCurveTo(x, y+16, x, y+12);
    cnt.lineTo(x, y+4);
    cnt.quadraticCurveTo(x, y, x+4, y);
    cnt.lineWidth = 3;
    cnt.strokeStyle = "#333333";
    cnt.stroke()
    cnt.closePath();
    cnt.fillStyle = gradient;
    cnt.fill();
}

function gameresult(){
    if(resultscreen.style.visibility == "hidden"){
        gamescreen.style.visibility = "hidden";
        resultscreen.style.visibility = "visible";
    }
    else
        resultscreen.style.visibility = "hidden";
    
    
    allresult[0].innerHTML = "Score: " + Math.round(sum);
    allresult[2].innerHTML = "Combo: " + maxcombo;
    allresult[3].innerHTML = "Perfect: " + perfectsum;
    allresult[4].innerHTML = "Good: " + goodsum;
    allresult[5].innerHTML = "Bad: " + badsum;
    allresult[6].innerHTML = "Miss: " + misssum;
    allresult[8].innerHTML = "Rank: " + rankdecision(Math.round(sum));
}

function initresult(){
    combo = 0;
    sum = 0;
    perfectsum = 0;
    goodsum = 0;
    badsum = 0;
    misssum = 0;
    noteY = 0;
    combotext.innerHTML = "";
    clearInterval(gameid);
    resultscreen.reset();
}

function gomain(){
    if(choosescreen.style.visibility === "hidden"){
        resultscreen.style.visibility = "hidden";
        choosescreen.style.visibility = "visible";
    }
    else{
        choosescreen.style.visibility = "hidden";
    }
    mus2.disabled = true;
    song1.play();
    prelisten = setInterval(songloop, 5);
    function songloop(){
        var time = song1.currentTime;
        if(time > 40){
            song1.currentTime = 0;
        }
    }
}