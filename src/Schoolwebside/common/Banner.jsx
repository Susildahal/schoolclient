import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutBanner({ title, subtitle, badge  }) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [particleEnergy, setParticleEnergy] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  // Calculate center position when component mounts or resizes
  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (!isHovering) {
          setDotPosition({ x: rect.width / 2, y: rect.height / 2 });
        }
      }
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, [isHovering]);

  // Particle class for floating effect
  class Particle {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 6 + 2;
      this.energy = 0;
      
      const colors = [
        'rgba(100, 180, 255, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(255, 140, 0, 0.8)',
        'rgba(180, 150, 255, 0.8)',
        'rgba(160, 200, 255, 0.8)',
        'rgba(200, 100, 150, 0.8)',
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x - this.radius < 0 || this.x + this.radius > this.width) {
        this.vx *= -1;
        this.x = Math.max(this.radius, Math.min(this.width - this.radius, this.x));
      }
      if (this.y - this.radius < 0 || this.y + this.radius > this.height) {
        this.vy *= -1;
        this.y = Math.max(this.radius, Math.min(this.height - this.radius, this.y));
      }

      // Energy decay
      this.energy *= 0.93;
    }

    draw(ctx) {
      const radius = this.radius + this.energy * 4;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add glow when energized
      if (this.energy > 0.1) {
        ctx.shadowColor = this.color.replace('0.8', String(this.energy * 0.8));
        ctx.shadowBlur = this.energy * 20;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    addEnergy(x, y, power) {
      const dx = this.x - x;
      const dy = this.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const range = 150;

      if (distance < range) {
        const force = (1 - distance / range) * power;
        this.energy = Math.max(this.energy, force);
      }
    }
  }

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      
      // Reinitialize particles on resize
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 30; i++) {  // Reduced from 50 to 30 particles
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particlesRef.current.push(new Particle(x, y, canvas.width, canvas.height));
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      let maxEnergy = 0;
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
        maxEnergy = Math.max(maxEnergy, particle.energy);
      });

      setParticleEnergy(maxEnergy);

      // Draw network connections only around mouse when hovering
      if (isHovering) {
        const connectionDistance = 120; // Reduced from 180 for smaller network area
        const mouseInfluenceRadius = 180; // Reduced from 250 for smaller network area

        // Only draw connections for particles near mouse
        const nearbyParticles = particlesRef.current.filter(p => {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          return Math.sqrt(dx * dx + dy * dy) < mouseInfluenceRadius;
        });

        // Draw connections between nearby particles
        for (let i = 0; i < nearbyParticles.length; i++) {
          for (let j = i + 1; j < nearbyParticles.length; j++) {
            const dx = nearbyParticles[i].x - nearbyParticles[j].x;
            const dy = nearbyParticles[i].y - nearbyParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const opacity = (1 - distance / connectionDistance) * 0.6;
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(nearbyParticles[i].x, nearbyParticles[i].y);
              ctx.lineTo(nearbyParticles[j].x, nearbyParticles[j].y);
              ctx.stroke();
            }
          }

          // Draw connection to mouse
          const dx = nearbyParticles[i].x - mousePos.x;
          const dy = nearbyParticles[i].y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.8;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(nearbyParticles[i].x, nearbyParticles[i].y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, mousePos]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    
    // Update dot position to follow cursor when hovering (relative to container)
    if (isHovering) {
      setDotPosition({ x: x, y: y });
    }

    // Add energy to nearby particles
    if (isHovering) {
      particlesRef.current.forEach(particle => {
        particle.addEnergy(x, y, 0.8);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Return dot to center when leaving (relative to container)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDotPosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  };

  return (
    <div className="w-full   mt-[82px]  overflow-hidden"
  
    >
      <motion.div
        ref={containerRef}
        className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 rounded to-blue-800 overflow-hidden  duration-300 "
        style={{ 
          height: '300px',
          boxShadow: particleEnergy > 0.2 ? '0 0 40px rgba(100, 180, 255, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
          cursor: 'auto',
        
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"  />

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-8">
          <div className="text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20"
            >
              <span className="text-sm text-white/90 font-medium">{badge}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="text-xl md:text-xl font-bold text-white tracking-tight drop-shadow-2xl mb-3 capitalize"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="text-sm md:text-sm text-white/90 font-light tracking-wide drop-shadow-lg"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Decorative gradient overlay on edges */}
        <div className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            borderBottomRightRadius: '3rem'
          }}
        />

        {/* Small green circle that follows cursor center - only within banner */}
        {isHovering && (
          <motion.div
            className="absolute w-2 h-2 bg-green-400 rounded-full pointer-events-none z-50 shadow-lg"
            style={{
              boxShadow: '0 0 10px rgba(74, 222, 128, 0.8), 0 0 20px rgba(74, 222, 128, 0.4)',
              transform: 'translate(-50%, -50%)',
              left: dotPosition.x,
              top: dotPosition.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
