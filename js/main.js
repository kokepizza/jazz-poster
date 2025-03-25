// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer targeting the poster element
var render = Render.create({
    element: document.getElementById('poster'),
    engine: engine,
    options: {
        width: document.getElementById('poster').clientWidth,
        height: document.getElementById('poster').clientHeight,
        background: 'transparent',
        wireframes: false
    }
});

// altura y ancho del poster
var posterHeight = document.getElementById('poster').clientHeight;
var posterWidth = document.getElementById('poster').clientWidth;

// Crear rectángulos con nombres de músicos de jazz
var rectRita = Bodies.rectangle(posterWidth * 0.6, posterHeight * 0.4, 150, 60, {
    render: { fillStyle: '#3498db' }, // Azul
    isStatic: false,
    angle: Math.PI / 12,
    text: {
        content: "RITA PAYÉS",
        color: "#ffffff",
        size: "1.5rem"
    }
});

var rectAndrea = Bodies.rectangle(posterWidth * 0.4, posterHeight * 0.6, 150, 60, {
    render: { fillStyle: '#e74c3c' }, // Rojo
    isStatic: false,
    angle: -Math.PI / 10,
    text: {
        content: "ANDREA MOTIS",
        color: "#ffffff",
        size: "1.5rem"
    }
});

var rectGuillem = Bodies.rectangle(posterWidth * 0.7, posterHeight * 0.7, 150, 60, {
    render: { fillStyle: '#2ecc71' }, // Verde
    isStatic: false,
    angle: Math.PI / 20,
    text: {
        content: "GUILLEM ARNEDO",
        color: "#ffffff",
        size: "1.5rem"
    }
});

// ground & walls
var ground = Bodies.rectangle(posterWidth/2, posterHeight, posterWidth, 1, { isStatic: true, render: { visible: false } });
var leftWall = Bodies.rectangle(0, posterHeight/2, 1, posterHeight, { isStatic: true, render: { visible: false } });
var rightWall = Bodies.rectangle(posterWidth, posterHeight/2, 1, posterHeight, { isStatic: true, render: { visible: false } });
var topWall = Bodies.rectangle(posterWidth/2, 0, posterWidth, 1, { isStatic: true, render: { visible: false } });

// Reducir la gravedad para un movimiento más suave
engine.world.gravity.y = 1;

// add all of the bodies to the world
Composite.add(engine.world, [rectRita, rectAndrea, rectGuillem, ground, leftWall, rightWall, topWall]);

// run the renderer
Render.run(render);

// create runner
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