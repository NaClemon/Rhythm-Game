var note1 = $("#note1");
var note2 = $("#note2");
var note3 = $("#note3");
var note4 = $("#note4");
var line1 = $("#line1");
var line2 = $("#line2");
var line3 = $("#line3");
var line4 = $("#line4");
var combotext = document.getElementById("nowcombo");
var judgetext = document.getElementById("nowjudge");
var current_note = 0;
var perfect = 100;
var good = 70;
var bad = 30;
var miss = 0;
var combo = 0;
var maxcombo = 0;
var sum = 0;
var perfectsum = 0;
var goodsum = 0;
var badsum = 0;
var misssum = 0;

var game;
var opa;

$(document).on('keydown', function(e){
    var key = e.keyCode;
    if(key == 65){
        line1.css("opacity", 0.5);
        now_judge(keyjudge(1), 65);
    }
    else if(key == 83){
        line2.css("opacity", 0.5);
        now_judge(keyjudge(2), 83);
    }
    else if(key == 68){
        line3.css("opacity", 0.5);
        now_judge(keyjudge(3), 68);
    }
    else if(key == 70){
        line4.css("opacity", 0.5);
        now_judge(keyjudge(4), 70);
    }
});

$(document).on('keyup', function(e){
    var key = e.keyCode;
    if(key == 65){
        line1.css("opacity", 0.3);
    }
    else if(key == 83){
        line2.css("opacity", 0.3);
    }
    else if(key == 68){
        line3.css("opacity", 0.3);
    }
    else if(key == 70){
        line4.css("opacity", 0.3);
    }
});
function disappear(){
    judgetext.innerHTML = "";
}

function keyjudge(num){
    if((num == 1) && (everything[subi] == 0)){
        return 65;
    }
    else if((num == 2) && (everything[subi] == 1)){
        return 83;
    }
    else if((num == 3) && (everything[subi] == 2)){
        return 68;
    }
    else if((num == 4) && (everything[subi] == 3)){
        return 70;
    }
    
}

function now_judge(keystate, key){
    if(keystate == key){
        if((noteY<=400)&&(noteY>=300)){
            judgetext.innerHTML = "MISS";
            setTimeout(disappear, 300);
            combotext.innerHTML = "";
            combo = 0;
            noteY = 0;
            bonus(miss);
            misssum += 1;
            subi++;
        }
        else if((noteY>400)&&(noteY<=450)){
            judgetext.innerHTML = "BAD";
            setTimeout(disappear, 300);
            combotext.innerHTML = "";
            combo = 0;
            noteY = 0;
            bonus(bad);
            badsum += 1;
            subi++;
        }
        else if((noteY>450)&&(noteY<=470)){
            judgetext.innerHTML = "GOOD";
            setTimeout(disappear, 300);
            combo += 1;
            noteY = 0;
            bonus(good);
            goodsum += 1;
            subi++;
        }
        else if((noteY>470)&&(noteY<=488)){
            judgetext.innerHTML = "PERFECT";
            setTimeout(disappear, 300);
            combo += 1;
            noteY = 0;
            bonus(perfect);
            perfectsum += 1;
            subi++;
        }
        else if((noteY>488)&&(noteY<=495)){
            judgetext.innerHTML = "GOOD";
            setTimeout(disappear, 300);
            combo += 1;
            noteY = 0;
            bonus(good);
            goodsum += 1;
            subi++;
        }
        else if((noteY>495)&&(noteY<504)){
            judgetext.innerHTML = "BAD";
            setTimeout(disappear, 300);
            combotext.innerHTML = "";
            combo = 0;
            noteY = 0;
            bonus(bad);
            badsum += 1;
            subi++;
        }
    }
    if(combo >= 3){
        combotext.innerHTML = combo + "combo";
        if(combo>=maxcombo)
            maxcombo = combo;
        opa = 1.0;
        var id = setInterval(comopa, 50);
        function comopa(){
            if(opa < 0.8)
                clearInterval(id);
            opa -= 0.004;
            combotext.style.opacity = opa;
        }
    }
}

function bonus(judge){
    if(combo>=30){
        sum += (judge*1.2);
    }
    else if(combo>=65){
        sum += (judge*1.2*1.2);
    }
    else if(combo>=100){
        sum += (judge*1.2*1.2*1.2);
    }
    else if(combo<30){
        sum += judge;
    }
}

function rankdecision(score){
    if(score >= 13000)
        return "S";
    else if((score<13000)&&(score>=9000))
        return "A";
    else if((score<9000)&&(score>=6000))
        return "B";
    else if((score<6000)&&(score>=3000))
        return "C";
    else
        return "F";
}