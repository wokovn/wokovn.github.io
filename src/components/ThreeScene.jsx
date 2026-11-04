import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);

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
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects for coordinated rotation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Central Core - Wireframe Polyhedron (The Distributed Node Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f7f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, wireframeMat);
    worldGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    worldGroup.add(innerMesh);

    // 2. Vertex Nodes (Glowing point vertices)
    const positions = coreGeo.attributes.position;
    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f7f7 });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      nodesGroup.add(node);
    }
    worldGroup.add(nodesGroup);

    // 3. Orbital Ring Particles (Event Horizon / Distributed Data Stream)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f7f7);
    const violetColor = new THREE.Color(0x8b5cf6);
    const emeraldColor = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      // Ring distribution with random spread
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.8;

      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(phi) * 1.2;
      const z = radius * Math.sin(theta);

      particlePos[i * 3] = x;
      particlePos[i * 3 + 1] = y;
      particlePos[i * 3 + 2] = z;

      // Color variation
      const mixRatio = Math.random();
      const chosenColor = mixRatio < 0.5 ? cyanColor : (mixRatio < 0.8 ? violetColor : emeraldColor);
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // 4. Mouse interaction with smooth interpolation (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.7;
      targetY = y * 0.7;
    };

    // Shockwave pulse on click
    let pulseScale = 1;
    let isPulsing = false;
    const handleClick = () => {
      isPulsing = true;
      pulseScale = 1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize handling with ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      worldGroup.rotation.y = elapsedTime * 0.12 + mouseX * 0.8;
      worldGroup.rotation.x = elapsedTime * 0.06 - mouseY * 0.8;

      // Polyhedron breathing animation
      const scaleBreath = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      coreMesh.scale.set(scaleBreath, scaleBreath, scaleBreath);
      innerMesh.rotation.y = -elapsedTime * 0.25;

      // Handle shockwave click pulse
      if (isPulsing) {
        pulseScale += 0.04;
        wireframeMat.opacity = Math.max(0.2, 0.8 - (pulseScale - 1) * 0.6);
        if (pulseScale > 1.8) {
          isPulsing = false;
          wireframeMat.opacity = 0.35;
        }
      }

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
      innerGeo.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
      wireframeMat.dispose();
      innerMat.dispose();
      nodeMat.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      {/* 3D Canvas HUD Info pill */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-400 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
        <span>Three.js WebGL • Interactive Node Core</span>
      </div>
    </div>
  );
}
