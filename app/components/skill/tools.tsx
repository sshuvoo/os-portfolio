import { useGSAP } from '@gsap/react'
import {
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGit,
  IconBrandGithub,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { useRef } from 'react'
import SkillCard from './skill-card'

export function Tools() {
  const skillContainer = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline>()

  useGSAP(
    () => {
      timeline.current = gsap.timeline()
      timeline.current.from('.skillCard', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
        duration: 0.5,
      })
      timeline.current.eventCallback('onComplete', () => {
        gsap.to('.git', { width: '85%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.github', {
          width: '80%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.docker', {
          width: '10%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.figma', {
          width: '30%',
          duration: 1.5,
          ease: 'back.inOut',
        })
      })
    },
    { scope: skillContainer }
  )

  return (
    <div className="p-4">
      <div ref={skillContainer} className="space-y-4">
        <SkillCard title="Git" className="git">
          <div className="size-[60px]">
            <IconBrandGit className="size-full text-[#F54D27]" stroke={1.5} />
          </div>
        </SkillCard>
        <SkillCard title="Github" className="github">
          <div className="size-[60px]">
            <IconBrandGithub
              stroke={1.5}
              className="size-full fill-white text-light-text dark:fill-black dark:text-dark-text"
            />
          </div>
        </SkillCard>
        <SkillCard title="Docker" className="docker">
          <div className="size-[60px]">
            <IconBrandDocker
              stroke={1.5}
              className="size-full fill-white text-[#1D63ED] dark:fill-black"
            />
          </div>
        </SkillCard>
        <SkillCard title="Figma" className="figma">
          <div className="size-[60px]">
            <IconBrandFigma
              stroke={1.5}
              className="size-full fill-white text-light-text dark:fill-black dark:text-dark-text"
            />
          </div>
        </SkillCard>
      </div>
    </div>
  )
}
