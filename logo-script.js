
// Setter opp canvas
var cubeCanvas, sphereCanvas, ctx1, ctx2;

cubeCanvas = document.getElementById("canvas");
sphereCanvas = document.getElementById("sphereCanvas");

ctx1 = cubeCanvas.getContext("2d");
ctx2 = sphereCanvas.getContext("2d");

class Vec3 {

    constructor( x, y, z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    to( vector ) {
        const xdist = Math.abs( this.x - vector.x );
        const ydist = Math.abs( this.y - vector.y );
        const zdist = Math.abs( this.z - vector.z );
        return Math.sqrt( xdist*xdist + ydist*ydist + zdist*zdist );
    }

    rotateX( angle ) {
        var c, s, ny, nz;
        const radians = (angle/180)*Math.PI;
        c = Math.cos(radians);
        s = Math.sin(radians);
        ny = c * this.y - s * this.z;
        nz = s * this.y + c * this.z;
        this.y = ny;
        this.z = nz;
    }

    rotateY( angle ) {
        var c, s, nx, nz;
        const radians = (angle/180)*Math.PI;
        c = Math.cos(radians);
        s = Math.sin(radians);
        nx = c * this.x - s * this.z;
        nz = s * this.x + c * this.z;
        this.x = nx;
        this.z = nz;
    }

    rotateZ( angle ) {
        var c, s, nx, ny;
        const radians = (angle/180)*Math.PI;
        c = Math.cos(radians);
        s = Math.sin(radians);
        nx = c * this.x - s * this.y;
        ny = s * this.x + c * this.y;
        this.x = nx;
        this.y = ny;
    }

    scale( factor ) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    }

    translateX( amount ) {
        this.x += amount;
    }

    translateY( amount ) {
        this.y += amount;
    }

    translateZ( amount ) {
        this.z += amount;
    }

}

class Edge {
    constructor( vec1, vec2 ) {
        this.vec1 = vec1;
        this.vec2 = vec2;
    }
    render( xoff, yoff, line_width, context ) {
        context.beginPath();
        context.moveTo(this.vec1.x + xoff, this.vec1.y + yoff );
        context.lineTo(this.vec2.x + xoff, this.vec2.y + yoff );
        context.lineWidth = line_width;
        context.strokeStyle = "rgb(10, 102, 194)";
        context.stroke();
    }
}

class Shape {
    
    constructor( vectors, edges ) {
        this.vectors = vectors;
        this.edges = edges;
        
        // Finn senteret av shape
        var x = 0, y = 0, z = 0;
        const N = this.vectors.length;
        for ( var i = 0; i < N; i++ ) {
            x += this.vectors[i].x;
            y += this.vectors[i].y;
            z += this.vectors[i].z;
        }
        x /= N;
        y /= N;
        z /= N;
        this.vectors.push( new Vec3(x,y,z) );
    }
    
    rotateX( angle ) {
        for ( var i = 0; i < this.vectors.length; i++ ) this.vectors[i].rotateX( angle );
    }

    rotateY( angle ) {
        for ( var i = 0; i < this.vectors.length; i++ ) this.vectors[i].rotateY( angle );
    }

    rotateZ( angle ) {
        for ( var i = 0; i < this.vectors.length; i++ ) this.vectors[i].rotateZ( angle );
    }

    scale( factor ) {
        for ( var i = 0; i < this.vectors.length; i++ ) 
            this.vectors[i].scale(factor);
    }

    translateX( amount ) {
        for ( var i = 0; i < this.vectors.length; i++ ) 
            this.vectors[i].translateX(amount);
    }

    translateY( amount ) {
        for ( var i = 0; i < this.vectors.length; i++ ) 
            this.vectors[i].translateY(amount);
    }

    translateZ( amount ) {
        for ( var i = 0; i < this.vectors.length; i++ ) 
            this.vectors[i].translateZ(amount);
    }

