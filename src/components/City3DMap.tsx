"use client";

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Box(props: any) {

    /**
     * 
     * Box Component
     * 
     * @param {any} props
     * @returns {JSX.Element}
     * 
     */


    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta;
        }
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

export default function City3DMap() {
    return (
        <div className="w-full h-full relative bg-sky-50 dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl group">
            
            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <h2 className="font-black text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="text-orange-500">3D</span> Explore Syunik
                    </h2>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                        Test 3D View
                    </p>
                </div>
            </div>

            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />

                <OrbitControls />
            </Canvas>
        </div>
    );
}

