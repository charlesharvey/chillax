
let blob, vec;
let chillax = new Chillax('canvas');
chillax.init();




function setup() {

    chillax.styleCanvas({ background: 'red' })
    chillax.fullScreen();

    blob = chillax.createEntity('blob');
    chillax.styleEntity(blob, { background: 'blue', height: 10, width: 10 })

    vec = chillax.createVector(100, 100);

}


function loop() {


    chillax.styleEntity(blob, { x: vec.x, y: vec.y })
    vec.add({ x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 })


}



