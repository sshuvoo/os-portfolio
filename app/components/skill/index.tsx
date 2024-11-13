import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { Backend } from './backend'
import { Database } from './database'
import { Frontend } from './frontend'
import { Languages } from './languages'
import { sidebarData } from './sidebar-data'
import { Tools } from './tools'

export function Skill() {
  const menuContainer = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<string>('languages')
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const childTimeline = useRef<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  )

  useGSAP(
    () => {
      timeline.current.from('.menuItem', {
        y: 50,
        stagger: 0.2,
        opacity: 0,
        delay: 1,
        ease: 'power1.inOut',
        onComplete: () => {
          childTimeline.current.play()
        },
      })
    },
    { scope: menuContainer }
  )

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="max-h-full overflow-y-auto bg-light-foreground p-4 dark:bg-dark-foreground">
        <h3 className="text-sm font-medium text-[#9a9a9a]">Expertise</h3>
        <div ref={menuContainer} className="mt-2 space-y-2">
          {sidebarData.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                childTimeline.current = gsap.timeline()
                setTab(item.id)
              }}
              className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === item.id ? 'bg-white dark:bg-dark-hover-bg' : 'hover:bg-white dark:hover:bg-dark-hover-bg'}`}
            >
              <item.Icon stroke={2} className="text-emerald-500" />
              <h2 className="font-medium">{item.label}</h2>
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-full overflow-y-auto bg-light-background p-4 dark:bg-dark-background">
        {tab === 'languages' && <Languages timeline={childTimeline.current} />}
        {tab === 'frontend' && <Frontend />}
        {tab === 'backend' && <Backend />}
        {tab === 'databases' && <Database />}
        {tab === 'tools' && <Tools />}
      </div>
    </div>
  )
}