    centerRot( xaxis, yaxis, zaxis ) {

        const center = this.vectors[this.vectors.length-1];
        const x = center.x;
        const y = center.y;
        const z = center.z;

        // Translate shape to
        this.translateX( -x );
        this.translateY( -y );
        this.translateZ( -z );

        if ( xaxis != 0 )
            this.rotateX( xaxis );
        if ( yaxis != 0 )
            this.rotateY( yaxis );
        if ( zaxis != 0 )
            this.rotateZ( zaxis );

        this.translateX( x );
        this.translateY( y );
        this.translateZ( z );

    }

    centerSelf() {
        var x = 0;
        var y = 0;
        var z = 0;
        const N = this.vectors.length;
        for ( var i = 0; i < N; i++ ) {
            x += this.vectors[i].x;
            y += this.vectors[i].y;
            z += this.vectors[i].z;
        }
        x /= N;
        y /= N;
        z /= N;
        this.translateX( - x );
        this.translateY( - y );
        this.translateZ( - z );
    }

    copyVectors() {
        const vectors = [];
        for ( var i = 0; i < this.vectors.length; i++ ) 
            vectors.push( new Vec3( this.vectors[i].x, this.vectors[i].y, this.vectors[i].z ) );
        return vectors;
    }

    render( x_offset, y_offset, Z, line_width, context ) {
        this.edges.map((edge) => edge.render( x_offset, y_offset, line_width, context ) );
    }
}

class Box extends Shape {
    constructor() {
        const v1 = new Vec3( 0, 0, 0 );
        const v2 = new Vec3( 1, 0, 0 );
        const v3 = new Vec3( 1, 1, 0 );
        const v4 = new Vec3( 0, 1, 0 );

        const v5 = new Vec3( 0, 0, 1 );
        const v6 = new Vec3( 1, 0, 1 );
        const v7 = new Vec3( 1, 1, 1 );
        const v8 = new Vec3( 0, 1, 1 );
        const vectors = [ v1, v2, v3, v4, v5, v6, v7, v8 ];
        const edges = [
            new Edge( v1, v2 ),
            new Edge( v2, v3 ),
            new Edge( v3, v4 ),
            new Edge( v1, v4 ),
            
            new Edge( v5, v6 ),
            new Edge( v6, v7 ),
            new Edge( v7, v8 ),
            new Edge( v5, v8 ),
    
            new Edge( v1, v5 ),
            new Edge( v2, v6 ),
            new Edge( v3, v7 ),
            new Edge( v4, v8 )
        ];
        super( vectors, edges );
    }
}

class Sphere extends Shape {

    constructor( resolution, LVLS, step_size ) {
        
        var edges   = [];
        var vectors = [];
        var x, y, z;

        const stepSize = 2 * Math.PI / resolution;

        // Generate vectors
        for ( var levels = 0; levels < LVLS; levels++ ) {
            for ( var loop = 0; loop < resolution; loop++ ) {
                x = Math.sin( stepSize * loop );
                y = levels * step_size;
                z = Math.cos( stepSize * loop );
                vectors.push( new Vec3(x,y,z) );
            }
        }

        // Create loop edges
        for ( var levels = 0; levels < LVLS; levels++ ) {
            const start_index = resolution * levels;
            const end_index   = resolution * ( 1 + levels );
            for ( var i = start_index + 1; i < end_index; i++ ) {
                edges.push( new Edge( vectors[i-1], vectors[i] ) );
            }
            edges.push( new Edge( vectors[start_index], vectors[end_index-1] ) );
        }
    
        // Create transfer edges
        for ( var levels = 0; levels < LVLS - 1; levels++ ) {
            const start_index = resolution * levels;
            const end_index   = resolution * ( 1 + levels );
            for ( var i = start_index; i < end_index; i++ ) {
                edges.push( new Edge( vectors[i], vectors[i+resolution] ) );
            }
        }
        
        super( vectors, edges );
    }

}

class Graph extends Shape {

