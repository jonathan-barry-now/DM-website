"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const waveVertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin((p.x * 0.6) + uTime * 0.65) * 0.16;
    p.z += sin((p.y * 0.9) - uTime * 0.45) * 0.12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const waveFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  float band(float value, float size) {
    return smoothstep(size, 0.0, abs(value));
  }

  void main() {
    vec2 uv = vUv;
    float causticA = band(sin((uv.x * 16.0 + uv.y * 8.0 + uTime * 0.55) * 3.14159), 0.055);
    float causticB = band(sin((uv.x * -10.0 + uv.y * 18.0 - uTime * 0.38) * 3.14159), 0.045);
    float veil = smoothstep(0.0, 0.7, 1.0 - distance(uv, vec2(0.5)));
    float alpha = (causticA * 0.45 + causticB * 0.35) * veil * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type PanelSpec = {
  title: string;
  metric: string;
  caption: string;
  accent: string;
  position: [number, number, number];
  scale?: [number, number, number];
};

function makePanelTexture(spec: Omit<PanelSpec, "position" | "scale">) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 448;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const accent = spec.accent;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(7, 20, 22, 0.92)");
  gradient.addColorStop(0.58, "rgba(3, 8, 8, 0.86)");
  gradient.addColorStop(1, "rgba(40, 29, 8, 0.72)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(28, 28, 968, 392, 28);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.42;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = 70; x < 980; x += 76) {
    ctx.beginPath();
    ctx.moveTo(x, 62);
    ctx.lineTo(x, 388);
    ctx.stroke();
  }
  for (let y = 86; y < 390; y += 54) {
    ctx.beginPath();
    ctx.moveTo(62, y);
    ctx.lineTo(954, y);
    ctx.stroke();
  }

  ctx.fillStyle = accent;
  ctx.font = "700 32px Arial";
  ctx.letterSpacing = "0px";
  ctx.fillText(spec.title.toUpperCase(), 76, 112);

  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.font = "800 92px Arial";
  ctx.fillText(spec.metric, 76, 230);

  ctx.fillStyle = "rgba(214, 224, 218, 0.78)";
  ctx.font = "400 32px Arial";
  ctx.fillText(spec.caption, 80, 294);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(76, 346, 560, 12);
  ctx.fillStyle = accent;
  ctx.fillRect(76, 346, 410, 12);

  ctx.beginPath();
  ctx.arc(870, 128, 46, 0, Math.PI * 2);
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.65;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addCapitalPanel(scene: THREE.Scene, spec: PanelSpec) {
  const texture = makePanelTexture(spec);
  if (!texture) {
    return null;
  }

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    }),
  );
  sprite.position.set(...spec.position);
  sprite.scale.set(...(spec.scale ?? [4.3, 1.88, 1]));
  scene.add(sprite);
  return sprite;
}

