const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;
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
        if (JSON.stringify((first(list)) == JSON.stringify(value))) {
            return rest(list);
        } else {
            return cons(first(list), listDeleter(rest(list), value))
        }
    }
}


// /**
//  * Llama a una función de devolución de llamada para cada elemento de una lista
//  * y devuelve una lista que contiene los resultados.
//  * @author Hernando H
//  * @param {Array} list
//  * @param {Function} process
//  * @example ListMap([1, 2, 3, 4], (x) => x * x); // => [1, 4, 9, 16]
//  */
// function ListMap(list, process) {

//     // procesa cada elemento de la lista
//     function _internal(a, process, b = []) {

//         if (isEmpty(a)) return b;
//         return _internal(rest(a), process, cons(process(first(a)), b));

//     }

//     // restablece el orden alterado por cons
//     function _internal_reverse(a = [], b = []) {
//         if (isEmpty(a)) return b;
//         return _internal_reverse(rest(a), cons(first(a), b));
//     }

//     return _internal_reverse(_internal(list, process));

// }

/**
 * @author Hernando H
 * @template (Array,any) => Array
 * @description Retorna el índice del primer elemento que concuerde con el valor dado
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