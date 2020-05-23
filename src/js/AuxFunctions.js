const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;
/************************************************************************************
 * Funciones de uso general
/************************************************************************************/

/**
 * @author Hernando H
 * Detecta la colisión de los objetos del juego
 * @template (Array,Object) => Boolean
 * @param {Array} coordinates
 * @param {Object} position
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
 * Retorna el índice del valor dado dentro de la lista
 * @template (Array,any) => Number
 * @param {Array} list 
 * @param {any} value
 * @protected {Number} index retorno de la función
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
 * Retorna el índice del primer elemento que concuerde con el valor dado
 * @template (Array,any) => Array
 * @param {Array} list 
 * @param {any} value
 */
const GetIndexOf = function func(list, value, i = 0) {

    if (isEmpty(list)) return -1;
    const val = first(list);
    if (value instanceof Object) {
        if (val.x == value.x && val.y == value.y) return i;
        return func(rest(list), value, i + 1);
    } else {
        if (val == value) return i;
        return func(rest(list), value, i + 1);
    }
}