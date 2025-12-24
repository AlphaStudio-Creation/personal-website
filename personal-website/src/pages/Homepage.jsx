
import React,{useEffect,useState} from 'react'
import LogoSlider from '../components/LogoSlider'
import Section from '../components/Section.jsx'
import Breakline from '../components/BreakLine.jsx'
import GlowingButton from '../components/GlowingButton.jsx'
import Connections from '../components/Connections.jsx'

const PARTICLES_COLOR = ["#9effb8","#ff9e9e","#9eb3ff","#cb9eff"]
const PROGRAMMELOGOS = [

    "https://cdn.builder.io/api/v1/image/assets/TEMP/8ee9f161-df19-4fa7-a2a6-edf9acf0e0d6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/80480f8a-69ad-4c30-88ba-f4e7ee08fc51?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/140d376c-13f2-4823-b397-b3de733bf560?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/0ae217f1-b695-4661-bd3d-6440eebc2c5c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/67017079-51e1-4245-9bf1-b5957eb66c74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/515313ac-7ec9-4c6e-95db-80dac2f8b960?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c513fc32-3ab9-4cca-911e-0b2642ac7206?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5731a5a7-689f-49ae-abf1-6e6dc00c2043?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/cb51d286-530f-42be-9e91-9c850522f127?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/44ba8437-f6fd-4a51-bfd3-262d7528f7a4?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&",
    "http://localhost:5173/python.jpg",

]

