'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Modern Web App",
    description: "A cutting-edge web application built with Next.js and Three.js, featuring stunning 3D visualizations and seamless user interactions.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    tags: ["Next.js", "Three.js", "TailwindCSS"],
    link: "modern-web-app",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Real-time Dashboard",
    description: "Full-stack application with real-time data visualization, featuring WebSocket integration and interactive charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    tags: ["React", "Node.js", "Socket.io", "D3.js"],
    link: "real-time-dashboard",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "3D Portfolio",
    description: "Interactive 3D visualization project showcasing creative designs and animations using WebGL technology.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000",
    tags: ["Three.js", "GSAP", "WebGL", "Blender"],
    link: "3d-portfolio",
    color: "from-blue-600 to-cyan-600"
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (sectionRef.current) {
      // Clear existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Reset initial states
      gsap.set(".project-card", { opacity: 0, y: 50 })

      // Create new animations
      gsap.to(".project-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [pathname]) // Re-run effect when pathname changes

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black via-blue-900/20 to-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
          Featured Projects
        </h2>
        <p className="text-blue-300 text-center mb-16 text-lg">Explore some of my recent work</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  color: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  color,
  onHover,
  onLeave
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${link}`}>
      <div
        className="project-card group block relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] transform transition-all duration-500 hover:scale-[1.02]"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-20`} />

        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={true}
          />
        </div>

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-30">
          <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-300 mb-4 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs md:text-sm bg-white/10 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="mr-2 text-sm md:text-base">View Project</span>
              <svg
                className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
} 