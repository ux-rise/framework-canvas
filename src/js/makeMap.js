const mapCoors = [
   [190, 210],
   [190, 270],
   [270, 230],
   [270, 250],
   [110, 350],
]

function makeMap(coors = [], processing) {

   if (isEmpty(coors)) return;

   const c = first(coors);
   processing.fill(85, 112, 236);
   processing.rect(first(c) - 10, first(rest(c)) - 10, 20, 20);

   return makeMap(rest(coors), processing);
}

function coorFixer(coor) {
   console.log('coor', coor);

   if (first(coor) % 40 == 0 && first(rest(coor)) % 40 == 0){
      return [first(coor)+10,first(rest(coor))+10];
   }

   const x = first(coor) % 40 == 0 ? first(coor) : first(coor) - 1;
   const y = first(rest(coor)) % 40 == 0 ? first(rest(coor)) : first(rest(coor)) - 1;
   return coorFixer([x, y]);

}