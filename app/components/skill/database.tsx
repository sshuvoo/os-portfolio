import { useGSAP } from '@gsap/react'
import { IconBrandFirebase, IconBrandMongodb } from '@tabler/icons-react'
import gsap from 'gsap'
import { useRef } from 'react'
import { BiLogoPostgresql } from 'react-icons/bi'
import SkillCard from './skill-card'

export function Database() {
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
        gsap.to('.mongodb', { width: '85%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.postgresql', {
          width: '10%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.firebase', {
          width: '75%',
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
        <SkillCard title="Mongodb" className="mongodb">
          <div className="size-[60px]">
            <IconBrandMongodb
              className="size-full text-green-500"
              stroke={1.5}
            />
          </div>
        </SkillCard>
        <SkillCard title="PostgreSQL" className="postgresql">
          <div className="size-[60px]">
            <BiLogoPostgresql className="size-full fill-[#6ED0F9]" />
          </div>
        </SkillCard>
        <SkillCard title="Firebase Store" className="firebase">
          <div className="size-[60px]">
            <IconBrandFirebase
              stroke={1.5}
              className="size-full text-[#EF7B0A]"
            />
          </div>
        </SkillCard>
      </div>
    </div>
  )
}
