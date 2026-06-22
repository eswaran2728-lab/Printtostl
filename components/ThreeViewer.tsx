'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

function RotatingModel() {
  const meshRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3
  })
  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1.5, 2.5, 1]} />
      <meshStandardMaterial color="#d4a017" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export function ThreeViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#d4a017" />
        <RotatingModel />
        <Grid args={[10, 10]} cellColor="#1a2f45" sectionColor="#d4a017" sectionOpacity={0.2} fadeDistance={8} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Environment preset="night" />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-black/50 px-3 py-1 rounded-full">
        Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
      <div className="absolute top-4 left-4 text-xs text-gold/60 bg-black/50 px-2 py-1 rounded">
        Placeholder model — connect AI backend for real output
      </div>
    </div>
  )
}
