"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

function MovingStars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.05
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
}

function GalaxyParticles() {
  const galaxyRef = useRef<THREE.Points>(null)

  useEffect(() => {
    if (!galaxyRef.current) return

    const positions = galaxyRef.current.geometry.attributes.position
    const colors = galaxyRef.current.geometry.attributes.color

    for (let i = 0; i < positions.count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 10 + 5
      const angle = Math.random() * Math.PI * 2
      const spinAngle = radius * 0.2

      positions.array[i3] = Math.cos(angle + spinAngle) * radius
      positions.array[i3 + 1] = (Math.random() - 0.5) * 3
      positions.array[i3 + 2] = Math.sin(angle + spinAngle) * radius

      // Color gradient from purple to blue
      const mixRatio = Math.random()
      colors.array[i3] = mixRatio * 0.5 // R
      colors.array[i3 + 1] = mixRatio * 0.2 // G
      colors.array[i3 + 2] = 0.5 + mixRatio * 0.5 // B
    }

    positions.needsUpdate = true
    colors.needsUpdate = true
  }, [])

  useFrame(({ clock }) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2000} itemSize={3} array={new Float32Array(2000 * 3)} />
        <bufferAttribute attach="attributes-color" count={2000} itemSize={3} array={new Float32Array(2000 * 3)} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        alphaMap={new THREE.TextureLoader().load("/particle.png")}
      />
    </points>
  )
}

export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <MovingStars />
        <GalaxyParticles />
      </Canvas>
    </div>
  )
}
