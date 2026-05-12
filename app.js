// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorRing.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 300, fill: "forwards" });
});
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorRing.style.width = '30px';
        cursorRing.style.height = '30px';
        cursorRing.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursorRing.style.width = '20px';
        cursorRing.style.height = '20px';
        cursorRing.style.backgroundColor = 'transparent';
    });
});
// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if(navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});
// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Full-Stack Developer", "UI/UX Designer", "Creative Technologist"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}
function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length && typedTextSpan) setTimeout(type, newTextDelay + 250);
});
// Scroll Reveal
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            
            // skill bar
            if(reveals[i].classList.contains('skill-card')) {
                const fill = reveals[i].querySelector('.skill-fill');
                if(fill) {
                    const w = fill.getAttribute('data-w');
                    fill.style.width = w + '%';
                }
            }
            
            // about numbers
            if(reveals[i].classList.contains('about-text')) {
                animateNumbers();
            }
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();
// Number Counter
let animated = false;
function animateNumbers() {
    if(animated) return;
    const nums = document.querySelectorAll('.stat-num');
    nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        let current = 0;
        const inc = target / 50;
        const update = () => {
            current += inc;
            if(current < target) {
                num.innerText = Math.ceil(current) + (target === 30 ? '+' : '');
                requestAnimationFrame(update);
            } else {
                num.innerText = target + (target === 30 ? '+' : '');
            }
        };
        update();
    });
    animated = true;
}
// Three.js Background
const canvas = document.querySelector('#three-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.8
    });
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        particlesMesh.rotation.y = elapsedTime * 0.05;
        
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        
        renderer.render(scene, camera);
    }
    animate();
}


emailjs.init("m20Q1pQU-M07Z_km_");

document
.getElementById("contactForm")
.addEventListener("submit", function(event)


{
event.preventDefault(); // Prevents page reload

    const submitBtn = this.querySelector('.send-btn');
    const originalText = submitBtn.innerHTML;

    // Provide immediate feedback
    submitBtn.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    emailjs.sendForm("service_u8ryhu1", "template_x7nm4pk", this)
        .then(() => {
            // Success State
            submitBtn.innerText = "Message Sent! 🚀";
            submitBtn.style.backgroundColor = "#28a745"; // Success Green
            submitBtn.style.borderColor = "#28a745";
            
            this.reset(); // Clear the form fields

            // Reset button back to normal after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = ""; 
                submitBtn.style.borderColor = "";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch((error) => {
            // Error State
            submitBtn.innerText = "Error! ❌";
            submitBtn.style.backgroundColor = "#dc3545"; // Error Red
            console.error("EmailJS Error:", error);

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = "";
                submitBtn.disabled = false;
            }, 3000);
        });
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.onload = function () {
    window.scrollTo(0, 0);
};
