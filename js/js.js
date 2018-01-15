//ENTORNO
var pause = false;
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var gameover = false;
var bot2 = false;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
//variables indicadores
var bartop = 5;
var barwidth = 39;
var barleft = 31;
var gasfil = 100;
//variables dificultad
var dificultad = 1;
var umbral = 5;
var fuel = 100;
var dif = "Fácil";
var dks = false;

//al cargar por completo la página...
window.onload = function() {


    velocidad = document.getElementById("velocidad");
    altura = document.getElementById("altura");
    combustible = document.getElementById("fuel");


    //definición de eventos
    document.getElementById("bmenu").onclick = function() {
        if (gameover == false) {
            if (pause == false) {
                pause = true;
                document.getElementsByClassName("menu2")[0].style.display = "block";
                stop();
            } else {
                pause = false;
                document.getElementsByClassName("menu2")[0].style.display = "none";
                start();
            }
        }
    }

    document.getElementById("Dif").onclick = function() {
        if (gameover == false) {
            switch (dificultad) {
                case 1:
                    fuel = 50;
                    document.getElementById("Dif").innerHTML = "Media";
                    dificultad = 2
                    umbral = 3;
                    dif = "Media";
                    restart();
                    break;
                case 2:
                    fuel = 35;
                    document.getElementById("Dif").innerHTML = "Difícil";
                    dificultad = 3
                    umbral = 1;
                    dif = "Difícil";
                    restart();
                    break;
                case 3:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif").innerHTML = "Dark Souls";
                    dificultad = 4;
                    dif = "Dark Souls";
                    v = 30;
                    restart();
                    break;
                case 4:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif").innerHTML = "Fácil";
                    dificultad = 1
                    umbral = 5;
                    dif = "Fácil";
                    restart();
                    break;
            }
        }
    }

    ///////////////////////////////////

    document.getElementById("Dif3").onclick = function() {
        if (gameover == false) {
            switch (dificultad) {
                case 1:
                    fuel = 50;
                    document.getElementById("Dif3").innerHTML = "Media";
                    dificultad = 2
                    umbral = 3;
                    dif = "Media";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 2:
                    fuel = 35;
                    document.getElementById("Dif3").innerHTML = "Difícil";
                    dificultad = 3
                    umbral = 1;
                    dif = "Difícil";
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 3:
                    dks = true;
                    fuel = 10;
                    document.getElementById("Dif3").innerHTML = "Dark Souls";
                    dificultad = 4;
                    dif = "Dark Souls";
                    v = 30;
                    restart();
                    stop();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    break;
                case 4:
                    dks = false;
                    fuel = 100;
                    document.getElementById("Dif3").innerHTML = "Fácil";
                    dificultad = 1
                    umbral = 5;
                    dif = "Fácil";
                    restart();
                    pause = true;
                    document.getElementsByClassName("menu2")[0].style.display = "block";
                    stop();
                    break;
            }
        }
    }




    ////////////////////////////////// 
    document.getElementById("Dif").onmouseenter = function() {
        document.getElementById("Dif").innerHTML = dif;
    }
    document.getElementById("Dif").onmouseout = function() {
        document.getElementById("Dif").innerHTML = "Dificultad";
    }
    document.getElementById("Ab").onclick = function() {
        window.onbeforeunload = function() {
            return "¿Quieres salir?";
        }
    }
    document.getElementById("Ins").onclick = function() {
        window.onbeforeunload = function() {
            return "¿Quieres salir?";
        }
    }

    document.getElementById("Ab2").onclick = function() {
        window.onbeforeunload = function() {
            return "¿Quieres salir?";
        }
    }
    document.getElementById("Ins2").onclick = function() {
        window.onbeforeunload = function() {
            return "¿Quieres salir?";
        }
    }

    document.getElementsByClassName("bplay")[0].onclick = function() {
        if (gameover == false) {
            if (pause == false) {
                document.getElementById("bpause").src = "img/bPlay.png";
                pause = true;
                stop();
            } else {
                document.getElementById("bpause").src = "img/bPause.png";
                pause = false;
                start();
            }
        }

    }
    document.getElementById("brest1").onclick = function() {
        if (gameover == false) {
            restart();
        }
    }

    document.getElementById("reint").onclick = function() {
        restart();
        document.getElementsByClassName("gameov")[0].style.display = "none";
    }

    document.getElementById("showm").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "block";
        stop();
    }
    //ocultar menú móvil
    document.getElementById("hidem").onclick = function() {
        document.getElementsByClassName("c")[0].style.display = "none";
        start();
    }
    //encender/apagar el motor al hacer click en el botón
    document.getElementsByClassName("bot")[0].onmousedown = function() {
        if (pause == false && gameover == false) {
            if (a == g && c >= 0) {
                motorOn();
                document.getElementById("nau").src = "img/landerOn.png";
            }
        }
        document.onmouseup = function() {
            if (gameover == false) {
                document.getElementById("nau").src = "img/landerOff.png";
            }
            motorOff();
        }
    }

    ////////////////////////

    document.getElementsByClassName("bot2")[0].onclick = function() {
        if (bot2 == false) {
            if (pause == false && gameover == false) {
                bot2 = true;
                document.getElementById("bot2p").innerHTML = "ON";
                if (a == g && c >= 0) {
                    motorOn();
                    document.getElementById("nau").src = "img/landerOn.png";
                }
            }
        } else {
            if (gameover == false) {
                bot2 = false;
                document.getElementById("bot2p").innerHTML = "OFF";
                document.getElementById("nau").src = "img/landerOff.png";
            }
            motorOff();
        }
    }


    //Empezar a mover la nave justo después de cargar la página
    start();
}


