import { useRef } from 'react'
import SkillCard from './skill-card'
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandRedux,
  IconBrandSocketIo,
  IconBrandTailwind,
} from '@tabler/icons-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function Frontend() {
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
        gsap.to('.react', { width: '85%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.nextjs', { width: '80%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.tailwind', {
          width: '75%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.redux', {
          width: '90%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.socketio', {
          width: '90%',
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
        <SkillCard title="React" className="react">
          <div className="size-[60px]">
            <IconBrandReact className="size-full text-[#61DBFB]" stroke={1.5} />
          </div>
        </SkillCard>
        <SkillCard title="Next.js" className="nextjs">
          <div className="size-[60px]">
            <IconBrandNextjs
              className="size-full text-light-text dark:text-dark-text"
              stroke={1.5}
            />
          </div>
        </SkillCard>
        <SkillCard title="Tailwind CSS" className="tailwind">
          <div className="size-[60px]">
            <IconBrandTailwind
              className="size-full text-[#38BDF8]"
              stroke={1.5}
            />
          </div>
        </SkillCard>
        <SkillCard title="Redux Toolkit" className="redux">
          <div className="size-[60px]">
            <IconBrandRedux className="size-full text-[#7747BC]" stroke={1.5} />
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
