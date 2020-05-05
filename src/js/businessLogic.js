const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

/**
 * @template (object,number) => object
 * @description   Almacena la dirección en la que el usuario desea que se mueva el personaje
 *                (intención de movimiento)
 * @param {Object} character 
 * @param {number} NextDirection
 * @returns Object
 */
function SetNextDirection(character, NextDirection) {

   if (indexOf([0, 37, 38, 39, 40], NextDirection) > -1) {
      return Object.assign({}, character, { NextDirection });
   } else {
      return character;
   }
}

/**
 * @author Hernando H
 * @template (object,number) => object
 * @description Cambia la dirección de movimiento actual de los personajes
 * @throws {Array} p No se debe pasar p por parámetro fuera de func
 * @param {Object} world 
 * @param {number} character
 * @returns Object
 */
const ChangeDirection = function func(world, p = ['pacman', 'blue', 'yellow', 'red', 'rose']) {

   if (length(p) === 0) return world;

   const name = first(p);
   const character = world[name];

   if ((indexOf([37, 39], character.NextDirection) > -1 && (character.y / 2) % 2 == 0) ||
      (indexOf([38, 40], character.NextDirection) > -1 && (character.x / 2) % 2 == 0)) {

      const properties = Object.assign({}, character, { direction: character.NextDirection });
      const obj = eval(`Object({"${name}":${JSON.stringify(properties)}})`);
      return func(Object.assign({}, world, obj), rest(p));

   } else {
      return func(world, rest(p));
   }
}

/**
 * @author Hernando H
 * @template (object,number) => object
 * @description: Cambia la posición actual del personaje
 * @param {Object} character
 * @param {number} direction
 * @returns Object
 */
const ChangePosition = function func(world, p = ['pacman', 'blue', 'yellow', 'red', 'rose']) {

   if (length(p) === 0) return world;

   // Nombre y personaje actual
   const name = first(p);
   const character = world[name];

   if (document.getElementById('img_game_state').getAttribute('src').includes('boton_play')){
      return func(world, rest(p));
   }
   // Izquierda
   else if (character.direction == 37) {

      if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x - 30 })) {
         return func(world, rest(p));
      } else {

         const properties = Object.assign(character, { x: character.x - 10, rotate: 180 });
         const obj = eval(`Object({"${name}":${JSON.stringify(properties)}})`);
         return func(Object.assign({}, world, obj), rest(p));
      }

      // Arriba
   } else if (character.direction == 38) {
      if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y - 30 })) {
         return func(world, rest(p));
      } else {
         const properties = Object.assign(character, { y: character.y - 10, rotate: 270 });
         const obj = eval(`Object({"${name}":${JSON.stringify(properties)}})`);
         return func(Object.assign({}, world, obj), rest(p));
      }

      // Derecha
   } else if (character.direction == 39) {

      if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x + 30 })) {

         return func(world, rest(p));
      } else {
         const properties = Object.assign(character, { x: character.x + 10, rotate: 0 });
         const obj = eval(`Object({"${name}":${JSON.stringify(properties)}})`);
         return func(Object.assign({}, world, obj), rest(p));
      }

      // Abajo
   } else if (character.direction == 40) {

      if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y + 30 })) {
         return func(world, rest(p));
      } else {
         const properties = Object.assign(character, { y: character.y + 10, rotate: 90 });
         const obj = eval(`Object({"${name}":${JSON.stringify(properties)}})`);
         return func(Object.assign({}, world, obj), rest(p));
      }

      // Otra tecla (No se mueve)
   } else {
      return func(world, rest(p));
   }
}

/**
 * @author Hernando H
 * @template (object) => object
 * @description Mueve la boca de pacman
 * @param {Object} world
 * @returns Object
 */
function MovingMouth(world) {

   if (world.pacman.mouth) {
      return Object.assign({}, world, { pacman: Object.assign(world.pacman, { mouth: !(world.pacman.apertura == 40), apertura: world.pacman.apertura + 10 }) });
   } else {
      return Object.assign({}, world, { pacman: Object.assign(world.pacman, { mouth: (world.pacman.apertura == 0), apertura: world.pacman.apertura - 10 }) });
   }
}

