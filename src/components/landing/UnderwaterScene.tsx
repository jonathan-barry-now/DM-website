"use client";

import { useEffect, useRef, useState } from "react";

// Structure for dynamic light shafts
interface LightShaft {
    x: number;
    width: number;
    speed: number;
    angle: number;
    phase: number;
}

// Structure for large white bubbles
interface BubbleParticle {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    wobbleSpeed: number;
    wobbleAmt: number;
    angle: number;
    opacity: number;
}

// Structure for large yellow-gold particles
interface GoldParticle {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    wobbleSpeed: number;
    wobbleAmt: number;
    angle: number;
    opacity: number;
}

export default function UnderwaterScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoImgRef = useRef<HTMLCanvasElement | HTMLImageElement | null>(null);
    
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);

    // Scroll interpolation tracking
    const currentScroll = useRef(0);
    const targetScroll = useRef(0);

    // Keep cached frames in a ref to prevent garbage collection and allow access in loop
    const framesRef = useRef<HTMLCanvasElement[]>([]);

    useEffect(() => {
        const totalAssets = 21; // 20 frames + 1 logo image
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            setLoadingProgress(loadedCount / totalAssets);
            if (loadedCount >= totalAssets) {
                setLoaded(true);
                setTimeout(() => {
                    setShowSpinner(false);
                }, 750);
            }
        };

        // 1. Programmatically pre-render 20 frames of descent gradients
        // Start: #0a4a6e (medium blue) at the top of descent.
        // End: #020817 (dark navy) at the bottom of descent.
        const preRenderFrames = () => {
            const width = 1920;
            const height = 1080;
            const generatedFrames: HTMLCanvasElement[] = [];

            for (let i = 0; i < 20; i++) {
                const frameCanvas = document.createElement("canvas");
                frameCanvas.width = width;
                frameCanvas.height = height;
                const fCtx = frameCanvas.getContext("2d");
                
                if (fCtx) {
                    const depth = i / 19;
                    const t = Math.pow(depth, 1.25); // Smooth acceleration curve

                    // Start Top: #0a4a6e (10, 74, 110) -> End Top: #020817 (2, 8, 23)
                    const r1 = Math.round(10 + t * (2 - 10));
                    const g1 = Math.round(74 + t * (8 - 74));
                    const b1 = Math.round(110 + t * (23 - 110));

                    // Start Bottom: #052e46 (5, 46, 70) -> End Bottom: #000105 (0, 1, 5)
                    const r2 = Math.round(5 + t * (0 - 5));
                    const g2 = Math.round(46 + t * (1 - 46));
                    const b2 = Math.round(70 + t * (5 - 70));

                    const colorTop = `rgb(${r1}, ${g1}, ${b1})`;
                    const colorBottom = `rgb(${r2}, ${g2}, ${b2})`;

                    // Draw vertical gradient
                    const grad = fCtx.createLinearGradient(0, 0, 0, height);
                    grad.addColorStop(0, colorTop);
                    grad.addColorStop(1, colorBottom);
                    fCtx.fillStyle = grad;
                    fCtx.fillRect(0, 0, width, height);

                    // Add visible surface wave lines for the top 4 frames
                    if (i < 4) {
                        const surfaceIntensity = 1 - (i / 4);
                        fCtx.strokeStyle = `rgba(255, 255, 255, ${0.25 * surfaceIntensity})`;
                        fCtx.lineWidth = 4;
                        fCtx.beginPath();
                        for (let x = 0; x <= width; x += 15) {
                            const waveY = 12 + Math.sin(x * 0.015) * 6 + Math.cos(x * 0.008) * 4;
                            if (x === 0) fCtx.moveTo(x, waveY);
                            else fCtx.lineTo(x, waveY);
                        }
                        fCtx.stroke();

                        fCtx.strokeStyle = `rgba(255, 255, 255, ${0.15 * surfaceIntensity})`;
                        fCtx.lineWidth = 2;
                        fCtx.beginPath();
                        for (let x = 0; x <= width; x += 15) {
                            const waveY = 24 + Math.sin(x * 0.02 + 2) * 5 + Math.cos(x * 0.01 - 1) * 3;
                            if (x === 0) fCtx.moveTo(x, waveY);
                            else fCtx.lineTo(x, waveY);
                        }
                        fCtx.stroke();
                    }

                    // Add bioluminescent floating specs for deep frames (i >= 12)
                    if (i >= 12) {
                        const abyssIntensity = (i - 12) / 7;
                        fCtx.fillStyle = `rgba(255, 223, 0, ${0.35 * abyssIntensity})`;
                        for (let p = 0; p < 20; p++) {
                            const seedX = Math.sin(p * 4567.89) * 0.5 + 0.5;
                            const seedY = Math.cos(p * 9876.54) * 0.5 + 0.5;
                            const px = seedX * width;
                            const py = seedY * height;
                            const pr = 1.5 + seedX * 2.5;
                            fCtx.beginPath();
                            fCtx.arc(px, py, pr, 0, Math.PI * 2);
                            fCtx.fill();
                        }
                    }
                }

                generatedFrames.push(frameCanvas);
                setTimeout(() => {
                    updateProgress();
                }, i * 12);
            }
            framesRef.current = generatedFrames;
        };

        // 2. Load and tint the Narwhal Logo to bright gold-yellow
        const loadMascot = () => {
            const img = new Image();
            img.src = "/narwal_logo.png";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    ctx.globalCompositeOperation = "source-in";
                    ctx.fillStyle = "#ffd700"; // Rich yellow-gold
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                logoImgRef.current = canvas;
                updateProgress();
            };
            img.onerror = () => {
                console.error("Narwhal logo failed to load.");
                logoImgRef.current = img;
                updateProgress();
            };
        };

        preRenderFrames();
        loadMascot();

        // 3. Scroll listener
        const handleScroll = () => {
            const container = containerRef.current?.parentElement;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            const scrolled = -rect.top;

            const progress = Math.max(0, Math.min(1, scrolled / (totalScrollable || 1)));
            targetScroll.current = progress;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 4. Start main Canvas Animation loop
    useEffect(() => {
        if (!loaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Force logical canvas resolution
        canvas.width = 1920;
        canvas.height = 1080;

        // Initialize bright white bubbles (at least 8px radius)
        const bubbles: BubbleParticle[] = [];
        const bubbleCount = 45;
        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push({
                x: Math.random() * 1920,
                y: Math.random() * 1080,
                radius: 8 + Math.random() * 10, // 8px to 18px radius
                speedY: 0.8 + Math.random() * 2.2,
                wobbleSpeed: 0.012 + Math.random() * 0.02,
                wobbleAmt: 0.6 + Math.random() * 1.4,
                angle: Math.random() * Math.PI * 2,
                opacity: 0.45 + Math.random() * 0.45 // High brightness/opacity
            });
        }

        // Initialize bright yellow gold particles (at least 5px radius)
        const goldParticles: GoldParticle[] = [];
        const goldCount = 65;
        for (let i = 0; i < goldCount; i++) {
            goldParticles.push({
                x: Math.random() * 1920,
                y: Math.random() * 1080,
                radius: 5 + Math.random() * 8, // 5px to 13px radius
                speedY: 0.5 + Math.random() * 1.5,
                wobbleSpeed: 0.01 + Math.random() * 0.02,
                wobbleAmt: 0.4 + Math.random() * 1.0,
                angle: Math.random() * Math.PI * 2,
                opacity: 0.5 + Math.random() * 0.45 // High brightness/opacity
            });
        }

        // Initialize dynamic light shafts
        const shafts: LightShaft[] = [
            { x: 350, width: 180, speed: 0.5, angle: 0.07, phase: 0 },
            { x: 960, width: 320, speed: 0.35, angle: 0.09, phase: Math.PI / 3 },
            { x: 1550, width: 220, speed: 0.45, angle: 0.06, phase: Math.PI * 2 / 3 }
        ];

        let animationFrameId = 0;

        const loop = (timestamp: number) => {
            const timeSec = timestamp / 1000;

            // Interpolate scroll progress for inertia
            currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;

            const depthValue = currentScroll.current * 19;
            const floorFrameIdx = Math.floor(depthValue);
            const ceilFrameIdx = Math.min(19, floorFrameIdx + 1);
            const blendFactor = depthValue - floorFrameIdx;

            const floorFrame = framesRef.current[floorFrameIdx];
            const ceilFrame = framesRef.current[ceilFrameIdx];

            // 1. Draw and blend background frames
            ctx.globalAlpha = 1.0;
            if (floorFrame) {
                ctx.drawImage(floorFrame, 0, 0);
            }
            if (blendFactor > 0.01 && ceilFrame) {
                ctx.globalAlpha = blendFactor;
                ctx.drawImage(ceilFrame, 0, 0);
            }
            ctx.globalAlpha = 1.0; // Reset alpha

            // 2. Synchronize container background style to match borders seamlessly
            if (containerRef.current) {
                const d = currentScroll.current;
                const t = Math.pow(d, 1.25);

                const r1 = Math.round(10 + t * (2 - 10));
                const g1 = Math.round(74 + t * (8 - 74));
                const b1 = Math.round(110 + t * (23 - 110));

                const r2 = Math.round(5 + t * (0 - 5));
                const g2 = Math.round(46 + t * (1 - 46));
                const b2 = Math.round(70 + t * (5 - 70));

                const colorTop = `rgb(${r1}, ${g1}, ${b1})`;
                const colorBottom = `rgb(${r2}, ${g2}, ${b2})`;
                containerRef.current.style.background = `linear-gradient(to bottom, ${colorTop}, ${colorBottom})`;
            }

            // 3. Render bright white Volumetric Light Shafts (0.8 opacity)
            const lightOpacity = Math.max(0, 1 - currentScroll.current * 2.0); // Gone by depth = 0.5
            if (lightOpacity > 0) {
                shafts.forEach((shaft) => {
                    const swayAngle = Math.sin(timeSec * shaft.speed + shaft.phase) * shaft.angle;
                    const dx = Math.tan(swayAngle) * 1080;
                    const bottomX = shaft.x + dx;

                    const grad = ctx.createLinearGradient(shaft.x, 0, bottomX, 1080);
                    // Bright white shafts (0.8 max opacity)
                    grad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * lightOpacity})`);
                    grad.addColorStop(0.4, `rgba(255, 255, 255, ${0.3 * lightOpacity})`);
                    grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(shaft.x - shaft.width / 2, 0);
                    ctx.lineTo(shaft.x + shaft.width / 2, 0);
                    ctx.lineTo(bottomX + shaft.width * 2.2, 1080);
                    ctx.lineTo(bottomX - shaft.width * 2.2, 1080);
                    ctx.closePath();
                    ctx.fill();
                });
            }

            // 4. Update and Draw Bright White Bubbles (8px+ radius)
            bubbles.forEach((b) => {
                b.y -= b.speedY;
                b.angle += b.wobbleSpeed;
                b.x += Math.sin(b.angle) * b.wobbleAmt;

                if (b.y < -30) {
                    b.y = 1110;
                    b.x = Math.random() * 1920;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
                ctx.fill();

                // Shiny reflection accent
                ctx.beginPath();
                ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.25, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 1.5})`;
                ctx.fill();
            });

            // 5. Update and Draw Yellow Gold Particles (5px+ radius)
            goldParticles.forEach((gp) => {
                gp.y -= gp.speedY;
                gp.angle += gp.wobbleSpeed;
                gp.x += Math.sin(gp.angle) * gp.wobbleAmt;

                if (gp.y < -20) {
                    gp.y = 1100;
                    gp.x = Math.random() * 1920;
                }

                // Bright yellow gold fill
                ctx.beginPath();
                ctx.arc(gp.x, gp.y, gp.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 223, 0, ${gp.opacity})`;
                ctx.fill();

                // Small center highlight for yellow snow sparkle
                ctx.beginPath();
                ctx.arc(gp.x - gp.radius * 0.25, gp.y - gp.radius * 0.25, gp.radius * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${gp.opacity * 1.4})`;
                ctx.fill();
            });

            // 6. Draw Swimming Narwhal Mascot (Bigger size and brighter glow)
            const narwhal = logoImgRef.current;
            if (narwhal) {
                // Swim across horizontally (from x = -300 to 2220)
                const startX = -300;
                const endX = 1920 + 300;
                const nX = startX + currentScroll.current * (endX - startX);

                const baseY = 360 + currentScroll.current * 420;
                const swimCurveY = Math.sin(currentScroll.current * Math.PI * 2.2) * 140;
                const wY = Math.sin(timeSec * 5.5) * 18;
                const nY = baseY + swimCurveY + wY;

                const wiggleRot = Math.cos(timeSec * 5.5) * 0.08;
                const travelAngle = Math.cos(currentScroll.current * Math.PI * 2.2) * 0.18;
                const nRot = wiggleRot + travelAngle;

                const nOpacity = Math.max(0.2, 1 - Math.max(0, currentScroll.current - 0.85) * 5);

                ctx.save();
                ctx.globalAlpha = nOpacity;
                ctx.translate(nX, nY);
                ctx.rotate(nRot);

                // High-visibility gold glowing shadow
                ctx.shadowColor = "rgba(255, 215, 0, 0.95)";
                ctx.shadowBlur = 35;

                // Made larger (320px width/height)
                const logoWidth = 320;
                const logoHeight = 320;
                
                ctx.scale(-1, 1);

                ctx.drawImage(
                    narwhal,
                    -logoWidth / 2,
                    -logoHeight / 2,
                    logoWidth,
                    logoHeight
                );

                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [loaded]);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden transition-colors duration-300"
            style={{
                background: "linear-gradient(to bottom, #0a4a6e, #06314a)"
            }}
        >
            {/* High-fidelity Canvas Render Viewport */}
            {loaded && (
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    style={{
                        objectFit: "contain"
                    }}
                />
            )}

            {/* Loading Spinner */}
            {showSpinner && (
                <div 
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 pointer-events-auto"
                    style={{ 
                        opacity: loaded ? 0 : 1
                    }}
                >
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-gold/25 animate-ping duration-1000"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-gold/10"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-t-gold animate-spin duration-700"></div>
                        <div className="w-8 h-8 rounded-full bg-gold/10 animate-pulse"></div>
                    </div>
                    
                    <div className="mt-8 flex flex-col items-center gap-2">
                        <span className="text-gold font-mono text-[11px] font-bold tracking-[0.25em] uppercase">
                            Dive Initiated
                        </span>
                        <span className="text-slate-400 font-mono text-[13px]">
                            Descending to Depth: {Math.round(loadingProgress * 100)}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
