import { openUrlTab } from '@/app/features/chrome'
import { openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { useGSAP } from '@gsap/react'
import { IconBrandChrome, IconBrandGithub } from '@tabler/icons-react'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Projects } from './projects'
import { setZIndex } from '@/app/features/settings'

export function ProjectCard({ project }: { project: Projects }) {
  const timeline = useRef(gsap.timeline())
  const overlapRef = useRef<HTMLDivElement>(null)
  const initialRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { zIndex } = useSelector((state) => state.settings)
  const { contextSafe } = useGSAP()

  const onHoverActions = contextSafe(() => {
    timeline.current.to(initialRef.current, {
      scale: 0.5,
      ease: 'circ',
      duration: 0.1,
    })

    timeline.current.to(
      overlapRef.current,
      {
        y: 0,
        ease: 'circ.out',
        duration: 0.5,
        height: '100%',
      },
      '-=0.1'
    )

    timeline.current.fromTo(
      [headingRef.current, paraRef.current, buttonRef.current],
      {
        y: 50,
        opacity: 0,
        duration: 0.1,
        stagger: 0.1,
        ease: 'circ.out',
      },
      { opacity: 1, y: 0, stagger: 0.1 }
    )
  })

  const handleOpen = () => {
    dispatch(setZIndex(zIndex + 1))
    dispatch(openFolder('chrome'))
    dispatch(openUrlTab({ title: project.title, live_url: project.live_url }))
  }

  return (
    <div
      onMouseEnter={onHoverActions}
      onMouseLeave={() => {
        timeline.current.reverse()
        timeline.current.eventCallback('onReverseComplete', () => {
          timeline.current = gsap.timeline()
        })
      }}
      key={project.id}
      className="relative h-fit w-72 overflow-y-hidden rounded-md bg-light-foreground p-4 shadow-md dark:bg-dark-foreground"
    >
      <div ref={initialRef} className="h-full">
        <div className="relative h-40 rounded-md">
          <Image
            alt="thumb-project"
            fill
            src={project.thumbnail}
            className="rounded-md object-cover object-center"
          />
        </div>
        <div className="mt-2">
          <h2 className="line-clamp-1">{project.title}</h2>
        </div>
      </div>
      <div
        ref={overlapRef}
        className="absolute bottom-0 left-0 flex h-full w-full translate-y-full flex-col justify-between overflow-hidden rounded-md bg-white p-4 dark:bg-[#464646]"
      >
        <h2 ref={headingRef} className="my-2 text-center text-xl font-medium">
          {project.title}
        </h2>
        <p ref={paraRef} className="line-clamp-4">
          {project.description}
        </p>
        <div ref={buttonRef} className="flex items-center justify-end gap-4">
          <Link
            target="_blank"
            href={project.github}
            className="flex items-center gap-1 rounded bg-black px-3 py-1 text-xs font-medium text-white"
          >
            <IconBrandGithub stroke={2} className="size-4" />
            <span>Code</span>
          </Link>
          <button
            onClick={handleOpen}
            className="flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-medium text-white"
          >
            <IconBrandChrome stroke={2} className="size-4" />
            <span>Open</span>
          </button>
        </div>
      </div>
    </div>
  )
}
