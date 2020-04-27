const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

/************************************************************************************
 * Funciones auxiliares
/************************************************************************************/

/**
 * @template indexOf (Array,any) => Number
 * @description Retorna el índice, del valor dado, dentro de la lista
 * @param {Array} list 
 * @param {any} value
 * @param {Number} index campo calculado (NO pasar como parámetro)
 */
function indexOf(list, value, index = 0) {
   if (isEmpty(list)) return -1;
   if (first(list) != value) {
      return indexOf(rest(list), value, index + 1)
   } else {
      return index
   }
}

/**
 * @template indexOf (Array,any) => Array
 * @description Elimina de la lista el primer elemento qu concuerde con el valor dado
 * @param {Array} list 
 * @param {any} value
 */
function listDeleter(list, value) {

   if (isEmpty(list)) return list;
   if (first(list)[0] == value[0] && first(list)[1] == value[1]) {
      return rest(list);
   } else {
      return cons(first(list), listDeleter(rest(list), value))
   }
}

/************************************************************************************
 * Movimiento de los personajes
/************************************************************************************/

/**
 * @template SetNextDirection (object,number) => object
 * @description Almacena la dirección en la que el usuario desea que se mueva el personaje
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
 * @template ChangeDirection (object,number) => object
 * @description Cambia la dirección de movimiento actual del personaje
 * @param {Object} world 
 * @param {number} character
 * @returns Object
 */
function ChangeDirection(world) {

   if ((indexOf([37, 39], world.pacman.NextDirection) > -1 && (world.pacman.y / 2) % 2 == 0) ||
      (indexOf([38, 40], world.pacman.NextDirection) > -1 && (world.pacman.x / 2) % 2 == 0)) {
      return Object.assign({},
         world,
         {
            pacman: Object.assign(world.pacman, { direction: world.pacman.NextDirection })
         }
      );
   } else {
      return world;
   }
}

/**
 * @template ChangePosition (object,number) => object
 * @description Cambia la posición actual del personaje
 * @param {Object} character
 * @param {number} direction
 * @returns Object
 */
function ChangePosition(character, processing) {

   if (character.direction == 37) {

      if (getCollition(mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x - 30 })) {
         return character;
      } else {
         return Object.assign(character, {
            x: character.x <= -10 ? processing.width + 10 : character.x - 10,
            rotate: 180
         });
      }

   } else if (character.direction == 38) {
      if (getCollition(mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y - 30 })) {
         return character;
      } else {
         return Object.assign(character, { y: character.y - 10, rotate: 270 });
      }
   } else if (character.direction == 39) {

      if (getCollition(mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x + 30 })) {

         return character;
      } else {
         console.log(Array(30).join('~'));
      console.log(processing);
      console.log(Array(30).join('~'));
         return Object.assign(character, {
            x: character.x >= processing.width ? -10 : character.x + 10,
            rotate: 0
         });
      }

   } else if (character.direction == 40) {

      if (getCollition(mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y + 30 })) {
         return character;
      } else {
         return Object.assign(character, { y: character.y + 10, rotate: 90 });
      }

   } else {
      return character;
   }
}

/**
 * @template getCollition (Array,String) => Bolean
 * @description Detecta la colisión del personaje
 * @param {Array} coordinates
 * @param {String} characterName
 * @returns Bolean
 */
function getCollition(coordinates, position) {

   if (isEmpty(coordinates)) return false;
   const c = first(coordinates);
   // const position = getPosition(characterName)

   if (position.x2) {
      if ((first(c) > position.x1 && first(c) < position.x2) && first(rest(c)) == position.y1) return true;
      return getCollition(rest(coordinates), position);
   } else {
      if ((first(rest(c)) > position.y1 && first(rest(c)) < position.y2) && first(c) == position.x1) return true;
      return getCollition(rest(coordinates), position);
   }
}

/************************************************************************************
 * Exclusivo de pacman
/************************************************************************************/

/**
 * @template mouthMove (object) => object
 * @description Mueve la boca de pacman
 * @param {Object} world processing.state
 * @returns Object
 */
function mouthMove(world) {
   if (world.pacman.mouth) {

      return Object.assign({}, world, { pacman: Object.assign(world.pacman, { mouth: !(world.pacman.apertura == 40), apertura: world.pacman.apertura + 10 }) });
   } else {
      return Object.assign({}, world, { pacman: Object.assign(world.pacman, { mouth: (world.pacman.apertura == 0), apertura: world.pacman.apertura - 10 }) });
      return Object.assign({}, world, { mouth: (world.pacman.apertura == 0), apertura: world.pacman.apertura - 10 });
   }
}

function downloadMap() {
   console.log('downloadMap');
   
   var element = document.createElement('a');
   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorage.getItem('map')));
   element.setAttribute('download', 'map.json');

   element.style.display = 'none';
   document.body.appendChild(element);

   element.click();

   document.body.removeChild(element);
}