export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  status: string
  date: string
  github: string
  demo: string
  features: string[]
}

export const projects: Project[] = [
  {
    id: "modern-web-app",
    title: "Modern Web App",
    description: "A cutting-edge web application built with Next.js and Three.js, featuring stunning 3D visualizations and seamless user interactions. This project showcases modern web development techniques and best practices.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    tags: ["Next.js", "Three.js", "TailwindCSS", "TypeScript"],
    status: "Completed",
    date: "March 2024",
    github: "https://github.com/username/modern-web-app",
    demo: "https://modern-web-app-demo.com",
    features: [
      "Responsive design with mobile-first approach",
      "Interactive 3D visualizations using Three.js",
      "Server-side rendering for optimal performance",
      "Modern UI with smooth animations",
      "Type-safe development with TypeScript"
    ]
  },
  {
    id: "real-time-dashboard",
    title: "Real-time Dashboard",
    description: "Full-stack application with real-time data visualization, featuring WebSocket integration and interactive charts. Perfect for monitoring and analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    tags: ["React", "Node.js", "Socket.io", "D3.js"],
    status: "In Progress",
    date: "February 2024",
    github: "https://github.com/username/real-time-dashboard",
    demo: "https://dashboard-demo.com",
    features: [
      "Real-time data updates using WebSocket",
      "Interactive data visualization with D3.js",
      "Customizable dashboard layouts",
      "User authentication and authorization",
      "Data export functionality"
    ]
  },
  {
    id: "3d-portfolio",
    title: "3D Portfolio",
    description: "Interactive 3D visualization project showcasing creative designs and animations using WebGL technology. A unique way to present your work.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000",
    tags: ["Three.js", "GSAP", "WebGL", "Blender"],
    status: "Completed",
    date: "January 2024",
    github: "https://github.com/username/3d-portfolio",
    demo: "https://3d-portfolio-demo.com",
    features: [
      "Immersive 3D environment",
      "Smooth animations and transitions",
      "Custom 3D models and textures",
      "Interactive user experience",
      "Performance optimized rendering"
    ]
  }
] 