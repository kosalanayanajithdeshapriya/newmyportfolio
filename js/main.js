// Custom cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    const animRing = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); };
    animRing();
    document.querySelectorAll('a, button, .project-card, .research-card, .design-item, .identity-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Canvas particle background
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.7 ? '179,102,255' : '0,229,255'
      });
    }
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,229,255,${0.04 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // Progress bar
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      document.getElementById('progress').style.width = pct + '%';
      const navbar = document.getElementById('navbar');
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    // Animate skill bars
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(fill => {
            fill.style.width = fill.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skills-layout').forEach(s => skillObserver.observe(s));

    // Contact form
    function handleSend() {
      const btn = document.querySelector('.btn-send');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'var(--cyan)';
      btn.style.color = 'var(--bg)';
      btn.style.borderColor = 'var(--cyan)';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 3000);
    }

    // Bottom Nav active state & visibility
    const bottomNav = document.getElementById('bottom-navbar');
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const navLinks = document.querySelectorAll('#bottom-navbar a');
    
    window.addEventListener('scroll', () => {
      // Toggle visibility
      if (window.scrollY > 200) {
        bottomNav.classList.add('visible');
      } else {
        bottomNav.classList.remove('visible');
      }

      // Active state
      let current = '';
      sections.forEach(s => { 
        if (window.scrollY >= s.offsetTop - 300) {
          current = s.id; 
        }
      });
      navLinks.forEach(a => {
        if (a.getAttribute('href') === '#' + current) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    });

    // Smooth counter animation for hero stats (optional enhancement)

    // ===== SPLASH SCREEN =====
    function enterPortfolio() {
      const splash = document.getElementById('splash-screen');
      splash.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        splash.style.display = 'none';
      }, 900);
    }

    // Lock scroll while splash is visible
    document.body.style.overflow = 'hidden';

    // Rotate active role labels
    (function() {
      const roles = document.querySelectorAll('.splash-role');
      let idx = 0;
      setInterval(() => {
        roles.forEach(r => r.classList.remove('active'));
        idx = (idx + 1) % roles.length;
        roles[idx].classList.add('active');
      }, 2000);
    })();
    // 3D Tilt Effect for cards
    document.querySelectorAll('.project-card, .research-card, .identity-card, .design-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
            card.style.zIndex = '1';
        });
    });
