/* ============================================
   PARTICLE SYSTEM
   Handles particle creation, movement, and rendering
   Used for Big Bang explosion and reconstruction
   ============================================ */

/**
 * Particle Class
 * Represents a single particle in the system
 */
class Particle {
  constructor(x, y, color, size) {
    // Current position
    this.x = x;
    this.y = y;
    
    // Starting position (for returning to original position)
    this.startX = x;
    this.startY = y;
    
    // Target position (where particle should move to)
    this.targetX = x;
    this.targetY = y;
    
    // Velocity for explosion
    this.vx = 0;
    this.vy = 0;
    
    // Visual properties
    this.color = color;
    this.size = size;
    this.alpha = 1; // Opacity (0-1)
    
    // Lifecycle
    this.life = 1.0; // 1.0 = fully alive, 0 = dead
  }
  
  /**
   * Explode outward from center
   * @param {number} angle - Direction to explode (radians)
   * @param {number} speed - How fast to explode
   */
  explode(angle, speed) {
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }
  
  /**
   * Set target position for reconstruction
   * @param {number} targetX - X coordinate to move towards
   * @param {number} targetY - Y coordinate to move towards
   */
  setTarget(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
  }
  
  /**
   * Update particle position and properties
   * @param {string} phase - Current animation phase ('explode' or 'reconstruct')
   */
  update(phase) {
    if (phase === 'explode') {
      // Move outward with velocity
      this.x += this.vx;
      this.y += this.vy;
      
      // Apply friction (slow down smoothly)
      this.vx *= 0.95;
      this.vy *= 0.95;
      
      // Keep visible
      this.life = 1.0;
    } else if (phase === 'reconstruct') {
      // Smoothly move towards target position
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      
      // Smooth easing towards target
      this.x += dx * 0.15; // Slower, smoother
      this.y += dy * 0.15;
      
      // Keep visible
      this.life = 1.0;
    }
    
    // Keep alpha in sync with life
    this.alpha = Math.max(0, Math.min(1, this.life));
  }
  
  /**
   * Draw particle on canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  draw(ctx) {
    if (this.alpha <= 0) return; // Don't draw invisible particles
    
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    
    ctx.restore();
  }
}

/**
 * ParticleSystem Class
 * Manages collection of particles for Big Bang effect
 */
export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.phase = 'idle'; // 'idle', 'explode', 'disperse', 'reconstruct', 'complete'
    
    // Center of explosion
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
  }
  
  /**
   * Create particles at center point
   * @param {number} count - Number of particles to create
   */
  createParticles(count) {
    this.particles = [];
    
    // Color palette - varied colors (white, cyan, purple, pink)
    const colors = [
      '#FFFFFF', // White
      '#00F0FF', // Cyan (primary accent)
      '#7A00FF', // Purple (secondary accent)
      '#FF2E63', // Pink (warning accent)
      '#E5E5E5', // Light gray
      '#00CCFF', // Light cyan
      '#9A4FFF', // Light purple
    ];
    
    for (let i = 0; i < count; i++) {
      // Random color from palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Random size (1-3 pixels)
      const size = Math.random() * 2 + 1;
      
      // All particles start at center
      const particle = new Particle(this.centerX, this.centerY, color, size);
      
      this.particles.push(particle);
    }
    
    console.log(`💥 Created ${count} particles at center`);
  }
  
  /**
   * Smooth circular explosion in all directions
   * @param {number} speed - Explosion speed
   */
  explode(speed = 5) {
    this.phase = 'explode';
    
    // Each particle explodes in smooth circular pattern
    this.particles.forEach((particle, i) => {
      // Evenly distribute angles for smooth circular pattern
      const angle = (i / this.particles.length) * Math.PI * 2;
      
      // Varied speed for depth
      const particleSpeed = speed * (0.8 + Math.random() * 0.4);
      particle.explode(angle, particleSpeed);
    });
    
    console.log('💥 Smooth circular explosion!');
  }
  
  /**
   * Start reconstruction phase (particles smoothly return to form UI)
   * @param {Array} targets - Array of {x, y} positions for particles to move to
   */
  reconstruct(targets) {
    this.phase = 'reconstruct';
    
    // Assign each particle a target position
    this.particles.forEach((particle, i) => {
      if (targets[i]) {
        particle.setTarget(targets[i].x, targets[i].y);
      }
    });
    
    console.log('🔄 Particles flowing back to form website...');
  }
  
  /**
   * Mark animation as complete
   */
  complete() {
    this.phase = 'complete';
    console.log('✅ Particle animation complete');
  }
  
  /**
   * Update all particles
   */
  update() {
    if (this.phase === 'idle' || this.phase === 'complete') return;
    
    this.particles.forEach(particle => {
      particle.update(this.phase);
    });
  }
  
  /**
   * Draw all particles
   */
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw all particles
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
    });
  }
  
  /**
   * Resize canvas (call when window resizes)
   */
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }
}

export default ParticleSystem;