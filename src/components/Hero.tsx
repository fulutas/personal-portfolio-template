'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

function StarField() {
  const count = 5000
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  })

  useFrame((state) => {
    state.camera.rotation.x = THREE.MathUtils.lerp(
      state.camera.rotation.x,
      Math.cos(state.clock.elapsedTime / 2) * 0.2,
      0.02
    )
    state.camera.rotation.y = THREE.MathUtils.lerp(
      state.camera.rotation.y,
      Math.sin(state.clock.elapsedTime / 2) * 0.2,
      0.02
    )
  })

  return (
    <Points positions={positions}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        color="#ffffff"
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) * 0.2
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.2
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[1, 100, 200]}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#4c1d95"
        attach="material"
        distort={0.5}
        speed={2}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    let ctx: gsap.Context
    let tl: gsap.core.Timeline

    const initAnimations = () => {
      if (sectionRef.current && contentRef.current) {
        // Clear existing ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())

        // Create a new context
        ctx = gsap.context(() => {
          // Set initial states
          gsap.set(contentRef.current, { opacity: 1, y: 0 })

          // Create a timeline for better control
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              toggleActions: "play none none reverse",
              onEnter: () => {
                gsap.to(contentRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out"
                })
              }
            }
          })
        })
      }
    }

    // Initialize animations
    initAnimations()

    // Cleanup function
    return () => {
      if (ctx) ctx.revert()
      if (tl) tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [pathname])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} className="min-h-[80vh] bg-gradient-to-b from-black via-blue-900/20 to-black py-12 px-4 md:px-8">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <StarField />
          <group position={[0, 0, 0]}>
            <FloatingOrb />
          </group>
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/20 to-black pointer-events-none" />

      <div className="relative z-10 h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 animate-gradient">
            Creative Developer
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting immersive digital experiences with modern web technologies and creative coding
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-transparent border-2 border-blue-500/50 rounded-full text-lg font-medium hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Contact Me
            </button>
          </div>
          <div className="mt-8 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-blue-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
} 