import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";
import heroWaffle from "@/assets/opt-0F0A9353.jpg";

// WebGL support detector
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

// Procedural 3D Gourmet Waffle Scene Component (Optimized)
function WaffleScene({ mousePosRef }: { mousePosRef: React.RefObject<{ x: number; y: number }> }) {
  const mainGroup = useRef<THREE.Group>(null);
  const waffleGroup = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);
  const crumbsGroup = useRef<THREE.Group>(null);

  // Materials optimized and memoized for luxury visuals
  const materials = React.useMemo(() => {
    return {
      waffle: new THREE.MeshStandardMaterial({
        color: "#d4924d",
        roughness: 0.8,
        metalness: 0.05,
      }),
      chocolate: new THREE.MeshStandardMaterial({
        color: "#1f1007",
        roughness: 0.15,
        metalness: 0.1,
      }),
      almond: new THREE.MeshStandardMaterial({
        color: "#ebd4b0",
        roughness: 0.6,
        metalness: 0.0,
      }),
      crumb: new THREE.MeshStandardMaterial({
        color: "#a66832",
        roughness: 0.9,
        metalness: 0.0,
      }),
    };
  }, []);

  // Clean up WebGL resources when unmounted
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((mat) => mat.dispose());
    };
  }, [materials]);

  // Reduced floaters count from 24 to 12 for rendering efficiency
  const floaters = React.useMemo(() => {
    const arr = [];
    const colors = [materials.crumb, materials.almond, materials.chocolate];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 1.5;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
        ] as [number, number, number],
        scale: 0.05 + Math.random() * 0.08,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: 0.1 + Math.random() * 0.2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        material: colors[Math.floor(Math.random() * colors.length)],
        geomType: Math.random() > 0.5 ? "dodecahedron" : "box",
      });
    }
    return arr;
  }, [materials]);

  // Optimized static steam particle geometry (replaces dynamic buffer recalculations)
  const steamCount = 20; // Reduced count
  const steamGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(steamCount * 3);

    for (let i = 0; i < steamCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.8;
      positions[i * 3 + 1] = 0.1 + Math.random() * 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Frame animations (Optimized: direct transforms, no CPU-side buffer manipulation)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Slow camera float
    if (mainGroup.current) {
      mainGroup.current.position.y = Math.sin(t * 0.3) * 0.08;
      mainGroup.current.position.x = Math.cos(t * 0.2) * 0.06;
      
      if (mousePosRef.current) {
        const targetRotX = mousePosRef.current.y * 0.12;
        const targetRotY = mousePosRef.current.x * 0.12;
        mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX, 0.05);
        mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.05);
      }
    }

    // 2. Centerpiece spin
    if (waffleGroup.current) {
      waffleGroup.current.rotation.y = t * 0.05;
      waffleGroup.current.rotation.x = Math.sin(t * 0.1) * 0.03;
    }

    // 3. Lightweight GPU-friendly steam animation (only animating points position/rotation)
    if (steamRef.current) {
      steamRef.current.position.y = (t * 0.05) % 0.8;
      steamRef.current.rotation.y = t * 0.02;
    }

    // 4. Float crumbs/chunks
    if (crumbsGroup.current) {
      crumbsGroup.current.children.forEach((child, index) => {
        const floater = floaters[index];
        if (!floater) return;
        child.position.y += Math.sin(t * floater.speedY + index) * 0.001;
        child.rotation.x += floater.rotSpeed * 0.003;
        child.rotation.y += floater.rotSpeed * 0.004;
      });
    }
  });

  return (
    <group ref={mainGroup}>
      {/* Dynamic lighting (decay simplified to save fill-rate) */}
      <pointLight position={[-2, 1.5, -1]} intensity={2.0} color="#2FA69A" distance={6} />
      <pointLight position={[2, -1.5, 1]} intensity={2.5} color="#3FB6A4" distance={6} />

      {/* Centerpiece Waffle */}
      <group ref={waffleGroup} scale={1.25}>
        <mesh material={materials.waffle}>
          <boxGeometry args={[2.4, 2.4, 0.3]} />
        </mesh>

        {/* Waffle Borders */}
        <mesh position={[0, 1.1, 0.2]} material={materials.waffle}>
          <boxGeometry args={[2.4, 0.18, 0.18]} />
        </mesh>
        <mesh position={[0, -1.1, 0.2]} material={materials.waffle}>
          <boxGeometry args={[2.4, 0.18, 0.18]} />
        </mesh>
        <mesh position={[1.1, 0, 0.2]} material={materials.waffle}>
          <boxGeometry args={[0.18, 2.4, 0.18]} />
        </mesh>
        <mesh position={[-1.1, 0, 0.2]} material={materials.waffle}>
          <boxGeometry args={[0.18, 2.4, 0.18]} />
        </mesh>

        {/* Inner pocket dividers */}
        <mesh position={[-0.55, 0, 0.2]} material={materials.waffle}>
          <boxGeometry args={[0.1, 2.0, 0.18]} />
        </mesh>
        <mesh position={[0.55, 0, 0.2]} material={materials.waffle}>
          <boxGeometry args={[0.1, 2.0, 0.18]} />
        </mesh>
        <mesh position={[0, -0.55, 0.2]} material={materials.waffle}>
          <boxGeometry args={[2.0, 0.1, 0.18]} />
        </mesh>
        <mesh position={[0, 0.55, 0.2]} material={materials.waffle}>
          <boxGeometry args={[2.0, 0.1, 0.18]} />
        </mesh>

        {/* Molten Chocolate pools */}
        <group position={[0, 0, 0.2]}>
          <mesh position={[-0.27, 0.27, 0.02]} material={materials.chocolate}>
            <sphereGeometry args={[0.38, 12, 12]} />
          </mesh>
          <mesh position={[0.27, -0.27, 0.02]} material={materials.chocolate}>
            <sphereGeometry args={[0.35, 12, 12]} />
          </mesh>
          <mesh position={[-0.27, -0.27, 0.01]} material={materials.chocolate}>
            <sphereGeometry args={[0.28, 12, 12]} />
          </mesh>

          {/* Drizzle cords */}
          <mesh position={[0.1, 0.3, 0.06]} rotation={[0, 0, 0.5]} material={materials.chocolate}>
            <boxGeometry args={[1.4, 0.1, 0.08]} />
          </mesh>
          <mesh position={[-0.2, -0.25, 0.06]} rotation={[0, 0, -0.4]} material={materials.chocolate}>
            <boxGeometry args={[1.5, 0.08, 0.08]} />
          </mesh>

          {/* Dripping drops */}
          <mesh position={[-1.0, -0.4, -0.05]} material={materials.chocolate}>
            <sphereGeometry args={[0.12, 8, 8]} />
          </mesh>
          <mesh position={[1.0, 0.5, -0.05]} material={materials.chocolate}>
            <sphereGeometry args={[0.1, 8, 8]} />
          </mesh>
        </group>

        {/* Almond Flakes & Crumbs */}
        <group position={[0, 0, 0.28]}>
          <mesh position={[-0.35, 0.35, 0.04]} material={materials.almond} rotation={[0.5, 0.2, 0.8]} scale={0.75}>
            <dodecahedronGeometry args={[0.08]} />
          </mesh>
          <mesh position={[0.45, -0.35, 0.04]} material={materials.almond} rotation={[0.1, 0.9, 0.2]} scale={0.85}>
            <dodecahedronGeometry args={[0.08]} />
          </mesh>
          <mesh position={[0.1, -0.15, 0.04]} material={materials.crumb} rotation={[0.6, 0.4, 0.1]} scale={0.55}>
            <dodecahedronGeometry args={[0.07]} />
          </mesh>
        </group>
      </group>

      {/* Steam Particles */}
      <points ref={steamRef} geometry={steamGeometry}>
        <pointsMaterial
          color="#ebd8bf"
          size={0.05}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Depth Field Floating Chunks */}
      <group ref={crumbsGroup}>
        {floaters.map((floater, i) => (
          <mesh
            key={i}
            position={floater.position}
            material={floater.material}
            scale={floater.scale}
          >
            {floater.geomType === "dodecahedron" ? (
              <dodecahedronGeometry />
            ) : (
              <boxGeometry args={[1.0, 0.7, 1.0]} />
            )}
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Fallback Premium CSS 3D Waffle Card (Static/Low-overhead)
function WaffleFallback({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div 
      className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] transition-transform duration-300 ease-out flex items-center justify-center"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-[80px] scale-75 pointer-events-none" />
      <img
        src={heroWaffle}
        alt="Premium waffle"
        className="w-[85%] h-auto rounded-3xl object-contain drop-shadow-[0_20px_50px_rgba(63,182,164,0.25)] select-none"
        style={{ transform: "translateZ(30px)" }}
      />
    </div>
  );
}

export default function Waffle3D() {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [mousePosFallback, setMousePosFallback] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isAvailable = isWebGLAvailable();
    setWebglAvailable(isAvailable);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      if (isAvailable) {
        mousePosRef.current = { x, y };
      } else {
        setMousePosFallback({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!webglAvailable) {
    return <WaffleFallback mousePos={mousePosFallback} />;
  }

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative flex items-center justify-center select-none">
      {/* Background glow overlay */}
      <div className="absolute w-[60%] h-[60%] bg-brand-orange/8 blur-[120px] rounded-full scale-90 pointer-events-none" />
      
      {/* Canvas optimized: limited DPR (1.3 max) to prevent lag on 4K/high-DPI screens */}
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 52 }}
        dpr={[1, 1.3]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[-3, 4, 3]} intensity={1.2} color="#fffcf5" />
        <spotLight
          position={[0, 4, 2]}
          angle={0.5}
          penumbra={0.5}
          intensity={1.0}
          color="#ffd1a9"
        />
        
        <Suspense fallback={null}>
          <Center>
            <WaffleScene mousePosRef={mousePosRef} />
          </Center>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2 / 3}
        />
      </Canvas>
    </div>
  );
}
