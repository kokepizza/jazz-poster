// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

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

// Crear objetos (posición, width y height)
var rectDate = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.9, posterWidth * 0.6, posterHeight * 0.08, {
  render: { fillStyle: '#999' }, // Gris oscuro
  isStatic: false,
  // chamfer: { radius: posterHeight * 0.04 },
  text: {
      content: "DIJOUS 27 DE MARÇ",
      color: "#333",
      size: '.9rem'
  }
});

var rectLocation = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.2, posterWidth * 0.5, posterHeight * 0.08, {
  render: { fillStyle: '#999' }, // Gris oscuro
  isStatic: false,
  // chamfer: { radius: posterHeight * 0.05 },
  angle: Math.PI / 40,
  text: {
      content: "Palau de la Música",
      color: "#333",
      size: '0.9rem'
  }
});

var rectRita = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.3, posterWidth * 0.4, posterHeight * 0.1, {
  render: { fillStyle: '#31788C' }, // Azul
  isStatic: false,
  angle: Math.PI / 20,
  text: {
      content: "RITA PAYÉS",
      color: "#F5F0E1",
      size: '1rem'
  }
});

var rectAndrea = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.45, posterWidth * 0.5, posterHeight * 0.1, {
  render: { fillStyle: '#B2252B' }, // Rojo
  isStatic: false,
  angle: -Math.PI / 20,
  text: {
      content: "ANDREA MOTIS",
      color: "#F5F0E1",
      size: '1rem'
  }
});

var rectGuillem = Bodies.rectangle(posterWidth * 0.5, posterHeight * 0.6, posterWidth * 0.6, posterHeight * 0.1, {
  render: { fillStyle: '#4B9242' }, // Verde
  isStatic: false,
  angle: Math.PI / 30,
  text: {
      content: "GUILLEM ARNEDO",
      color: "#F5F0E1",
      size: '1rem'
  }
});

var circlePink = Bodies.circle(posterWidth * 0.1, posterHeight * 0.9, posterWidth * 0.08, {
  render: { fillStyle: '#DFAB95' }, // Rosa
  isStatic: false,
});

var circlePrice = Bodies.circle(posterWidth * 0.8, posterHeight * 0.7, posterWidth * 0.1, {
  render: { fillStyle: '#C6AA83' }, // Light
  isStatic: false,
  text: {
    content: "12€",
    color: "#333",
    size: '1rem'
  }
});

var triangle1 = Bodies.polygon(posterWidth * 0.75, posterHeight * 0.2, 3, posterWidth * 0.2, {
  render: { fillStyle: '#DBC052' }, // Amarillo
  isStatic: false,
});


var triangle2 = Bodies.fromVertices(posterWidth * 0.8, posterHeight * 0.3, [
  { x: 0, y: 0 },
  { x: posterWidth * 0.3, y: posterHeight * 0.1 },
  { x: posterWidth * 0.1, y: posterHeight * 0.24 }
], {
  render: { fillStyle: '#C6AA83' }, // Púrpura
  isStatic: false,
});

var triangle3 = Bodies.fromVertices(posterWidth * 0.3, posterHeight * 0.3, [
  { x: 0, y: 0 },
  { x: posterWidth * 0.24, y: 0 },
  { x: 0, y: posterHeight * 0.24 }
], {
  render: { fillStyle: '#C18369' }, // Rojo claro
  isStatic: false,
});

var trapezoid1 = Bodies.trapezoid(posterWidth * 0.6, posterHeight * 0.7, posterWidth * 0.3, posterWidth * 0.16, 0.4, {
  render: { fillStyle: '#C7A92F' }, // Azul claro
  isStatic: false,
});

// Cuadrado 1
var square1 = Bodies.rectangle(posterWidth * 0.6, posterHeight * 0.2, posterWidth * 0.2, posterWidth * 0.2, {
  render: { fillStyle: '#74AC87' }, // Verde azulado
  isStatic: false,
  angle: Math.PI / 6
});

// Cuadrado 2
var square2 = Bodies.rectangle(posterWidth * 0.8, posterHeight * 0.5, posterWidth * 0.25, posterWidth * 0.25, {
  render: { fillStyle: '#74ACAB' }, // Azul verdoso
  isStatic: false,
  angle: -Math.PI / 8,
  text: {
    content: "22:00H",
    color: "#333",
    size: '1rem'
  }
});

// ground & walls
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


// gravedad en Y
engine.world.gravity.y = 0.2;

// añadir todos los Body al world del engine
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
  topWall
]);

Render.run(render);

var runner = Runner.create();

// Evento para renderizar texto en las formas
Matter.Events.on(render, 'afterRender', function() {
    var ctx = render.context;
    
    // Recorrer todos los cuerpos
    Composite.allBodies(engine.world).forEach(function(body) {
        if (body.text) {
            // Guardar el estado actual del contexto
            ctx.save();
            
            // Trasladar y rotar el contexto para alinear con el cuerpo
            ctx.translate(body.position.x, body.position.y);
            ctx.rotate(body.angle);
            
            // Configurar el estilo del texto
            ctx.font = `bold ${body.text.size} 'Anton', sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = body.text.color;
            
            // Dibujar el texto
            ctx.fillText(body.text.content, 0, 0);
            
            // Restaurar el contexto
            ctx.restore();
        }
    });
});

// Añadir interactividad con el mouse
var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

// run the engine
Runner.run(runner, engine);