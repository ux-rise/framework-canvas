/************************************************************************************
 * Lógica del juego
/************************************************************************************/
// función hecha por los profes XD
function make(data, attribute) {
    return Object.assign({}, data, attribute);
}

/**
 * @author Hernando H
 * (intención de movimiento)
 * Almacena la dirección en la que el usuario desea que se mueva el personaje
 * @template (Object,number) => Object
 * @param {Object} character
 * @param {number} NextDirection
 * @example SetNextDirection({NextDirection:0}); // => { NextDirection:37 }
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
 * Cambia la dirección de movimiento actual de los personajes
 * @template (Object) => Object
 * @param {Object} world processing.state
 * @protected {Array} p Lista de personajes
 */
const ChangeDirection = function func(world, p = ['pacman', 'blue', 'yellow', 'red', 'rose']) {

    if (length(p) === 0) return world;

    // Personaje actual
    const name = first(p);
    const character = world[name];


    if (character.NextDirection == 37) { // izquierda

        if (GetCollition(world.mapCoors, { y1: character.y - 30, y2: character.y + 30, x1: character.x - 30 })) {
            return func(world, rest(p));
        } else {

            Object.assign(character, { direction: character.NextDirection });
            const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
            return func(Object.assign({}, world, obj), rest(p));
        }

    } else if (character.NextDirection == 38) { // Arriba
        if (GetCollition(world.mapCoors, { x1: character.x - 30, x2: character.x + 30, y1: character.y - 30 })) {
            return func(world, rest(p));
        } else {
            Object.assign(character, { direction: character.NextDirection });
            const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
            return func(Object.assign({}, world, obj), rest(p));
        }


    } else if (character.NextDirection == 39) { // Derecha

        if (GetCollition(world.mapCoors, { y1: character.y - 30, y2: character.y + 30, x1: character.x + 30 })) {

            return func(world, rest(p));
        } else {
            Object.assign(character, { direction: character.NextDirection });
            const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
            return func(Object.assign({}, world, obj), rest(p));
        }

    } else if (character.NextDirection == 40) { // Abajo

        if (GetCollition(world.mapCoors, { x1: character.x - 30, x2: character.x + 30, y1: character.y + 30 })) {
            return func(world, rest(p));
        } else {
            Object.assign(character, { direction: character.NextDirection });
            const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
            return func(Object.assign({}, world, obj), rest(p));
        }

    }

    return func(world, rest(p));

}

/**
 * @author Hernando H
 * Cambia la posición actual del personaje
 * @template (Object) => Object
 * @param {Object} world processing.state
 * @protected {Array} p Lista de personajes
 */
