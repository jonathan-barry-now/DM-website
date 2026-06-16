"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WatchToComputerProps {
  onApplyClick?: () => void;
}

export function WatchToComputer({ onApplyClick }: WatchToComputerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentActIndex, setCurrentActIndex] = useState(0);

  // Loading Screen simulation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
      setLoadingProgress(progress);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // WebGL & GSAP Scroll Trigger integration
  useEffect(() => {
    if (isLoading) return;
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Lenis Smooth Scroll Initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Bind scroll updates to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 2. Three.js Scene Setup
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Cinematic Golden Lighting
    const ambientLight = new THREE.AmbientLight(0x0a0a0a);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf3d46b, 4, 18);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    // Dynamic Qubit Core light
    const coreLight = new THREE.PointLight(0xf3d46b, 0, 10);
    coreLight.position.set(0, -3, 0);
    scene.add(coreLight);

    // 4. Background Cinematic Dust Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 250;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 16;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xf3d46b,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 5. Materials Setup
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A24B,
      metalness: 0.9,
      roughness: 0.18,
    });

    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0xf3d46b,
      metalness: 0.95,
      roughness: 0.1,
    });

    const darkCasingMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.85,
      roughness: 0.35,
    });

    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf3d46b,
    });

    // 6. Helper: Procedural Gear Generator
    function createProceduralGear(radius: number, thickness: number, teethCount: number) {
      const gearGroup = new THREE.Group();
      
      // Core disc
      const coreGeo = new THREE.CylinderGeometry(radius * 0.8, radius * 0.8, thickness, 32);
      const core = new THREE.Mesh(coreGeo, goldMaterial);
      core.rotation.x = Math.PI / 2;
      gearGroup.add(core);

      // Spokes
      for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(radius * 1.6, thickness * 0.7, radius * 0.12);
        const spoke = new THREE.Mesh(spokeGeo, goldMaterial);
        spoke.rotation.z = (i * Math.PI) / 4;
        gearGroup.add(spoke);
      }

      // Outer Teeth
      const toothGeo = new THREE.BoxGeometry(radius * 0.16, thickness * 1.1, radius * 0.16);
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, highlightMat);
        tooth.position.x = Math.cos(angle) * radius;
        tooth.position.y = Math.sin(angle) * radius;
        tooth.rotation.z = angle;
        gearGroup.add(tooth);
      }

      return gearGroup;
    }

    // 7. Watch Model Group
    const watchGroup = new THREE.Group();
    scene.add(watchGroup);

    // Casing
    const casingRingGeo = new THREE.TorusGeometry(3.2, 0.3, 16, 100);
    const casingRing = new THREE.Mesh(casingRingGeo, goldMaterial);
    watchGroup.add(casingRing);

    const backPlateGeo = new THREE.CylinderGeometry(3.1, 3.1, 0.15, 64);
    const backPlate = new THREE.Mesh(backPlateGeo, darkCasingMat);
    backPlate.position.z = -0.2;
    backPlate.rotation.x = Math.PI / 2;
    watchGroup.add(backPlate);

    // Dial face plate
    const dialPlateGeo = new THREE.CylinderGeometry(2.9, 2.9, 0.08, 64);
    const dialPlate = new THREE.Mesh(dialPlateGeo, darkCasingMat);
    dialPlate.rotation.x = Math.PI / 2;
    watchGroup.add(dialPlate);

    // Numerals/Markers
    const markerGeo = new THREE.BoxGeometry(0.06, 0.3, 0.05);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const marker = new THREE.Mesh(markerGeo, highlightMat);
      marker.position.x = Math.cos(angle) * 2.5;
      marker.position.y = Math.sin(angle) * 2.5;
      marker.rotation.z = angle;
      watchGroup.add(marker);
    }

    // Internal Gears (Explodable)
    const gear1 = createProceduralGear(1.1, 0.12, 14);
    gear1.position.set(-0.6, -0.6, 0.1);
    watchGroup.add(gear1);

    const gear2 = createProceduralGear(0.8, 0.1, 10);
    gear2.position.set(0.8, -0.4, 0.1);
    watchGroup.add(gear2);

    const gear3 = createProceduralGear(0.6, 0.08, 8);
    gear3.position.set(0.5, 0.6, 0.1);
    watchGroup.add(gear3);

    // Watch Hands
    const handsGroup = new THREE.Group();
    handsGroup.position.z = 0.22;
    watchGroup.add(handsGroup);

    const hourHandGeo = new THREE.BoxGeometry(0.12, 1.2, 0.04);
    const hourHand = new THREE.Mesh(hourHandGeo, highlightMat);
    hourHand.position.y = 0.5;
    const hourHandPivot = new THREE.Group();
    hourHandPivot.add(hourHand);
    handsGroup.add(hourHandPivot);

    const minHandGeo = new THREE.BoxGeometry(0.08, 1.8, 0.04);
    const minHand = new THREE.Mesh(minHandGeo, highlightMat);
    minHand.position.y = 0.8;
    const minHandPivot = new THREE.Group();
    minHandPivot.add(minHand);
    handsGroup.add(minHandPivot);

    const secHandGeo = new THREE.BoxGeometry(0.03, 2.1, 0.02);
    const secHand = new THREE.Mesh(secHandGeo, highlightMat);
    secHand.position.y = 0.9;
    const secHandPivot = new THREE.Group();
    secHandPivot.add(secHand);
    handsGroup.add(secHandPivot);

    // 8. Quantum Computer Model Group
    const qcGroup = new THREE.Group();
    qcGroup.scale.setScalar(0.0001);
    scene.add(qcGroup);

    // Top Plate Flange
    const topPlateGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.12, 64);
    const topPlate = new THREE.Mesh(topPlateGeo, goldMaterial);
    topPlate.position.y = 3;
    qcGroup.add(topPlate);

    // Middle Plate
    const midPlateGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.1, 64);
    const midPlate = new THREE.Mesh(midPlateGeo, goldMaterial);
    midPlate.position.y = 0;
    qcGroup.add(midPlate);

    // Bottom Plate
    const botPlateGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 64);
    const botPlate = new THREE.Mesh(botPlateGeo, goldMaterial);
    botPlate.position.y = -3;
    qcGroup.add(botPlate);

    // Connecting rods
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const px = Math.cos(angle) * 1.3;
      const pz = Math.sin(angle) * 1.3;
      const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 6, 16);
      const rod = new THREE.Mesh(rodGeo, goldMaterial);
      rod.position.set(px, 0, pz);
      qcGroup.add(rod);
    }

    // Curved waveguide gold cables
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const points = [
        new THREE.Vector3(Math.cos(angle) * 2.4, 3, Math.sin(angle) * 2.4),
        new THREE.Vector3(Math.cos(angle + 0.6) * 1.8, 0.5, Math.sin(angle + 0.6) * 1.8),
        new THREE.Vector3(Math.cos(angle - 0.4) * 1.2, -2.9, Math.sin(angle - 0.4) * 1.2),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.035, 8, false);
      const tube = new THREE.Mesh(tubeGeo, goldMaterial);
      qcGroup.add(tube);
    }

    // Bottom Cryo Shroud (Wireframe can)
    const canMat = new THREE.MeshStandardMaterial({
      color: 0xC9A24B,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const canGeo = new THREE.CylinderGeometry(1.58, 1.58, 2.4, 32, 4, true);
    const cryoCan = new THREE.Mesh(canGeo, canMat);
    cryoCan.position.y = -1.8;
    qcGroup.add(cryoCan);

    // Glowing Core Mesh
    const coreMeshGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const coreMesh = new THREE.Mesh(coreMeshGeo, coreGlowMat);
    coreMesh.position.y = -3;
    qcGroup.add(coreMesh);

    // Floating micro-nodes
    const nodesGroup = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const node = new THREE.Mesh(nodeGeo, coreGlowMat);
      const rad = 0.6 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      node.position.set(
        Math.cos(theta) * rad,
        -3 + (Math.random() - 0.5) * 0.8,
        Math.sin(theta) * rad
      );
      nodesGroup.add(node);
    }
    qcGroup.add(nodesGroup);

    // 9. GSAP Scroll Animation Control Object
    const animObj = {
      watchScale: 1.0,
      watchRotX: 0,
      watchRotY: 0,
      
      // Explosion metrics
      casingOffsetZ: 0,
      dialOffsetZ: 0,
      gearsOffset: 0,
      handsOffsetZ: 0,

      // QC assembly metrics
      qcScale: 0.0001,
      qcTopY: 5,
      qcBotY: -5,
      qcCanY: -4.5,
      qcCoreScale: 0,
      qcCoreIntensity: 0,

      // Camera positioning parameters
      camX: 0,
      camY: 0,
      camZ: 8,
      lookAtY: 0,
    };

    // 10. Master GSAP ScrollTrigger Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIndex = 0;
          if (progress < 0.28) {
            activeIndex = 0;
          } else if (progress < 0.58) {
            activeIndex = 1;
          } else if (progress < 0.82) {
            activeIndex = 2;
          } else {
            activeIndex = 3;
          }
          setCurrentActIndex(activeIndex);
        },
      },
    });

    // Act I to Act II: Watch Explodes, Text crossfades
    tl.to(animObj, {
      casingOffsetZ: 2.5,
      dialOffsetZ: -1.6,
      gearsOffset: 2.0,
      handsOffsetZ: 1.0,
      watchRotX: 0.3,
      watchRotY: 0.5,
      duration: 1.5,
      ease: "power1.inOut",
    })
    // Fade overlay Act I text out, reveal Act II text
    .to(".text-act-1", { opacity: 0, y: -40, duration: 0.6 }, 0.4)
    .to(".text-act-2", { opacity: 1, y: 0, duration: 0.8 }, 0.9)

    // Act II to Act III: Morph to QC, Plates slide together, Can attaches
    .to(animObj, {
      watchScale: 0.001,
      qcScale: 1.0,
      qcTopY: 3,
      qcBotY: -3,
      qcCanY: -1.8,
      qcCoreScale: 1.0,
      qcCoreIntensity: 6,
      duration: 1.5,
      ease: "power2.inOut",
    })
    .to(".text-act-2", { opacity: 0, y: -40, duration: 0.6 }, 1.9)
    .to(".text-act-3", { opacity: 1, y: 0, duration: 0.8 }, 2.4)

    // Act III to CTA: Camera plunges inside QC Core close-up
    .to(animObj, {
      camX: 0.8,
      camY: -3.0,
      camZ: 3.2,
      lookAtY: -3.0,
      qcCoreIntensity: 10,
      duration: 1.5,
      ease: "power2.inOut",
    })
    .to(".text-act-3", { opacity: 0, y: -40, duration: 0.6 }, 3.4)
    .to(".text-act-4", { opacity: 1, y: 0, duration: 0.8 }, 3.9);

    // 11. Render Loop
    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();

      // Dynamic ticking/sweeping of hands in Act I
      if (animObj.watchScale > 0.01) {
        secHandPivot.rotation.z = -elapsed * 0.6;
        minHandPivot.rotation.z = -elapsed * 0.6 / 60;
        hourHandPivot.rotation.z = -elapsed * 0.6 / 720;

        // Gears spinning at gear ratios
        gear1.rotation.y = elapsed * 0.2;
        gear2.rotation.y = -elapsed * 0.28;
        gear3.rotation.y = elapsed * 0.36;
      }

      // Rotate nodes and core
      if (animObj.qcScale > 0.01) {
        nodesGroup.rotation.y = elapsed * 0.25;
        coreMesh.rotation.y = elapsed * 0.15;
      }

      // Slowly rotate backdrop dust
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.008;

      // Apply exploded metrics
      casingRing.position.z = animObj.casingOffsetZ;
      backPlate.position.z = -0.2 - animObj.casingOffsetZ * 0.3;
      dialPlate.position.z = -animObj.dialOffsetZ * 0.3;
      handsGroup.position.z = 0.22 + animObj.handsOffsetZ;

      // Radially scatter gears
      gear1.position.set(-0.6 - animObj.gearsOffset * 0.4, -0.6 - animObj.gearsOffset * 0.4, 0.1 - animObj.dialOffsetZ * 0.2);
      gear2.position.set(0.8 + animObj.gearsOffset * 0.5, -0.4 - animObj.gearsOffset * 0.3, 0.1 - animObj.dialOffsetZ * 0.2);
      gear3.position.set(0.5 + animObj.gearsOffset * 0.3, 0.6 + animObj.gearsOffset * 0.4, 0.1 - animObj.dialOffsetZ * 0.2);

      // Rotate/Scale watch
      watchGroup.scale.setScalar(animObj.watchScale);
      watchGroup.rotation.set(animObj.watchRotX, animObj.watchRotY + elapsed * 0.05, 0);

      // Assemble QC
      qcGroup.scale.setScalar(animObj.qcScale);
      qcGroup.rotation.y = elapsed * 0.08;
      topPlate.position.y = animObj.qcTopY;
      botPlate.position.y = animObj.qcBotY;
      cryoCan.position.y = animObj.qcCanY;
      coreMesh.scale.setScalar(animObj.qcCoreScale);
      coreLight.intensity = animObj.qcCoreIntensity;

      // Camera & Camera target positioning
      camera.position.set(animObj.camX, animObj.camY, animObj.camZ);
      camera.lookAt(0, animObj.lookAtY, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 12. Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      renderer.dispose();
    };
  }, [isLoading]);

  // Jump scroll to Act trigger index
  const scrollToAct = (index: number) => {
    if (!lenisRef.current) return;
    const targetScrollY = index * window.innerHeight;
    lenisRef.current.scrollTo(targetScrollY, { duration: 1.5 });
  };

  const handleNextClick = () => {
    if (currentActIndex === 3) {
      scrollToAct(0);
    } else {
      scrollToAct(currentActIndex + 1);
    }
  };

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Loading Calibrator Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 pointer-events-auto select-none">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Spinning/pulsing loader visual */}
            <div className="absolute inset-0 rounded-full border border-[#f3d46b]/20 animate-ping duration-1000"></div>
            <div className="absolute inset-2 rounded-full border border-t-[#f3d46b] border-l-[#f3d46b] animate-spin" style={{ animationDuration: "1.5s" }}></div>
            <div className="absolute inset-4 rounded-full border border-b-[#f3d46b]/30 animate-spin" style={{ animationDuration: "3s" }}></div>
            <div className="font-mono text-[10px] text-[#f3d46b] font-bold tracking-[0.2em]">{loadingProgress}%</div>
          </div>
          <div className="mt-8 space-y-2 text-center">
            <span className="text-[#f3d46b] font-mono text-[11px] font-bold tracking-[0.3em] uppercase block">
              CALIBRATING THE MACHINE...
            </span>
            <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block">
              Initializing WebGL and core narrative arrays
            </span>
          </div>
        </div>
      )}

      {/* Floating Act "NEXT" Navigation Bar */}
      {!isLoading && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-zinc-950/80 border border-zinc-800/80 px-6 py-3 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-6 pointer-events-auto">
          <div className="flex items-center gap-2">
            {["I", "II", "III", "CTA"].map((act, index) => (
              <button
                key={act}
                onClick={() => scrollToAct(index)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all border ${
                  currentActIndex === index
                    ? "bg-[#f3d46b] text-black border-[#f3d46b]"
                    : "text-zinc-500 hover:text-white border-zinc-800"
                }`}
              >
                {act}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <button
            onClick={handleNextClick}
            className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-[#f3d46b] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            {currentActIndex === 3 ? "TOP" : "NEXT"}
            <span className="text-xs">→</span>
          </button>
        </div>
      )}

      {/* 3D WebGL Background Canvas */}
      {!isLoading && (
        <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden pointer-events-none bg-black">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      )}

      {/* 5 Scroll Height Sections to drive timeline trigger points */}
      {!isLoading && (
        <div ref={containerRef} className="relative z-10 w-full h-[450vh] pointer-events-none">
          
          {/* Act I Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />
          
          {/* Act II Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />

          {/* Act III Section trigger */}
          <div className="w-full h-screen flex items-center justify-start max-w-7xl mx-auto px-6" />

          {/* CTA Section trigger */}
          <div className="w-full h-screen flex items-center justify-center max-w-7xl mx-auto px-6" />
        </div>
      )}

      {/* Fixed Layout Cinematic Text Reveals */}
      {!isLoading && (
        <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none flex items-center justify-start">
          <div className="container mx-auto px-6 max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full">
              
              {/* Left Column: text details */}
              <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left space-y-6 relative h-[400px]">
                
                {/* Act I Text Panel */}
                <div className="absolute text-act-1 opacity-100 max-w-md pointer-events-auto space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">
                    Act I — The Heritage
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase font-sans">
                    Now is the time to <br />
                    <span className="text-[#f3d46b]">harness AI</span> for your raise
                  </h1>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Old-world discipline meets next-generation execution. The gold antique watch movement represents the classic relational mechanics of capital raising, fully assembled and ticking.
                  </p>
                </div>

                {/* Act II Text Panel */}
                <div className="absolute text-act-2 opacity-0 translate-y-10 max-w-md pointer-events-auto space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">
                    Act II — The Disassembly
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase font-sans">
                    Deconstruct the <br />
                    <span className="text-[#f3d46b]">Capital Stack</span>
                  </h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Timeless structures shatter into functional components. Manual workflows explode to isolate raw relationship signals, secure access nodes, and authority builders.
                  </p>
                </div>

                {/* Act III Text Panel */}
                <div className="absolute text-act-3 opacity-0 translate-y-10 max-w-md pointer-events-auto space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold">
                    Act III — The Synthesis
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase font-sans">
                    The Quantum <br />
                    <span className="text-[#f3d46b]">Engine Assembles</span>
                  </h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">
                    Those same components reassemble into a high-density, cryogenic quantum computer stack. Your raise is now powered by automated, interconnected momentum.
                  </p>
                </div>

                {/* Act IV / CTA Text Panel (Centered layout override when active) */}
                <div className="absolute text-act-4 opacity-0 translate-y-10 w-full max-w-xl left-1/2 -translate-x-1/2 text-center pointer-events-auto space-y-6">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3d46b] font-bold block">
                    Act IV — Infinite Scaling
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none uppercase font-sans">
                    CALIBRATE YOUR <br />
                    <span className="text-[#f3d46b]">CAPITAL PIPELINE</span>
                  </h2>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md mx-auto">
                    Generate an interactive, high-density 12-month Investor Relations and narrative campaign strategy calibrated for your traction, stage, and goals.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onApplyClick}
                      className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#f3d46b] to-[#fff1a6] px-10 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(243,212,107,0.4)] cursor-pointer font-sans"
                    >
                      Get Your Free 12 Month Strategy
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
