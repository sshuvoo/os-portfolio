import { ProjectCard } from './project-card'
import { projects } from './projects'

export function Projects() {
  return (
    <div className="grid h-full grid-cols-[repeat(auto-fit,minmax(300px,300px))] gap-4 bg-[#282828d8] p-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
