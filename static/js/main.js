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
    }

    function calculScoreMonstre() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 400;
        score.innerHTML = newScore;
    }

    function calculScoreZombie() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 1000;
        score.innerHTML = newScore;
    }

    function calculScoreTresor() {
        let score = document.getElementById("score");
        newScore = parseInt(score.innerText) + 10000;
        score.innerHTML = newScore;
    }

    function oterVie() {
        let vies = document.getElementById("lives");
        newLives = parseInt(vies.innerText) - 1;
        vies.innerHTML = newLives;
    }

    function addVie() {
        let vies = document.getElementById("lives");
        lives = parseInt(vies.innerText)
        if (lives < 5) {
            newLives = lives + 1;
        }
        vies.innerHTML = newLives;
    }

    function addArmure() {
        let armor = document.getElementById("armor");
        armure = parseInt(armor.innerText)
        newArmor = armure + 1
        armor.innerHTML = newArmor;
    }

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
    }

    let nbTresor = 0;
    function compterTresor() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '💸 ') {
                n += 1;
            }
        }
        if (n < nbTresor) {
            calculScoreTresor();
            nbTresor -= 1;
        }
        if (n > nbTresor) {
            nbTresor = n;
        }
    }

    let nbArmure = 3;
    let Armure = 0;
    function compterArmure() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let n = 0;
        for (let kaze of kazes) {
            if (kaze.innerText == '🪖 ') {
                n += 1;
            }
        }
        if (n < nbArmure) {
            addArmure();
            nbArmure -= 1;
            Armure += 1;
        }
    }

    let nbSnake = 35;
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
            let proba = 0.15 - Armure * 0.05
            if (p < proba) {
                oterVie();
            }
            calculScoreSnake();
            nbSnake -= 1;
        }
    }

    let nbMonstre = 15;
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
            let proba = 0.35 - Armure * 0.05
            if (p < proba) {
                oterVie();
            }
            calculScoreMonstre();
            nbMonstre -= 1;
        }
    }

    let nbZombie = 7;
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
            let proba = 0.5 - Armure * 0.07
            if (p < proba) {
                oterVie();
            }
            calculScoreZombie();
            nbZombie -= 1;
        }
    }

    function displayBow() {
        let weapon = document.getElementById("weapon");
        weapon.innerHTML = '🏹';
    }

    function displayTorch() {
        let weapon = document.getElementById("weapon");
        weapon.innerHTML = '🔥';
    }

    function displaySword() {
        let weapon = document.getElementById("weapon");
        weapon.innerHTML = '🗡';
    }

    function actualWeapon() {
        let kazes = document.getElementById("console").getElementsByTagName("span");
        let bow = 1;
        let sword = 1;
        let torch = 1;
        for (let kaze of kazes) {
            if (kaze.innerText == '🏹 ') {
                bow = 0;
            }
            else if (kaze.innerText == '🗡 ') {
                sword = 0;
            }
            else if (kaze.innerText == '🔥 ') {
                torch = 0
            } 
        }
        if (torch == 1) {
            displayTorch();
        }
        if (bow == 1) {
            displayBow();
        }
        if (sword == 1) {
            displaySword();
        }
    };

    function compter() {
        compterSnake();
        compterMonstre();
        compterZombie();
        compterPotions();
        compterTresor();
        compterArmure();
        actualWeapon();
    };
    
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