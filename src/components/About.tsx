'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    name: "React & Next.js",
    icon: "⚛️",
    description: "Building modern web applications with React and Next.js",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "TypeScript",
    icon: "📘",
    description: "Type-safe development for robust applications",
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "Node.js",
    icon: "🖥️",
    description: "Server-side JavaScript development",
    color: "from-blue-600 to-cyan-600"
  },
  {
    name: "Three.js",
    icon: "🎮",
    description: "Creating immersive 3D experiences",
    color: "from-cyan-600 to-blue-600"
  },
  {
    name: "TailwindCSS",
    icon: "🎨",
    description: "Utility-first CSS framework",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "GSAP",
    icon: "✨",
    description: "Professional-grade animations",
    color: "from-cyan-500 to-blue-500"
  }
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const skillCardsRef = useRef<HTMLDivElement[]>([])
  const pathname = usePathname()

  useEffect(() => {
    let ctx: gsap.Context
    let tl: gsap.core.Timeline

    const initAnimations = () => {
      if (textRef.current && sectionRef.current) {
        // Clear existing ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())

        // Create a new context
        ctx = gsap.context(() => {
          // Set initial states
          gsap.set(textRef.current, { opacity: 1, y: 0 })
          skillCardsRef.current.forEach(card => {
            if (card) gsap.set(card, { opacity: 1, y: 0 })
          })

          // Create a timeline for better control
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              toggleActions: "play none none reverse",
              onEnter: () => {
                gsap.to(textRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out"
                })
                skillCardsRef.current.forEach(card => {
                  if (card) {
                    gsap.to(card, {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      ease: "power3.out"
                    })
                  }
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

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black flex items-center justify-center p-8">
      <div ref={textRef} className="max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
          About Me
        </h2>
        <div className="space-y-6 text-lg text-blue-200">
          <p className="leading-relaxed">
            Hello! I&apos;m a passionate developer with expertise in modern web technologies.
            I specialize in creating beautiful, functional, and user-friendly applications
            that push the boundaries of what&apos;s possible on the web.
          </p>
          <p className="leading-relaxed">
            My journey in tech has equipped me with a strong foundation in both frontend
            and backend development, allowing me to build complete solutions from concept to deployment.
            I&apos;m constantly exploring new technologies and techniques to stay at the forefront of web development.
          </p>
          <div className="pt-8">
            <h3 className="text-2xl font-semibold mb-6 text-blue-300">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  ref={el => {
                    if (el) skillCardsRef.current[index] = el
                  }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-black/30 p-6 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{skill.icon}</span>
                      <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                    </div>
                    <p className="text-blue-400 text-sm">{skill.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 