    constructor() {
        const vectors = [];
        const edges = [];

        const NODES = 750;

        for ( var i = 0; i < NODES; i++ ) {
            const distance_from_origin = Math.random() * 75;
            const vector = new Vec3( distance_from_origin, 0, 0 );
            const angle1 = 360 * Math.random();
            const angle2 = 360 * Math.random();
            vector.rotateY(angle1);
            vector.rotateX(angle2);
            vectors.push( vector );
        }

        for ( var i = 0; i < NODES; i++ ) {

            var relationships = 0;
            const max_relationships = 1 + Math.floor(Math.random() * 10);
            const connection_limit = 20 + Math.floor(10 * Math.random());

            for ( var j = 0; j < NODES; j++ ) {
                if ( i != j && relationships < max_relationships ) {
                    if ( vectors[i].to(vectors[j]) <= connection_limit ) {
                        edges.push( new Edge(vectors[i], vectors[j]) );
                        relationships++;
                    }
                }
            }
        }

        super( vectors, edges );
    }

    boil() {
        const N = this.vectors.length;
        const BOIL_AMOUNT = 20;
        for ( var i = 0; i < N; i++ ) {

            if ( this.randswitch() < 0 ) {
                this.vectors[i].x += Math.random() / BOIL_AMOUNT;
            } else {
                this.vectors[i].x -= Math.random() / BOIL_AMOUNT;
            }

            if ( this.randswitch() < 0 ) {
                this.vectors[i].y += Math.random() / BOIL_AMOUNT;
            } else {
                this.vectors[i].y -= Math.random() / BOIL_AMOUNT;
            }

        }
    }

}

const xoff = 250;
const yoff = 250;
const Z = -200;

function project( shape, line_width, context ) {
    const N = shape.vectors.length;
    const copy = shape.copyVectors();
    var k;
    for ( var i = 0; i < N; i++ ) {
        k = Math.abs( Z - shape.vectors[i].z );
        shape.vectors[i].x = Math.abs(Z)/k * shape.vectors[i].x;
        shape.vectors[i].y = Math.abs(Z)/k * shape.vectors[i].y;
    }
    shape.render( xoff, yoff, Z, line_width, context );
    for ( var i = 0; i < N; i++ ) {
        shape.vectors[i].x = copy[i].x;
        shape.vectors[i].y = copy[i].y;
    }
}

// Boxes
const box1 = new Box();
box1.scale(90);
box1.translateX(-45);
box1.translateY(-45);
box1.translateZ(-45 - 50);
box1.centerRot( 0, 0, 20 );

const box2 = new Box();
box2.scale(50);
box2.translateX(-25);
box2.translateY(-25);
box2.translateZ(-25 - 50);
box2.centerRot( 0, 0, 20 );

const box3 = new Box();
box3.scale(15);
box3.translateX(-7.5);
box3.translateY(-7.5);
box3.translateZ(-7.5 - 50);
box3.centerRot( 0, 0, 20 );

// Spheres
const sphere1 = new Sphere( 75,  15, 0.05 );
sphere1.scale(90);
const sphere2 = new Sphere( 75,  15, 0.05 );
sphere2.scale(60);
const sphere3 = new Sphere( 50,  15, 0.05 );
sphere3.scale(25);

sphere1.centerSelf();
sphere2.centerSelf();
sphere3.centerSelf();

sphere1.translateZ(-50);
sphere2.translateZ(-50);
sphere3.translateZ(-50);

setInterval(() => {

    // Render cubes to first canvas
    ctx1.clearRect(0, 0, cubeCanvas.width, cubeCanvas.height);
    box1.centerRot( 0.25, 0.2, 0 );
    box2.centerRot( 0.25, 0.2, 0 );
    box3.centerRot( 0.25, 0.2, 0 );
    project(box3, 0.75, ctx1 );
    project(box2, 1.25,    ctx1 );
    project(box1, 5.00,    ctx1 );
    
    // Rander spheres to second canvas
    ctx2.clearRect(0, 0, cubeCanvas.width, cubeCanvas.height);
    project( sphere1, 0.20,  ctx2 );
    project( sphere2, 0.35,  ctx2 );
    project( sphere3, 0.75,  ctx2 );
    sphere1.centerRot( 0.4, -0.3, 0 );
    sphere2.centerRot( 0.4, -0.3, 0 );
    sphere3.centerRot( 0.4, -0.3, 0 );
    
}, 30 );