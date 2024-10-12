'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { EaselPlugin } from 'gsap/EaselPlugin'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
import { Flip } from 'gsap/Flip'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Observer } from 'gsap/Observer'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Folder } from './components/folder'
import { Skill } from './components/skill'
import { WindowFrame } from './components/window-frame'
import { useSelector } from './store'

gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo
)

export default function Home() {
  const folders = useSelector((state) => state.windowFrame)
  const frames = folders.filter((folder) => folder.status !== 'close')

  return (
    <div className="h-screen">
      <div className="flex flex-wrap flex-col">
        {folders.map((folder) => (
          <Folder
            status={folder.status}
            onMinimizeRestore={folder.onMinimizeRestore}
            id={folder.id}
            name={folder.name}
            key={folder.id}
          />
        ))}
      </div>
      {frames.map((frame) => (
        <WindowFrame
          frame_id={frame.id}
          status={frame.status}
          frameName={frame.name}
          key={frame.id}
        >
          {frame.id === 'skills' && <Skill />}
        </WindowFrame>
      ))}
    </div>
  )
}
