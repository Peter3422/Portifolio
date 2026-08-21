window.addEventListener("load",()=>{setTimeout(()=>{const l=document.getElementById("loader");l.style.opacity="0";l.style.visibility="hidden";document.querySelectorAll(".reveal-up").forEach((el,i)=>setTimeout(()=>el.classList.add("revealed"),i*140));document.querySelectorAll(".reveal-mask").forEach((el,i)=>setTimeout(()=>el.classList.add("revealed"),350+i*160));},900);});

const progress=document.querySelector(".scroll-progress"),nav=document.getElementById("navbar");
window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/max)*100+"%";nav.classList.toggle("scrolled",scrollY>40)},{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");if(e.target.classList.contains("reveal-text"))e.target.classList.add("revealed");}}),{threshold:.16});
document.querySelectorAll(".reveal-project,.skill-row,.reveal-text").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

document.querySelectorAll(".magnetic").forEach(el=>{
 el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.14}px,${y*.14}px)`});
 el.addEventListener("mouseleave",()=>el.style.transform="translate(0,0)");
});

document.querySelectorAll(".tilt-card").forEach(el=>{
 el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateZ(6px)`});
 el.addEventListener("mouseleave",()=>el.style.transform="");
});

const canvas=document.getElementById("particleCanvas"),ctx=canvas.getContext("2d");let particles=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
function init(){particles=Array.from({length:Math.min(90,Math.floor(innerWidth/18))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.3+.2,a:Math.random()*.5+.12}))}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.fillStyle=`rgba(190,170,255,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){let a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){ctx.strokeStyle=`rgba(139,92,246,${.08*(1-d/120)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(draw)}
resize();init();draw();window.addEventListener("resize",()=>{resize();init()});

document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));
