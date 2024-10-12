import { useGSAP } from '@gsap/react'
import {
  IconBrandDjango,
  IconCode,
  IconDatabase,
  IconTool,
  IconWebhook,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { Languages } from './languages'
import { Frontend } from './frontend'
import { Backend } from './backend'
import { Database } from './database'
import { Tools } from './tools'

export function Skill() {
  const menuContainer = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<
    'languages' | 'frontend' | 'backend' | 'databases' | 'tools'
  >('languages')
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
      <div className="h-full bg-[#282828] p-4">
        <h3 className="text-sm font-medium text-[#9a9a9a]">Expertise</h3>
        <div ref={menuContainer} className="mt-2 space-y-2">
          <button
            onClick={() => {
              childTimeline.current = gsap.timeline()
              setTab('languages')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'languages' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconCode stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Languages</h2>
          </button>
          <button
            onClick={() => {
              childTimeline.current = gsap.timeline()
              setTab('frontend')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'frontend' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconWebhook stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Frontend</h2>
          </button>
          <button
            onClick={() => {
              childTimeline.current = gsap.timeline()
              setTab('backend')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'backend' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconBrandDjango stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Backend</h2>
          </button>
          <button
            onClick={() => {
              childTimeline.current = gsap.timeline()
              setTab('databases')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'databases' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconDatabase stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Databases</h2>
          </button>
          <button
            onClick={() => {
              childTimeline.current = gsap.timeline()
              setTab('tools')
            }}
            className={`menuItem flex w-full items-center gap-2 rounded-md px-2 py-1 ${tab === 'tools' ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
          >
            <IconTool stroke={2} className="text-emerald-500" />
            <h2 className="font-medium text-[#c6c6c6]">Tools</h2>
          </button>
        </div>
      </div>
      <div className="bg-[#212121] p-4">
        {tab === 'languages' && <Languages timeline={childTimeline.current} />}
        {tab === 'frontend' && <Frontend />}
        {tab === 'backend' && <Backend />}
        {tab === 'databases' && <Database />}
        {tab === 'tools' && <Tools />}
      </div>
    </div>
  )
}
