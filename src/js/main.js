function make(data, attribute) {
   return Object.assign({}, data, attribute);
}

function sketchProc(processing) {

   /** configuración inicial */
   processing.setup = function () {
      processing.frameRate(30);
      processing.size(481, 481);
      processing.state = {
         pacman: {
            boca: false,
            apertura: 20,
            x: 240,
            y: 240,
            direction: 0,
            NextDirection: 0,
            rotate: 0
         }
      };
   }

   // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
   processing.drawGame = function (world) {
      processing.background(18, 20, 53);
      processing.stroke(1);
      processing.fill(18, 20, 53);

      for (let y = 0; y < 480; y += 40) {
         for (let x = 0; x < 480; x += 40) {
            processing.rect(x, y, 40, 40);
         }
      }

      makeMap(processing);

      processing.noStroke();

      processing.fill(23, 100, 80);
      processing.translate(world.pacman.x, world.pacman.y);
      processing.rotate(processing.radians(world.rotate));
      processing.arc(0, 0, 30, 30, processing.radians(world.apertura), processing.radians(360 - world.apertura));
   }

   // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
   processing.onTic = function (world) {

      // if (world.boca) {
      //    world = make(world, { boca: !(world.apertura == 40), apertura: world.apertura + 10 });
      // } else {
      //    world = make(world, { boca: (world.apertura == 0), apertura: world.apertura - 10 });
      // }
                  
      world = make(world, ChangeDirection(world.pacman));
      world = make(world, ChangePosition(world.pacman,processing));

      return world;
   }

   //Implemente esta función si quiere que su programa reaccione a eventos del teclado
   processing.onKeyEvent = function (world, event) {
      world = make(world, {pacman:SetNextDirection(world.pacman, event,processing)});
      return world;
   }

   //Implemente esta función si quiere que su programa reaccione a eventos del mouse
   processing.onMouseEvent = function (world, event) {
      // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
      return make(world, {});
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