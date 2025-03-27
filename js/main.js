// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

document.addEventListener('DOMContentLoaded', function() {
    
    setTimeout(initPhysics, 100);

});

function initPhysics() {

    // crear el render, es decir el canvas, en el #poster
    var render = Render.create({
        element: document.getElementById('poster'),
        engine: engine,
        options: {
          width: document.getElementById('poster').clientWidth,
          height: document.getElementById('poster').clientHeight,
          background: 'transparent',
          wireframes: false,
          pixelRatio: window.devicePixelRatio || 2, // para mayor resolución
      }
    });

    // altura y ancho del poster
    var posterHeight = document.getElementById('poster').clientHeight;
    var posterWidth = document.getElementById('poster').clientWidth;

    // crear objetos (posición, width y height)
    var rectDate = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.9, posterWidth * 0.6, posterHeight * 0.08, {
      render: { fillStyle: '#999' }, // gris oscuro
      isStatic: false,
      // chamfer: { radius: posterHeight * 0.04 },
      text: {
          content: "DIJOUS 27 DE MARÇ",
          color: "#333",
          size: '1.3rem'
      }
    });
    
    var rectLocation = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.2, posterWidth * 0.6, posterHeight * 0.08, {
      render: { fillStyle: '#999' }, // gris oscuro
      isStatic: false,
      // chamfer: { radius: posterHeight * 0.05 },
      angle: Math.PI / 40,
      text: {
          content: "PALAU DE LA MÚSICA",
          color: "#333",
          size: '1.3rem'
      }
    });
    
    var rectRita = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.3, posterWidth * 0.4, posterHeight * 0.1, {
      render: { fillStyle: '#31788C' }, // azul
      isStatic: false,
      angle: Math.PI / 20,
      text: {
          content: "RITA PAYÉS",
          color: "#F5F0E1",
          size: '1.3rem'
      }
    });
    
    var rectAndrea = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.45, posterWidth * 0.5, posterHeight * 0.1, {
      render: { fillStyle: '#B2252B' }, // rojo
      isStatic: false,
      angle: -Math.PI / 20,
      text: {
          content: "ANDREA MOTIS",
          color: "#F5F0E1",
          size: '1.3rem'
      }
    });
    
    var rectGuillem = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.6, posterWidth * 0.6, posterHeight * 0.1, {
      render: { fillStyle: '#4B9242' }, // verde
      isStatic: false,
      angle: Math.PI / 30,
      text: {
          content: "GUILLEM ARNEDO",
          color: "#F5F0E1",
          size: '1.3rem'
      }
    });
    
    var circlePink = Bodies.circle(posterWidth * 0.1, posterHeight * 0.9, posterWidth * 0.08, {
      render: { fillStyle: '#DFAB95' }, // rosa
      isStatic: false,
    });
    
    var circlePrice = Bodies.circle(posterWidth * 0.8, posterHeight * 0.7, posterWidth * 0.1, {
      render: { fillStyle: '#C6AA83' }, // beige
      isStatic: false,
      text: {
        content: "12€",
        color: "#333",
        size: '1.3rem'
      }
    });
    
    var triangle1 = Bodies.polygon(posterWidth * 0.75, posterHeight * 0.2, 3, posterWidth * 0.2, {
      render: { fillStyle: '#DBC052' }, // amarillo
      isStatic: false,
    });
    
    var triangle2 = Bodies.fromVertices(posterWidth * 0.8, posterHeight * 0.3, [
      { x: 0, y: 0 },
      { x: posterWidth * 0.3, y: posterHeight * 0.1 },
      { x: posterWidth * 0.1, y: posterHeight * 0.24 }
    ], {
      render: { fillStyle: '#C6AA83' }, // beige
      isStatic: false,
    });
    
    var triangle3 = Bodies.fromVertices(posterWidth * 0.3, posterHeight * 0.3, [
      { x: 0, y: 0 },
      { x: posterWidth * 0.24, y: 0 },
      { x: 0, y: posterHeight * 0.24 }
    ], {
      render: { fillStyle: '#C18369' }, // rojo claro
      isStatic: false,
    });
    
    var trapezoid1 = Bodies.trapezoid(posterWidth * 0.6, posterHeight * 0.7, posterWidth * 0.3, posterWidth * 0.16, 0.4, {
      render: { fillStyle: '#C7A92F' }, // azul claro
      isStatic: false,
    });
    
    var square1 = Bodies.rectangle(posterWidth * 0.6, posterHeight * 0.2, posterWidth * 0.2, posterWidth * 0.2, {
      render: { fillStyle: '#74AC87' }, // verde azulado
      isStatic: false,
      angle: Math.PI / 6
    });
    
    var square2 = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.5, posterWidth * 0.25, posterWidth * 0.25, {
      render: { fillStyle: '#74ACAB' }, // azul verdoso
      isStatic: false,
      angle: -Math.PI / 8,
      text: {
        content: "22:00H",
        color: "#333",
        size: '1.3rem'
      }
    });
    
    // suelo y paredes 
    var ground = Bodies.rectangle(posterWidth/2, posterHeight, posterWidth, 1, { 
      isStatic: true, 
      render: { visible: false } 
    });
    
    var leftWall = Bodies.rectangle(0, posterHeight/2, 1, posterHeight, { 
      isStatic: true, 
      render: { visible: false } 
    });
    
    var rightWall = Bodies.rectangle(posterWidth, posterHeight/2, 1, posterHeight, { 
      isStatic: true, 
      render: { visible: false } 
    });
    
    var topWall = Bodies.rectangle(posterWidth/2, 0, posterWidth, 1, { 
      isStatic: true, 
      render: { visible: false } 
    });

    // interactividad mouse -> Bodies
    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2, // rigidez de la conexión con el mouse
            render: {
                visible: false
            }
        }
    });
    
    
    // gravedad en Y
    engine.world.gravity.y = 0.2;
    

    // añado todos los Bodies al world del engine
    Composite.add(engine.world, [
      rectDate,
      rectRita,
      rectAndrea,
      rectGuillem,
      circlePink,
      circlePrice,
      rectLocation,
      triangle1,
      triangle2,
      triangle3,
      trapezoid1,
      square1,
      square2,
      ground,
      leftWall,
      rightWall,
      topWall,
      mouseConstraint // interatividad con el mouse
    ]);
    
    Render.run(render);
    
    var runner = Runner.create();
    
    // evento para renderizar texto en los Bodies
    Matter.Events.on(render, 'afterRender', function() {
        var ctx = render.context;
        
        Composite.allBodies(engine.world).forEach(function(body) {
            if (body.text) {

                ctx.save();
                
                ctx.translate(body.position.x, body.position.y);
                ctx.rotate(body.angle);
                
                ctx.font = `bold ${body.text.size} 'Bebas Neue', sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = body.text.color;
                
                ctx.fillText(body.text.content, 0, 0);
                
                ctx.restore();
            }
        });
    });
    
    // run the engine
    Runner.run(runner, engine);
}