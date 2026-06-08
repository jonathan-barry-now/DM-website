/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Preload, useTexture } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

type CinematicHeroSceneProps = {
    scrollProgress: MotionValue<number>;
};

type ParticleSeed = {
    lane: number;
    offset: number;
    radius: number;
    speed: number;
    drift: number;
};

const logoVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const logoFragmentShader = `
  uniform sampler2D uMap;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec4 source = texture2D(uMap, vUv);
    float luma = dot(source.rgb, vec3(0.299, 0.587, 0.114));
    float ink = pow(1.0 - smoothstep(0.18, 0.82, luma), 1.35) * source.a;
    vec3 gold = vec3(1.0, 0.73, 0.22);
    gl_FragColor = vec4(gold * (0.54 + ink * 0.46), ink * uOpacity);
  }
`;

function RenderTuning() {
    const { gl } = useThree();
    useEffect(() => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.06;
    }, [gl]);
    return null;
}

function CameraPullback({ scrollProgress }: CinematicHeroSceneProps) {
    const { camera, pointer } = useThree();
    const target = useMemo(() => new THREE.Vector3(), []);
    const focus = useMemo(() => new THREE.Vector3(), []);
    useFrame(() => {
        const raw = scrollProgress.get();
        const eased = raw * raw * (3 - 2 * raw);
        target.set(
            pointer.x * 0.32,
            0.12 + eased * 1.15 + pointer.y * 0.16,
            THREE.MathUtils.lerp(6.2, 16.8, eased),
        );
        const perspectiveCamera = camera as THREE.PerspectiveCamera;
        perspectiveCamera.position.lerp(target, 0.055);
        perspectiveCamera.fov = THREE.MathUtils.lerp(perspectiveCamera.fov, THREE.MathUtils.lerp(36, 51, eased), 0.065);
        perspectiveCamera.updateProjectionMatrix();
        focus.set(pointer.x * 0.14, 0.08 + pointer.y * 0.08, 0);
        camera.lookAt(focus);
    });
    return null;
}

function DeepSpace() {
    const pointsRef = useRef<THREE.Points>(null);
    const geometry = useMemo(() => {
        const count = 1800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const gold = new THREE.Color("#f3d46b");
        const white = new THREE.Color("#ffffff");
        const navy = new THREE.Color("#0a1a42");
        for (let index = 0; index < count; index += 1) {
            const i3 = index * 3;
            const radius = 16 + Math.random() * 54;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
            positions[i3 + 1] = Math.cos(phi) * radius * 0.72;
            positions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 12;
            const color = Math.random() > 0.76 ? gold.clone() : white.clone().lerp(navy, Math.random() * 0.55);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return starGeometry;
    }, []);
    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = clock.elapsedTime * 0.006;
        pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.018;
    });
    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial size={0.055} vertexColors transparent opacity={0.88} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
}

function LiquidCapitalParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const data = useMemo(() => {
        const count = 2100;
        const lanes = 11;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const seeds: ParticleSeed[] = [];
        const gold = new THREE.Color("#f3d46b");
        const paleGold = new THREE.Color("#fff2b5");
        const white = new THREE.Color("#ffffff");
        for (let index = 0; index < count; index += 1) {
            const i3 = index * 3;
            const lane = index % lanes;
            seeds.push({
                lane,
                offset: Math.random(),
                radius: 1.95 + Math.random() * 1.12,
                speed: 0.018 + Math.random() * 0.023,
                drift: Math.random() * Math.PI * 2,
            });
            const color = gold.clone().lerp(Math.random() > 0.82 ? white : paleGold, Math.random() * 0.55);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        const streamGeometry = new THREE.BufferGeometry();
        streamGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        streamGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return { geometry: streamGeometry, positions, seeds };
    }, []);
    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        for (let index = 0; index < data.seeds.length; index += 1) {
            const seed = data.seeds[index];
            const i3 = index * 3;
            const flow = (seed.offset + time * seed.speed) % 1;
            const lanePhase = seed.lane * 0.58;
            const orbit = flow * Math.PI * 5.4 + lanePhase;
            const radius = seed.radius + Math.sin(flow * Math.PI * 6 + seed.drift) * 0.18;
            data.positions[i3] = Math.cos(orbit) * radius;
            data.positions[i3 + 1] = Math.sin(flow * Math.PI * 2.4 + seed.drift) * 0.82 + (flow - 0.5) * 2.7;
            data.positions[i3 + 2] = Math.sin(orbit) * radius * 0.68;
        }
        const positionAttribute = data.geometry.getAttribute("position") as THREE.BufferAttribute;
        positionAttribute.needsUpdate = true;
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.1;
            pointsRef.current.rotation.z = Math.sin(time * 0.12) * 0.12;
        }
    });
    return (
        <points ref={pointsRef} geometry={data.geometry}>
            <pointsMaterial size={0.044} vertexColors transparent opacity={0.9} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
    );
}

