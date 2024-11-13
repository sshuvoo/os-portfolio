import { useGSAP } from '@gsap/react'
import {
  IconBrandGraphql,
  IconBrandNodejs,
  IconBrandSocketIo,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SiExpress, SiNestjs } from 'react-icons/si'
import SkillCard from './skill-card'

export function Backend() {
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
        gsap.to('.nodejs', { width: '85%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.express', { width: '80%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.nestjs', {
          width: '75%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.graphql', {
          width: '30%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.socketio', {
          width: '50%',
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
        <SkillCard title="Node.js" className="nodejs">
          <div className="size-[60px]">
            <IconBrandNodejs
              className="size-full text-green-500"
              stroke={1.5}
            />
          </div>
        </SkillCard>
        <SkillCard title="Express" className="express">
          <div className="size-[60px]">
            <SiExpress className="size-full text-light-text dark:text-dark-text" />
          </div>
        </SkillCard>
        <SkillCard title="NestJS" className="nestjs">
          <div className="size-[60px]">
            <SiNestjs className="size-full text-[#EA2851]" />
          </div>
        </SkillCard>
        <SkillCard title="GraphQL" className="graphql">
          <div className="size-[60px]">
            <IconBrandGraphql
              className="size-full text-[#F6009C]"
              stroke={1.5}
            />
          </div>
        </SkillCard>
        <SkillCard title="Socket.Io" className="socketio">
          <div className="size-[60px]">
            <IconBrandSocketIo
              className="size-full text-light-text dark:text-dark-text"
              stroke={1.5}
            />
          </div>
        </SkillCard>
      </div>
    </div>
  )
}