//Definición de funciones
function start() {
    pause = false;
    //cada intervalo de tiempo mueve la nave
    timer = setInterval(function() {
        moverNave();
    }, dt * 1000);
}

function restart() {
    gameover = false;
    bartop = 5;
    barwidth = 39;
    barleft = 31;
    gasfil = fuel;
    y = 10;
    bot2 = false;
    if (dks == true) {
        v = 30;
    } else {
        v = 0;
    }
    a = g;
    c = fuel;

    document.getElementById("fondo-ind-bot-fil2").style.height = (100 - fuel) + "%";
    document.getElementsByClassName("menu2")[0].style.display = "none";


    document.getElementById("bot2p").innerHTML = "OFF";
    document.getElementById("bpause").src = "img/bPause.png";
    document.getElementById("nau").src = "img/landerOff.png"
    document.getElementById("fondo-ind-bot-fil").style.height = gasfil + "%";
    stop();
    start();
}

function stop() {
    pause = true;
    clearInterval(timer);
}

function moverNave() {
    //cambiar velocidad y posicion
    v += a * dt;
    y += v * dt;
    if (y > 9) {
        bartop += (v * dt) * 1.5;
        if (barleft > 13 && y > 9) {
            barwidth += (v * dt) * 1.9
        }
        if (barleft < 13 && barleft > 0.8) {
            barwidth += (v * dt) * 0.8;
        }
    }

    if (barleft > 13 && y > 9) {
        barleft -= (v * dt) * 1;
    }
    if (barleft < 13 && barleft > 0.8) {
        barleft -= (v * dt) * 0.4;
    }

    //actualizar marcadores
    velocidad.innerHTML = v.toFixed(1);
    altura.innerHTML = y.toFixed(0);
    document.getElementById("fondo-ind-top-bar").style.top = (bartop) + "%";
    document.getElementById("fondo-ind-top-bar").style.width = (barwidth) + "%";
    document.getElementById("fondo-ind-top-bar").style.left = (barleft) + "%";
    document.getElementById("fondo-ind-top-bar2").style.top = (bartop) + "%";

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        if (v <= umbral) {
            gameover = true;
            stop();
            document.getElementsByClassName("gameov")[0].style.display = "block";
            document.getElementById("lose").style.display = "none";
            document.getElementById("win").style.display = "block";
        } else {
            document.getElementById("nau").src = "img/landerDestroyed.png"
            gameover = true;
            stop();
            document.getElementsByClassName("gameov")[0].style.display = "block";
            document.getElementById("lose").style.display = "block";
            document.getElementById("win").style.display = "none";
        }
    }
}

function motorOn() {
    //el motor da aceleración a la nave siempre que haya fuel
    if (c > 0) {
        a = -g;
    }
    //mientras el motor esté activado gasta combustible
    if (timerFuel == null)
        timerFuel = setInterval(function() {
            actualizarFuel();
        }, 10);
}

function motorOff() {
    a = g;
    clearInterval(timerFuel);
    timerFuel = null;
}

function actualizarFuel() {
    //Restamos combustible hasta que se agota
    if (pause == false) {
        c -= 0.1;
        gasfil = c;
        if (c <= 0) {
            c = 0;
            document.getElementById("nau").src = "img/landerOff.png";
            motorOff();
        }
        document.getElementById("fondo-ind-bot-fil").style.height = gasfil + "%";
        if (bot2 = true) {
            document.getElementById("fondo-ind-bot-fil2").style.height = (100 - gasfil) + "%";
        }
    }
}