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

   // Izquierda
   if (character.direction == 37) {

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