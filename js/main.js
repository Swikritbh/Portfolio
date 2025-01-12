// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (!menuToggle || !mainNav) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('active');
        mainNav.classList.toggle('show');
    });

    // Handle menu item clicks
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close menu
            menuToggle.classList.remove('active');
            mainNav.classList.remove('show');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('show') && 
            !menuToggle.contains(e.target) && 
            !mainNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('show');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('show');
        }
    });
});

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.hero-canvas'),
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  transparent: true,
  opacity: 0.8
});

const starVertices = [];
for(let i = 0; i < 15000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  stars.rotation.y += 0.0002;
  stars.rotation.z += 0.0001;
  
  const positions = stars.geometry.attributes.position.array;
  for(let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += 0.1; // Move stars toward camera
    if(positions[i + 2] > 0) {
      positions[i + 2] = -1000; // Reset star position
    }
  }
  stars.geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start animation
animate();

// Initialize Swiper
const swiper = new Swiper('.client-swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

// Initialize ScrollReveal
ScrollReveal().reveal('.hero-image', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  origin: 'left',
  opacity: 0
});

ScrollReveal().reveal('.hero-text', {
  delay: 400,
  distance: '50px',
  duration: 1000,
  origin: 'right',
  opacity: 0
});

ScrollReveal().reveal('.case-study .col-md-12', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  origin: 'bottom',
  opacity: 0
});

ScrollReveal().reveal('.testimonial-box', {
  delay: 200,
  distance: '30px',
  duration: 1000,
  origin: 'bottom',
  opacity: 0,
  interval: 200
});

ScrollReveal().reveal('.stat-box', {
  delay: 200,
  scale: 0.85,
  duration: 1000,
  interval: 200,
  opacity: 0
});

ScrollReveal().reveal('.contact-banner', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  origin: 'bottom',
  opacity: 0
});

ScrollReveal().reveal('footer', {
  delay: 200,
  distance: '30px',
  duration: 1000,
  origin: 'bottom',
  opacity: 0
});

// Sticky Navigation
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    if (document.querySelector('.main-nav').classList.contains('show-it')) {
      document.querySelector('#menu-toggle').classList.remove('open');
      document.querySelector('.main-nav').classList.remove('show-it');
    }
  });
});

// Counter animation
$('.counter').counterUp({
  delay: 10,
  time: 1000
});

// View More functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all description elements and set their initial state
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(desc => {
        // Store the full height of the content
        const fullHeight = desc.scrollHeight + 'px';
        // Set initial collapsed state
        desc.style.maxHeight = '100px';
        desc.style.overflow = 'hidden';
        desc.style.transition = 'max-height 0.3s ease-out';
        // Store the full height as a data attribute
        desc.setAttribute('data-full-height', fullHeight);
    });

    // Add click event listeners to all View More buttons
    const buttons = document.querySelectorAll('.read-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const box = this.closest('.client-box, .testimonial-box');
            const desc = box.querySelector('.description');
            const isExpanded = desc.style.maxHeight !== '100px';

            if (!isExpanded) {
                // Expand
                desc.style.maxHeight = desc.getAttribute('data-full-height');
                this.textContent = 'View Less';
                // Ensure the expanded content is visible
                box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Collapse
                desc.style.maxHeight = '100px';
                this.textContent = 'View More';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const successAnimation = submitBtn.querySelector('.success-animation');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = {
    to_email: "bhattaraisw3034@gmail.com",
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    // Show loading state
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      formData
    );

    // Show success animation
    btnText.style.display = 'none';
    successAnimation.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      btnText.style.display = 'block';
      btnText.textContent = 'Send Message';
      successAnimation.style.display = 'none';
      submitBtn.disabled = false;
    }, 3000);

  } catch (error) {
    console.error('Error:', error);
    btnText.textContent = 'Error! Try Again';
    submitBtn.disabled = false;
    
    setTimeout(() => {
      btnText.textContent = 'Send Message';
    }, 3000);
  }
}); 

// Add this with your other ScrollReveal animations
ScrollReveal().reveal('.about-content', {
  delay: 200,
  distance: '30px',
  duration: 1000,
  origin: 'bottom',
  opacity: 0
}); 