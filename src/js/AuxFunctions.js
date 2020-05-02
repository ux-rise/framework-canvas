/************************************************************************************
 * Funciones auxiliares
/************************************************************************************/

/**
 * @template (Array,String) => Bolean
 * @description Detecta la colisión de los objetos del juego
 * @param {Array} coordinates
 * @param {String} characterName
 * @returns Bolean
 */
function GetCollition(coordinates, position) {

   if (isEmpty(coordinates)) return false;
   const c = first(coordinates);

   // Posición precisa
   if (position.x2 && position.y2) {
      if ((first(c) > position.x1 && first(c) < position.x2) && (first(rest(c)) > position.y1 && first(rest(c)) < position.y2)) return true;
      return GetCollition(rest(coordinates), position);
   }
   // movimiento vertical
   else if (position.x2) {
      if ((first(c) > position.x1 && first(c) < position.x2) && first(rest(c)) == position.y1) return true;
      return GetCollition(rest(coordinates), position);

      // Movimiento horizontal
   } else {
      if ((first(rest(c)) > position.y1 && first(rest(c)) < position.y2) && first(c) == position.x1) return true;
      return GetCollition(rest(coordinates), position);
   }
}

/**
 * @author Hernando H
 * @template (Array,any) => Number
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
 * @author Hernando H
 * @template (Array,any) => Array
 * @description Elimina de la lista el primer elemento qu concuerde con el valor dado
 * @param {Array} list 
 * @param {any} value
 */
function listDeleter(list, value) {

   if (isEmpty(list)) return list;

   if (Array.isArray(value)) {
      if (first(list)[0] == value[0] && first(list)[1] == value[1]) {
         return rest(list);
      } else {
         return cons(first(list), listDeleter(rest(list), value))
      }
   } else if (value instanceof Object) {
      if (JSON.stringify((first(list)) == JSON.stringify(value))){
         return rest(list);
      }else {
         return cons(first(list), listDeleter(rest(list), value))
      }
   }
}