function Homepage(){


    function TopCanvas(){

        var canvas = document.getElementById("TopCanvas");
        if (!canvas) return;

        var c = canvas.getContext('2d');
        var animationId;
        var circlesArray = [];
        var maxRadius = 55;
        var minRadius = 5;

        // Use a local mouse object to avoid global scope pollution
        var mouse = {
            x: undefined,
            y: undefined
        }

        // --- 1. The Circle Object ---
        function Circle(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.minRadius = radius;
            this.color = PARTICLES_COLOR[Math.floor(Math.random() * PARTICLES_COLOR.length)];

            this.draw = () => {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color;
                c.fill();
            }

            this.update = () => {
                // Interaction with Mouse
                if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
                    mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
                } else if (this.radius > this.minRadius) {
                    this.radius -= 1;
                }

                // Bounce off walls
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.dx *= -1;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.dy *= -1;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }

        // --- 2. Initialization & Resize Logic ---
        const init = () => {
            circlesArray = [];
            
            // Handle High DPI Screens
            const dpr = window.devicePixelRatio || 1;
            
            // We set the CSS style width/height to fill the screen
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = (window.innerHeight / 1.6) + 'px';

            // We set the internal buffer size (scaled by DPR)
            canvas.width = window.innerWidth * dpr;
            canvas.height = (window.innerHeight / 1.6) * dpr;

            // Scale the drawing context so we can use logical coordinates
            c.scale(dpr, dpr);

            // Recalculate number of circles based on screen size
            // (Using logical pixels for calculation)
            const logicalWidth = window.innerWidth;
            const logicalHeight = window.innerHeight / 1.6;
            const numberOfCircles = 800; // Adjusted for performance

            for (let i = 0; i < numberOfCircles; i++) {
                var radius = Math.random() * 3 + 1; // Random radius 1-4
                var x = Math.random() * (logicalWidth - radius * 2) + radius;
                var y = Math.random() * (logicalHeight - radius * 2) + radius;
                var dx = (Math.random() - 0.5); // Slower speed
                var dy = (Math.random() - 0.5); 
                
                circlesArray.push(new Circle(x, y, dx, dy, radius));
            }
        }

            // --- 3. Animation Loop ---
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            
            // Clear the canvas using logical dimensions
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < circlesArray.length; i++) {
                circlesArray[i].update();
            }
        }

        // --- 4. Event Listeners ---
        const handleMouseMove = (event) => {
            // Adjust mouse coordinates if canvas is offset, 
            // but since this is a background canvas, page coordinates usually work unless scrolled.
            // Better to use clientX/Y relative to the viewport.
            var rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        }

        const handleResize = () => {
            // On resize, we just re-initialize the canvas dimensions and circles
            // We do NOT call animate() again, because the loop is already running.
            init(); 
        }

        // Bind Listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Start
        init();
        animate();

        // --- 5. Cleanup Function ---
        // This is returned to useEffect to be run when the component unmounts
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        }


    }

    function GravityBallCanvas() {
        var canvas = document.getElementById("GravityBallCanvas");
        if (!canvas) return;

        var c = canvas.getContext("2d");
        var gravity = 0.2;
        var radius = 20;
        var numCircles = 10;
        var dampeningFactor = 0.99;
        var circles = [];
        var i, j, circle,circle2;
        var mouse = {
        x: 0,
        y: 0,
        down: false
        };
        var circleUnderMouse = null;
        var animationId;
        var animate = true;

        // --- Helper Functions ---

        function initializeCircles() {
            circles = [];
            for (i = 0; i < numCircles; i++) {
                circle = {
                    x: canvas.width / (2 * (window.devicePixelRatio || 1)), // Center horizontally
                    y: canvas.height / (2 * (window.devicePixelRatio || 1)), // Center vertically
                    velocity: { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 },
                    color: PARTICLES_COLOR[Math.floor(Math.random() * (PARTICLES_COLOR.length - 1))]
                };
                circles.push(circle);
            }
        }

        function executeFrame() {
            if (!animate) return;
            
            // Clear using logical coordinates (width/height are physical, so divide by dpr)
            const dpr = window.devicePixelRatio || 1;
            c.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
            
            iterateSimulation();
            drawCircles();
            
            animationId = requestAnimationFrame(executeFrame);
        }

        function drawCircles() {
        for (i = 0; i < numCircles; i++) {
            circle = circles[i];
            var r = 100; var g = 100; var b = 255;

            // Draw connecting line
            if (circle === circleUnderMouse && mouse.down) {
                c.beginPath();
                c.moveTo(circle.x, circle.y);
                c.lineTo(mouse.x, mouse.y);
                c.lineWidth = "2";
                c.strokeStyle = "black";
                c.stroke();
            }

            c.beginPath();
            c.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
            if (circle === circleUnderMouse) {
                c.fillStyle = "#C1FF24";
                c.lineWidth = "5";
                c.stroke();
            } else {
                c.fillStyle = circle.color;
            }
            c.fill();
        }
        }

        function iterateSimulation() {
            const dpr = window.devicePixelRatio || 1;
            // We need logical width/height for physics calculations
            const logicalWidth = canvas.width / dpr;
            const logicalHeight = canvas.height / dpr;

            for (i = 0; i < numCircles; i++) {
                circle = circles[i];

                // Drag Logic
                if (circle === circleUnderMouse && mouse.down) {
                    var dxMouse = mouse.x - circle.x;
                    var dyMouse = mouse.y - circle.y;
                    var dragStrength = 0.08; 
                    circle.velocity.x += dxMouse * dragStrength;
                    circle.velocity.y += dyMouse * dragStrength;
                    circle.velocity.x *= 0.9;
                    circle.velocity.y *= 0.9;
                }

                circle.velocity.y += gravity;
                circle.velocity.x *= dampeningFactor;
                circle.velocity.y *= dampeningFactor;

                circle.x += circle.velocity.x;
                circle.y += circle.velocity.y;

                // Floor collision
                if (circle.y > logicalHeight - radius) {
                    circle.y = logicalHeight - radius;
                    circle.velocity.y = -Math.abs(circle.velocity.y) * 0.8;
                }
                // Ceiling collision
                if (circle.y < radius) {
                    circle.y = radius;
                    circle.velocity.y = Math.abs(circle.velocity.y);
                }
                // Right wall
                if (circle.x > logicalWidth - radius) {
                    circle.x = logicalWidth - radius;
                    circle.velocity.x = -Math.abs(circle.velocity.x) * 0.8;
                }
                // Left wall
                if (circle.x < radius) {
                    circle.x = radius;
                    circle.velocity.x = Math.abs(circle.velocity.x);
                }

                for(j = i + 1; j < numCircles; j++){
                    circle2 = circles[j];
                    var dx = circle2.x - circle.x;
                    var dy = circle2.y - circle.y;
                    var d = Math.sqrt(dx*dx + dy*dy);
                    
                    if(d < 2*radius){
                        if(d === 0){
                        d = 0.1;
                        }
                        var unitX = dx/d;
                        var unitY = dy/d;
                        
                        var force = -2;
                        
                        var forceX = unitX * force;
                        var forceY = unitY * force;
                        
                        circle.velocity.x += forceX;
                        circle.velocity.y += forceY;
                        
                        circle2.velocity.x -= forceX;
                        circle2.velocity.y -= forceY;
                    }
                }

            }

        }

        // --- Event Handlers ---

        // [!] THIS IS THE FIXED FUNCTION [!]
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            if (!canvas) return;

            // 1. Get the size the CSS is forcing on the element
            var rect = canvas.getBoundingClientRect();

            // 2. Set the internal buffer size to match
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // 3. IMPORTANT: Reset the scale! 
            // Changing canvas.width resets the context, so we must re-apply scale.
            c.scale(dpr, dpr);

            // Note: We do NOT re-initialize circles here. 
            // This keeps the ball's current position/velocity alive during resize.
        };

        const handleMouseOver = () => {
            if (!animate) {
                animate = true;
                executeFrame();
            }
        };

        const handleMouseOut = () => {
            animate = false;
            cancelAnimationFrame(animationId);
            mouse.down = false;
            circleUnderMouse = null;
        };

        const handleMouseMove = (e) => {
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseDown = (e) => {
            mouse.down = true;
            for(i = 0; i < circles.length; i++){
                var circleCheck = circles[i];
                var dx = mouse.x - circleCheck.x;
                var dy = mouse.y - circleCheck.y;
                var d = Math.sqrt(dx*dx + dy*dy);
                if(d < radius + 5){
                    circleUnderMouse = circleCheck;
                    circleUnderMouse.velocity.x = 0;
                    circleUnderMouse.velocity.y = 0;
                    break;
                }
            }
        };

        const handleMouseUp = () => {
            mouse.down = false;
            circleUnderMouse = null;
        };

        // --- Initialization ---
        
        // Set initial size
        handleResize(); 
        // Create ball
        initializeCircles();

        // Listeners
        window.addEventListener('resize', handleResize);
        // Use parentElement for hover states to prevent edge flickering
        if (canvas.parentElement) {
            canvas.parentElement.addEventListener('mouseenter', handleMouseOver);
            canvas.parentElement.addEventListener('mouseleave', handleMouseOut);
        }
        
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Initial draw
        executeFrame(); 

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (canvas.parentElement) {
                canvas.parentElement.removeEventListener('mouseenter', handleMouseOver);
                canvas.parentElement.removeEventListener('mouseleave', handleMouseOut);
            }
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(animationId);
        };
    }

    function StarCanvasFn(){

        var canvas = document.getElementById("StarCanvas");
        var c = canvas.getContext("2d");

        var numStars = 800;
        var radius = 1;
        var focalLength = canvas.width;
        var animationId;
        var centerX, centerY;

        var stars = [], star;
        var i;

        var animate = false;

        initializeStars();

        function executeFrame(){
            if(!animate) return;
            animationId = requestAnimationFrame(executeFrame)
            const dpr = window.devicePixelRatio || 1;
            c.clearRect(0,0,canvas.width / dpr,canvas.height / dpr)
            moveStars();
            drawStars();
        }

        function initializeStars(){
            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            stars = [];
            for(i = 0; i < numStars; i++){
                star = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width
                };
                stars.push(star);
            }
        }

        function moveStars(){
            for(i = 0; i < numStars; i++){
                    star = stars[i];
                    star.z--;
                    
                    if(star.z <= 0){
                    star.z = canvas.width;
                }
            }
        }

        function drawStars(){
            var pixelX, pixelY, pixelRadius;
            
            // Resize to the screen
            
            c.fillStyle = "black";
            c.fillRect(0,0, canvas.width, canvas.height);
            c.fillStyle = "white";
            for(i = 0; i < numStars; i++){
                star = stars[i];
                
                pixelX = (star.x - centerX) * (focalLength / star.z);
                pixelX += centerX;
                pixelY = (star.y - centerY) * (focalLength / star.z);
                pixelY += centerY;
                pixelRadius = radius * (focalLength / star.z);
                
                c.beginPath();
                c.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
                c.fill();
            }
        }

        function handleResize(){
            
            const dpr = window.devicePixelRatio || 1;
            // Ensure canvas exists before getting rect
            if(!canvas) return;
            
            

            // Set actual size in memory (scaled to account for High DPI screens)
            var rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            // Normalize coordinate system to use css pixels.
            c.scale(dpr, dpr);
            
            c.clearRect(0,0,canvas.width / dpr,canvas.height / dpr)
            initializeStars()
            
        }

        function handleMouseMove(e){

            focalLength = e.x;

        }

        function handleMouseOver(e){

            animate = true;
            executeFrame();

        }

        function handleMouseOut(e){

            cancelAnimationFrame(animationId)
            animate = false;

        }

        window.addEventListener("resize",handleResize)
        canvas.addEventListener("mousemove",handleMouseMove)

        // Kick off the animation when the mouse enters the canvas
        canvas.addEventListener('mouseover',handleMouseOver)

        // Pause animation when the mouse exits the canvas
        canvas.addEventListener("mouseout",handleMouseOut)

        // Draw the first frame to start animation
        handleResize();
        executeFrame();

        return() => {

            window.removeEventListener("resize",handleResize);
            canvas.removeEventListener("mousemove",handleMouseMove)
            canvas.removeEventListener("mouseover",handleMouseOver)
            canvas.removeEventListener("mouseout",handleMouseOut)

        }

    }

    function WaveCanvasFn(){

        var canvas = document.getElementById("WaveCanvas");
        var c = canvas.getContext("2d");

        var pullStrength = 0.005;
        var dampeningFactor = 0.98;
        var initialHeight = 0.5;
        var cells = [];
        var gridSize = 50;
        var conservationOfMassCorrection = 0;
        var cellWidth = 1 / (gridSize-1) * canvas.width;
        var cellHeight = 1 / (gridSize-1) * canvas.height;

        var mouseX, mouseY, mouseDown;
        var animate = false;

        function executeFrame(){
            if(animate)
                requestAnimationFrame(executeFrame)
            clearCanvas();
            drawCells();
            iterateSimulation();
            executeMouseInteraction();
        };

        // Store the color strings as an object re-use optimization.
        // (otherwise new string objects would be created for each color each frame)
        var grayStrings = [];
        for(var gray = 0;gray < 255; gray++){
            // this transforms strings from 'rgb(255,190,201)' to '#FF564B'
            c.fillStyle = 'rgb('+gray+','+gray+','+gray+')';
            // store the colors of the form '#FF564B'
            grayStrings.push(c.fillStyle);
        }

        for(var i = 0; i < gridSize; i++){
            for(var j = 0; j < gridSize; j++){
            
                // Raise a single cell so the simulation is
                // initialized with something that looks interesting
                var isRaisedCell = false;
                if(i === Math.floor(gridSize*1/4))
                if(j === Math.floor(gridSize*1/4))
                    isRaisedCell = true;
                
                cells.push({
                // for a still initial surface
                //height: 0.5,
                
                // for an initial wave:
                    height: isRaisedCell ? 4 : initialHeight,
                    
                    velocity: 0
                });
            }
        }

        function clearCanvas(){
        // resizes to full screen
            handleResize()
            
            cellWidth = 1 / (gridSize-1) * canvas.width;
            cellHeight = 1 / (gridSize-1) * canvas.height;
        }
        function drawCells(){
        
        for(var i = 0; i < gridSize; i++){
            for(var j = 0; j < gridSize; j++){
                var cell = cells[i + j * gridSize];
                var x = i / (gridSize-1) * canvas.width;
                var y = j / (gridSize-1) * canvas.height;
                var gray = Math.floor(cell.height * 255);
                gray = gray > 255 ? 255 : gray < 0 ? 0 : gray;
                
                // This commented method of defining the colors
                // would create lots of new String objects.
                // Better to re-use existing objects so that
                // no memory is allocated/released each frame.
                //c.fillStyle = 'rgb('+gray+','+gray+','+gray+')';
                
                c.fillStyle = grayStrings[gray];
                c.fillRect(x,y,cellWidth+1,cellHeight+1);
            }
        }
        }
        function iterateSimulation(){
            var avgHeight = 0;
            for(var i = 0; i < gridSize; i++){
                for(var j = 0; j < gridSize; j++){
                // center cell
                    var c = cells[i + j * gridSize];
                    
                    for(var di = -1; di <= 1; di++){
                        for(var dj = -1; dj <= 1; dj++){
                        
                            if(di !== 0 || dj !== 0){
                                var ni = ((i + di) + gridSize) % gridSize;
                                var nj = ((j + dj) + gridSize) % gridSize;
                                
                                var neighbor = cells[ni + nj * gridSize];
                                
                                // pull toward neighbors
                                c.velocity += pullStrength * (neighbor.height - c.height);
                            }
                        }
                    }
                    
                    // increment velocity
                    c.height += c.velocity;
                    
                    // ensure conservation of mass
                    c.height += conservationOfMassCorrection;
                    
                    // apply dampening
                    c.velocity *= dampeningFactor;
                    
                    avgHeight += c.height;
                }
            }
            avgHeight /= Math.pow(gridSize - 1,2);
            
            conservationOfMassCorrection = initialHeight - avgHeight;
        }

        function executeMouseInteraction(){
            if(mouseDown){
                var i = Math.floor((gridSize-1) * mouseX / canvas.width);
                var j = Math.floor((gridSize-1) * mouseY / canvas.height);
                var cell = cells[i + j * gridSize];
                cell.height = 2;
                cell.velocity = 0;
            }
        }

        function handleResize(){
            
            const dpr = window.devicePixelRatio || 1;
            // Ensure canvas exists before getting rect
            if(!canvas) return;
            
            

            // Set actual size in memory (scaled to account for High DPI screens)
            var rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            // Normalize coordinate system to use css pixels.
            c.scale(dpr, dpr);
            
        }

        function handleMouseDown(e){

            mouseDown = true;
            mouseX = e.offsetX;
            mouseY = e.offsetY;

        }

        function handleMouseMove(e){

            mouseX = e.offsetX;
            mouseY = e.offsetY;

        }

        function handleMouseUp(e){

            mouseDown = false;

        }

        function handleMouseOver(e){

            animate = true;
            executeFrame();

        }

        function handleMouseOut(e){

            mouseDown = false;
            animate = false;

        }

        window.addEventListener("resize",handleResize())

        canvas.addEventListener("mousedown",handleMouseDown)

        canvas.addEventListener("mousemove",handleMouseMove)

        canvas.addEventListener("mouseup",handleMouseUp)

        // Kick off the animation when the mouse enters the canvas
        canvas.addEventListener('mouseover',handleMouseOver)

        // Pause animation when the mouse exits the canvas
        canvas.addEventListener("mouseout",handleMouseOut)

        // Iterate the simulation a couple of times
        // so the program shows something before animation starts.
        for(var i = 0; i < 7; i++)
        iterateSimulation();

        // Draw the first frame
        handleResize();
        executeFrame();

        return () => {

            window.removeEventListener("resize",handleResize)
            canvas.removeEventListener("mousedown",handleMouseDown)
            canvas.removeEventListener("mousemove",handleMouseMove)
            canvas.removeEventListener("mouseup",handleMouseUp)
            canvas.removeEventListener("mouseover",handleMouseOver)
            canvas.removeEventListener("mouseout",handleMouseOut)

        }

    }

    useEffect(() => {
        
        const cleanupTop = TopCanvas(); 
        const StarCanvasFunction = StarCanvasFn();
        const cleanupGravity = GravityBallCanvas();
        const cleanupWave = WaveCanvasFn();

        // React Cleanup: when the component goes away, run the cleanup function.
        return () => {
            if (cleanupGravity) cleanupGravity();
            if (cleanupTop) cleanupTop();
            if (StarCanvasFunction) StarCanvasFn();
            if (cleanupWave) WaveCanvasFn();
        }
    }, []);

    return(

        <>
        
            <canvas id="TopCanvas" className="bg-gray-100 z-[-1] border-3 border-gray-300 rounded-lg absolute"></canvas>

            
            <div className="z-0 absolute grid grid-cols-1 grid-rows-2 mt-[10rem] w-[100%] justify-center items-center">
                <p className="font-bold text-4xl text-center ">Build everything from scratch!</p>
                <p className="text-md text-center text-gray-400">~ AnsonRE <br></br> Learn more about me or check out my creations here! </p>

                <div className="flex justify-center">

                    <GlowingButton link="/about" ButtonText="About me"/>
                    <GlowingButton link="/creations" ButtonText="Creations"/>

                </div>

            </div>
            
            

            <div className="flex justify-center">
                <div className="relative w-[90%] mt-[42rem] text-center text-gray-300">
                    <h5>Here are languages that I have learnt!(more than these)</h5>
                </div>
            </div>

            <div className="mt-[2rem] w-full relative">
                <LogoSlider logos={PROGRAMMELOGOS} slidesToShow={3}></LogoSlider>
            </div>

            <div className="mt-[7rem] relative">
                <Breakline></Breakline>
            </div>

            <div className="mt-[6rem] relative">

                <Section title="Engaged to learn everything!" desc="A person who love to learn stuffs about Math,Computer Science,Physics,Calculus,Programming! But ofcourse,I would love to learn more things about the world and technology." button={<GlowingButton link="/about" ButtonText="About me"/>} element={<canvas id="GravityBallCanvas" className="border-3 border-gray-200 rounded-lg w-[100%] h-[20rem] 3xl:w-[50rem] h-[18rem]"></canvas>}></Section>

            </div>

            <div className="mt-[7rem] relative">
                <Breakline></Breakline>
            </div>

            <div className="mt-[6rem] relative">

                <Section title="Love to build and create things!" desc="Learn some programming languages but not use it is a waste of hardwork.So,I will build a lot of projects in my leisure time! Check out all my projects here! Most importantly,build everything from scratch!" button={<GlowingButton link="/creations" ButtonText="Creations"/>} element={<canvas id="StarCanvas" className="border-3 border-gray-200 rounded-lg w-[100%] h-[20rem] 3xl:w-[50rem] h-[18rem]"></canvas>}></Section>

            </div>

            <div className="mt-[7rem] relative">
                <Breakline></Breakline>
            </div>

            <div className="mt-[6rem] relative">

                <Section title="Love to build and create things!" desc="Learn some programming languages but not use it is a waste of hardwork.So,I will build a lot of projects in my leisure time! Check out all my projects here! Most importantly,build everything from scratch!" button={<div></div>} element={<canvas id="WaveCanvas" className="border-3 border-gray-200 rounded-lg w-[100%] h-[20rem] 3xl:w-[50rem] h-[18rem]"></canvas>}></Section>

            </div>

            <div className="mt-[7rem] relative">
                <Breakline></Breakline>
            </div>

            <div className="mt-[6rem] relative">
                <Connections></Connections>
            </div>

        </>

    )

}

export default Homepage