/**
 * @author Hernando H
 * @template (object) => void
 * @description Actualiza el valor del puntaje en la interfaz
 * @param {Object} world 
 */
function SetCookieScore(world) {
   document.getElementById('cookies').innerText = world.current_score;
   document.getElementById('cherries').innerText = world.current_score;
};

/**
 * @author Hernando H
 * @template () => void
 * @description Actualiza el valor del puntaje en la interfaz
 */
function ChangeImageGameState() {

   const img = document.getElementById('img_game_state');
   const spn = document.getElementById('spn_game_state');

   if (img.getAttribute('src').includes('boton_pausa')) {
      spn.innerText = 'Reanudar';
      img.src = 'images/boton_play.png';
   } else {
      const new_img = document.createElement('img');
      spn.innerText = 'Pausar';
      img.src = 'images/boton_pausa.png';
   }

};


/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
  * @author Vitor Alomia
  * @template (Object) => Object
  * @description Esta función muestra el puntaje del juego
  * @param {Object} state
  * @returns {Object} state
  */
function maxScore(state) {
   if (lookforCookies(state.pacman, state.cookies) == true) {
      scoreGame(state.cookies[lookPositionCookies(state.pacman, state.cookies, 0)].type);
      const cookies = listDelete(state.cookies, state.cookies[lookPositionCookies(state.pacman, state.cookies, 0)]);
      return Object.assign({}, state, { cookies });
   }
   return state;
}

/**
 * @author Vitor Alomia
 * @template (Object) => Object
 * @description Esta función busca las galleta mas cercana a pacman
 * @param {Object} pacman
 * @param {Object} cookies
 * @returns {Boolean}
 */
function lookforCookies(pacman, cookies) {
   if (isEmpty(cookies)) {
      return false;
   } else if (pacman.x == first(cookies).x && pacman.y == first(cookies).y) {
      return true;
   } else {
      return lookforCookies(pacman, rest(cookies));
   }
}

/**
 * @author Vitor Alomia
 * @template (Object) => Object
 * @description Esta función suma el valor de la galleta
 * @param {Object} pacman
 * @returns {Boolean}
 */
function scoreGame(valor) {
   if (valor == 1) {
      score += 10;
   } else if (valor == 2) {
      score += 50;
   }
}

/**
 * @author Vitor Alomia
 * @template (Object) => Object
 * @description buscar la posicion de la galleta
 * @param {Object} pacman
 * @param {Object} pacman
 * @param {Object} indice
 * @returns {Number}
 */
function lookPositionCookies(pacman, cookies, indice) {

   if (isEmpty(cookies)) {
      return -1;
   } else if (pacman.x == first(cookies).x && pacman.y == first(cookies).y) {
      return indice;
   } else {
      return lookPositionCookies(pacman, rest(cookies), indice + 1);
   }
}

//
/**
 * @author Vitor Alomia
 * @template (Array) => Object
 * @description Esta función elimina la galleta a lo que el pacman está en la posicion de n
 * @param {Array} l
 * @param {Number} n
 * @returns {Array} l
 */
function listDelete(l, n) {
   if (n == length(l) - 1) {
      return invertir(allLast(l))
   }

   function allLast(l, aux = []) {
      if (length(l) == 1) {
         return aux;
      } else {
         return allLast(rest(l), cons(first(l), aux))
      }
   }

   function invertir(l, b = []) {
      if (isEmpty(l)) {
         return b;
      } else {
         return invertir(rest(l), cons(first(l), b));
      }
   }
   function functionAux(l, n, lAux = [], i = 0) {
      if (isEmpty(l)) {
         return invertir(lAux);
      }
      if (n == i) {
         return functionAux(rest(rest(l)), n, cons(first(rest(l)), lAux), i + 1)
      } else {
         return functionAux(rest(l), n, cons(first(l), lAux), i + 1)
      }
   }
   return functionAux(l, n)
}

