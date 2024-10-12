import Image from 'next/image'
import typescript from '@/public/assets/icons/typescript.svg'
import javascript from '@/public/assets/icons/logo-javascript.svg'
import { IconBrandCss3, IconBrandHtml5 } from '@tabler/icons-react'
import SkillCard from './skill-card'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'

export function Languages({ timeline }: { timeline: gsap.core.Timeline }) {
  const skillContainer = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      timeline.from('.skillCard', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power1.inOut',
        duration: 0.5,
      })
      timeline.eventCallback('onComplete', () => {
        gsap.to('.html5', { width: '85%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.css3', { width: '80%', duration: 1.5, ease: 'back.inOut' })
        gsap.to('.javascript', {
          width: '75%',
          duration: 1.5,
          ease: 'back.inOut',
        })
        gsap.to('.typescript', {
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
        <SkillCard title="HTML 5" className="html5">
          <div className="size-[60px] bg-[#E8622B]">
            <IconBrandHtml5 className="size-full text-white" stroke={1.5} />
          </div>
        </SkillCard>
        <SkillCard title="CSS 3" className="css3">
          <div className="size-[60px] bg-[#2962E9]">
            <IconBrandCss3 className="size-full text-white" stroke={1.5} />
          </div>
        </SkillCard>
        <SkillCard title="JavaScript" className="javascript">
          <Image alt="" src={javascript} width={60} height={60} />
        </SkillCard>
        <SkillCard title="TypeScript" className="typescript">
          <Image alt="" src={typescript} width={60} height={60} />
        </SkillCard>
      </div>
    </div>
  )
}
