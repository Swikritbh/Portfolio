// ============================================
// 🎨 COMPREHENSIVE ANIMATION PACKAGE
// ============================================

// ============ Custom Cursor Animation ============
(function initCustomCursor() {
  // Only on desktop devices
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .client-box, .testimonial-box');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
      });
    });
  }
})();

// ============ Particle Trail Effect ============
(function initParticleTrail() {
  if (window.innerWidth > 768) {
    let particleCount = 0;
    const maxParticles = 50;

    document.addEventListener('mousemove', (e) => {
      if (particleCount < maxParticles && Math.random() > 0.8) {
        createParticle(e.clientX, e.clientY);
      }
    });

    function createParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      document.body.appendChild(particle);
      particleCount++;

      setTimeout(() => {
        particle.remove();
        particleCount--;
      }, 1000);
    }
  }
})();

// ============ Typewriter Effect ============
document.addEventListener('DOMContentLoaded', function() {
  // Typed.js for name
  if (document.getElementById('typed-name')) {
    new Typed('#typed-name', {
      strings: ['Swikrit Bhattarai'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: false,
      showCursor: true,
      cursorChar: '|',
      onComplete: function() {
        // Hide cursor after completion
        setTimeout(() => {
          document.querySelector('#typed-name + .typed-cursor').style.display = 'none';
        }, 1000);
      }
    });
  }

  // Typed.js for role
  if (document.getElementById('typed-role')) {
    setTimeout(() => {
      new Typed('#typed-role', {
        strings: [
          'Software Developer',
          'Computer Science Student',
          'AI/ML Enthusiast',
          'Full Stack Developer',
          'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '_'
      });
    }, 2000);
  }
});

// ============ Magnetic Button Effect ============
(function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const distance = 20;
      
      this.style.transform = `translate(${deltaX * distance}px, ${deltaY * distance}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
})();

// ============ 3D Tilt Effect on Cards ============
document.addEventListener('DOMContentLoaded', function() {
  // Tilt effect for project cards
  const projectCards = document.querySelectorAll('.client-box');
  projectCards.forEach(card => {
    VanillaTilt.init(card, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.05
    });
  });

  // Tilt effect for skill boxes
  const skillBoxes = document.querySelectorAll('.testimonial-box');
  skillBoxes.forEach(box => {
    VanillaTilt.init(box, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.03
    });
  });
});

// ============ GSAP ScrollTrigger Animations ============
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax effect on hero section
  gsap.to('.hero-shape', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 200,
    rotation: 180,
    ease: 'none'
  });

  // Fade in and slide up sections
  gsap.utils.toArray('section').forEach((section, i) => {
    if (i > 0) { // Skip hero section
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 50
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            once: true
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out'
        }
      );
    }
  });

  // Stagger animation for portfolio items
  gsap.utils.toArray('.client-box').forEach((box, i) => {
    gsap.fromTo(box, 
      {
        opacity: 0,
        y: 80,
        rotation: 5
      },
      {
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'back.out(1.7)'
      }
    );
  });

  // Stagger animation for skill boxes
  gsap.utils.toArray('.testimonial-box').forEach((box, i) => {
    gsap.fromTo(box,
      {
        opacity: 0,
        y: 60
      },
      {
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out'
      }
    );
  });

  // Skill tags pop-in animation
  gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
    gsap.fromTo(tag,
      {
        opacity: 0,
        scale: 0
      },
      {
        scrollTrigger: {
          trigger: tag,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'back.out(2)'
      }
    );
  });

  // Stats counter animation with scale
  gsap.utils.toArray('.stat-box').forEach((box, i) => {
    gsap.fromTo(box,
      {
        opacity: 0,
        scale: 0.5
      },
      {
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'elastic.out(1, 0.5)'
      }
    );
  });

  // Profile image float animation
  gsap.to('.profile-img', {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Social links hover animation
  const socialLinks = document.querySelectorAll('.social-links li a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    });
    
    link.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    });
  });

  // Tech badges animation
  gsap.utils.toArray('.tech-badge').forEach((badge, i) => {
    gsap.fromTo(badge,
      {
        opacity: 0,
        x: -30
      },
      {
        scrollTrigger: {
          trigger: badge,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'power2.out'
      }
    );
  });

  // Project badges floating animation
  gsap.to('.project-badge', {
    y: -5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.2
  });

  // Text reveal animation for about section
  gsap.utils.toArray('.about-text').forEach((text, i) => {
    gsap.fromTo(text,
      {
        opacity: 0,
        y: 30
      },
      {
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power2.out'
      }
    );
  });

  // Section headers animation
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      {
        opacity: 0,
        y: 50
      },
      {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  });

  // Contact form elements animation
  gsap.utils.toArray('.form-group').forEach((group, i) => {
    gsap.fromTo(group,
      {
        opacity: 0,
        x: -50
      },
      {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          once: true
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: 'power2.out'
      }
    );
  });
}

// ============ Smooth Scroll Enhancement ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed nav
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============ Parallax Effect for Background Elements ============
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-shape, .profile-img');
  
  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.2);
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ============ Animated Counter Enhancement ============
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      counterObserver.unobserve(counter);
    }
  });
}, observerOptions);

function animateCounter(element) {
  const target = parseFloat(element.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe all counters
document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// ============ Button Ripple Effect ============
document.querySelectorAll('.btn, button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    animation: ripple-animation 0.6s ease-out;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .btn, button {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(rippleStyle);

// ============ Nav Background on Scroll ============
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(26, 32, 44, 0.98)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(26, 32, 44, 0.95)';
    nav.style.boxShadow = 'none';
  }
});

// ============ Form Input Animation ============
document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', function() {
    gsap.to(this, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  input.addEventListener('blur', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// ============ Loading Animation ============
window.addEventListener('load', () => {
  // Fade in hero section
  gsap.from('.hero', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  });
  
  // Animate nav
  gsap.from('nav', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});

// ============ Easter Egg: Konami Code ============
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiPattern.join('')) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Fun animation when konami code is entered
  document.body.style.animation = 'rainbow 2s infinite';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  console.log('🎉 You found the secret! You are awesome!');
}

console.log('%c🚀 Portfolio Loaded with Animations! ', 'background: linear-gradient(45deg, #4fd1c5, #4299e1); color: white; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #4fd1c5; font-size: 12px;');

