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

        Object.assign(character, { direction: character.NextDirection });
        const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
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

    if (document.getElementById('img_game_state').getAttribute('src').includes('boton_play')) {
        return func(world, rest(p));
    }
    // Izquierda
    else {
        Object.assign(character, { oldx: character.x % 20 == 0 ? character.x : character.direction == 37 ? character.x + 10 : character.x - 10 });
        Object.assign(character, { oldy: character.y % 20 == 0 ? character.y : character.direction == 38 ? character.y + 10 : character.y - 10 });
        if (character.direction == 37) {

            if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x - 30 })) {
                return func(world, rest(p));
            } else {

                Object.assign(character, { x: character.x - 10, rotate: 180 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

            // Arriba
        } else if (character.direction == 38) {
            if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y - 30 })) {
                return func(world, rest(p));
            } else {
                Object.assign(character, { y: character.y - 10, rotate: 270 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

            // Derecha
        } else if (character.direction == 39) {

            if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x + 30 })) {

                return func(world, rest(p));
            } else {
                Object.assign(character, { x: character.x + 10, rotate: 0 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

            // Abajo
        } else if (character.direction == 40) {

            if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y + 30 })) {
                return func(world, rest(p));
            } else {
                Object.assign(character, { y: character.y + 10, rotate: 90 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

            // Otra tecla (No se mueve)
        } else {
            return func(world, rest(p));
        }
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
    // document.getElementById('cherries').innerText = world.current_score;
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

/**
 * @author Hernando H
 * @template (Object) => Object
 * @description Establece el movimiento de los fantasmas
 */
const ChaseMode = function func(world, p = ['blue']) { // 'yellow', 'red', 'rose'

    if (length(p) === 0) return world;

    // Nombre y personaje actual
    const name = first(p);
    const ghost = world[name];

    // Determinar si cazar o huir
    if (!world.pacman.gluttony_mode && (ghost.x != world.pacman.x || ghost.y != world.pacman.y) && (ghost.x % 20 == 0 && ghost.y % 20 == 0)) {
        console.log(Array(10).join('~'));
        console.log('ghost', { x: ghost.x, y: ghost.y });
        console.log('ghost old', { x: ghost.oldx, y: ghost.oldy });
        const NextDirection = GetDirection(ghost, NextStep(RoouteMaker(world.cookiesMap, ghost, world.pacman)));
        console.log(NextDirection);

        Object.assign(ghost, { NextDirection });
        const obj = eval(`Object({"${name}":${JSON.stringify(ghost)}})`);
        return func(Object.assign({}, world, obj), rest(p));
    }

    return world;
}

/**
 * Retorna una lista de coordenadas disponibles adyacentes a la coordenada inicial, incluyendo su distancia con respecto al objectivo
 * @param {Array} BaseCoors Coordenadas por donde se puede mover el fantasma
 * @param {Object} character fantasma a evaluar
 * @param {Object} target objetivo de la persecución
 * @protected {Array} RouteCoors Retorno de la función; rutas disponibles a un paso de la posicióon actual del fantasma
 * @protected {Array} sides Valores x y que permiten identificar las posibles coordenadas disponibles "En cruz"
 */
const RoouteMaker = function func(BaseCoors = [], character, target, RouteCoors = [], sides = [[-20, 0], [0, -20], [20, 0], [0, 20]]) {
    
    if (length(sides) === 0) {
        console.log(RouteCoors);
        return RouteCoors;
    }
    s = first(sides)
    const index = GetIndexOf(BaseCoors, Function('x', 'y', 'return {x,y}')(character.x + s[0], character.y + s[1]))


    if (index > -1) {
        const option = BaseCoors[index];
        if (character.oldx == option.x && character.oldy == option.y) {
            return func(BaseCoors, character, target, RouteCoors, rest(sides));
        }
        Object.assign(option, { steps: Math.abs(target.x - option.x) + Math.abs(target.y - option.y) })
        return func(BaseCoors, character, target, cons(option, RouteCoors), rest(sides));
    } else {
        return func(BaseCoors, character, target, RouteCoors, rest(sides));
    }
}

/**
 * Retorna la coordenada más cercana a pacman
 * @template (Array) => Object
 * @param {Array} options lista de coordenadas a evaluar
 * @protected {Array} bestOption Retorno de la función
 */
const NextStep = function func(options = [], bestOption) {

    console.log(bestOption);
    const a = first(options);
    if (length(options) <= 1) return !bestOption ? a : bestOption;
    const b = first(rest(options));
    return func(rest(options), a.steps < b.steps ? a : b);
}



/**
 * Retorna la dirección en la que el fantasma se moverá
 * @template (Object,Object) => number
 * @param {Obejct} ghost 
 * @param {Object} option
 * @example GetDirection({ x: 240, y: 260 },{ x: 260, y: 260, steps: 140 }); // => 39
 */
const GetDirection = function func(ghost, option) {

    const x = option.x - ghost.x;
    const y = option.y - ghost.y;
    const dx = Math.abs(option.x - ghost.x);
    const dy = Math.abs(option.y - ghost.y);
    const eje = dx > dy ? true : false;

    if (eje)
        return x > 0 ? 39 : 37;
    return y > 0 ? 40 : 38;
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function maxScore(state) {
    if (lookforCookies(state.pacman, state.cookies) == true) {
        const cookies = listDelete(state.cookies, lookPositionCookies(state.pacman, state.cookies, 0));
        const current_score = scoreGame(state.current_score, state.cookies[lookPositionCookies(state.pacman, state.cookies, 0)]);
        SetCookieScore(state);
        return Object.assign({}, state, { cookies, current_score });
    }
    return state;
}
/**pegue la funcion desde businessLogic directamente aquyi por que no la estaba reconociendo al momento de hacer el llamado */
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
function scoreGame(score, valor) {
    return score += 10;
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
 * @param {Array} list
 * @param {Number} number
 * @returns {Array} l
 */
function listDelete(list, number) {
    if (number == length(list) - 1) {
        return invertir(allLast(list))
    }

    function allLast(list, aux = []) {
        if (length(list) == 1) {
            return aux;
        } else {
            return allLast(rest(list), cons(first(list), aux))
        }
    }

    function invertir(list, b = []) {
        if (isEmpty(list)) {
            return b;
        } else {
            return invertir(rest(list), cons(first(list), b));
        }
    }
    function functionAux(list, number, lAux = [], indice = 0) {
        if (isEmpty(list)) {
            return invertir(lAux);
        }
        if (number == indice) {
            return functionAux(rest(rest(list)), number, cons(first(rest(list)), lAux), indice + 1)
        } else {
            return functionAux(rest(list), number, cons(first(list), lAux), indice + 1)
        }
    }
    return functionAux(list, number)
}