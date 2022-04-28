window.addEventListener("DOMContentLoaded", (event) => {
    var socket = io.connect("http://" + document.domain + ":" + location.port );

    document.onkeydown = function(e){
        switch(e.keyCode){
            case 37:
                socket.emit("move", {dx:-1, dy:0});
                compter();
                break;
            case 38:
                socket.emit("move", {dx:0, dy:-1});
                compter();
                break;
            case 39:
                socket.emit("move", {dx:1, dy:0});
                compter();
                break;
            case 40:
                socket.emit("move", {dx:0, dy:1});
                compter();
                break;
        }


    };

    function calculScoreSnake() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 100;
        score.innerHTML = newScore;
    };

    function calculScoreMonstre() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 400;
        score.innerHTML = newScore;
    };

    function calculScoreZombie() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 1000;
        score.innerHTML = newScore;
    };

    function oterVie() {
        let vies = document.getElementById("lives");
        newLives = parseInt(vies.innerText) - 1;
        vies.innerHTML = newLives;
    };

    function addVie() {
        let vies = document.getElementById("lives");
        lives = parseInt(vies.innerText)
        if (lives < 5) {
            newLives = lives + 1;
        }
        vies.innerHTML = newLives;
    };

    let nbPotions = 4;
    function compterPotions() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '🧪 ') {
                n += 1;
            }
        }
        if (n < nbPotions) {
            addVie();
            nbPotions -= 1;
        }
    };

    let nbSnake = 25;
    function compterSnake() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '🐍 ') {
                n += 1;
            }
        }
        if (n < nbSnake) {
            let p = Math.random();
            if (p < 0.1) {
                oterVie();
            }
            calculScoreSnake();
            nbSnake -= 1;
        }
    };

    let nbMonstre = 12;
    function compterMonstre() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '👹 ') {
                n += 1;
            }
        }
        if (n < nbMonstre) {
            let p = Math.random();
            if (p < 0.25) {
                oterVie();
            }
            calculScoreMonstre();
            nbMonstre -= 1;
        }
    };

    let nbZombie = 5;
    function compterZombie() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '🧟‍♀️ ') {
                n += 1;
            }
        }
        if (n < nbZombie) {
            let p = Math.random();
            if (p < 0.4) {
                oterVie();
            }
            calculScoreZombie();
            nbZombie -= 1;
        }
    };

    function compter() {
        compterSnake();
        compterMonstre();
        compterZombie();
        compterPotions();
    }
    
    var btn_n = document.getElementById("go_n");
    btn_n.onclick = function(e) {
        console.log("Clicked on button north");
        socket.emit("move", {dx:0, dy:-1});
    };

    var btn_s = document.getElementById("go_s");
    btn_s.onclick = function(e) {
        console.log("Clicked on button south");
        socket.emit("move", {dx:0, dy:1});
    };

    var btn_w = document.getElementById("go_w");
    btn_w.onclick = function(e) {
        console.log("Clicked on button w");
        socket.emit("move", {dx:-1, dy:0});
    };

    var btn_e = document.getElementById("go_e");
    btn_e.onclick = function(e) {
        console.log("Clicked on button e");
        socket.emit("move", {dx:1, dy:0});
    };


    socket.on("response", function(data){
        console.log(data);
        for( var i=0; i<2; i++){
            var cell_id = "cell " + data[i].i + "-" + data[i].j;
            var span_to_modif = document.getElementById(cell_id);
            span_to_modif.textContent = data[i].content;
        }
    });

});