'use client'

import { useEffect, useRef } from 'react'
import { use } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const project = projects?.find(p => p.id === resolvedParams?.id)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let ctx: gsap.Context
    let tl: gsap.core.Timeline

    const initAnimations = () => {
      if (sectionRef.current && contentRef.current && imageRef.current) {
        // Clear existing ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())

        // Create a new context
        ctx = gsap.context(() => {
          // Set initial states
          gsap.set(contentRef.current, { opacity: 1, y: 0 })
          gsap.set(imageRef.current, { opacity: 1, scale: 1 })

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
                gsap.to(imageRef.current, {
                  opacity: 1,
                  scale: 1,
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
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">Project Not Found</h1>
          <Link href="/" className="text-blue-300 hover:text-blue-200">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-8">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-300 hover:text-blue-200 group"
              >
                <svg
                  className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
              {project.title}
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              >
                View on GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent border border-blue-500 rounded-lg text-blue-300 font-semibold hover:bg-blue-500/10 transition-colors"
              >
                Live Demo
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 