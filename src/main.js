let blue = null;
let red = null;
let yellow = null;
let rose = null;
const fps = 15;

function sketchProc(processing) {

    /** configuración inicial */
    processing.setup = function () {
        processing.frameRate(fps);
        processing.size(481, 481);
        processing.state = {
            cooldown: -1,
            width: processing.width,
            height: processing.height,
            cherryTotalScore: 0,
            // mapCoors: [[10, 10], [10, 30], [10, 50], [10, 70], [10, 90], [10, 110], [10, 130], [10, 150], [10, 170], [10, 190], [10, 210], [10, 230], [10, 250], [10, 270], [10, 290], [10, 310], [10, 330], [10, 350], [10, 370], [10, 390], [10, 410], [10, 430], [10, 450], [10, 470], [30, 470], [50, 470], [70, 470], [90, 470], [110, 470], [130, 470], [170, 470], [190, 470], [210, 470], [150, 470], [230, 470], [250, 470], [270, 470], [290, 470], [310, 470], [330, 470], [350, 470], [370, 470], [390, 470], [410, 470], [430, 470], [450, 470], [470, 450], [470, 470], [470, 430], [470, 410], [470, 390], [470, 370], [470, 350], [470, 330], [470, 310], [470, 290], [470, 270], [470, 250], [470, 230], [470, 210], [470, 190], [470, 170], [470, 150], [470, 130], [470, 110], [470, 90], [470, 70], [470, 50], [470, 30], [470, 10], [450, 10], [430, 10], [410, 10], [390, 10], [370, 10], [350, 10], [330, 10], [310, 10], [290, 10], [270, 10], [250, 10], [230, 10], [210, 10], [190, 10], [170, 10], [150, 10], [130, 10], [110, 10], [90, 10], [50, 10], [30, 10], [70, 10], [190, 30], [190, 50], [210, 50], [210, 30], [270, 30], [270, 50], [290, 50], [290, 30], [270, 110], [250, 110], [230, 110], [210, 110], [70, 70], [90, 70], [110, 70], [130, 70], [130, 90], [130, 110], [150, 110], [330, 110], [350, 110], [350, 90], [350, 70], [370, 70], [390, 70], [410, 70], [410, 130], [430, 130], [450, 130], [30, 130], [50, 130], [70, 130], [70, 190], [70, 210], [70, 230], [70, 290], [50, 290], [30, 290], [410, 290], [430, 290], [450, 290], [410, 230], [410, 210], [410, 190], [350, 170], [350, 190], [350, 210], [130, 210], [130, 190], [130, 170], [190, 170], [210, 170], [230, 170], [250, 170], [270, 170], [290, 170], [130, 270], [130, 290], [130, 310], [130, 330], [130, 350], [350, 350], [350, 330], [350, 310], [350, 290], [350, 270], [350, 410], [330, 410], [310, 410], [250, 450], [250, 430], [230, 430], [230, 450], [170, 410], [150, 410], [130, 410], [230, 370], [250, 370], [250, 350], [230, 350], [210, 350], [270, 350], [290, 350], [190, 350], [70, 350], [70, 370], [70, 390], [70, 410], [410, 410], [410, 390], [410, 370], [410, 350], [410, 350], [290, 290], [210, 290], [230, 290], [250, 290], [270, 290], [190, 290], [190, 230], [210, 230], [270, 230], [290, 230], [290, 230], [290, 270], [290, 250], [190, 250], [190, 270], [190, 270]],
            mapCoors: [[10, 10], [10, 30], [10, 50], [10, 70], [10, 90], [10, 110], [10, 130], [10, 150], [10, 170], [10, 190], [10, 210], [10, 230], [10, 250], [10, 270], [10, 290], [10, 310], [10, 330], [10, 350], [10, 370], [10, 390], [10, 410], [10, 430], [10, 450], [10, 470], [30, 470], [50, 470], [70, 470], [90, 470], [110, 470], [130, 470], [170, 470], [190, 470], [210, 470], [150, 470], [230, 470], [250, 470], [270, 470], [290, 470], [310, 470], [330, 470], [350, 470], [370, 470], [390, 470], [410, 470], [430, 470], [450, 470], [470, 450], [470, 470], [470, 430], [470, 410], [470, 390], [470, 370], [470, 350], [470, 330], [470, 310], [470, 290], [470, 270], [470, 250], [470, 230], [470, 210], [470, 190], [470, 170], [470, 150], [470, 130], [470, 110], [470, 90], [470, 70], [470, 50], [470, 30], [470, 10], [450, 10], [430, 10], [410, 10], [390, 10], [370, 10], [350, 10], [330, 10], [310, 10], [290, 10], [270, 10], [250, 10], [230, 10], [210, 10], [190, 10], [170, 10], [150, 10], [130, 10], [110, 10], [90, 10], [50, 10], [30, 10], [70, 10], [250, 110], [230, 110], [70, 70], [130, 70], [350, 70], [410, 70], [70, 130], [310, 410], [250, 450], [250, 430], [230, 430], [230, 450], [250, 30], [230, 30], [230, 50], [250, 50], [170, 70], [150, 70], [170, 90], [170, 110], [310, 110], [310, 90], [310, 70], [330, 70], [110, 130], [90, 130], [430, 190], [450, 190], [370, 130], [390, 130], [410, 130], [370, 190], [310, 230], [410, 250], [390, 250], [370, 250], [170, 230], [310, 310], [250, 310], [230, 310], [170, 310], [170, 290], [110, 310], [90, 310], [70, 310], [50, 310], [30, 310], [110, 250], [90, 250], [70, 250], [210, 370], [190, 370], [170, 370], [170, 390], [170, 410], [110, 410], [110, 390], [110, 370], [90, 370], [70, 370], [70, 410], [270, 370], [290, 370], [310, 370], [310, 390], [310, 410], [370, 370], [390, 370], [410, 370], [170, 130], [310, 130], [170, 190], [150, 190], [130, 190], [30, 190], [50, 190], [110, 190], [170, 210], [230, 190], [250, 190], [310, 190], [330, 190], [350, 190], [310, 210], [250, 250], [230, 250], [430, 310], [450, 310], [410, 310], [390, 310], [370, 310], [410, 410], [370, 390], [370, 410], [250, 130], [230, 130], [310, 290]],
            current_score: 0,
            cookies: [], // coordenadas de las galletas existentes en el mapa
            cookiesMap: [], // coordenadas permanentes para varios usos
            pacman: {
                mouth: false,
                apertura: 20,
                x: 240,
                y: 400,
                oldx: null,
                oldy: null,
                direction: 0,
                NextDirection: 0,
                rotate: 0,
                gluttony_mode: false,
                lifes: 3,
            },
            blue: {
                x: 240,
                y: 80,
                oldx: null,
                oldy: null,
                direction: 0,
                NextDirection: 0,
            },
            yellow: {
                x: 240,
                y: 80,
                oldx: null,
                oldy: null,
                direction: 0,
                NextDirection: 0,
            },
            red: {
                x: 240,
                y: 80,
                oldx: null,
                oldy: null,
                direction: 0,
                NextDirection: 0,
            },
            rose: {
                x: 240,
                y: 80,
                oldx: null,
                oldy: null,
                direction: 0,
                NextDirection: 0,
            },
            constructor: {
                enable: false,
                direction: 0
            }
        };
    }

    blue = processing.loadImage("images/blue.png");
    red = processing.loadImage("images/red.png");
    yellow = processing.loadImage("images/yellow.png");
    rose = processing.loadImage("images/rose.png");
    cherry = processing.loadImage("images/cherry.png");

    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {

        // Fondo del canvas
        processing.background(0, 0, 0, 0); // negro con opacidad cero
        processing.stroke(1);
        processing.fill(0, 0, 0, 0); // negro con opacidad cero

        // SÓLO PARA LA CREACIÓN DEL JUEGO
        // dibuja una cuadrícula guía
        // for (let y = 0; y < 480; y += 40) {
        //    for (let x = 0; x < 480; x += 40) {
        //       processing.rect(x, y, 40, 40);
        //    }
        // }

        processing.noStroke();

        // Laberinto actual
        MapPainter(world.mapCoors, processing);
        // Galletas
        CookiesPainter(world.cookies, processing);

        // portal
        // processing.fill(0, 0, 0);
        // processing.ellipse(240, 240, 30, 30);
        // processing.fill(20, 40, 60);
        // processing.ellipse(240, 240, 25, 25);
        // processing.fill(20, 70, 120);
        // processing.ellipse(240, 240, 20, 20);
        // processing.fill(20, 40, 60);
        // processing.ellipse(240, 240, 10, 10);
        // processing.fill(0, 0, 0);
        // processing.ellipse(240, 240, 5, 5);

        processing.image(blue, world.blue.x - 15, world.blue.y - 14);
        processing.image(red, world.red.x - 15, world.red.y - 14);
        processing.image(yellow, world.yellow.x - 15, world.yellow.y - 14);
        processing.image(rose, world.rose.x - 15, world.rose.y - 14);

        // Cereza
        if (world.cherry) processing.image(cherry, world.cherry.x - 10, world.cherry.y - 10);

        // Pacman
        processing.fill(255, 250, 90);
        processing.translate(world.pacman.x, world.pacman.y);
        processing.rotate(processing.radians(world.pacman.rotate));
        processing.arc(0, 0, 30, 30, processing.radians(world.pacman.apertura), processing.radians(360 - world.pacman.apertura));
    }

    /**
     * @author Hernando H
     * Genera un conjunto de funciones que se usan en la función TIC, es más limpio que anidar las funciones.
     * @template () => Generator<Object>
     */
    function* OnTicGenerator() {
        yield CookiesGenerator;
        yield CherryGenerator;
        yield findCherry;
        yield MovingMouth;
        yield ChaseMode;
        yield ChangeDirection;
        yield ChangePosition;
        yield ChassingLifes;
        return maxScore;
    }
    // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
    processing.onTic = function func(world, done = false, fn = OnTicGenerator()) {

        if (done) return world;
        const next = fn.next();
        return func(next.value(world), next.done, fn);
    }

    //Implemente esta función si quiere que su programa reaccione a eventos del teclado
    processing.onKeyEvent = function (world, event) {

        // SÓLO PARA LA CREACIÓN DEL JUEGO
        // Activa el modo contructor de laberintos
        if (indexOf([107, 187], event) > -1) {
            world = make(world, { constructor: make(world.constructor, { enable: true }) });
            let c = world.mapCoors[world.mapCoors.length - 1];
            world.mapCoors.push([c[0], c[1]])

            // SÓLO PARA LA CREACIÓN DEL JUEGO
            // Desactiva el modo contructor de laberintos
        } else if (event == 10) {
            world = make(world, { constructor: false });
            // Elimina un elemento del laberinto
        } else if (indexOf([109, 189], event) > -1 && processing.state.constructor.enable) {
            let c = world.mapCoors[world.mapCoors.length - 1];
            world.mapCoors = listDeleter(world.mapCoors, c);
        }

        // SÓLO PARA LA CREACIÓN DEL JUEGO
        // Valida si se está contruyendo o jugando
        if (!world.constructor.enable) {

            // pasa el valor de la tecla presionada (la intención de cambiar de dirección a pacman)
            world = make(world, { pacman: SetNextDirection(world.pacman, event) });
        } else {
            // se pasa la intención de parar los movimientos de pacman
            world = make(world, { pacman: SetNextDirection(world.pacman, 0) });

            // SÓLO PARA LA CREACIÓN DEL JUEGO
            // constructor de laberintos
            if (event == 37) {
                let c = world.mapCoors[world.mapCoors.length - 1];
                world.mapCoors.pop();
                world.mapCoors.push([c[0] - 20, c[1]]);
            } else if (event == 38) {
                let c = world.mapCoors[world.mapCoors.length - 1];
                world.mapCoors.pop();
                world.mapCoors.push([c[0], c[1] - 20]);
            } else if (event == 39) {
                let c = world.mapCoors[world.mapCoors.length - 1];
                world.mapCoors.pop();
                world.mapCoors.push([c[0] + 20, c[1]]);
            } else if (event == 40) {
                let c = world.mapCoors[world.mapCoors.length - 1];
                world.mapCoors.pop();
                world.mapCoors.push([c[0], c[1] + 20]);
            }
        }
        return world;
    }

    //Implemente esta función si quiere que su programa reaccione a eventos del mouse
    processing.onMouseEvent = function (world, event) {
        return make(world, { mouseX: event.mouseX, mouseY: event.mouseY });
    };

    // Añade atributos a un Object y lo retorna
    function make(data, attribute) {
        return Object.assign({}, data, attribute);
    }

    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    // ******************** De aquí hacia abajo no debe cambiar nada. ********************

    // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo.
    // No cambie esta función. Su código debe ir en drawGame
    processing.draw = function () {
        processing.drawGame(processing.state);
        processing.state = processing.onTic(processing.state);
    };

    // Esta función se ejecuta cada vez que presionamos una tecla.
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.keyPressed = function () {
        processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
    }

    // Esta función se ejecuta cada vez movemos el mouse.
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.mouseMoved = function () {
        processing.state = processing.onMouseEvent(processing.state,
            { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
    }

    // Estas funciones controlan los eventos del mouse.
    // No cambie estas funciones. Su código debe ir en OnMouseEvent
    processing.mouseClicked = function () {
        processing.state = processing.onMouseEvent(processing.state,
            { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseDragged = function () {
        processing.state = processing.onMouseEvent(processing.state,
            { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mousePressed = function () {
        processing.state = processing.onMouseEvent(processing.state,
            { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseReleased = function () {
        processing.state = processing.onMouseEvent(processing.state,
            { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }
    // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvasGame");
// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);

document.querySelector("canvas").onblur = function () {
    var me = this;
    setTimeout(function () {
        me.focus();
    }, 500);
}


function initialState(world) {
    console.log(world)
    return {
        cooldown: 4 * fps,
        pacman: {
            mouth: false,
            apertura: 20,
            x: 240,
            y: 400,
            oldx: null,
            oldy: null,
            direction: 0,
            NextDirection: 0,
            rotate: 0,
            gluttony_mode: false,
            lifes: world.pacman.lifes - 1,
        },
        blue: {
            x: 240,
            y: 80,
            oldx: null,
            oldy: null,
            direction: 0,
            NextDirection: 0,
        },
        yellow: {
            x: 240,
            y: 80,
            oldx: null,
            oldy: null,
            direction: 0,
            NextDirection: 0,
        },
        red: {
            x: 240,
            y: 80,
            oldx: null,
            oldy: null,
            direction: 0,
            NextDirection: 0,
        },
        rose: {
            x: 240,
            y: 80,
            oldx: null,
            oldy: null,
            direction: 0,
            NextDirection: 0,
        },
    }
}

document.querySelector("canvas").focus();