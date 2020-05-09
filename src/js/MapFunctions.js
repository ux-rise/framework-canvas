/**
 * @author Hernando H
 * @template (Array,object) => void
 * @description Dibuja el laberinto actual
 * @param {Array} coors
 * @param {Object} processing 
 */
function MapPainter(coors = [], processing) {

   if (isEmpty(coors)) return;

   // coordenadas a dibujar
   const c = first(coors);
   // color de ladrillo
   processing.fill(210, 220, 230);

   // SÓLO PARA LA CREACIÓN DEL JUEGO
   // dibuja el último ladrillo de otro color para identificar
   // el modo constructor
   if (processing.state.constructor.enable) {
      if (length(coors) == 1) {
         processing.fill(255, 125, 0);
      }
   }

   // dibuja ladrillo
   processing.rect(first(c) - 10, first(rest(c)) - 10, 20, 20);

   return MapPainter(rest(coors), processing);
}

/**
 * @author Hernando H
 * @template (object) => object
 * @description Genera las galletas en los pasillos del laberinto
 * @param {Array} world
 * @returns {Array} world
 */
function CookiesGenerator(world) {


   // recorre el canvas validando donde deberán ir ubicadas las galletas
   // y retorna una lista de ubicaciones para dibujar
   function CookieCreator(map, width, height, cookies = []) {

      if (isEmpty(cookies)) {
         return CookieCreator(map, width, height, cons({ x: 20, y: 20 }, cookies));
      }

      const cookie = first(cookies);

      // valida si la ubicación colisiona con el laberinto o  con pacman
      if (GetCollition(world.mapCoors, { y1: cookie.y - 20, y2: cookie.y + 20, x1: cookie.x - 20, x2: cookie.x + 20 })) {

         // retorna la lista de galletas aprobadas para dibujar cuando llega al final del canvas
         if (cookie.x + 20 === width && cookie.y + 20 === height) {
            return rest(cookies);
         }

         if (cookie.x + 20 === width) {
            return CookieCreator(map, width, height, cons({ x: 20, y: cookie.y + 20 }, rest(cookies)))
         } else {
            return CookieCreator(map, width, height, cons({ x: cookie.x + 20, y: cookie.y }, rest(cookies)))
         }

      } else {

         // retorna la lista de galletas aprobadas para dibujar cuando llega al final del canvas
         if (cookie.x + 20 === width && cookie.y + 20 === height) {
            return cookies;
         }

         if (cookie.x + 20 === width) {
            return CookieCreator(map, width, height, cons({ x: 20, y: cookie.y + 20 }, cookies))
         } else {
            return CookieCreator(map, width, height, cons({ x: cookie.x + 20, y: cookie.y }, cookies))
         }

      }

   }

   // Sólo se ejecuta al inicio del juego
   if (length(world.cookies) == 0 && world.current_score == 0) {
      const cookies = CookieCreator(world.mapCoors, world.width - 1, world.height - 1);
      const cookiesMap =cookies;
      return Object.assign({}, world, { cookies, cookiesMap });
   }

   return world;

}

/**
 * @author Hernando H
 * @template (Array,object) => void
 * @description Dibuja las galletas en el canvas
 * @param {Array} coors
 * @param {Object} processing 
 */
function CookiesPainter(cookies = [], processing) {

   if (isEmpty(cookies)) return;

   const cookie = first(cookies);
   processing.fill(250, 230, 150);
   processing.stroke(1);
   processing.ellipse(cookie.x, cookie.y, 15, 15);

   return CookiesPainter(rest(cookies), processing);
}

// SÓLO PARA LA CREACIÓN DEL JUEGO
/**
 * @author Hernando H
 * @template () => void
 * @description Permite la descarga de las coordenadas del laberinto
 * @param {Array} list 
 * @param {any} value
 */
function MapDownloader() {
   const element = document.createElement('a');
   element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
   encodeURIComponent(JSON.stringify(processingInstance.state.mapCoors)));
   element.setAttribute('download', 'map.json');
   element.style.display = 'none';
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
}