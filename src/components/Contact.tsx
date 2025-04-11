'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {/* Ana Torus */}
      <mesh
        position={[0, 0, 0]}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#60a5fa"}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Küçük Küreler */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.8) * 2,
            Math.cos(i * 0.8) * 2,
            Math.sin(i * 0.5) * 2
          ]}
          scale={hovered ? 0.3 : 0.2}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Işık Halkaları */}
      {[...Array(3)].map((_, i) => (
        <mesh
          key={`ring-${i}`}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, i * 0.5]}
          scale={hovered ? 1.5 : 1.2}
        >
          <ringGeometry args={[1.5, 1.6, 32]} />
          <meshStandardMaterial
            color="#60a5fa"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function CodeVisualization() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <GeometricShapes />
      </Float>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </group>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(".contact-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
          Get In Touch
        </h2>
        <div className="relative">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto space-y-8 bg-blue-900/20 p-8 rounded-xl backdrop-blur-sm border border-blue-500/30"
          >
            <div className="relative group">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-blue-300">
                Name
              </label>
              <input
                ref={el => inputRefs.current[0] = el!}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/30 transition-all duration-300 group-hover:border-blue-500/50"
                placeholder="Enter your name"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-300">
                Email
              </label>
              <input
                ref={el => inputRefs.current[1] = el!}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-blue-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/30 transition-all duration-300 group-hover:border-blue-500/50"
                placeholder="Enter your email"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="relative group">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-blue-300">
                Message
              </label>
              <textarea
                ref={el => inputRefs.current[2] = el!}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-blue-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500/30 transition-all duration-300 group-hover:border-blue-500/50 resize-none"
                placeholder="Enter your message"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          <div className="hidden lg:block absolute right-0 top-0 w-[600px] h-[600px] -translate-y-1/4 translate-x-1/4">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <CodeVisualization />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
} 