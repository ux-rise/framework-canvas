function make(data, attribute) {
   return Object.assign({}, data, attribute);
}

function sketchProc(processing) {

   /** configuración inicial */
   processing.setup = function () {
      processing.frameRate(30);
      processing.size(481, 481);
      processing.state = {
         width: processing.width,
         height: processing.height,
         current_score: 0,
         hight_score: 0,
         pacman: {
            mouth: false,
            apertura: 20,
            x: 240,
            y: 240,
            direction: 0,
            NextDirection: 0,
            rotate: 0,
            gluttony_mode: false
         },
         blue: {
            x: 240,
            y: 240,
            direction: 0,
            NextDirection: 0,
            scream_mode: false
         },
         yellow: {
            x: 240, y: 240,
            direction: 0, NextDirection: 0,
            scream_mode: false
         },
         red: {
            x: 240, y: 240,
            direction: 0, NextDirection: 0,
            scream_mode: false
         },
         rose: {
            x: 240, y: 240,
            direction: 0, NextDirection: 0,
            scream_mode: false
         },
         constructor: {
            enable: false,
            direction: 0
         }
      };
   }

   // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
   processing.drawGame = function (world) {

      // Fondo del canvas
      processing.background(0, 0, 0, 0); // negro con opacidad cero
      processing.stroke(1);
      processing.fill(0, 0, 0, 0); // negro con opacidad cero

      // SÓLO PARA LA CREACIÓN DEL JUEGO
      for (let y = 0; y < 480; y += 40) {
         for (let x = 0; x < 480; x += 40) {
            processing.rect(x, y, 40, 40);
         }
      }
      processing.noStroke();

      // laberinto actual
      makeMap(mapCoors, processing);

      // pacman
      processing.fill(255, 250, 90);
      processing.translate(world.pacman.x, world.pacman.y);
      processing.rotate(processing.radians(world.pacman.rotate));

      // movimiento de la boca
      processing.arc(0, 0, 30, 30, processing.radians(world.pacman.apertura), processing.radians(360 - world.pacman.apertura));
   }

   function* OnTicGenerator() {
      yield MovingMouth;
      yield ChangePosition;
      return ChangeDirection;
   }
   // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
   processing.onTic = function func(world, done = false, fn = OnTicGenerator()) {
      if (done) return world;
      const next = fn.next();
      return func(next.value(world), next.done, fn);
   }

   //Implemente esta función si quiere que su programa reaccione a eventos del teclado
   processing.onKeyEvent = function (world, event) {

      console.log('event', event);

      if (indexOf([107, 187], event) > -1) {
         world = make(world, { constructor: make(world.constructor, { enable: true }) });
         let c = mapCoors[mapCoors.length - 1];
         mapCoors.push([c[0], c[1]])

      } else if (event == 10) {
         world = make(world, { constructor: false });
      } else if (indexOf([109, 189], event) > -1 && processing.state.constructor.enable) {
         let c = mapCoors[mapCoors.length - 1];
         mapCoors = listDeleter(mapCoors, c);
      }

      if (!world.constructor.enable) {
         world = make(world, { pacman: SetNextDirection(world.pacman, event, processing) });
      } else {
         world = make(world, { pacman: SetNextDirection(world.pacman, 0, processing) });

         if (event == 37) {
            let c = mapCoors[mapCoors.length - 1];
            mapCoors.pop();
            mapCoors.push([c[0] - 20, c[1]])
            localStorage.setItem('map', mapCoors.toString())
         } else if (event == 38) {
            let c = mapCoors[mapCoors.length - 1];
            mapCoors.pop();
            mapCoors.push([c[0], c[1] - 20])
         } else if (event == 39) {
            let c = mapCoors[mapCoors.length - 1];
            mapCoors.pop();
            mapCoors.push([c[0] + 20, c[1]])
         } else if (event == 40) {
            let c = mapCoors[mapCoors.length - 1];
            mapCoors.pop();
            mapCoors.push([c[0], c[1] + 20])
         }

         localStorage.setItem('map', JSON.stringify(mapCoors));

      }

      return world;
   }

   //Implemente esta función si quiere que su programa reaccione a eventos del mouse
   processing.onMouseEvent = function (world, event) {
      return make(world, { mouseX: event.mouseX, mouseY: event.mouseY });
   };

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