function makeCurrentCurve(index: number) {
  const points: THREE.Vector3[] = [];
  for (let step = 0; step <= 14; step += 1) {
    const z = 15 - step * 5.2;
    const radius = 2.1 + index * 0.5 + Math.sin(step * 0.8 + index) * 0.6;
    const x = Math.sin(step * 0.95 + index * 1.7) * radius;
    const y = Math.cos(step * 0.72 + index * 0.9) * (1.45 + index * 0.17);
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

export function LiquidCapitalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061212, 0.046);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      120,
    );
    camera.position.set(0, 0.2, 15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0x8ad9d4, 1.35);
    scene.add(ambient);

    const goldLight = new THREE.PointLight(0xf0c85a, 18, 38);
    goldLight.position.set(-3, 2.6, 8);
    scene.add(goldLight);

    const tealLight = new THREE.PointLight(0x37d4c6, 14, 42);
    tealLight.position.set(4, -1.8, -10);
    scene.add(tealLight);

    const waveMaterials: THREE.ShaderMaterial[] = [];
    const waveGeometry = new THREE.PlaneGeometry(28, 17, 96, 56);
    const wavePlacements = [
      { color: 0x49dfcf, opacity: 0.16, position: [0, -1, 8], rotation: [0.32, 0.02, -0.1] },
      { color: 0xf0c85a, opacity: 0.11, position: [0, 1.2, -5], rotation: [-0.28, 0.1, 0.16] },
      { color: 0x95fff6, opacity: 0.1, position: [1.5, -0.7, -20], rotation: [0.22, -0.2, -0.08] },
      { color: 0xf6d37a, opacity: 0.08, position: [-1.7, 0.8, -35], rotation: [-0.18, 0.24, 0.18] },
    ] as const;

    wavePlacements.forEach((placement) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: waveVertexShader,
        fragmentShader: waveFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(placement.color) },
          uOpacity: { value: placement.opacity },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(waveGeometry, material);
      mesh.position.set(placement.position[0], placement.position[1], placement.position[2]);
      mesh.rotation.set(placement.rotation[0], placement.rotation[1], placement.rotation[2]);
      root.add(mesh);
      waveMaterials.push(material);
    });

    const smallScreen = window.innerWidth < 760;
    const particleCount = smallScreen ? 900 : 1800;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBase = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particlePhase = new Float32Array(particleCount);

    const gold = new THREE.Color("#f3d46b");
    const mint = new THREE.Color("#7effee");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 7.2;
      const z = 15 - Math.random() * 72;
      particleBase[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.3;
      particleBase[i3 + 1] = Math.sin(angle) * radius * 0.58 + (Math.random() - 0.5) * 2;
      particleBase[i3 + 2] = z;
      particlePositions[i3] = particleBase[i3];
      particlePositions[i3 + 1] = particleBase[i3 + 1];
      particlePositions[i3 + 2] = particleBase[i3 + 2];
      particlePhase[i] = Math.random() * Math.PI * 2;

      const mixColor = Math.random() > 0.52 ? gold : mint;
      const color = mixColor.clone().lerp(white, Math.random() * 0.25);
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: smallScreen ? 0.038 : 0.032,
      transparent: true,
      opacity: 0.82,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const ribbonGroup = new THREE.Group();
    root.add(ribbonGroup);
    for (let i = 0; i < 7; i += 1) {
      const tube = new THREE.TubeGeometry(makeCurrentCurve(i), 220, i % 2 === 0 ? 0.014 : 0.009, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xf0c85a : 0x58f4e5,
        transparent: true,
        opacity: i % 2 === 0 ? 0.28 : 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(tube, material);
      ribbonGroup.add(mesh);
    }

    const ringGroup = new THREE.Group();
    root.add(ringGroup);
    const ringMaterials = [
      new THREE.MeshBasicMaterial({
        color: 0xf0c85a,
        transparent: true,
        opacity: 0.19,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x58f4e5,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ];
    for (let i = 0; i < 22; i += 1) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.45 + (i % 5) * 0.28, 0.008 + (i % 3) * 0.003, 8, 96),
        ringMaterials[i % 2],
      );
      torus.position.z = 12 - i * 3.15;
      torus.rotation.z = Math.random() * Math.PI;
      torus.userData.spin = (Math.random() - 0.5) * 0.006;
      ringGroup.add(torus);
    }

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0c85a,
      emissive: 0x6f4c09,
      emissiveIntensity: 1.5,
      roughness: 0.32,
      metalness: 0.55,
    });
    const mintNodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x70fff1,
      emissive: 0x126b63,
      emissiveIntensity: 1.7,
      roughness: 0.2,
      metalness: 0.35,
    });
    const nodeGeometry = new THREE.IcosahedronGeometry(0.12, 2);
    const nodePositions = [
      [-2.8, 1.6, 5],
      [2.6, -1.1, -4],
      [-3.3, -1.5, -14],
      [3.1, 1.2, -24],
      [-2.2, 1.5, -34],
      [2.7, -1.2, -45],
    ] as const;
    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(nodeGeometry, index % 2 ? mintNodeMaterial : nodeMaterial);
      node.position.set(position[0], position[1], position[2]);
      node.userData.float = Math.random() * Math.PI * 2;
      root.add(node);
    });

    const panels = [
      {
        title: "Investor Current",
        metric: "$100M+",
        caption: "tracked through one live pipeline",
        accent: "#f3d46b",
        position: [-3.35, 1.38, 2.5],
      },
      {
        title: "Follow-up Flow",
        metric: "45%",
        caption: "lift from consistent investor touchpoints",
        accent: "#7effee",
        position: [3.25, -1.05, -13],
      },
      {
        title: "Signal Engine",
        metric: "93%",
        caption: "of allocators check founder credibility",
        accent: "#f3d46b",
        position: [-3.2, 1.1, -28],
      },
      {
        title: "Launch Track",
        metric: "24h",
        caption: "priority review for founding partners",
        accent: "#7effee",
        position: [2.9, -0.85, -43],
      },
    ] satisfies PanelSpec[];

    const panelSprites = panels
      .map((panel) => addCapitalPanel(scene, panel))
      .filter(Boolean) as THREE.Sprite[];

    const pointer = new THREE.Vector2(0, 0);
    let scrollTarget = 0;
    let scrollProgress = 0;

    const updateScrollTarget = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(1, Math.max(0, window.scrollY / max));
    };
    updateScrollTarget();

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      scrollProgress += (scrollTarget - scrollProgress) * 0.072;

      const trackZ = 15 - scrollProgress * 59;
      camera.position.x += (pointer.x * 0.75 + Math.sin(scrollProgress * Math.PI * 3) * 0.22 - camera.position.x) * 0.055;
      camera.position.y += (0.12 + pointer.y * 0.36 + Math.sin(scrollProgress * Math.PI * 4.2) * 0.5 - camera.position.y) * 0.055;
      camera.position.z += (trackZ - camera.position.z) * 0.07;
      camera.lookAt(pointer.x * 0.35, pointer.y * 0.25, camera.position.z - 8.4);

      goldLight.position.z = camera.position.z - 2.5;
      tealLight.position.z = camera.position.z - 12;

      root.rotation.y = pointer.x * 0.035 + Math.sin(elapsed * 0.12) * 0.015;
      root.rotation.x = pointer.y * 0.016;
      ribbonGroup.rotation.z = elapsed * 0.025;
      ringGroup.rotation.z = -elapsed * 0.018;

      waveMaterials.forEach((material, index) => {
        material.uniforms.uTime.value = elapsed + index * 2.3 + scrollProgress * 8;
      });

      ringGroup.children.forEach((ring) => {
        ring.rotation.z += ring.userData.spin;
      });

      root.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry === nodeGeometry) {
          child.rotation.x += 0.005;
          child.rotation.y += 0.009;
          child.position.y += Math.sin(elapsed * 0.9 + child.userData.float) * 0.0009;
        }
      });

      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        const phase = particlePhase[i];
        positions[i3] = particleBase[i3] + Math.sin(elapsed * 0.34 + phase) * 0.22;
        positions[i3 + 1] = particleBase[i3 + 1] + Math.cos(elapsed * 0.28 + phase) * 0.12;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      particles.rotation.z = elapsed * 0.01;

      panelSprites.forEach((sprite, index) => {
        sprite.material.opacity = 0.72 + Math.sin(elapsed * 0.9 + index) * 0.12;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      panelSprites.forEach((sprite) => {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      waveGeometry.dispose();
      waveMaterials.forEach((material) => material.dispose());
      ringMaterials.forEach((material) => material.dispose());
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      mintNodeMaterial.dispose();
      root.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-svh w-screen" />;
}
