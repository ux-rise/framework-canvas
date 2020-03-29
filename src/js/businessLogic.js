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

/************************************************************************************
 * Movimiento de los personajes
/************************************************************************************/

/**
 * @template NextDirection (object,number) => object
 * @description Almacena la dirección en la que el usuario desea que se mueva el personaje
 * @param {Object} character 
 * @param {number} NextDirection
 * @returns Object
 */
function SetNextDirection(character, NextDirection) {
   if(indexOf([37,38,39,40], NextDirection) > -1) {
      return Object.assign({}, character, { NextDirection });
   }
}

/**
 * @template ChangeDirection (object,number) => object
 * @description Cambia la dirección de movimiento actual del personaje
 * @param {Object} character 
 * @param {number} direction
 * @returns Object
 */
function ChangeDirection(character) {
   
   if (indexOf([37, 39], character.NextDirection) > -1 && (character.y / 2) % 2 == 0) {

      return Object.assign(character, { direction: character.NextDirection });

   } else if (indexOf([38, 40], character.NextDirection) > -1 && (character.x / 2) % 2 == 0) {
      console.log('38, 40',(character.x / 2) % 2 == 0);

      return Object.assign(character, { direction: character.NextDirection });

   } else {
      return character
   }
}

/**
 * @template ChangeDirection (object,number) => object
 * @description Cambia la posición actual del personaje
 * @param {Object} character 
 * @param {number} direction
 * @returns Object
 */
function ChangePosition(character,processing) {

   if (character.direction == 37) {

      return Object.assign(character, {
         x: character.x <= -10 ? processing.width + 10 : character.x - 10,
         rotate: 180
      });

   } else if (character.direction == 38) {

      return Object.assign(character, { y: character.y - 10, rotate: 270 });

   } else if (character.direction == 39) {

      return Object.assign(character, {
         x: character.x >= processing.width ? -10 : character.x + 10,
         rotate: 0
      });

   } else if (character.direction == 40) {

      return Object.assign(character, { y: character.y + 10, rotate: 90 });

   } else {
      return character
   }
}

/************************************************************************************
 * Exclusivo de pacman
/************************************************************************************/

/**
 * @template NextDirection (object,number) => object
 * @description Almacena la dirección en la que el usuario desea que se mueva el personaje
 * @param {Object} character 
 * @param {number} NextDirection
 * @returns Object
 */
function SetNextDirection(character, NextDirection) {
   if(indexOf([37,38,39,40], NextDirection) > -1) {
      return Object.assign({}, character, { NextDirection });
   }
}