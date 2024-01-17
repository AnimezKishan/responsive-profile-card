function Canvas(){

    // Moving Ball Animation
    const ctx1 = canvas1.getContext('2d');
    const roamingParticleArray = [];

    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;

    class roamingParticle {
        constructor() {
            this.x = Math.random() * canvas1.width / 2 + canvas1.width / 4;
            this.y = Math.random() * canvas1.height / 2 + canvas1.height / 4;

            this.size = Math.random() * 50 + 20;

            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if ((this.x <= this.size / 1.5) || (this.x > (canvas1.width - this.size / 1.5)))
                this.speedX = -(this.speedX);

            if ((this.y <= this.size / 1.5) || (this.y > (canvas1.height - this.size / 1.5)))
                this.speedY = -(this.speedY);
        }

        draw() {
            ctx1.fillStyle = "rgb(16,163,127)";
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.fill();
        }
    }

    function createRoamingParticle() {
        for (let i = 0; i < 8; i++) {
            roamingParticleArray.push(new roamingParticle());
        }
    }

    createRoamingParticle();

    function handleRoamingParticle() {
        for (let i = 0; i < roamingParticleArray.length; i++) {
            roamingParticleArray[i].update();
            roamingParticleArray[i].draw();
        }
    }


    function animateRoamingParticle() {
        ctx1.fillStyle = "rgb(16,23,32)";
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

        handleRoamingParticle();
        requestAnimationFrame(animateRoamingParticle);
    }

    animateRoamingParticle();


    //On-Click Animation
    const particleArray = [];

    const mouse = {
        x: undefined,
        y: undefined
    }

    const main = document.querySelector(".main");

    main.addEventListener("click", function(e){
        mouse.x = e.x;
        mouse.y = e.y;

        for(let i=0;i<5;i++)
            particleArray.push(new Particle());
    })

    class Particle{
        constructor(){
            this.x = mouse.x;
            this.y = mouse.y;

            this.size = Math.random() * 20 + 3;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;

            this.hue = Math.random() * 360  + 1;
            this.color = `hsl(${this.hue}, 100%, 50%)`;
        }

        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.size > 0.2)
                this.size -= 0.1; 
        }

        draw(){
            ctx1.fillStyle = this.color;
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx1.fill();
        }
    }

    function handleParticle(){
        for(let i=0;i<particleArray.length;i++){
            particleArray[i].update();
            particleArray[i].draw();

            if(particleArray[i].size <= 0.3)
            {
                particleArray.splice(i, 1);
                i--;
            }
        }
    }

    function animateParticle(){
        ctx1.fillStyle = "transparent";
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

        handleParticle();
        requestAnimationFrame(animateParticle);
    }

    animateParticle();
}


const canvas1 = document.querySelector(".canvas1");

Canvas();

window.addEventListener("resize", ()=>{
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;

    Canvas();
})