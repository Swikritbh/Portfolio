// ============ Scroll to Top Button ============
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============ Mobile Menu Toggle ============
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
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }
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

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('show');
        }
    });
});

// ============ Form Validation ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = contactForm.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const successAnimation = submitBtn.querySelector('.success-animation');

  // Real-time validation feedback
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  nameInput.addEventListener('blur', function() {
    const error = document.getElementById('nameError');
    if (this.value.trim().length < 2) {
      error.textContent = 'Name must be at least 2 characters';
      this.style.borderColor = '#ed64a6';
    } else {
      error.textContent = '';
      this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });

  emailInput.addEventListener('blur', function() {
    const error = document.getElementById('emailError');
    if (!validateEmail(this.value)) {
      error.textContent = 'Please enter a valid email address';
      this.style.borderColor = '#ed64a6';
    } else {
      error.textContent = '';
      this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });

  messageInput.addEventListener('blur', function() {
    const error = document.getElementById('messageError');
    if (this.value.trim().length < 10) {
      error.textContent = 'Message must be at least 10 characters';
      this.style.borderColor = '#ed64a6';
    } else {
      error.textContent = '';
      this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });

  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    const errors = {};

    if (nameInput.value.trim().length < 2) {
      isValid = false;
      errors.name = 'Name must be at least 2 characters';
    }
    if (!validateEmail(emailInput.value)) {
      isValid = false;
      errors.email = 'Please enter a valid email';
    }
    if (messageInput.value.trim().length < 10) {
      isValid = false;
      errors.message = 'Message must be at least 10 characters';
    }

    // Display errors
    document.getElementById('nameError').textContent = errors.name || '';
    document.getElementById('emailError').textContent = errors.email || '';
    document.getElementById('messageError').textContent = errors.message || '';

    if (!isValid) return;

    try {
      // Show loading state
      btnText.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Submit to getform.io (already configured in HTML action attribute)
      // The form will auto-submit, so we just wait a moment
      await new Promise(resolve => setTimeout(resolve, 500));

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
}

// ============ Three.js Background Animation ============
const canvas = document.querySelector('.hero-canvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
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
}

// ============ Scroll Reveal Animations ============
if (typeof ScrollReveal !== 'undefined') {
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

  ScrollReveal().reveal('.about-content', {
    delay: 200,
    distance: '30px',
    duration: 1000,
    origin: 'bottom',
    opacity: 0
  });

  ScrollReveal().reveal('.client-box', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    opacity: 0,
    interval: 200
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
}

// ============ Counter Animation ============
if (typeof $ !== 'undefined' && $.fn.counterUp) {
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });
}

// ============ Smooth Scroll for Navigation Links ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
}); 