const ChangePosition = function func(world, p = ['pacman', 'blue', 'yellow', 'red', 'rose']) {

    if (length(p) === 0) return world;

    // Personaje actual
    const name = first(p);
    const character = world[name];

    // si el juego está en pausa 
    if (document.getElementById('img_game_state').getAttribute('src').includes('boton_play')) {
        return func(world, rest(p));
    }
    else {
        Object.assign(character, { oldx: character.x % 20 == 0 ? character.x : character.direction == 37 ? character.x + 10 : character.x - 10 });
        Object.assign(character, { oldy: character.y % 20 == 0 ? character.y : character.direction == 38 ? character.y + 10 : character.y - 10 });
        if (character.direction == 37) { // Izquierda

            if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x - 30 })) {
                return func(world, rest(p));
            } else {

                Object.assign(character, { x: character.x - 10, rotate: 180 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

        } else if (character.direction == 38) { // Arriba
            if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y - 30 })) {
                return func(world, rest(p));
            } else {
                Object.assign(character, { y: character.y - 10, rotate: 270 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

        } else if (character.direction == 39) { // Derecha

            if (GetCollition(world.mapCoors, { y1: character.y - 20, y2: character.y + 20, x1: character.x + 30 })) {

                return func(world, rest(p));
            } else {
                Object.assign(character, { x: character.x + 10, rotate: 0 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

        } else if (character.direction == 40) { // Abajo

            if (GetCollition(world.mapCoors, { x1: character.x - 20, x2: character.x + 20, y1: character.y + 30 })) {
                return func(world, rest(p));
            } else {
                Object.assign(character, { y: character.y + 10, rotate: 90 });
                const obj = eval(`Object({"${name}":${JSON.stringify(character)}})`);
                return func(Object.assign({}, world, obj), rest(p));
            }

        } else { // Otra tecla (No se mueve)
            return func(world, rest(p));
        }
    }
}

/**
 * @author Hernando H
 * Mueve la boca de pacman
 * @template (Object) => Object
 * @param {Object} world processing.state
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
 * Actualiza el valor del puntaje de galletas en la interfaz
 * @template (Object) => void
 * @param {Object} world processing.state
 */
function SetCookieScore(world) {
    document.getElementById('cookies').innerText = world.current_score;
    document.getElementById('cherries').innerText = world.cherryTotalScore;
};

/**
 * @author Hernando H
 * Cambia las imágenes del botón "play"
 * @template () => void
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
 * Establece el movimiento de los fantasmas
 * @template (Object) => Object
 * @param {Object} world processing.state
 * @protected {Array} p Lista de fantasmas
 */
const ChaseMode = function func(world, p = ['blue', 'yellow', 'red', 'rose']) {

    if (length(p) === 0) return world;

    // Personaje actual
    const name = first(p);
    const ghost = world[name];

    // valida que no estén en la misma posición
    if (name == 'yellow') {
        if (world.blue.x == ghost.x && world.blue.y == ghost.y) return func(world, rest(p));
    } else if (name == 'red') {
        if (world.yellow.x == ghost.x && world.yellow.y == ghost.y) return func(world, rest(p));
    } else if (name == 'rose') {
        if (world.red.x == ghost.x && world.red.y == ghost.y) return func(world, rest(p));
    }

    if (!world.pacman.gluttony_mode && (ghost.x != world.pacman.x || ghost.y != world.pacman.y) && (ghost.x % 20 == 0 && ghost.y % 20 == 0)) {

        const NextDirection = GetDirection(ghost, NextStep(RoouteMaker(world.cookiesMap, ghost, world.pacman)));

        Object.assign(ghost, { NextDirection });
        const obj = eval(`Object({"${name}":${JSON.stringify(ghost)}})`);
        return func(Object.assign({}, world, obj), rest(p));
    }

    return world;
}

/**
 * @author Hernando H
 * Retorna una lista de coordenadas disponibles adyacentes a la coordenada inicial, incluyendo su distancia con respecto al Objectivo
 * @param {Array} BaseCoors Coordenadas por donde se puede mover el fantasma
 * @param {Object} character fantasma a evaluar
 * @param {Object} target objetivo de la persecución
 * @protected {Array} RouteCoors Retorno de la función; rutas disponibles a un paso de la posicióon actual del fantasma
 * @protected {Array} sides Valores x y que permiten identificar las posibles coordenadas disponibles "En cruz"
 */
const RoouteMaker = function func(BaseCoors = [], character, target, RouteCoors = [], sides = [[-20, 0], [0, -20], [20, 0], [0, 20]]) {

    if (length(sides) === 0) return RouteCoors;
    s = first(sides)
    const index = GetIndexOf(BaseCoors, Function('x', 'y', 'return {x,y}')(character.x + s[0], character.y + s[1]))


    if (index > -1) {
        const option = BaseCoors[index];
        if (character.oldx == option.x && character.oldy == option.y) {
            return func(BaseCoors, character, target, RouteCoors, rest(sides));
        }
        Object.assign(option, {
            steps: Math.sqrt(Math.pow((target.x - option.x), 2) + Math.pow((target.y - option.y), 2)) //Math.abs(target.x - option.x) + Math.abs(target.y - option.y)
        })
        return func(BaseCoors, character, target, cons(option, RouteCoors), rest(sides));
    } else {
        return func(BaseCoors, character, target, RouteCoors, rest(sides));
    }
}

/**
 * @author Hernando H
 * Retorna la coordenada más cercana a pacman
 * @template (Array) => Object
 * @param {Array} options lista de coordenadas a evaluar
 * @protected {Array} bestOption Retorno de la función
 * @example NextStep([{x:0,y:0,steps:12},{x:10,y:0,steps:8}]); // => {x:10,y:0,steps:8}
 */
const NextStep = function func(options = [], bestOption) {

    const a = first(options);
    if (length(options) <= 1) return !bestOption ? a : bestOption;
    const b = first(rest(options));
    return func(rest(options), a.steps < b.steps ? a : b);
}

/**
 * @author Hernando H
 * Retorna la dirección en la que el fantasma se moverá
 * @template (Object,Object) => number
 * @param {Object} ghost
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

/**
 * @author Johan Ruiz
 * Controla el ciclo de vidas de Pacman
 * @template (Object) => Object
 * @param {Object} world processing.state
 * @protected {Array} p Lista de fantasmas
 */
const ChassingLifes = function func(world, p = ['blue', 'yellow', 'red', 'rose']) {

    if (length(p) === 0) return world;

    // Nombre y fantasma actual
    const name = first(p);
    const ghost = world[name];

    const botonPausa = document.getElementById('img_game_state')
    const vidas = document.getElementById('img_vidas');
    const divCD = document.getElementById('cooldown');
    const enfriamiento = document.getElementById('cd');

    if (ghost.x == world.pacman.x && ghost.y == world.pacman.y) {
        ChangeImageGameState();
        lossOfLife();
        return func(Object.assign(world, initialState(world)), rest(p));
    }

    //Aqui se cambias la imagenes de las vidas que quedan
    if (world.pacman.lifes == 2) {
        vidas.src = "images/vidas_2.png";
    }
    if (world.pacman.lifes == 1) {
        vidas.src = "images/vidas.png";
    }
    if (world.pacman.lifes == 0) {
        botonPausa.onclick = "buttonSound();";
        if (!vidas.src.includes('sin_vidas')) {
            vidas.src = "images/sin_vidas.png";
        }
        divCD.style.display = "inline";
        divCD.style.height = "auto";
        enfriamiento.innerHTML = "Fin del juego!";
    }
    //-----------Enfriamiento------------
    if (world.pacman.lifes !== 0) {
        if (world.cooldown == 3 * fps) {
            divCD.style.display = "inline";
            clockSound();
            enfriamiento.innerHTML = 3;
        }
        if (world.cooldown == 2 * fps) {
            enfriamiento.innerHTML = 2;
        }
        if (world.cooldown == 1 * fps) {
            enfriamiento.innerHTML = 1;
        }
        if (world.cooldown == 0) {
            ChangeImageGameState();
            divCD.style.display = "none";
            enfriamiento.innerHTML = "";
        }
        if (world.cooldown !== -1) {
            return make(world, {
                cooldown: world.cooldown - 1
            });
        }
    }
    //------------Fin------------
    return func(make(world, {}), rest(p));
}

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Victor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * @author Vitor Alomia
 * Esta función detecta cuando Pacman se come una galleta
 * @template (Object) => Object
 * @param {Object} state processing.state
 */
function maxScore(state) {

    if (lookforCookies(state.pacman, state.cookies) == true) {
        const cookies = listDelete(state.cookies, lookPositionCookies(state.pacman, state.cookies, 0));
        const current_score = scoreGame(state.current_score, state.cookies[lookPositionCookies(state.pacman, state.cookies, 0)]);
        SetCookieScore(state);
        return Object.assign({}, state, { cookies, current_score });
    }

    return state;
}

/**
 * @author Vitor Alomia
 * Esta función valida si Pacman está en la misma posición que una galleta
 * @template (Object) => Object
 * @param {Object} pacman
 * @param {Array} cookies
 * @example lookforCookies( {x:0,y:0} , [ ...{x:0,y:0} ] ); // => true
 * @example lookforCookies( {x:0,y:0} , [ ...{x:0,y:10} ] ); // => false
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
 * Esta función suma el valor de la galleta
 * @template (Object) => Object
 * @param {Number} score
 * @param {Object} cookie
 * @returns {Number}
 * @example scoreGame( 0, {x:0,y:0} ); // => 10 
 * @example scoreGame( 20, {x:0,y:0,score:50} ); // => 70
 */
function scoreGame(score, cookie) {

    if (cookie.score) { // require galleta especial
        return score += cookie.score;
    }
    return score += 10;
}

/**
 * @author Vitor Alomia
 * @template (Object) => Object
 * Retorna la posicion de la galleta dentro de la lista
 * @param {Object} pacman
 * @param {Object} pacman
 * @protected {Number} indice retorno de la función
 * @example lookPositionCookies( {x:0,y:0} , [ {x:1,y:3},{x:0,y:0} ]); => 1
 * @example lookPositionCookies( {x:0,y:0} , [ {x:1,y:3},{x:20,y:0} ]); => -1
 */
function lookPositionCookies(pacman, cookies, indice) {

    if (isEmpty(cookies)) {
        return -1;
    } else if (pacman.x == first(cookies).x && pacman.y == first(cookies).y) {
        crunchSound();
        return indice;
    } else {
        return lookPositionCookies(pacman, rest(cookies), indice + 1);
    }
}

/**
 * @author Vitor Alomia
 * Esta función elimina la galleta a lo que el pacman está en la posicion de n
 * @template (Array) => Object
 * @param {Array} list
 * @param {Number} number
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

/**
 * @author Victor Alomia
 * Esta función detecta cuando pacman se come una cereza
 * @template (Object) => Object
 * @param {Object} pacman
 */
function findCherry(state) {
    if (state.cherry) {
        if (lookforCherry(state.pacman, state.cherry) == true) {
            return scoreCherry(deleteCherry(state));
        }
    }
    return state;
}

/**
 * @author Johan Ruiz
 * Esta funcion elimina la cereza
 * @template (Object) => Objet
 * @param {Object} state
 */
function deleteCherry(state) {
    delete state.cherry;
    return state;
}

/**
 * @author Victor Alomia
 * Esta funcion suma el puntage de la cereza
 * @template (Object) => Object
 * @param {Object} pacman
 */
function scoreCherry(state) {
    return Object.assign(state, { cherryTotalScore: state.cherryTotalScore + 500 });
}

/**
 * @author Victor Alomia 
 * Esta funcion encuentra la cereza
 * @template {Object} =>Object
 * @param {Object} pacman
 */
function lookforCherry(pacman, cherry) {
    if (pacman.x == cherry.x && pacman.y == cherry.y) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * @author Hernando H
 * Crea una cereza en el juego en una posición aleatoria
 * @template (Object) => Object
 * @param {Object} world processing.state
 */
const CherryGenerator = function func(world) {

    if (world.cherry) return world;

    const GetDataByIndex = function func(list, index, i = 0) {
        if (index == i) return first(list);
        return func(rest(list), index, i + 1);
    }

    const listDeleter = function func(list, value) {

        if (isEmpty(list)) return list;

        const item = first(list);

        if (item.x == value.x && item.y == value.y) {
            return rest(list);
        } else {
            return cons(first(list), func(rest(list), value))
        }
    }

    const min = 0;
    const max = length(world.cookiesMap);
    const index = Math.floor(Math.random() * (max - min)) + min;
    const data = GetDataByIndex(world.cookiesMap, index);
    const cookies = listDeleter(world.cookies, data);
    console.log('cookies', cookies);
    return Object.assign({}, world, { cherry: data, cookies })

}