function LiquidCapitalRibbons() {
    const groupRef = useRef<THREE.Group>(null);
    const ribbons = useMemo(() => {
        return Array.from({ length: 7 }, (_, lane) => {
            const points: THREE.Vector3[] = [];
            for (let step = 0; step <= 132; step += 1) {
                const t = step / 132;
                const angle = t * Math.PI * 5 + lane * 0.82;
                const radius = 2.04 + Math.sin(t * Math.PI * 4 + lane) * 0.32 + lane * 0.025;
                points.push(new THREE.Vector3(
                    Math.cos(angle) * radius,
                    (t - 0.5) * 3.4 + Math.sin(t * Math.PI * 6 + lane) * 0.34,
                    Math.sin(angle) * radius * 0.66,
                ));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            return new THREE.TubeGeometry(curve, 220, lane % 2 === 0 ? 0.012 : 0.007, 8, false);
        });
    }, []);
    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = clock.elapsedTime * 0.075;
        groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.16) * 0.08;
    });
    return (
        <group ref={groupRef}>
            {ribbons.map((geometry, index) => (
                <mesh key={index} geometry={geometry}>
                    <meshBasicMaterial color={index % 2 === 0 ? "#f3d46b" : "#fff2b5"} transparent opacity={index % 2 === 0 ? 0.22 : 0.14} depthWrite={false} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

function GoldOrb() {
    const groupRef = useRef<THREE.Group>(null);
    const facetsRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.18;
            groupRef.current.rotation.x = Math.sin(time * 0.16) * 0.08;
        }
        if (facetsRef.current) {
            facetsRef.current.rotation.y = -time * 0.12;
            facetsRef.current.rotation.z = time * 0.08;
        }
    });
    return (
        <group ref={groupRef}>
            <pointLight color="#f3d46b" intensity={26} distance={14} decay={2} />
            <mesh>
                <sphereGeometry args={[1.42, 96, 96]} />
                <MeshDistortMaterial color="#d4af37" emissive="#9b5f0d" emissiveIntensity={0.68} metalness={0.88} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} distort={0.12} speed={0.58} />
            </mesh>
            <mesh ref={facetsRef}>
                <icosahedronGeometry args={[1.5, 4]} />
                <meshBasicMaterial color="#fff1a6" wireframe transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={1.34}>
                <sphereGeometry args={[1.42, 64, 64]} />
                <meshBasicMaterial color="#f3d46b" transparent opacity={0.13} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
}

function VolumetricKeyLight() {
    const beamRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!beamRef.current) return;
        beamRef.current.rotation.z = -0.62 + Math.sin(clock.elapsedTime * 0.16) * 0.025;
    });
    return (
        <>
            <spotLight position={[-5.2, 4.2, 5.5]} color="#fff4ce" intensity={44} angle={0.24} penumbra={0.9} distance={40} />
            <mesh ref={beamRef} position={[-2.8, 2.35, 1.8]} rotation={[0.78, 0.05, -0.62]}>
                <coneGeometry args={[3.2, 12, 80, 1, true]} />
                <meshBasicMaterial color="#fff0b4" transparent opacity={0.036} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
        </>
    );
}

function NarwhalGlyph() {
    const texture = useTexture("/narwal_logo.png");
    const groupRef = useRef<THREE.Group>(null);
    const material = useMemo(
        () => new THREE.ShaderMaterial({
            uniforms: { uMap: { value: texture }, uOpacity: { value: 0.17 } },
            vertexShader: logoVertexShader,
            fragmentShader: logoFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        }),
        [texture],
    );
    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.uniforms.uMap.value = texture;
    }, [material, texture]);
    useFrame(({ clock }) => {
        const time = clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = -0.34 + Math.sin(time * 0.18) * 0.05;
            groupRef.current.position.y = -1.22 + Math.sin(time * 0.34) * 0.09;
        }
        material.uniforms.uOpacity.value = 0.13 + Math.sin(time * 0.48) * 0.035;
    });
    return (
        <group ref={groupRef} position={[3.35, -1.22, -2.65]} rotation={[-0.08, -0.34, 0.1]}>
            <mesh material={material}>
                <planeGeometry args={[1.9, 1.42]} />
            </mesh>
        </group>
    );
}

function SceneContents({ scrollProgress }: CinematicHeroSceneProps) {
    return (
        <>
            <RenderTuning />
            <CameraPullback scrollProgress={scrollProgress} />
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000616", 11, 44]} />
            <ambientLight color="#ffffff" intensity={0.08} />
            <pointLight position={[5, -3, -7]} color="#0b2f66" intensity={2.2} distance={28} />
            <VolumetricKeyLight />
            <DeepSpace />
            <group position={[0, 0.05, 0]}>
                <LiquidCapitalRibbons />
                <LiquidCapitalParticles />
                <GoldOrb />
            </group>
            <NarwhalGlyph />
            <Preload all />
        </>
    );
}

export default function CinematicHeroScene({ scrollProgress }: CinematicHeroSceneProps) {
    return (
        <Canvas
            className="absolute inset-0 h-full w-full"
            camera={{ position: [0, 0.12, 6.2], fov: 36, near: 0.1, far: 120 }}
            dpr={[1, 1.55]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
        >
            <Suspense fallback={null}>
                <SceneContents scrollProgress={scrollProgress} />
            </Suspense>
        </Canvas>
    );
}