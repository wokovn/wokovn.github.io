import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for coordinated movement
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Neobrutalist Floating Centerpiece: Chunky Wireframe Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    
    // Solid flat colored inner mesh
    const innerMat = new THREE.MeshBasicMaterial({ 
      color: 0xFFE600, // Neo Yellow
    });
    const innerMesh = new THREE.Mesh(coreGeo, innerMat);
    mainGroup.add(innerMesh);

    // Chunky black wireframe outline (signature neobrutal look!)
    const wireGeo = new THREE.WireframeGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({ 
      color: 0x121316, 
      linewidth: 3 
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    mainGroup.add(wireMesh);

    // 2. Playful Satellite Geometries (Torus, Cube, Dodecahedron)
    const sat1Geo = new THREE.TorusGeometry(0.5, 0.2, 8, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x00F0FF }); // Neo Cyan
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    sat1.position.set(2.4, 1.2, -0.5);
    const sat1Wire = new THREE.LineSegments(new THREE.WireframeGeometry(sat1Geo), wireMat);
    sat1.add(sat1Wire);
    mainGroup.add(sat1);

    const sat2Geo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0xFF6584 }); // Neo Pink
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    sat2.position.set(-2.5, -1.0, 0.5);
    const sat2Wire = new THREE.LineSegments(new THREE.WireframeGeometry(sat2Geo), wireMat);
    sat2.add(sat2Wire);
    mainGroup.add(sat2);

    const sat3Geo = new THREE.OctahedronGeometry(0.6);
    const sat3Mat = new THREE.MeshBasicMaterial({ color: 0xA388EE }); // Neo Purple
    const sat3 = new THREE.Mesh(sat3Geo, sat3Mat);
    sat3.position.set(1.8, -1.8, 0.8);
    const sat3Wire = new THREE.LineSegments(new THREE.WireframeGeometry(sat3Geo), wireMat);
    sat3.add(sat3Wire);
    mainGroup.add(sat3);

    // 3. Playful Pop Floating Confetti / Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xFFE600),
      new THREE.Color(0xFF6584),
      new THREE.Color(0x00F0FF),
      new THREE.Color(0xA388EE),
      new THREE.Color(0x121316),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 4. Mouse Tracking & Physics
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.9;
      targetRotationX = y * 0.6;
    };

    // On Click: Fun bounce impulse
    let bounceImpulse = 0;
    const handleClick = () => {
      bounceImpulse = 0.35;
      setClickCount(prev => prev + 1);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05 + 0.005;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Bounce impulse decay
      if (bounceImpulse > 0) {
        bounceImpulse *= 0.92;
        if (bounceImpulse < 0.01) bounceImpulse = 0;
      }

      // Wobble & orbit satellites
      sat1.rotation.x = elapsed * 1.2;
      sat1.rotation.y = elapsed * 0.8;
      sat1.position.y = 1.2 + Math.sin(elapsed * 2) * 0.25;

      sat2.rotation.x = -elapsed * 0.9;
      sat2.rotation.z = elapsed * 1.1;
      sat2.position.x = -2.5 + Math.cos(elapsed * 1.8) * 0.2;

      sat3.rotation.y = elapsed * 1.5;
      sat3.position.y = -1.8 + Math.cos(elapsed * 2.2) * 0.25;

      // Core Scale Pulse
      const scale = 1 + Math.sin(elapsed * 3) * 0.04 + bounceImpulse;
      innerMesh.scale.set(scale, scale, scale);
      wireMesh.scale.set(scale * 1.02, scale * 1.02, scale * 1.02);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      sat1Geo.dispose();
      sat1Mat.dispose();
      sat2Geo.dispose();
      sat2Mat.dispose();
      sat3Geo.dispose();
      sat3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center cursor-pointer select-none">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      {/* Playful Floating Badge */}
      <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#121316] bg-neo-yellow text-xs font-mono font-bold shadow-neo-sm transform rotate-2 hover:rotate-0 transition-transform">
        <span className="w-2 h-2 rounded-full bg-neo-pink animate-ping" />
        <span>CLICK 3D CORE ({clickCount})</span>
      </div>
    </div>
  );
}
