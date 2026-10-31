import { useState, useMemo } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { SectionTitle } from '../common/SectionTitle'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { GithubIcon } from '../common/SocialIcons'
import { cn } from '../../lib/utils'
import type { Project } from '../../types/database.types'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return ['All', ...Array.from(set)]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <section id="projects" className="py-24 sm:py-32 bg-transparent border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="PORTFOLIO SHOWCASE"
          title="Karya & Proyek Terpilih"
          subtitle="Eksplorasi aplikasi web, sistem terintegrasi, dan solusi digital yang telah saya rancang dan bangun."
          aosAnimation={false}
        />

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/35 -translate-y-0.5'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="widget-interactive group overflow-hidden rounded-2xl border-slate-800/80 bg-slate-900/70 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={
                      project.thumbnail_url ||
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
                    }
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {project.is_featured && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="default" className="bg-indigo-600 text-white border-none shadow-md gap-1">
                        <Star className="h-3 w-3 fill-amber-300 text-amber-300 animate-pulse" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-slate-950/85 backdrop-blur-md text-slate-200 border-slate-700/80 font-semibold shadow-md">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-4">
                  <h3
                    onClick={() => setActiveProject(project)}
                    className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50 group-hover:border-slate-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/50 group/btn"
                >
                  <span>Detail Info</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-300">&rarr;</span>
                </Button>

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 hover:scale-115 transition-all duration-300"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-indigo-950/40 hover:scale-115 transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        maxWidth="lg"
        title={activeProject?.title}
        description={activeProject?.category}
      >
        {activeProject && (
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden aspect-video w-full bg-slate-950 border border-slate-800 shadow-xl">
              <img
                src={
                  activeProject.thumbnail_url ||
                  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
                }
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Lengkap</h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-light">
                {activeProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Teknologi</h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies?.map((tech, i) => (
                  <Badge key={i} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              {activeProject.demo_url && (
                <a
                  href={activeProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buka Live Demo
                  </Button>
                </a>
              )}
              {activeProject.github_url && (
                <a
                  href={activeProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <GithubIcon className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
